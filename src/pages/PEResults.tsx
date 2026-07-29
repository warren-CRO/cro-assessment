import { useParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Info,
  RotateCcw,
  Shield,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react'
import type { PEAnswers, DetectedPattern } from '../data/pe-types'
import { detectPatterns } from '../data/pe-detection'
import { patternContent, compoundContent, noPatternContent, allPatternsContent } from '../data/pe-content'

const respondentLabels: Record<string, string> = {
  'operating-partner': 'Operating Partners',
  'talent-partner': 'Talent Partners',
  'deal-team': 'Deal Team Members',
  'portco-cro': 'Portfolio Company CROs',
  'ceo': 'Target Company CEOs',
}

const stageLabels: Record<string, string> = {
  'pre-revenue': 'Pre-revenue / Early',
  'early': 'Early Stage',
  'growth': 'Growth Stage ($5M–$20M)',
  'scale': 'Scale Stage ($20M–$50M)',
  'mature': 'Mature ($50M+)',
}

const gtmLabels: Record<string, string> = {
  'product-led': 'Product-led',
  'sales-led': 'Sales-led',
  'hybrid': 'Hybrid',
  'channel': 'Channel / partner-driven',
  'enterprise': 'Enterprise',
}

const croStatusLabels: Record<string, string> = {
  'no-cro': 'No CRO in place',
  'cro-in-place': 'CRO currently in role',
  'cro-candidate': 'CRO candidate identified',
  'recently-departed': 'Previous CRO recently departed',
}

const crossFuncLabels: Record<string, string> = {
  'all-report-cro': 'all functions reporting to the commercial leader',
  'split-reporting': 'split reporting across CRO and CEO/COO',
  'independent-silos': 'independent functional silos',
  'dotted-line': 'dotted-line relationships without clear authority',
}

function buildSnapshotNarrative(a: PEAnswers): string {
  const parts: string[] = []

  const stage = a.companyStage ? stageLabels[a.companyStage] || a.companyStage : 'an undisclosed stage'
  const gtm = a.gtmMotion ? (gtmLabels[a.gtmMotion] || a.gtmMotion).toLowerCase() : 'an unspecified'
  parts.push(`This is a ${stage.toLowerCase()} company running a ${gtm} go-to-market motion.`)

  if (a.croStatus) {
    const status = croStatusLabels[a.croStatus] || a.croStatus
    parts.push(`Commercial leadership status: ${status.toLowerCase()}.`)
  }

  if (a.crossFuncStructure) {
    const structure = crossFuncLabels[a.crossFuncStructure] || a.crossFuncStructure
    parts.push(`The organizational structure shows ${structure}.`)
  }

  if (a.founderRole === 'active-ceo' && (a.founderGTMControl === 'full' || a.founderGTMControl === 'partial')) {
    parts.push('The founder remains active as CEO with ongoing involvement in GTM decisions.')
  }

  if (a.growthExpectation === 'over-50' || a.growthExpectation === '30-50') {
    const rate = a.growthExpectation === 'over-50' ? 'over 50%' : '30-50%'
    parts.push(`The value creation plan assumes ${rate} annual revenue growth.`)
  }

  if (a.holdPeriod) {
    const periods: Record<string, string> = {
      'under-3': 'under 3 years',
      '3-5': '3-5 years',
      '5-7': '5-7 years',
      'over-7': 'over 7 years',
    }
    parts.push(`Expected hold period: ${periods[a.holdPeriod] || a.holdPeriod}.`)
  }

  return parts.join(' ')
}

function PatternCard({ detected }: { detected: DetectedPattern }) {
  const content = patternContent[detected.pattern]
  const isHigh = detected.confidence === 'HIGH'

  return (
    <div
      className="rounded-[18px] overflow-hidden mb-6 print:break-inside-avoid"
      style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1', borderLeft: `4px solid ${isHigh ? '#ef4444' : '#3778F4'}` }}
    >
      <div className={`px-6 py-4 flex items-center justify-between ${isHigh ? 'bg-red-50 border-b border-red-100' : 'bg-blue-light border-b border-blue/10'}`}>
        <div className="flex items-center gap-3">
          {isHigh
            ? <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            : <Info className="w-5 h-5 text-blue shrink-0" />
          }
          <div>
            <h3 className="font-display text-lg font-bold text-navy">{content.peName}</h3>
            <p className="text-xs text-slate-light">({content.tccName})</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isHigh ? 'bg-red-100 text-red-700' : 'bg-blue/10 text-blue'}`}>
            {detected.confidence} CONFIDENCE
          </span>
          <span className="text-xs text-slate-light">
            {detected.triggerCount}/{detected.totalPossible} signals
          </span>
        </div>
      </div>

      <div className="px-6 py-5 space-y-6">
        <p className="text-slate leading-relaxed">{content.description}</p>

        <div>
          <h4 className="font-display font-semibold text-navy mb-2">What this means for your value creation plan</h4>
          <p className="text-slate-light leading-relaxed">{content.valuePlanImpact}</p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-navy mb-3">What to watch for in the first 100 days</h4>
          <ul className="space-y-2">
            {content.firstHundredDays.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-light">
                <span className="text-blue font-bold mt-0.5 shrink-0">{i + 1}.</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg p-5" style={{ background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,22,77,0.05)' }}>
          <h4 className="font-display font-semibold text-navy mb-3">Pre-close actions</h4>
          <ul className="space-y-2">
            {content.preCloseActions.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-light">
                <ShieldAlert className="w-4 h-4 text-[#FFBB00] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function PEResults() {
  const { encoded } = useParams<{ encoded: string }>()

  const data = useMemo(() => {
    try {
      const answers: PEAnswers = JSON.parse(atob(encoded || ''))
      const { patterns, compounds } = detectPatterns(answers)
      return { answers, patterns, compounds }
    } catch {
      return null
    }
  }, [encoded])

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
        <h1 className="font-display text-3xl font-bold mb-4 text-navy">Result not found</h1>
        <p className="text-slate-light mb-8">We couldn't load your results. Try taking the diagnostic again.</p>
        <Link to="/pe" className="inline-flex items-center gap-2 text-blue hover:underline font-medium">
          <RotateCcw className="w-4 h-4" /> Start Over
        </Link>
      </div>
    )
  }

  const { answers, patterns, compounds } = data
  const respondentLabel = answers.respondentType ? respondentLabels[answers.respondentType] || 'Evaluators' : 'Evaluators'
  const noCRO = answers.croStatus === 'no-cro' || answers.croStatus === 'recently-departed'
  const showAllPatternsWarning = patterns.length >= 4
  const primaryPatterns = showAllPatternsWarning ? patterns.slice(0, 3) : patterns
  const secondaryPatterns = showAllPatternsWarning ? patterns.slice(3) : []

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F6FA' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10 print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <a
            href="https://calendly.com/warren-zenna/cro-readiness-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#00164D] bg-[#FFBB00] rounded-lg px-[18px] py-[9px] transition-colors hover:bg-white"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div
        className="relative pt-24 pb-12 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
      >
        <img
          src="/maze-60.png"
          alt=""
          className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[400px] opacity-[0.06] pointer-events-none"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link to="/pe" className="inline-flex items-center gap-1 text-white/50 hover:text-white text-sm mb-8 transition-colors print:hidden">
            <ArrowLeft className="w-4 h-4" /> Back to Diagnostic
          </Link>

          <p className="text-sm font-display font-semibold text-[#1AA0D0] uppercase tracking-widest mb-2">
            Risk Brief
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
            Revenue Infrastructure Risk Brief
          </h1>
          <p className="text-lg text-white/60">
            for {respondentLabel}
          </p>

          {patterns.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-sm text-red-200">
                <AlertTriangle className="w-4 h-4" />
                {patterns.length} risk pattern{patterns.length > 1 ? 's' : ''} detected
              </span>
              {compounds.length > 0 && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFBB00]/16 border border-[#FFBB00]/42 text-sm text-[#FFBB00]">
                  {compounds.length} compound risk{compounds.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}

          {patterns.length === 0 && (
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-200">
                <CheckCircle className="w-4 h-4" />
                No structural risk patterns detected
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-12">
        <div className="max-w-3xl mx-auto">

          {/* Snapshot */}
          <Section>
            <SectionLabel icon={<Shield className="w-5 h-5 text-blue" />}>
              Revenue Infrastructure Snapshot
            </SectionLabel>
            <div className="rounded-[18px] p-6" style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}>
              <p className="text-base leading-relaxed text-slate">
                {buildSnapshotNarrative(answers)}
              </p>
              {noCRO && (
                <div className="mt-4 flex items-start gap-3 bg-blue-light rounded-xl p-5 border border-blue/20">
                  <Info className="w-5 h-5 text-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-slate leading-relaxed">
                    No commercial leader is currently in place. This brief focuses on
                    environment readiness — the structural conditions any future CRO
                    hire will walk into. The patterns below describe the environment,
                    not the person.
                  </p>
                </div>
              )}
            </div>
          </Section>

          {/* All-patterns warning */}
          {showAllPatternsWarning && (
            <div className="mb-8 flex items-start gap-3 bg-red-50 rounded-[18px] p-5" style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid rgba(239,71,111,0.15)' }}>
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-display font-semibold text-navy mb-1">Multiple structural risks detected</p>
                <p className="text-sm text-slate-light leading-relaxed">{allPatternsContent.prioritization}</p>
                <p className="text-sm text-slate-light leading-relaxed mt-2">{allPatternsContent.recommendation}</p>
              </div>
            </div>
          )}

          {/* Detected patterns */}
          {patterns.length > 0 && (
            <Section>
              <SectionLabel icon={<AlertTriangle className="w-5 h-5 text-red-500" />}>
                Detected Risk Patterns
              </SectionLabel>
              {primaryPatterns.map(p => (
                <PatternCard key={p.pattern} detected={p} />
              ))}
            </Section>
          )}

          {/* Secondary patterns */}
          {secondaryPatterns.length > 0 && (
            <Section>
              <h3 className="font-display text-lg font-bold text-navy mb-4">Contributing Risk Factors</h3>
              <p className="text-sm text-slate-light mb-4">
                These patterns are present but lower priority than the primary risks above.
                Address them once the critical patterns are stabilized.
              </p>
              {secondaryPatterns.map(p => (
                <PatternCard key={p.pattern} detected={p} />
              ))}
            </Section>
          )}

          {/* Compound risks */}
          {compounds.length > 0 && (
            <Section>
              <SectionLabel icon={<ShieldAlert className="w-5 h-5 text-[#FFBB00]" />}>
                Compound Risk Alerts
              </SectionLabel>
              {compounds.map(c => {
                const content = compoundContent[c.compound]
                return (
                  <div
                    key={c.compound}
                    className="mb-6 rounded-[18px] border-2 border-[#FFBB00] overflow-hidden print:break-inside-avoid"
                    style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)' }}
                  >
                    <div className="px-6 py-4" style={{ backgroundColor: 'rgba(255,187,0,0.12)', borderBottom: '1px solid rgba(255,187,0,0.35)' }}>
                      <h3 className="font-display text-lg font-bold text-navy">{content.peName}</h3>
                      <p className="text-xs text-slate-light mt-1">
                        Compound of: {patternContent[c.patterns[0]].peName} + {patternContent[c.patterns[1]].peName}
                      </p>
                    </div>
                    <div className="px-6 py-5 space-y-4">
                      <p className="text-slate leading-relaxed">{content.description}</p>
                      <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255,187,0,0.05)', border: '1px solid rgba(255,187,0,0.20)' }}>
                        <h4 className="font-display font-semibold text-navy mb-2 text-sm">Why this is worse than either pattern alone</h4>
                        <p className="text-sm text-slate-light leading-relaxed">{content.escalation}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Section>
          )}

          {/* No patterns */}
          {patterns.length === 0 && (
            <Section>
              <SectionLabel icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}>
                Structural Assessment
              </SectionLabel>
              <div className="rounded-[18px] p-6 mb-6" style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}>
                <p className="text-base leading-relaxed text-slate">
                  {noPatternContent.snapshot}
                </p>
              </div>
              <div className="rounded-[18px] p-6 mb-4" style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}>
                <h4 className="font-display font-semibold text-navy mb-3">What to monitor</h4>
                <ul className="space-y-2">
                  {noPatternContent.whatToMonitor.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-light">
                      <span className="text-blue font-bold mt-0.5 shrink-0">{i + 1}.</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-slate-light leading-relaxed italic">
                {noPatternContent.positive}
              </p>
            </Section>
          )}

          {/* CTA */}
          <div
            className="rounded-[18px] p-8 md:p-10 mb-10 print:hidden"
            style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
          >
            <p className="text-[#1AA0D0] text-sm font-display font-semibold uppercase tracking-widest mb-2">
              What to do next
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              These patterns don't fix themselves. They compound with every month of inaction and every CRO hire
              that walks into them blind. Here's how we work with PE firms to fix the environment before it breaks
              the next leader.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendly.com/warren-zenna/cro-readiness-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFBB00] text-[#00164D] hover:bg-white font-display font-semibold rounded-[10px] transition-all duration-200"
              >
                Talk to Us About Your Portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/framework.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/35 text-white hover:border-white hover:bg-white/5 font-display font-semibold rounded-[10px] transition-all duration-200"
              >
                Read the CRO Readiness Overview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Utility actions */}
          <div className="flex flex-wrap items-center gap-4 mb-16 print:hidden">
            <Link
              to="/pe/assess"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-light-alt rounded-full text-slate-light hover:border-blue hover:text-blue transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Retake Diagnostic
            </Link>
          </div>

          <div className="border-t border-light-alt pt-8 text-center text-sm text-slate-light">
            &copy; {new Date().getFullYear()} The CRO Collective. All rights reserved.
            <p className="mt-1">
              <a href="https://thecrocollective.com" target="_blank" rel="noopener noreferrer" className="text-[#1250C3] hover:underline">
                thecrocollective.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="mb-10">{children}</div>
}

function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-bold mb-4 text-navy flex items-center gap-2">
      {icon}
      {children}
    </h2>
  )
}

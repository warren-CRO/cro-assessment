import { useParams, Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Download,
  FileDown,
  AlertTriangle,
  Briefcase,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  DollarSign,
  MessageSquare,
} from 'lucide-react'
import type { ContextAnswers, DimensionScore, DimensionId } from '../data/readiness-types'
import { computeReadinessResult } from '../data/readiness-scoring'
import { dimensionQuestions } from '../data/readiness-questions'
import { generateJD } from '../data/jd-generator'
import { downloadJDAsDocx } from '../data/jd-docx'

interface Decoded {
  ctx: ContextAnswers
  dim: { id: DimensionId; score: number; label: string }[]
}

const cardStyle = {
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)',
  border: '1px solid #E3E8F1',
}

export default function ReadinessJD() {
  const { encoded } = useParams<{ encoded: string }>()

  const [downloading, setDownloading] = useState(false)

  const jd = useMemo(() => {
    try {
      const decoded: Decoded = JSON.parse(decodeURIComponent(atob(encoded || '')))
      const scores: DimensionScore[] = decoded.dim.map(d => {
        const q = dimensionQuestions.find(dq => dq.id === d.id)!
        return {
          id: d.id,
          dimension: q.dimension,
          layer: q.layer,
          score: d.score,
          selectedLabel: d.label,
        }
      })
      const result = computeReadinessResult(decoded.ctx, scores)
      return generateJD(decoded.ctx, scores, result.band, result.totalScore)
    } catch {
      return null
    }
  }, [encoded])

  if (!jd) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4F6FA' }}>
        <div className="text-center">
          <p className="text-navy font-display font-bold text-xl mb-2">Invalid assessment data</p>
          <Link to="/readiness" className="text-blue hover:underline">Take the assessment →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F6FA' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10 print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                if (!jd || downloading) return
                setDownloading(true)
                try {
                  await downloadJDAsDocx(jd)
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : String(err)
                  console.error('DOCX generation failed:', err)
                  alert('DOCX error: ' + msg)
                } finally {
                  setDownloading(false)
                }
              }}
              disabled={downloading}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#00164D] bg-[#FFBB00] rounded-lg px-4 py-1.5 transition-colors hover:bg-white disabled:opacity-60"
            >
              <FileDown className="w-3.5 h-3.5" />
              {downloading ? 'Generating...' : 'Download Word'}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-sm text-white/80 border border-white/35 rounded-lg px-4 py-1.5 hover:border-white hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Print PDF
            </button>
            <a
              href="https://calendly.com/warren-zenna/cro-readiness-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#00164D] bg-[#FFBB00] rounded-lg px-[18px] py-[9px] transition-colors hover:bg-white"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto w-full px-6 pt-22 pb-16 print:pt-0 print:max-w-none print:px-12">
        <Link
          to={`/readiness/results/${encoded}`}
          className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors mb-8 print:hidden"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </Link>

        {/* Readiness Warnings */}
        {jd.readinessWarnings.length > 0 && (
          <div className="mb-8 print:mb-6">
            {jd.readinessWarnings.map((warning, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-[18px] mb-3 last:mb-0"
                style={{ ...cardStyle, backgroundColor: '#FEF2F5', borderColor: '#FECDD6' }}
              >
                <AlertTriangle className="w-5 h-5 text-[#EF476F] shrink-0 mt-0.5" />
                <p className="text-sm text-slate leading-relaxed">{warning}</p>
              </div>
            ))}
          </div>
        )}

        {/* Title Card */}
        <div
          className="rounded-[18px] p-8 md:p-10 mb-8 print:rounded-none print:p-0 print:mb-6"
          style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
        >
          <img src="/logo-white.png" alt="The CRO Collective" className="h-6 mb-6 hidden print:block" />
          <p className="text-xs font-display font-semibold text-[#FFBB00] uppercase tracking-[0.2em] mb-3">
            Custom Job Description
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {jd.title}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">{jd.subtitle}</p>
          <div className="mt-6 pt-5 border-t border-white/15">
            <p className="text-sm text-white/50">
              Generated from your CRO Readiness Assessment results by The CRO Collective
            </p>
          </div>
        </div>

        {/* Company Context */}
        <JDSection icon={<Briefcase className="w-5 h-5" />} title="About the Role">
          <p className="text-slate leading-relaxed mb-4">{jd.companyContext}</p>
          <p className="text-slate leading-relaxed">{jd.roleSummary}</p>
        </JDSection>

        {/* Scope */}
        <JDSection icon={<Target className="w-5 h-5" />} title="Scope & Ownership">
          <div className="grid gap-2">
            {jd.scopeAreas.map((area, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: '#F4F6FA' }}>
                <div className="w-2 h-2 rounded-full bg-[#3778F4] shrink-0 mt-2" />
                <span className="text-sm text-slate">{area}</span>
              </div>
            ))}
          </div>
        </JDSection>

        {/* Responsibilities */}
        <JDSection icon={<CheckCircle className="w-5 h-5" />} title="Key Responsibilities">
          <div className="grid gap-3">
            {jd.responsibilities.map((resp, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-display font-semibold text-xs"
                  style={{ backgroundColor: '#3778F4', color: '#FFFFFF' }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-slate leading-relaxed pt-1">{resp}</p>
              </div>
            ))}
          </div>
        </JDSection>

        {/* First 90 Days */}
        <JDSection icon={<Clock className="w-5 h-5" />} title="Critical First 90 Days">
          <p className="text-sm text-slate-light mb-5">
            These priorities are based on the readiness gaps identified in the assessment. The CRO should walk in with a plan that addresses these — not a generic playbook.
          </p>
          <div className="grid gap-4">
            {jd.firstNinetyDays.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: '#E3E8F1' }}
              >
                <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: 'rgba(55,120,244,0.06)' }}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)', color: '#FFFFFF' }}
                  >
                    {i + 1}
                  </div>
                  <span className="font-display font-semibold text-sm text-navy">{item.priority}</span>
                </div>
                <div className="px-5 py-3">
                  <p className="text-sm text-slate leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </JDSection>

        {/* Qualifications */}
        <JDSection icon={<Users className="w-5 h-5" />} title="Qualifications">
          <div className="mb-6">
            <h4 className="font-display font-semibold text-sm text-navy mb-3 uppercase tracking-wider">Required</h4>
            <div className="grid gap-2">
              {jd.qualificationsRequired.map((qual, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#3778F4] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate">{qual}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-navy mb-3 uppercase tracking-wider">Preferred</h4>
            <div className="grid gap-2">
              {jd.qualificationsPreferred.map((qual, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#3778F4]/40 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate">{qual}</span>
                </div>
              ))}
            </div>
          </div>
        </JDSection>

        {/* Success Metrics */}
        <JDSection icon={<Target className="w-5 h-5" />} title="Success Metrics">
          <div className="grid gap-5">
            {jd.successMetrics.map((period, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-display font-bold"
                    style={{
                      backgroundColor: i === 0 ? '#3778F4' : i === 1 ? '#FFBB00' : '#1AA0D0',
                      color: i === 1 ? '#00164D' : '#FFFFFF',
                    }}
                  >
                    {period.timeframe}
                  </div>
                </div>
                <div className="grid gap-2 pl-1">
                  {period.metrics.map((metric, j) => (
                    <div key={j} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: '#F4F6FA' }}>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: i === 0 ? '#3778F4' : i === 1 ? '#FFBB00' : '#1AA0D0' }} />
                      <span className="text-sm text-slate">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </JDSection>

        {/* What This Role Is NOT */}
        <JDSection icon={<XCircle className="w-5 h-5" />} title="What This Role Is Not">
          <p className="text-sm text-slate-light mb-4">
            The most common CRO failures happen when the organization treats the title as one thing and the candidate expects another. Be explicit:
          </p>
          <div className="grid gap-3">
            {jd.notThisRole.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}
              >
                <XCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="text-sm text-slate">{item}</span>
              </div>
            ))}
          </div>
        </JDSection>

        {/* Compensation */}
        <JDSection icon={<DollarSign className="w-5 h-5" />} title="Compensation Guidance">
          <div
            className="p-5 rounded-xl"
            style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
          >
            <p className="text-sm text-white/60 mb-1">Market range for this stage and CRO type</p>
            <p className="font-display text-xl font-bold text-white">{jd.compensationRange}</p>
          </div>
          <p className="text-xs text-slate-light mt-3">
            Ranges based on The CRO Collective's market data for B2B companies at this revenue stage. Actual compensation varies by geography, industry, and candidate experience. Variable compensation should be tied to metrics the CRO can directly influence.
          </p>
        </JDSection>

        {/* Interview Focus */}
        <JDSection icon={<MessageSquare className="w-5 h-5" />} title="Interview Architecture">
          <p className="text-sm text-slate-light mb-5">
            Based on your assessment results, these are the areas to probe most deeply during the interview process. Each reflects a specific readiness condition in your organization.
          </p>
          <div className="grid gap-4">
            {jd.interviewFocus.map((focus, i) => (
              <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: '#E3E8F1' }}>
                <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: 'rgba(55,120,244,0.06)' }}>
                  <MessageSquare className="w-4 h-4 text-[#3778F4]" />
                  <span className="font-display font-semibold text-sm text-navy">{focus.area}</span>
                </div>
                <div className="px-5 py-3">
                  <p className="text-sm text-slate leading-relaxed">{focus.why}</p>
                </div>
              </div>
            ))}
          </div>
        </JDSection>

        {/* CTA */}
        <div
          className="rounded-[18px] p-8 md:p-10 text-center mt-2 print:rounded-none print:border print:border-navy"
          style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Need Help Getting This Right?
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            A custom job description is the starting point — not the finish line. The CRO Collective helps companies architect the role, close readiness gaps, and design the onboarding that determines whether your CRO succeeds or becomes another statistic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/warren-zenna/cro-readiness-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFBB00] text-[#00164D] hover:bg-white font-display font-bold rounded-[10px] transition-colors"
            >
              Book a Discovery Call
            </a>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/35 text-white hover:border-white hover:bg-white/5 font-display font-bold rounded-[10px] transition-colors"
            >
              Take the CRO Diagnostic
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-light-alt text-center text-sm text-slate-light print:mt-8">
          <p>
            This job description was generated by The CRO Collective's CRO Readiness Assessment based on your organization's specific readiness profile.
            It should be adapted to your company's voice, industry, and specific requirements.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} The CRO Collective. All rights reserved.
            {' · '}
            <a href="https://thecrocollective.com" target="_blank" rel="noopener noreferrer" className="text-[#1250C3] hover:underline">
              thecrocollective.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function JDSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] p-8 mb-6 print:rounded-none print:shadow-none print:p-6 print:mb-4" style={cardStyle}>
      <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: '1px solid #E3E8F1' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#3778F4]" style={{ backgroundColor: 'rgba(55,120,244,0.10)' }}>
          {icon}
        </div>
        <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
      </div>
      {children}
    </div>
  )
}

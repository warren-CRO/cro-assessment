import { useParams, Link } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import {
  ArrowLeft,
  OctagonAlert,
  CircleCheck,
  Lightbulb,
  ArrowRight,
  Share2,
  RotateCcw,
  AlertTriangle,
  Info,
} from 'lucide-react'
import type { ICP, Archetype, Revenue, Funding, Intent, Duration, PriorAction, OrgAwareness } from '../data/types'
import { icpOptions, revenueOptions, fundingOptions } from '../data/questions'
import { applyModifiers } from '../data/modifiers'

interface Decoded {
  i: ICP
  a: Archetype
  r: Revenue
  f: Funding
  t: Intent
  d: Duration
  p: PriorAction
  o: OrgAwareness
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function trackEvent(eventName: string, params?: Record<string, string>) {
  window.gtag?.('event', eventName, params)
}

function getCTACopy(intent: Intent) {
  switch (intent) {
    case 'research':
      return { primary: 'Book a Free Strategy Session', secondary: 'Read the CRO Readiness Overview' }
    case 'warming':
      return { primary: 'Book a Revenue Leadership Strategy Session', secondary: 'Read the CRO Readiness Overview' }
    case 'in-market':
      return { primary: 'Book a Revenue Leadership Strategy Session', secondary: 'Read the CRO Readiness Overview' }
    case 'hot':
      return { primary: "Let's Talk This Week", secondary: 'Read the CRO Readiness Overview' }
    default:
      return { primary: 'Book a Revenue Leadership Strategy Session', secondary: 'Read the CRO Readiness Overview' }
  }
}

export default function Results() {
  const { encoded } = useParams<{ encoded: string }>()

  const data = useMemo(() => {
    try {
      const parsed: Decoded = JSON.parse(atob(encoded || ''))
      const result = applyModifiers(parsed.i, parsed.a, {
        duration: parsed.d,
        priorAction: parsed.p,
        orgAwareness: parsed.o,
      })
      return { ...parsed, result }
    } catch {
      return null
    }
  }, [encoded])

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
        <h1 className="font-display text-3xl font-bold mb-4 text-navy">Result not found</h1>
        <p className="text-slate-light mb-8">We couldn't load your results. Try taking the assessment again.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-blue hover:underline font-medium">
          <RotateCcw className="w-4 h-4" /> Start Over
        </Link>
      </div>
    )
  }

  const { result, i: icp, r: revenue, f: funding, t: intent } = data

  useEffect(() => {
    trackEvent('diagnostic_complete', {
      archetype: result.name,
      icp,
      revenue,
      funding,
      intent,
      severity: result.severityLevel,
      shifted: result.shiftedFrom ? 'yes' : 'no',
    })
  }, [result, icp, revenue, funding, intent])

  const ctaCopy = getCTACopy(intent)
  const icpLabel = icpOptions.find(o => o.id === icp)?.label || icp
  const revenueLabel = revenueOptions.find(o => o.id === revenue)?.label || revenue
  const fundingLabel = fundingOptions.find(o => o.id === funding)?.label || funding

  const shareUrl = window.location.href
  const [copied, setCopied] = useState(false)
  const handleShare = async () => {
    trackEvent('share_results', { archetype: result.name })
    if (navigator.share) {
      await navigator.share({ title: `My Revenue Leadership Pattern: ${result.name}`, url: shareUrl })
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F6FA' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
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

      {/* Hero section */}
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
          <Link to="/" className="inline-flex items-center gap-1 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Start Over
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge>{icpLabel}</Badge>
            <Badge>{revenueLabel}</Badge>
            <Badge>{fundingLabel}</Badge>
          </div>

          <p className="text-sm font-display font-semibold text-[#1AA0D0] uppercase tracking-widest mb-2">Your Pattern</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">{result.name}</h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed italic">{result.subtitle}</p>

          {/* Archetype shift notice */}
          {result.shiftedFrom && (
            <div className="mt-6 flex items-start gap-3 bg-white/10 rounded-xl p-4 border border-white/20">
              <AlertTriangle className="w-5 h-5 text-[#FFBB00] shrink-0 mt-0.5" />
              <p className="text-sm text-white/80 leading-relaxed">
                <strong className="text-[#FFBB00]">Diagnosis refined:</strong> Based on what you told us about the duration, actions taken, and organizational awareness, the pattern that fits your situation is different than where you started. Your initial instinct pointed to one issue — the deeper picture reveals another.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-12">
        <div className="max-w-3xl mx-auto">

          {/* Early-stage caveat */}
          {result.caveat && (
            <div
              className="mb-6 flex items-start gap-3 rounded-[18px] p-6"
              style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
            >
              <Info className="w-5 h-5 text-blue shrink-0 mt-0.5" />
              <p className="text-sm text-slate leading-relaxed">{result.caveat}</p>
            </div>
          )}

          <div
            className="rounded-[18px] p-6 md:p-8 mb-6"
            style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
          >
            <p className="text-lg leading-relaxed text-slate">{result.description}</p>
          </div>

          <div
            className="rounded-[18px] p-6 md:p-8 mb-6"
            style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
          >
            <SectionLabel>What's Really Going On</SectionLabel>
            {result.commentary.split('\n\n').map((p, i) => (
              <p key={i} className={`text-base leading-relaxed text-slate-light ${i > 0 ? 'mt-4' : ''}`}>{p}</p>
            ))}
          </div>

          <div
            className="rounded-[18px] p-6 md:p-8 mb-6"
            style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
          >
            <SectionLabel>Why You're Stuck</SectionLabel>
            <div className="border-l-4 border-[#1AA0D0] bg-[#F4F6FA] rounded-r-xl p-6">
              <p className="text-base leading-relaxed text-slate">{result.whyStuck}</p>
            </div>
          </div>

          {/* Secondary archetype notice */}
          {result.secondaryArchetype && (
            <div
              className="mb-6 flex items-start gap-3 rounded-[18px] p-6"
              style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
            >
              <AlertTriangle className="w-5 h-5 text-blue shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-display font-semibold text-navy mb-1">Something else is happening too</p>
                <p className="text-sm text-slate-light leading-relaxed">{result.secondaryArchetype}</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div
              className="rounded-[18px] p-6"
              style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <OctagonAlert className="w-5 h-5 text-red-500" />
                <h3 className="font-display text-xl font-bold text-navy">Stop Doing</h3>
              </div>
              <ul className="space-y-3">
                {result.stopDoing.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-light">
                    <span className="text-red-400 font-bold mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-[18px] p-6"
              style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <CircleCheck className="w-5 h-5 text-emerald-500" />
                <h3 className="font-display text-xl font-bold text-navy">Start Doing</h3>
              </div>
              <ul className="space-y-3">
                {result.startDoing.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-light">
                    <span className="text-emerald-400 font-bold mt-0.5">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="rounded-[18px] p-6 md:p-8 mb-6"
            style={{ background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1px solid #E3E8F1' }}
          >
            <SectionLabel>Key Insights</SectionLabel>
            <div className="space-y-4">
              {result.insights.map((insight, i) => (
                <div key={i} className="flex gap-3 items-start rounded-xl p-5" style={{ backgroundColor: '#F4F6FA' }}>
                  <Lightbulb className="w-5 h-5 text-[#1AA0D0] shrink-0 mt-0.5" />
                  <p className="text-slate">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="rounded-[18px] p-8 md:p-10 mb-10"
            style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
          >
            <p className="text-[#1AA0D0] text-sm font-display font-semibold uppercase tracking-widest mb-2">
              Recommended Next Step: {result.offering}
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-6">{result.cta}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendly.com/warren-zenna/revenue-leadership-strategy-session"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_book_session', { archetype: result.name, intent })}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFBB00] text-[#00164D] hover:bg-white font-display font-semibold rounded-[10px] transition-all duration-200"
              >
                {ctaCopy.primary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/framework.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_read_framework', { archetype: result.name, intent })}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/35 text-white hover:border-white hover:bg-white/5 font-display font-semibold rounded-[10px] transition-all duration-200"
              >
                {ctaCopy.secondary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-16">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-light-alt rounded-full text-slate-light hover:border-blue hover:text-blue transition-colors"
            >
              <Share2 className="w-4 h-4" /> {copied ? 'Link Copied!' : 'Share Results'}
            </button>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-light-alt rounded-full text-slate-light hover:border-blue hover:text-blue transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </Link>
          </div>

          <div className="pt-8 text-center text-sm text-slate-light">
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-sm text-white/60">
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-bold mb-4 text-navy">{children}</h2>
}

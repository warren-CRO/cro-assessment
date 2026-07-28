import { useParams, Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  AlertTriangle,
  Share2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Lock,
  Mail,
} from 'lucide-react'
import type {
  ContextAnswers,
  DimensionScore,
  DimensionId,
  ReadinessLayer,
  ReadinessResult,
} from '../data/readiness-types'
import {
  computeReadinessResult,
  bandConfig,
  layerConfig,
  getDimensionStatus,
  dimensionStatusConfig,
  getCROType,
  getGapRecommendations,
} from '../data/readiness-scoring'
import { dimensionQuestions } from '../data/readiness-questions'

interface Decoded {
  ctx: ContextAnswers
  dim: { id: DimensionId; score: number; label: string }[]
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function trackEvent(eventName: string, params?: Record<string, string | number>) {
  window.gtag?.('event', eventName, params)
}

export default function ReadinessResults() {
  const { encoded } = useParams<{ encoded: string }>()
  const [expandedGaps, setExpandedGaps] = useState<Set<string>>(new Set())
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const result = useMemo<ReadinessResult | null>(() => {
    try {
      const parsed: Decoded = JSON.parse(decodeURIComponent(atob(encoded || '')))
      const scores: DimensionScore[] = parsed.dim.map(d => {
        const q = dimensionQuestions.find(dq => dq.id === d.id)!
        return {
          id: d.id,
          dimension: q.dimension,
          layer: q.layer,
          score: d.score,
          selectedLabel: d.label,
        }
      })
      return computeReadinessResult(parsed.ctx, scores)
    } catch {
      return null
    }
  }, [encoded])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-navy font-display font-bold text-xl mb-2">Invalid assessment data</p>
          <Link to="/readiness" className="text-blue hover:underline">Take the assessment →</Link>
        </div>
      </div>
    )
  }

  const band = bandConfig[result.band]
  const croType = getCROType(result.context)
  const gaps = getGapRecommendations(result.scores)
  const redCount = result.scores.filter(s => getDimensionStatus(s.score) === 'red').length
  const yellowCount = result.scores.filter(s => getDimensionStatus(s.score) === 'yellow').length
  const greenCount = result.scores.filter(s => getDimensionStatus(s.score) === 'green').length

  const toggleGap = (id: string) => {
    setExpandedGaps(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      trackEvent('readiness_share', { method: 'clipboard' })
    } catch {
      // fallback
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    trackEvent('readiness_email_capture', { band: result.band, score: String(result.totalScore) })
    setEmailSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <a
            href="https://thecrocollective.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 border border-white/30 rounded-lg px-4 py-1.5 hover:border-white hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto w-full px-4 pt-22 pb-16">
        <div className="flex items-center justify-between mb-8">
          <Link to="/readiness" className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Start Over
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-sm text-slate-light hover:text-navy border border-light-alt rounded-lg px-3 py-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? 'Copied!' : 'Share'}
            </button>
            <Link
              to="/readiness/assess"
              className="flex items-center gap-1.5 text-sm text-slate-light hover:text-navy border border-light-alt rounded-lg px-3 py-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake
            </Link>
          </div>
        </div>

        {/* Score Hero */}
        <div
          className="rounded-2xl p-8 mb-8 border-2"
          style={{ backgroundColor: band.bgColor, borderColor: band.borderColor }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: band.color + '20', color: band.color }}
              >
                {result.overrideApplied && <AlertTriangle className="w-3.5 h-3.5" />}
                {band.label} Readiness
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3 leading-snug">
                {band.headline}
              </h1>
              <p className="text-slate leading-relaxed">{band.description}</p>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke={band.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(result.totalScore / 50) * 327} 327`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-3xl font-bold" style={{ color: band.color }}>
                    {result.totalScore}
                  </span>
                  <span className="text-xs text-slate-light">of 50</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dimensionStatusConfig.red.color }} />
                  {redCount} gaps
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dimensionStatusConfig.yellow.color }} />
                  {yellowCount} developing
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dimensionStatusConfig.green.color }} />
                  {greenCount} ready
                </span>
              </div>
            </div>
          </div>

          {result.overrideApplied && result.overrideReason && (
            <div className="mt-6 p-4 rounded-xl bg-white/70 border border-red-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate leading-relaxed">
                  <span className="font-semibold text-navy">Critical Override: </span>
                  {result.overrideReason}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CRO Type */}
        <div className="rounded-xl border border-light-alt p-6 mb-8">
          <p className="text-xs font-display font-semibold text-blue uppercase tracking-widest mb-2">Recommended CRO Type</p>
          <h3 className="font-display text-xl font-bold text-navy mb-2">{croType.type}</h3>
          <p className="text-sm text-slate leading-relaxed">{croType.description}</p>
          <p className="text-sm text-slate-light mt-3">
            Recommended scope: <span className="font-medium text-navy">{band.croScope}</span>
          </p>
        </div>

        {/* Dimension Breakdown by Layer */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-bold text-navy mb-6">Readiness Breakdown</h2>
          {(['strategic', 'operational', 'foundational'] as ReadinessLayer[]).map(layerKey => {
            const layer = layerConfig[layerKey]
            const layerScores = result.scores.filter(s => s.layer === layerKey)
            return (
              <div key={layerKey} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-display font-semibold text-sm text-navy">{layer.label} Layer</h3>
                  <span className="text-xs text-slate-light">— {layer.description}</span>
                </div>
                <div className="grid gap-2">
                  {layerScores.map(score => {
                    const status = getDimensionStatus(score.score)
                    const cfg = dimensionStatusConfig[status]
                    return (
                      <div
                        key={score.id}
                        className="flex items-center gap-4 p-4 rounded-xl border"
                        style={{ borderColor: cfg.color + '40', backgroundColor: cfg.bgColor }}
                      >
                        <div className="flex items-center gap-2 shrink-0 w-40">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color }} />
                          <span className="text-sm font-medium text-navy">{score.dimension}</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${(score.score / 5) * 100}%`, backgroundColor: cfg.color }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-semibold w-6 text-right" style={{ color: cfg.color }}>
                            {score.score}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: cfg.color + '20', color: cfg.color }}>
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Gaps & Recommendations */}
        {gaps.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-xl font-bold text-navy mb-2">Before You Hire</h2>
            <p className="text-sm text-slate-light mb-6">
              {gaps.length === 1
                ? '1 dimension needs attention before a CRO can succeed.'
                : `${gaps.length} dimensions need attention before a CRO can succeed.`}
            </p>
            <div className="grid gap-3">
              {gaps.map(gap => {
                const expanded = expandedGaps.has(gap.id)
                const status = getDimensionStatus(gap.score)
                const cfg = dimensionStatusConfig[status]
                return (
                  <div
                    key={gap.id}
                    className="rounded-xl border overflow-hidden transition-all"
                    style={{ borderColor: cfg.color + '40' }}
                  >
                    <button
                      onClick={() => toggleGap(gap.id)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-light/50 transition-colors"
                    >
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color }} />
                      <span className="flex-1 font-medium text-navy text-sm">{gap.dimension}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: cfg.color + '20', color: cfg.color }}>
                        Score: {gap.score}/5
                      </span>
                      {expanded ? <ChevronUp className="w-4 h-4 text-slate-light" /> : <ChevronDown className="w-4 h-4 text-slate-light" />}
                    </button>
                    {expanded && (
                      <div className="px-4 pb-4 border-t" style={{ borderColor: cfg.color + '20' }}>
                        <p className="text-sm text-slate leading-relaxed mt-3">{gap.recommendation}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs text-slate-light">TCC can help:</span>
                          <span className="text-xs font-medium text-blue">{gap.tccOffering}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Email Gate for Full Report + JD */}
        <div className="rounded-2xl border-2 border-cyan/30 bg-blue-light p-8 mb-8">
          {!emailSubmitted ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-blue" />
                <p className="text-xs font-display font-semibold text-blue uppercase tracking-widest">Full Report + Custom JD</p>
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-2">
                Get Your Custom CRO Job Description
              </h3>
              <p className="text-sm text-slate leading-relaxed mb-6">
                Based on your assessment, we'll generate a CRO job description tailored to your company's stage, the type of CRO you need, and the readiness gaps to address before hiring. You'll also get the full readiness report with detailed recommendations.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-light" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-light-alt bg-white text-sm text-navy placeholder:text-slate-light focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue hover:bg-navy-mid text-white font-display font-semibold text-sm rounded-lg transition-colors shrink-0"
                >
                  Generate My JD
                </button>
              </form>
              <p className="text-xs text-slate-light mt-3">No spam. Just your custom report and JD.</p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-2">Check Your Inbox</h3>
              <p className="text-sm text-slate">
                Your custom CRO job description and full readiness report are being generated. We'll send them to <span className="font-medium text-navy">{email}</span> shortly.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(241.73deg, #02033C 26.8%, #033E8A 95.98%)' }}>
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            {result.band === 'critical' || result.band === 'limited'
              ? 'Fix the Structure Before You Hire'
              : result.band === 'moderate'
                ? 'You\'re Ready to Have the Right Conversation'
                : 'Now Make the Integration Count'
            }
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            {result.band === 'critical' || result.band === 'limited'
              ? 'The CRO Collective helps companies build the conditions for CRO success before making the hire. Every gap in your assessment is a conversation we can help with.'
              : result.band === 'moderate'
                ? 'You\'ve done the hard part — building the foundation. The CRO Collective helps you close the remaining gaps and architect a role that sets your next CRO up to succeed from Day 1.'
                : 'You\'ve built the readiness. The CRO Collective helps you get the integration right — the match, the onboarding architecture, the first 90 days, and the CEO-CRO operating dynamic that makes it last.'
            }
          </p>
          <a
            href="https://thecrocollective.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan hover:bg-blue text-navy hover:text-white font-display font-semibold rounded-lg transition-colors"
          >
            Talk to The CRO Collective
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-light-alt text-center text-sm text-slate-light">
          <p>
            This assessment is based on The CRO Collective's proprietary 10-Dimension CRO-Readiness Framework,
            developed from 25 years of revenue leadership experience and validated across hundreds of CRO engagements.
          </p>
          <p className="mt-2">
            A diagnostic tool by{' '}
            <a href="https://thecrocollective.com" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
              The CRO Collective
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

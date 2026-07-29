import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Users, Compass, Shield, Building2, Mic, Download, ExternalLink } from 'lucide-react'

const offerings = [
  {
    id: 'readiness-assessment',
    icon: Compass,
    name: 'CRO Readiness Assessment',
    tagline: 'Is your company ready for a CRO?',
    description: 'Most companies hire a CRO without knowing whether their organization can support one — and the result is a predictable, expensive failure. Our scored diagnostic evaluates 10 dimensions of organizational readiness, identifies the CRO type you actually need, and pinpoints the gaps that would derail a hire before you make one.',
    audience: 'CEOs, boards, and PE operating partners',
    includes: [
      '10-Dimension CRO-Readiness scoring',
      'CRO type recommendation matched to stage',
      'Gap analysis with prioritized recommendations',
      'Three-Layer Readiness Architecture mapping',
    ],
    cta: { label: 'Take the Free Assessment', href: '/readiness/assess', internal: true },
    decks: [{ label: 'Program Overview', href: '/decks/CRO-Readiness-Overview.pdf' }],
    color: '#1AA0D0',
    variant: 'dark' as const,
  },
  {
    id: 'accelerator',
    icon: Users,
    name: 'CRO Accelerator Course',
    tagline: 'The only program built for the role nobody prepared you for.',
    description: 'There is no formal training for the CRO role. Leaders get promoted into the seat with no preparation for the structural, political, and operational challenges that cause 70% to fail. Our 20-module program across Foundation, Revenue Engine, and Leadership blocks delivers cohort-based learning with live faculty and applied work on your own company.',
    audience: 'Sitting CROs, newly appointed CROs, and aspiring revenue leaders',
    includes: [
      '10 core + 10 elective modules with capstone',
      'Cohort-based, live online, application-only',
      'Faculty: Warren Zenna, Derek Sather, Janelle Pierini',
      'Applied work on your company from session one',
    ],
    decks: [
      { label: '2026 Program Overview', href: '/decks/CRO-Accelerator-2026-Overview.pdf' },
      { label: 'Foundations Sales Deck', href: '/decks/CRO-Accelerator-Foundations-Sales-Deck.pdf' },
    ],
    color: '#3778F4',
    variant: 'light' as const,
  },
  {
    id: 'transition',
    icon: Compass,
    name: 'CRO in Transition',
    tagline: 'Architect your next move — don\'t react to it.',
    description: 'With 17-month average tenure, most CROs will face a transition. The ones who design it proactively land better. We develop your career architecture — from narrative design and severance negotiation to "compounding" role selection that matches your vertical expertise, stage preference, and growth trajectory.',
    audience: 'CROs exiting, planning departure, or in search',
    includes: [
      'CRO Scorecard self-assessment across 9 dimensions',
      'Narrative architecture — 60s and 30s versions, rehearsed',
      'Severance negotiation coaching and transition planning',
      '"Compounding" role design for trajectory',
      'Ongoing advisory during the search process',
    ],
    tiers: 'Three tiers based on depth and duration.',
    decks: [
      { label: 'Engagement Overview', href: '/decks/CRO-Transition-Engagement-Overview.pdf' },
      { label: 'Sales Deck', href: '/decks/CRO-In-Transition-Sales-Deck.pdf' },
    ],
    color: '#00164D',
    variant: 'dark' as const,
  },
  {
    id: 'interim-bridge',
    icon: Shield,
    name: 'Interim CRO Bridge Program',
    tagline: 'Don\'t let a vacant CRO seat cost you a year.',
    description: 'When a CRO leaves, the seat sits empty for 4–6 months. Revenue operations drift, the team loses direction, and the incoming CRO inherits chaos. Our 90-day engagement deploys experienced CRO-level operational leadership to stabilize revenue, architect the permanent role, and hand off a clean system.',
    audience: 'PE-backed and growth-stage companies',
    includes: [
      'RARA diagnostic (person-lens + org-lens)',
      'Revenue stabilization and continuity plan',
      'Permanent CRO role architecture and search support',
      'Board-ready transition documentation',
    ],
    tiers: 'Scoped by operational complexity and company stage.',
    decks: [{ label: 'Program Overview', href: '/decks/Interim-CRO-Bridge-Overview.pdf' }],
    color: '#E4572E',
    variant: 'light' as const,
  },
  {
    id: 'architecture-implementation',
    icon: Building2,
    name: 'CRO Readiness Architecture Implementation',
    tagline: 'Build the infrastructure before you hire.',
    description: 'You\'ve done the assessment and you know the gaps. Now someone has to close them — process maturity, data infrastructure, governance structures, and role architecture. We take you from diagnosis through a six-month transformation, including data and metrics analysis, and end with a CRO hire and onboarding architecture.',
    audience: 'Companies scored Limited or Moderate on the Assessment',
    includes: [
      'Baseline CRO-Readiness diagnostic (4–6 weeks)',
      'Six-month transformation and alignment buildout',
      'Salesforce, profitability, ICP, comp plan analysis',
      'CRO hire and onboarding — definition, search, coaching',
    ],
    tiers: 'Scoped by operational complexity and company stage.',
    decks: [{ label: 'Program Overview', href: '/decks/CRO-Readiness-Overview.pdf' }],
    color: '#0147C9',
    variant: 'dark' as const,
  },
  {
    id: 'roundtable',
    icon: Mic,
    name: 'CRO Roundtable Sponsorship',
    tagline: 'Get in front of the revenue leadership community.',
    description: 'RevTech vendors struggle to reach CROs and CEOs in authentic, high-signal settings. Trade shows are noise. Cold outreach is ignored. Our executive roundtable dinners in 14+ cities across the US deliver intimate, curated peer conversations among CROs, CEOs, and PE operating partners. No pitches, no slides.',
    audience: 'RevTech vendors, services firms, and strategic partners',
    includes: [
      'Premier event sponsorship with exclusive brand presence',
      'Founding Partner annual partnerships available',
      'Curated groups of 15–25 senior revenue leaders',
      'Pipeline to TCC advisory and accelerator programs',
    ],
    decks: [{ label: 'Event Sponsorship One-Sheet', href: '/decks/CRO-Collective-Event-Sponsorship-One-Sheet.pdf' }],
    color: '#3778F4',
    variant: 'light' as const,
  },
]

function OfferingCard({ o }: { o: typeof offerings[number] }) {
  const isDark = o.variant === 'dark'

  return (
    <div
      id={o.id}
      className="scroll-mt-20 rounded-[18px] overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)'
          : '#FFFFFF',
        boxShadow: isDark
          ? 'none'
          : '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)',
        border: isDark ? 'none' : '1px solid rgba(0,22,77,0.05)',
      }}
    >
      <div className="p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: isDark ? 'rgba(255,187,0,0.16)' : 'rgba(55,120,244,0.10)',
            }}
          >
            <o.icon className="w-6 h-6" style={{ color: isDark ? '#FFBB00' : o.color }} />
          </div>
          <div>
            <h2 className={`font-display text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              {o.name}
            </h2>
            <p className={`text-sm font-medium mt-1 ${isDark ? 'text-[#FFBB00]' : ''}`} style={isDark ? {} : { color: o.color }}>
              {o.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className={`text-[15px] leading-relaxed mb-6 ${isDark ? 'text-white/70' : 'text-slate'}`}>
          {o.description}
        </p>

        {/* Audience badge */}
        <div className="mb-6">
          <span
            className={`inline-block text-xs font-display font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full ${
              isDark ? 'bg-white/10 text-white/60' : 'bg-light text-slate-light'
            }`}
          >
            For: {o.audience}
          </span>
        </div>

        {/* Includes */}
        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
          {o.includes.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: isDark ? '#FFBB00' : o.color }}
              />
              <span className={`text-sm ${isDark ? 'text-white/80' : 'text-slate'}`}>{item}</span>
            </div>
          ))}
        </div>

        {o.tiers && (
          <p className={`text-xs italic mb-6 ${isDark ? 'text-white/40' : 'text-slate-light'}`}>{o.tiers}</p>
        )}

        {/* Actions bar */}
        <div
          className={`flex flex-wrap items-center gap-4 pt-6 ${
            isDark ? 'border-t border-white/10' : 'border-t border-light-alt'
          }`}
        >
          {o.cta ? (
            <Link
              to={o.cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFBB00] hover:bg-white text-[#00164D] font-display font-bold text-sm rounded-lg transition-colors"
            >
              {o.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <a
              href="https://calendly.com/warren-zenna/cro-readiness-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFBB00] hover:bg-white text-[#00164D] font-display font-bold text-sm rounded-lg transition-colors"
            >
              Book a Discovery Call
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <a
            href={`mailto:info@thecrocollective.com?subject=${encodeURIComponent(o.name + ' — Inquiry')}`}
            className={`text-sm transition-colors ${isDark ? 'text-white/40 hover:text-white/70' : 'text-slate-light hover:text-navy'}`}
          >
            or email us
          </a>

          {o.decks && o.decks.length > 0 && (
            <div className={`flex flex-wrap items-center gap-4 sm:ml-auto`}>
              {o.decks.map((d, i) => (
                <a
                  key={i}
                  href={d.href}
                  download
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isDark ? 'text-[#FFBB00]/70 hover:text-[#FFBB00]' : 'text-blue hover:text-navy'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  {d.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Offerings() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F6FA' }}>
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

      {/* Hero */}
      <div
        className="relative px-4 pt-24 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-display font-semibold text-[#FFBB00] uppercase tracking-[0.2em] mb-4">Our Services</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
            The Full CRO Lifecycle —<br />
            Diagnosis to Deployment
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
            The CRO Collective is the only firm built around the CRO role itself. We diagnose why CROs fail, build the infrastructure for them to succeed, and support them through every phase of the journey.
          </p>
        </div>
      </div>

      {/* Offerings */}
      <div className="max-w-4xl mx-auto w-full px-6 py-12">
        <Link to="/readiness" className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment
        </Link>

        <div className="grid gap-6">
          {offerings.map(o => (
            <OfferingCard key={o.id} o={o} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl p-10 md:p-12 text-center mt-8" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Take the free CRO Readiness Assessment — it will tell you exactly where your organization stands and which of our services matches your situation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/readiness/assess"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFBB00] hover:bg-white text-[#00164D] font-display font-bold rounded-lg transition-colors"
            >
              Take the Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://calendly.com/warren-zenna/cro-readiness-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/35 text-white hover:border-white font-display font-bold rounded-lg transition-colors"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-light-alt text-center text-sm text-slate-light">
          <p>&copy; {new Date().getFullYear()} The CRO Collective. All rights reserved.</p>
          <p className="mt-1">
            <a href="https://thecrocollective.com" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
              thecrocollective.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

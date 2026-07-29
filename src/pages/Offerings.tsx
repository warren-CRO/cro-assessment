import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Users, Compass, Shield, Building2, Mic } from 'lucide-react'

const offerings = [
  {
    id: 'readiness-assessment',
    icon: Compass,
    name: 'CRO Readiness Assessment',
    tagline: 'Is your company ready for a CRO?',
    problem: 'Most companies hire a CRO without knowing whether their organization can support one. The result is a predictable, expensive failure.',
    solution: 'A scored diagnostic across 10 dimensions that reveals your readiness band, identifies the CRO type you actually need, and pinpoints the gaps that would derail a hire — before you make one.',
    who: 'CEOs, boards, and PE operating partners considering a CRO hire or evaluating a current one.',
    includes: [
      '10-Dimension CRO-Readiness scoring',
      'CRO type recommendation matched to your stage',
      'Gap analysis with prioritized recommendations',
      'Three-Layer Readiness Architecture mapping',
    ],
    cta: { label: 'Take the Free Assessment', href: '/readiness/assess' },
    color: '#00CCF5',
  },
  {
    id: 'accelerator',
    icon: Users,
    name: 'CRO Accelerator Course',
    tagline: 'Become the CRO your company actually needs.',
    problem: 'There is no formal training for the CRO role. Leaders get promoted into the seat — or recruited into it — with no preparation for the structural, political, and operational challenges that cause 70% to fail.',
    solution: 'The industry\'s only comprehensive CRO development program. 20 modules across three blocks — Foundation, Revenue Engine, and Leadership — with cohort-based learning, live faculty, and applied work on your own company throughout.',
    who: 'Sitting CROs, newly appointed CROs, and senior revenue leaders preparing for the role.',
    includes: [
      '10 core modules + 10 elective modules with capstone assessment',
      'Cohort-based, live online, application-only admission',
      'Faculty: Warren Zenna, Derek Sather, Janelle Pierini',
      'Applied work on your company from session one — not theory',
    ],
    color: '#1075FB',
  },
  {
    id: 'transition',
    icon: Compass,
    name: 'CRO in Transition',
    tagline: 'Architect your next move — don\'t react to it.',
    problem: 'With 17-month average tenure, most CROs will face a transition. The ones who design it proactively land better. The ones who react end up taking the wrong seat at the wrong company.',
    solution: 'A bespoke program that develops your career architecture — not just your resume. From narrative design and severance negotiation to "compounding" role selection that matches your vertical expertise, stage preference, and growth trajectory.',
    who: 'CROs exiting a role, planning a departure, or actively in search. Also serves aspiring CROs preparing for their first seat.',
    includes: [
      'CRO Scorecard self-assessment across 9 dimensions',
      'Narrative architecture — 60-second and 30-second versions, rehearsed',
      'Severance negotiation coaching and transition planning',
      '"Compounding" role design — matching the right seat to your trajectory',
      'Ongoing advisory during the search process',
    ],
    tiers: 'Three tiers based on depth and duration.',
    color: '#02033C',
  },
  {
    id: 'interim-bridge',
    icon: Shield,
    name: 'Interim CRO Bridge Program',
    tagline: 'Don\'t let a vacant CRO seat cost you a year.',
    problem: 'When a CRO leaves — fired, departed, or in transition — the seat sits empty for 4–6 months while the search runs. Revenue operations drift, the team loses direction, and the incoming CRO inherits chaos instead of a functioning system.',
    solution: 'A 90-day structured engagement that deploys experienced CRO-level operational leadership to stabilize revenue, architect the permanent role, and hand off a clean system to the next hire.',
    who: 'PE-backed and growth-stage companies with a vacant or transitioning CRO seat.',
    includes: [
      'RARA diagnostic instrument (person-lens + org-lens assessment)',
      'Revenue stabilization and operational continuity plan',
      'Permanent CRO role architecture and search support',
      'Board-ready transition documentation and milestone tracking',
    ],
    tiers: 'Scoped by operational complexity and company stage.',
    color: '#EF476F',
  },
  {
    id: 'architecture-implementation',
    icon: Building2,
    name: 'CRO Readiness Architecture Implementation',
    tagline: 'Build the infrastructure before you hire.',
    problem: 'You\'ve done the assessment. You know the gaps. Now someone has to close them — the process maturity, data infrastructure, governance structures, and role architecture that turn a readiness score into a CRO-ready organization.',
    solution: 'A full-scope consulting engagement that takes you from diagnosis through a six-month transformation, including data and metrics analysis, and ends with a CRO hire and onboarding architecture.',
    who: 'Companies that scored Limited or Moderate on the CRO Readiness Assessment and want to fix the structure before hiring.',
    includes: [
      'Phase 1: Baseline CRO-Readiness diagnostic (4–6 weeks)',
      'Phase 2: Six-month transformation and alignment buildout',
      'Phase 3: Data & metrics — Salesforce, profitability, ICP, comp plan analysis',
      'Phase 4: CRO hire and onboarding — role definition, search, coaching',
    ],
    tiers: 'Scoped by operational complexity and company stage.',
    color: '#033E8A',
  },
  {
    id: 'roundtable',
    icon: Mic,
    name: 'CRO Roundtable Sponsorship',
    tagline: 'Get in front of the revenue leadership community.',
    problem: 'RevTech vendors struggle to reach CROs and CEOs in authentic, high-signal settings. Trade shows are noise. Cold outreach is ignored. The people making revenue infrastructure decisions are hard to find in one room.',
    solution: 'Executive roundtable dinners in 14+ cities across the US — intimate, curated peer conversations among CROs, CEOs, and PE operating partners. No pitches, no slides — just the conversations that shape buying decisions.',
    who: 'RevTech vendors, professional services firms, and strategic partners targeting revenue leadership.',
    includes: [
      'Premier event sponsorship with exclusive brand presence',
      'Founding Partner annual strategic partnerships available',
      'Curated groups of 15–25 senior revenue leaders per event',
      'Pipeline to TCC advisory and accelerator programs',
    ],
    color: '#1075FB',
  },
]

export default function Offerings() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <a
            href="https://calendly.com/warren-zenna/cro-readiness-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-navy bg-cyan hover:bg-blue hover:text-white rounded-lg px-4 py-1.5 font-semibold transition-colors"
          >
            Book a Call
          </a>
        </div>
      </nav>

      <div
        className="relative px-4 pt-24 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(241.73deg, #02033C 26.8%, #033E8A 95.98%)' }}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-display font-semibold text-cyan uppercase tracking-[0.2em] mb-4">Our Services</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            The Full CRO Lifecycle —<br />
            Diagnosis to Deployment
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl mx-auto">
            The CRO Collective is the only firm built around the CRO role itself. We diagnose why CROs fail, build the infrastructure for them to succeed, and support them through every phase of the journey.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 py-12">
        <Link to="/readiness" className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment
        </Link>

        <div className="grid gap-10">
          {offerings.map(o => (
            <div key={o.id} id={o.id} className="scroll-mt-20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: o.color + '15' }}>
                  <o.icon className="w-5 h-5" style={{ color: o.color }} />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-navy">{o.name}</h2>
                  <p className="text-sm font-medium mt-0.5" style={{ color: o.color }}>{o.tagline}</p>
                </div>
              </div>

              <div className="ml-15 space-y-4">
                <div>
                  <h4 className="text-xs font-display font-semibold text-slate-light uppercase tracking-widest mb-1.5">The Problem</h4>
                  <p className="text-sm text-slate leading-relaxed">{o.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-display font-semibold text-slate-light uppercase tracking-widest mb-1.5">What We Do</h4>
                  <p className="text-sm text-slate leading-relaxed">{o.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-display font-semibold text-slate-light uppercase tracking-widest mb-1.5">Who It's For</h4>
                  <p className="text-sm text-slate leading-relaxed">{o.who}</p>
                </div>
                <div>
                  <h4 className="text-xs font-display font-semibold text-slate-light uppercase tracking-widest mb-1.5">What's Included</h4>
                  <div className="grid gap-1.5">
                    {o.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: o.color }} />
                        <span className="text-sm text-slate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {o.tiers && (
                  <p className="text-xs text-slate-light italic">{o.tiers}</p>
                )}
                <div className="flex items-center gap-4 pt-2">
                  {o.cta ? (
                    <Link
                      to={o.cta.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan hover:bg-blue text-navy hover:text-white font-display font-semibold text-sm rounded-lg transition-colors"
                    >
                      {o.cta.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href="https://calendly.com/warren-zenna/cro-readiness-discovery"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan hover:bg-blue text-navy hover:text-white font-display font-semibold text-sm rounded-lg transition-colors"
                    >
                      Book a Discovery Call
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={`mailto:info@thecrocollective.com?subject=${encodeURIComponent(o.name + ' — Inquiry')}`}
                    className="text-sm text-slate-light hover:text-navy transition-colors"
                  >
                    or email us
                  </a>
                </div>
              </div>

              <div className="border-b border-light-alt mt-10" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl p-10 text-center mt-12" style={{ background: 'linear-gradient(241.73deg, #02033C 26.8%, #033E8A 95.98%)' }}>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Not Sure Where to Start?
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            Take the free CRO Readiness Assessment — it will tell you exactly where your organization stands and which of our services matches your situation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/readiness/assess"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan hover:bg-blue text-navy hover:text-white font-display font-semibold rounded-lg transition-colors"
            >
              Take the Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://calendly.com/warren-zenna/cro-readiness-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white hover:border-white font-display font-semibold rounded-lg transition-colors"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-light-alt text-center text-sm text-slate-light">
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

import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Download, CheckCircle } from 'lucide-react'

export default function ReadinessWhitepaper() {
  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F6FA' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10 print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-sm text-white/80 border border-white/35 rounded-lg px-4 py-1.5 hover:border-white hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
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
        <Link to="/readiness" className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors mb-8 print:hidden">
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment
        </Link>

        {/* Cover */}
        <div className="rounded-2xl p-10 md:p-12 mb-10 text-center print:rounded-none print:p-0 print:mb-8" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
          <img src="/logo-white.png" alt="The CRO Collective" className="h-8 mx-auto mb-6 print:h-6" />
          <p className="text-xs font-display font-semibold text-[#FFBB00] uppercase tracking-[0.2em] mb-4">Research White Paper</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            The CRO Readiness Crisis:<br />
            Why 70% of CROs Fail and<br />
            What Companies Get Wrong
          </h1>
          <p className="text-white/60 text-sm">By Warren Zenna & Derek Sather | The CRO Collective | 2026</p>
        </div>

        {/* Executive Summary */}
        <Section title="Executive Summary">
          <p>
            The Chief Revenue Officer role has become one of the most structurally broken seats in the C-suite. With average tenure under 18 months, involuntary departure rates exceeding 70%, and replacement costs between $1.5M and $4M per failed hire, the CRO position represents both the highest-leverage and highest-risk executive investment a company can make.
          </p>
          <p>
            This white paper presents research from The CRO Collective's analysis of hundreds of CRO engagements across growth-stage and PE-backed B2B companies. The central finding: <strong>CRO failure is not a talent problem — it is a structural readiness problem.</strong> Companies that score below threshold on organizational readiness dimensions will fail their CRO hire regardless of the candidate's resume.
          </p>
          <p>
            The paper introduces the 10-Dimension CRO-Readiness Framework, the Three-Layer Readiness Architecture, the Six Predictable Failure Patterns, and the Four CRO Types — proprietary diagnostic tools that allow companies to assess their CRO-readiness before making a hire.
          </p>
        </Section>

        {/* The Problem */}
        <Section title="The Problem: A $4M Mistake on Repeat">
          <p>
            The data on CRO failure is unambiguous:
          </p>
          <StatGrid stats={[
            { value: '18mo', label: 'Average CRO tenure' },
            { value: '70%', label: 'Involuntary departures' },
            { value: '$1.5–4M', label: 'Cost per failed hire' },
            { value: '91%', label: 'Miss year-one targets' },
          ]} />
          <p>
            Yet companies keep making the same hire the same way, expecting different results. The typical pattern: the board pressures the CEO, the CEO hires a search firm, the search firm produces candidates who look right on paper, the hire is made, and 12–18 months later the CRO is gone. Cost: the salary, the recruiting fee, the opportunity cost of a year of stalled revenue strategy, the organizational trauma, and the loss of credibility with the board.
          </p>
          <p>
            The assumption behind this pattern is that CRO success is a talent problem — find a better candidate, get a better outcome. Our research shows the opposite. <strong>The #1 predictor of CRO success is not the person. It's whether the company was structurally ready for one.</strong>
          </p>
          <Callout>
            "Most people's perception of pandas comes from watching them in captivity — lethargic, antisocial, refusing to eat, failing to procreate. They look like dysfunctional animals. But watch a panda in its natural habitat and you see a completely different creature: social, animated, healthy, active, thriving. The panda was never the problem. The environment was. CROs suffer from the same misperception. We see them fail and assume it's a talent issue. It's not. It's that the organizational environment they were placed into was never built to support their success."
            <span className="block text-xs text-slate-light mt-2">— Warren Zenna, Founder, The CRO Collective</span>
          </Callout>
        </Section>

        {/* Six Failure Patterns */}
        <Section title="The Six Predictable Failure Patterns">
          <p>
            CRO failures are not random. They cluster into six systemic patterns that are identifiable before the hire is made — and preventable if addressed.
          </p>
          <div
            className="rounded-2xl overflow-hidden mt-6"
            style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)' }}
          >
            <FailurePattern
              number={1}
              name="Role Definition Ambiguity"
              description="The #1 structural killer. 50% of CROs cite role ambiguity as their primary obstacle. The company hasn't decided what a CRO actually does — is it a super VP of Sales with a bigger title, or a cross-functional revenue architect? Without a defined scope, authority boundaries, and success metrics, the CRO walks into an organization that doesn't know what it hired."
              isFirst
            />
            <FailurePattern
              number={2}
              name="CEO Expectation Misalignment"
              description="Hired to Build, Evaluated to Sell. The CEO tells the CRO to 'transform the revenue engine' but measures quarterly bookings. Comp plans reward new logos when the mandate was retention and expansion. The CRO is set up to fail from day one because the spoken mandate and the measured mandate are different things."
            />
            <FailurePattern
              number={3}
              name="The Founder Control Dynamic"
              description="Responsibility Without Authority. The CEO can't let go. The CRO has the title and the accountability but the founder still approves every deal, overrides pricing, and sits in on pipeline reviews. The CRO becomes a buffer between the founder and the sales team — not a leader."
            />
            <FailurePattern
              number={4}
              name="Cross-Functional Warfare"
              description="The Territory Problem. VP of Marketing and VP of Sales treat the CRO as a threat, not a leader. The CRO was hired to integrate functions that have been operating as fiefdoms. Without CEO-backed authority and a governance structure, the CRO spends their first year fighting political battles instead of building revenue architecture."
            />
            <FailurePattern
              number={5}
              name="The PE Pressure Dynamic"
              description="58% of CROs in newly acquired PE portcos are replaced within 24 months. PE operating partners report CRO as their #1 executive replacement priority. Aggressive growth theses meet operational reality with no transformation timeline, and the CRO absorbs the blame."
            />
            <FailurePattern
              number={6}
              name="Stage Mismatch"
              description="Wrong CRO for the right company. Externally hired CROs with prior CRO experience produced a 7.1% revenue decline vs. only 1.1% for first-time CROs promoted internally. The issue isn't experience — it's fit. A Builder CRO in a Scale seat, or a Scale CRO in a Turnaround seat, will underperform regardless of pedigree."
              isLast
            />
          </div>
        </Section>

        {/* 10 Dimensions */}
        <Section title="The 10-Dimension CRO-Readiness Framework">
          <p>
            To move CRO hiring from intuition to architecture, The CRO Collective developed a diagnostic framework that scores organizational readiness across 10 dimensions. Each dimension is scored 1–5 (total 50), and the aggregate score maps to a readiness band that determines what kind of CRO role — if any — the company can support.
          </p>

          <h3 className="font-display text-lg font-bold text-navy mt-8 mb-4">The Three-Layer Readiness Architecture</h3>
          <p>
            The 10 dimensions aren't independent — they form layered dependencies. Think of them as load-bearing floors: skip one, and everything above it is unstable.
          </p>

          <LayerBlock
            name="Strategic Layer"
            subtitle="The Ceiling"
            color="#FFBB00"
            dimensions={[
              { id: 'D1', name: 'CEO Alignment', desc: 'Does the CEO genuinely want a partner who owns end-to-end revenue?' },
              { id: 'D9', name: 'Board Support', desc: 'Will the board give the CRO enough runway to execute a transformation?' },
              { id: 'D10', name: 'Market Position', desc: 'Does the market context support the growth the CRO is being hired to deliver?' },
            ]}
          />
          <LayerBlock
            name="Operational Layer"
            subtitle="The Execution Engine"
            color="#3778F4"
            dimensions={[
              { id: 'D4', name: 'Process Maturity', desc: 'Are there processes to improve, or must the CRO build from scratch?' },
              { id: 'D5', name: 'Tech Stack Readiness', desc: 'Does the technology enable or obstruct revenue operations?' },
              { id: 'D7', name: 'Financial Transparency', desc: 'Can leadership see the numbers they need to make decisions?' },
              { id: 'D8', name: 'Cross-Functional Governance', desc: 'Are there structures for Sales, Marketing, and CS to work together?' },
            ]}
          />
          <LayerBlock
            name="Foundational Layer"
            subtitle="Must Be in Place First"
            color="#1AA0D0"
            dimensions={[
              { id: 'D2', name: 'Data Maturity', desc: 'Can you make decisions based on the data that exists today?' },
              { id: 'D3', name: 'Team Readiness', desc: 'Does the revenue team have the capability to execute a CRO\'s strategy?' },
              { id: 'D6', name: 'Cultural Readiness', desc: 'Will the culture support or resist the changes a CRO brings?' },
            ]}
          />

          <Callout>
            <strong>Critical Override Rule:</strong> If CEO Alignment (D1) or Board Support (D9) scores 2 or below, the company is rated Critical regardless of aggregate score. No aggregate score compensates for a CEO who doesn't want a partner or a board that won't give runway.
          </Callout>
        </Section>

        {/* Four CRO Types */}
        <Section title="The Four CRO Types">
          <p>
            Not all CROs do the same job. The "CRO" title maps to four fundamentally different roles, and the damage happens at the mismatch — a Strategic CRO in a Super VP of Sales seat gets frustrated; a tactical sales leader in a Full-Stack seat drowns.
          </p>
          <div className="grid gap-4 mt-6">
            <CROTypeCard
              type="Super VP of Sales"
              pct="~40%"
              desc="Tactical sales leadership with a CRO title. Focused on pipeline, quota, and team management. Common in companies under $25M."
            />
            <CROTypeCard
              type="Revenue Owner"
              pct="~35%"
              desc="Owns the revenue number across functions but primarily through a sales lens. The most common — and most commonly misunderstood — variant."
            />
            <CROTypeCard
              type="Full-Stack CRO"
              pct="~15%"
              desc="True cross-functional revenue leader: Sales + Marketing + CS + RevOps integrated. Requires high organizational maturity to succeed."
            />
            <CROTypeCard
              type="Strategic CRO"
              pct="~10%"
              desc="Board-level strategist focused on revenue architecture, market positioning, and organizational design. The rarest and most misplaced."
            />
          </div>
          <p className="mt-6">
            Matching the right CRO type to your company's stage, readiness, and revenue complexity is the architectural decision that determines success. Our free CRO Readiness Assessment maps your organization to the appropriate type automatically.
          </p>
        </Section>

        {/* What To Do */}
        <Section title="What Companies Should Do Differently">
          <p>
            The path from "we need a CRO" to a successful hire has three phases — and most companies skip the first two.
          </p>
          <div className="grid gap-6 mt-6">
            <PhaseCard
              number={1}
              title="Diagnose Before You Search"
              items={[
                'Score your organization across the 10 readiness dimensions',
                'Identify which failure patterns you\'re at risk for',
                'Determine which CRO type matches your stage and complexity',
                'Build the CEO Alignment Document before talking to candidates',
              ]}
            />
            <PhaseCard
              number={2}
              title="Fix the Structure Before You Hire"
              items={[
                'Close readiness gaps in the Foundational and Operational layers',
                'Define role scope, authority boundaries, and success metrics',
                'Align the board on transformation timeline vs. quarterly expectations',
                'Build cross-functional governance structures the CRO can inherit',
              ]}
            />
            <PhaseCard
              number={3}
              title="Architect the Role, Then Find the Person"
              items={[
                'Write a CRO job description matched to your readiness profile',
                'Design the 90-day onboarding architecture before the hire starts',
                'Establish the CEO-CRO operating cadence and escalation protocols',
                'Plan the first board presentation as a joint CEO-CRO deliverable',
              ]}
            />
          </div>
        </Section>

        {/* page break for print */}
        <div className="print:break-before-page" />

        {/* Offerings */}
        <Section title="How The CRO Collective Can Help">
          <p>
            The CRO Collective is the only firm built around the CRO role itself — from diagnosis to deployment to ongoing operating support. Every offering below addresses a specific phase of the CRO lifecycle.
          </p>

          <div className="grid gap-4 mt-6">
            <WPOffering
              name="CRO Readiness Assessment"
              line="Find out if your company is ready — before you write the check."
              anchor="readiness-assessment"
            />
            <WPOffering
              name="CRO Accelerator Course"
              line="The only comprehensive development program for sitting and aspiring CROs. 20 modules. Cohort-based. Applied from day one."
              anchor="accelerator"
            />
            <WPOffering
              name="CRO in Transition"
              line="Career architecture for CROs designing their next move — not reacting to it."
              anchor="transition"
            />
            <WPOffering
              name="Interim CRO Bridge Program"
              line="Don't let a vacant CRO seat cost you a year. 90-day operational leadership while you hire."
              anchor="interim-bridge"
            />
            <WPOffering
              name="CRO Readiness Architecture Implementation"
              line="Close the gaps the assessment found. Full-scope consulting from diagnosis through CRO hire."
              anchor="architecture-implementation"
            />
            <WPOffering
              name="CRO Roundtable Sponsorship"
              line="Get your brand in front of CROs, CEOs, and PE partners at intimate executive dinners in 14+ cities."
              anchor="roundtable"
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/readiness/offerings"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFBB00] hover:bg-white text-[#00164D] font-display font-bold text-sm rounded-lg transition-colors"
            >
              Explore All Offerings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Section>

        {/* CTA */}
        <div className="rounded-2xl p-10 md:p-12 text-center mt-8 print:rounded-none print:border print:border-navy" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Assess Your Organization?
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Take the free CRO Readiness Assessment to see where your company stands across all 10 dimensions — or talk to us directly about your CRO hiring plans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/readiness/assess"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFBB00] hover:bg-white text-[#00164D] font-display font-bold rounded-lg transition-colors print:border print:border-white print:bg-transparent print:text-white"
            >
              Take the Assessment
            </Link>
            <a
              href="https://calendly.com/warren-zenna/cro-readiness-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white hover:border-white font-display font-bold rounded-lg transition-colors"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-light-alt text-center text-sm text-slate-light print:mt-8">
          <p>
            &copy; {new Date().getFullYear()} The CRO Collective. All rights reserved.
          </p>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 print:mb-8">
      <div
        className="rounded-2xl bg-white p-8 md:p-10 print:rounded-none print:p-0 print:shadow-none"
        style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)' }}
      >
        <h2 className="font-display text-2xl font-bold text-navy mb-6 pb-4" style={{ borderBottom: '1px solid #E3E8F1' }}>{title}</h2>
        <div className="text-slate leading-relaxed space-y-4">{children}</div>
      </div>
    </div>
  )
}

function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {stats.map(s => (
        <div
          key={s.label}
          className="text-center p-5 rounded-xl"
          style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
        >
          <div className="font-display text-2xl font-bold text-white">{s.value}</div>
          <div className="text-xs text-white/60 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-6 p-6 rounded-2xl bg-blue-light border-l-4 border-[#3778F4] text-sm text-slate leading-relaxed italic"
      style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 4px 16px rgba(0,22,77,0.05)' }}
    >
      {children}
    </div>
  )
}

function FailurePattern({ number, name, description, isFirst, isLast }: { number: number; name: string; description: string; isFirst?: boolean; isLast?: boolean }) {
  return (
    <div className={`flex gap-4 p-5 bg-white ${!isLast ? 'border-b border-light-alt' : ''} ${isFirst ? '' : ''}`}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
        <span className="text-white font-display font-bold text-sm">{number}</span>
      </div>
      <div>
        <h4 className="font-display font-bold text-navy mb-1">{name}</h4>
        <p className="text-sm text-slate leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function LayerBlock({ name, subtitle, color, dimensions }: {
  name: string; subtitle: string; color: string
  dimensions: { id: string; name: string; desc: string }[]
}) {
  return (
    <div
      className="my-6 rounded-2xl border overflow-hidden"
      style={{ borderColor: color + '40', boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 4px 16px rgba(0,22,77,0.05)' }}
    >
      <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: color + '10' }}>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <span className="font-display font-bold text-sm text-navy">{name}</span>
        <span className="text-xs text-slate-light">— {subtitle}</span>
      </div>
      <div className="divide-y divide-light-alt bg-white">
        {dimensions.map(d => (
          <div key={d.id} className="px-5 py-3 flex items-start gap-3">
            <span className="text-xs font-mono text-slate-light mt-0.5 shrink-0 w-6">{d.id}</span>
            <div>
              <span className="font-medium text-navy text-sm">{d.name}</span>
              <p className="text-xs text-slate-light mt-0.5">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CROTypeCard({ type, pct, desc }: { type: string; pct: string; desc: string }) {
  return (
    <div
      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-light-alt"
      style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 4px 16px rgba(0,22,77,0.05)' }}
    >
      <div className="px-2.5 py-1 rounded-lg bg-[#FFBB00] text-[#00164D] text-xs font-display font-bold shrink-0">{pct}</div>
      <div>
        <h4 className="font-display font-bold text-navy text-sm">{type}</h4>
        <p className="text-xs text-slate-light mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function PhaseCard({ number, title, items }: { number: number; title: string; items: string[] }) {
  return (
    <div
      className="rounded-2xl bg-white border border-light-alt p-6"
      style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 4px 16px rgba(0,22,77,0.05)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
          <span className="text-white font-display font-bold text-sm">{number}</span>
        </div>
        <h4 className="font-display font-bold text-navy">{title}</h4>
      </div>
      <div className="grid gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#3778F4] shrink-0 mt-0.5" />
            <span className="text-sm text-slate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WPOffering({ name, line, anchor }: { name: string; line: string; anchor: string }) {
  return (
    <Link
      to={`/readiness/offerings#${anchor}`}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-light-alt hover:border-blue/30 transition-all group"
      style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 4px 16px rgba(0,22,77,0.05)' }}
    >
      <div className="w-1 h-full min-h-[40px] rounded-full bg-light-alt group-hover:bg-[#3778F4] transition-colors shrink-0" />
      <div className="flex-1">
        <h4 className="font-display font-bold text-navy group-hover:text-blue transition-colors">{name}</h4>
        <p className="text-sm text-slate mt-1 leading-relaxed">{line}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-light group-hover:text-blue shrink-0 mt-1 transition-colors" />
    </Link>
  )
}

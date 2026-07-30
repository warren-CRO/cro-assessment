import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Download, CheckCircle, AlertTriangle, TrendingDown, Users, ShieldOff, Swords, Zap, Shuffle } from 'lucide-react'

const cardShadow = '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)'

export default function ReadinessWhitepaper() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F6FA' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10 print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
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

      <div className="pt-14 print:pt-0">
        {/* Back link */}
        <div className="max-w-5xl mx-auto px-6 pt-8 print:hidden">
          <Link to="/readiness" className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </Link>
        </div>

        {/* ─── HERO ─── */}
        <div className="max-w-5xl mx-auto px-6 mt-8 mb-12 print:mt-0 print:mb-8">
          <div className="rounded-2xl p-10 md:p-14 text-center print:rounded-none print:p-0" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
            <img src="/logo-white.png" alt="The CRO Collective" className="h-8 mx-auto mb-6 print:h-6" />
            <p className="text-xs font-display font-semibold text-[#FFBB00] uppercase tracking-[0.2em] mb-4">CRO Readiness Overview</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              The CRO Readiness Crisis:<br />
              Why 70% of CROs Fail and<br />
              What Companies Get Wrong
            </h1>
            <p className="text-white/50 text-sm">By Warren Zenna & Derek Sather | The CRO Collective | 2026</p>
          </div>
        </div>

        {/* ─── STATS BANNER ─── */}
        <div className="w-full py-10 mb-12" style={{ background: 'linear-gradient(180deg, #00164D 0%, #011E5E 100%)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center text-xs font-display font-semibold text-[#FFBB00] uppercase tracking-[0.2em] mb-8">The data on CRO failure is unambiguous</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: '18mo', label: 'Average CRO tenure', sub: 'Korn Ferry, 2023' },
                { value: '70%', label: 'Involuntary departures', sub: 'Forrester Research' },
                { value: '$1.5–4M', label: 'Cost per failed hire', sub: 'Search + salary + opportunity' },
                { value: '91%', label: 'Miss year-one targets', sub: 'SBI Growth Advisory' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-sm text-white/70 font-medium">{s.label}</div>
                  <div className="text-xs text-white/35 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── EXECUTIVE SUMMARY ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="rounded-2xl bg-white p-8 md:p-10" style={{ boxShadow: cardShadow }}>
            <h2 className="font-display text-2xl font-bold text-navy mb-6 pb-4" style={{ borderBottom: '1px solid #E3E8F1' }}>Executive Summary</h2>
            <div className="text-slate leading-relaxed space-y-4">
              <p>
                The Chief Revenue Officer role has become one of the most structurally broken seats in the C-suite. With average tenure under 18 months and replacement costs between $1.5M and $4M per failed hire, the CRO position represents both the highest-leverage and highest-risk executive investment a company can make.
              </p>
              <p>
                This overview presents research from The CRO Collective's analysis of hundreds of CRO engagements across growth-stage and PE-backed B2B companies. The central finding: <strong>CRO failure is not a talent problem — it is a structural readiness problem.</strong> Companies that score below threshold on organizational readiness dimensions will fail their CRO hire regardless of the candidate's resume.
              </p>
            </div>
          </div>
        </div>

        {/* ─── THE PROBLEM ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="rounded-2xl bg-white p-8 md:p-10" style={{ boxShadow: cardShadow }}>
            <h2 className="font-display text-2xl font-bold text-navy mb-6 pb-4" style={{ borderBottom: '1px solid #E3E8F1' }}>The Problem: A $4M Mistake on Repeat</h2>
            <div className="text-slate leading-relaxed space-y-4">
              <p>
                Companies keep making the same hire the same way, expecting different results. The board pressures the CEO, the CEO hires a search firm, the search firm produces candidates who look right on paper, and 12–18 months later the CRO is gone. Cost: the salary, the recruiting fee, the opportunity cost of a year of stalled revenue strategy, the organizational trauma, and the loss of credibility with the board.
              </p>
              <p>
                The assumption behind this pattern is that CRO success is a talent problem — find a better candidate, get a better outcome. Our research shows the opposite. <strong>The #1 predictor of CRO success is not the person. It's whether the company was structurally ready for one.</strong>
              </p>
            </div>

            {/* Pull quote — replaces Panda Problem */}
            <div className="my-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: '#3778F4' }} />
              <div className="pl-6">
                <p className="text-lg text-navy font-medium leading-relaxed italic">
                  "Companies bought something they didn't know how to use. They hired a CRO to fix revenue — but the system the CRO was supposed to operate within didn't exist yet. No architecture, no alignment, no governance. Just a title and an expectation."
                </p>
                <p className="text-xs text-slate-light mt-3">— Warren Zenna, Founder, The CRO Collective</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── SIX FAILURE PATTERNS ─── */}
        <div className="w-full py-12 mb-12" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-display font-semibold text-[#3778F4] uppercase tracking-[0.2em] mb-3">Before the hire</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3">The Six Predictable Failure Patterns</h2>
              <p className="text-slate max-w-2xl mx-auto">CRO failures are not random. They cluster into six systemic patterns that are identifiable <em>before</em> the hire is made — and preventable if addressed.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <FailureCard
                icon={<AlertTriangle className="w-5 h-5" />}
                color="#EF476F"
                name="Role Definition Ambiguity"
                desc="50% of CROs cite role ambiguity as their primary obstacle. The company hasn't decided what a CRO actually does — Super VP of Sales or cross-functional revenue architect? Without defined scope, authority, and success metrics, the CRO walks into an organization that doesn't know what it hired."
              />
              <FailureCard
                icon={<TrendingDown className="w-5 h-5" />}
                color="#E4572E"
                name="CEO Expectation Misalignment"
                desc="Hired to Build, Evaluated to Sell. The CEO says 'transform the revenue engine' but measures quarterly bookings. Comp plans reward new logos when the mandate was retention and expansion. The spoken mandate and the measured mandate are different things."
              />
              <FailureCard
                icon={<ShieldOff className="w-5 h-5" />}
                color="#F59E0B"
                name="The Founder Control Dynamic"
                desc="Responsibility without authority. The CEO can't let go — still approves every deal, overrides pricing, sits in on pipeline reviews. The CRO becomes a buffer between the founder and the sales team, not a leader."
              />
              <FailureCard
                icon={<Swords className="w-5 h-5" />}
                color="#8B5CF6"
                name="Cross-Functional Warfare"
                desc="VP of Marketing and VP of Sales treat the CRO as a threat, not a leader. Without CEO-backed authority and governance structure, the CRO spends year one fighting political battles instead of building revenue architecture."
              />
              <FailureCard
                icon={<Zap className="w-5 h-5" />}
                color="#3778F4"
                name="The PE Pressure Dynamic"
                desc="58% of CROs in newly acquired PE portcos are replaced within 24 months. Aggressive growth theses meet operational reality with no transformation timeline, and the CRO absorbs the blame."
              />
              <FailureCard
                icon={<Shuffle className="w-5 h-5" />}
                color="#1AA0D0"
                name="Stage Mismatch"
                desc="Externally hired CROs with prior CRO experience produced a 7.1% revenue decline vs. 1.1% for first-time CROs promoted internally. The issue isn't experience — it's fit. A Builder CRO in a Scale seat will underperform regardless of pedigree."
              />
            </div>
          </div>
        </div>

        {/* ─── 10-DIMENSION FRAMEWORK ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="rounded-2xl bg-white p-8 md:p-10" style={{ boxShadow: cardShadow }}>
            <h2 className="font-display text-2xl font-bold text-navy mb-4 pb-4" style={{ borderBottom: '1px solid #E3E8F1' }}>The 10-Dimension CRO-Readiness Framework</h2>
            <p className="text-slate leading-relaxed mb-8">
              To move CRO hiring from intuition to architecture, The CRO Collective developed a diagnostic that scores organizational readiness across 10 dimensions. Each dimension is scored 1–5 (total 50), mapping to a readiness band that determines what kind of CRO role — if any — the company can support.
            </p>

            <h3 className="font-display text-lg font-bold text-navy mb-2">The Three-Layer Readiness Architecture</h3>
            <p className="text-slate leading-relaxed mb-8">
              The 10 dimensions form layered dependencies. Think of them as load-bearing floors: skip one, and everything above it is unstable.
            </p>

            {/* ── Visual Architecture Diagram ── */}
            <div className="relative max-w-2xl mx-auto mb-8">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-0" style={{ backgroundColor: '#E3E8F1' }} />

              {/* Strategic Layer */}
              <div className="relative z-10 mb-4">
                <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: '#FFBB00' }}>
                  <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: '#FFBB00' }}>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-[#00164D]">Strategic Layer</span>
                    </div>
                    <span className="text-xs font-semibold text-[#00164D]/60 uppercase tracking-wider">The Ceiling</span>
                  </div>
                  <div className="bg-white divide-y" style={{ borderColor: '#FFBB0030' }}>
                    <DimRow id="D1" name="CEO Alignment" desc="Does the CEO genuinely want a partner who owns end-to-end revenue?" critical />
                    <DimRow id="D9" name="Board Support" desc="Will the board give the CRO enough runway to execute a transformation?" critical />
                    <DimRow id="D10" name="Market Position" desc="Does the market context support the growth the CRO is being hired to deliver?" />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="inline-block text-xs text-[#FFBB00] font-semibold bg-[#FFBB00]/10 rounded-full px-3 py-1">▲ Must pass — or nothing above works</span>
                </div>
              </div>

              {/* Operational Layer */}
              <div className="relative z-10 mb-4">
                <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: '#3778F4' }}>
                  <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: '#3778F4' }}>
                    <span className="font-display font-bold text-sm text-white">Operational Layer</span>
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">The Execution Engine</span>
                  </div>
                  <div className="bg-white divide-y" style={{ borderColor: '#3778F430' }}>
                    <DimRow id="D4" name="Process Maturity" desc="Are there processes to improve, or must the CRO build from scratch?" />
                    <DimRow id="D5" name="Tech Stack Readiness" desc="Does the technology enable or obstruct revenue operations?" />
                    <DimRow id="D7" name="Financial Transparency" desc="Can leadership see the numbers they need to make decisions?" />
                    <DimRow id="D8" name="Cross-Functional Governance" desc="Are there structures for Sales, Marketing, and CS to work together?" />
                  </div>
                </div>
              </div>

              {/* Foundational Layer */}
              <div className="relative z-10">
                <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: '#1AA0D0' }}>
                  <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: '#1AA0D0' }}>
                    <span className="font-display font-bold text-sm text-white">Foundational Layer</span>
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Must Be in Place First</span>
                  </div>
                  <div className="bg-white divide-y" style={{ borderColor: '#1AA0D030' }}>
                    <DimRow id="D2" name="Data Maturity" desc="Can you make decisions based on the data that exists today?" />
                    <DimRow id="D3" name="Team Readiness" desc="Does the revenue team have the capability to execute a CRO's strategy?" />
                    <DimRow id="D6" name="Cultural Readiness" desc="Will the culture support or resist the changes a CRO brings?" />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="inline-block text-xs text-[#1AA0D0] font-semibold bg-[#1AA0D0]/10 rounded-full px-3 py-1">▼ Foundation — build this first</span>
                </div>
              </div>
            </div>

            {/* Critical override callout */}
            <div className="p-5 rounded-xl border-l-4 border-[#EF476F]" style={{ backgroundColor: '#FEF2F5' }}>
              <p className="text-sm text-slate leading-relaxed">
                <strong className="text-[#EF476F]">Critical Override Rule:</strong> If CEO Alignment (D1) or Board Support (D9) scores 2 or below, the company is rated Critical regardless of aggregate score. No aggregate score compensates for a CEO who doesn't want a partner or a board that won't give runway.
              </p>
            </div>
          </div>
        </div>

        {/* ─── FOUR CRO TYPES ─── */}
        <div className="w-full py-12 mb-12" style={{ background: 'linear-gradient(180deg, #00164D 0%, #011E5E 100%)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-display font-semibold text-[#FFBB00] uppercase tracking-[0.2em] mb-3">Role Architecture</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">The Four CRO Types</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Not all CROs do the same job. The damage happens at the mismatch — a Strategic CRO in a Super VP of Sales seat gets frustrated; a tactical sales leader in a Full-Stack seat drowns.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <CROTypeBlock
                type="Super VP of Sales"
                pct="~40%"
                desc="Tactical sales leadership with a CRO title. Focused on pipeline, quota, and team management."
                stage="Common under $25M"
                color="#FFBB00"
              />
              <CROTypeBlock
                type="Revenue Owner"
                pct="~35%"
                desc="Owns the revenue number across functions but primarily through a sales lens. The most common — and most commonly misunderstood — variant."
                stage="$10M–$75M"
                color="#3778F4"
              />
              <CROTypeBlock
                type="Full-Stack CRO"
                pct="~15%"
                desc="True cross-functional revenue leader: Sales + Marketing + CS + RevOps integrated. Requires high organizational maturity."
                stage="$50M–$200M"
                color="#1AA0D0"
              />
              <CROTypeBlock
                type="Strategic CRO"
                pct="~10%"
                desc="Board-level strategist focused on revenue architecture, market positioning, and organizational design. The rarest and most misplaced."
                stage="$200M+"
                color="#8B5CF6"
              />
            </div>

            <p className="text-center text-sm text-white/50 mt-8 max-w-xl mx-auto">
              Matching the right CRO type to your company's stage and readiness is the architectural decision that determines success. The CRO Readiness Assessment maps your organization to the appropriate type automatically.
            </p>
          </div>
        </div>

        {/* ─── WHAT TO DO DIFFERENTLY ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="text-center mb-10">
            <p className="text-xs font-display font-semibold text-[#3778F4] uppercase tracking-[0.2em] mb-3">The Path Forward</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3">What Companies Should Do Differently</h2>
            <p className="text-slate max-w-2xl mx-auto">The path from "we need a CRO" to a successful hire has three phases — and most companies skip the first two.</p>
          </div>

          {/* Timeline phases */}
          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5" style={{ backgroundColor: '#E3E8F1' }} />

            <div className="grid md:grid-cols-3 gap-6">
              <PhaseBlock
                number={1}
                title="Diagnose Before You Search"
                items={[
                  'Score your organization across the 10 readiness dimensions',
                  'Identify which failure patterns you\'re at risk for',
                  'Determine which CRO type matches your stage',
                  'Build the CEO Alignment Document before talking to candidates',
                ]}
              />
              <PhaseBlock
                number={2}
                title="Fix the Structure Before You Hire"
                items={[
                  'Close readiness gaps in the Foundational and Operational layers',
                  'Define role scope, authority boundaries, and success metrics',
                  'Align the board on transformation timeline',
                  'Build cross-functional governance the CRO can inherit',
                ]}
              />
              <PhaseBlock
                number={3}
                title="Architect the Role, Then Find the Person"
                items={[
                  'Write a CRO job description matched to your readiness profile',
                  'Design the 90-day onboarding architecture',
                  'Establish CEO-CRO operating cadence and escalation protocols',
                  'Plan the first board presentation as a joint deliverable',
                ]}
              />
            </div>
          </div>
        </div>

        {/* page break for print */}
        <div className="print:break-before-page" />

        {/* ─── OFFERINGS ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="rounded-2xl bg-white p-8 md:p-10" style={{ boxShadow: cardShadow }}>
            <h2 className="font-display text-2xl font-bold text-navy mb-2 pb-4" style={{ borderBottom: '1px solid #E3E8F1' }}>Our CRO Solutions & Programs</h2>
            <p className="text-slate leading-relaxed mb-8">
              The CRO Collective is the only firm built around the CRO role itself — from diagnosis to deployment to ongoing operating support. Each program addresses a specific phase of the CRO lifecycle.
            </p>

            <div className="grid gap-4">
              <OfferingRow
                name="CRO Readiness Assessment"
                line="Free diagnostic. Score your organization across 10 dimensions, identify failure patterns, and get a CRO type recommendation — before you write the check."
                anchor="readiness-assessment"
                tag="Free"
                tagColor="#1AA0D0"
              />
              <OfferingRow
                name="CRO Readiness Architecture Implementation"
                line="Close the gaps the assessment found. Full-scope consulting: stakeholder alignment, process design, governance setup, role architecture — everything between diagnosis and a successful CRO hire."
                anchor="architecture-implementation"
                tag="Consulting"
                tagColor="#3778F4"
              />
              <OfferingRow
                name="CRO Accelerator"
                line="The only comprehensive development program for sitting and aspiring CROs. 20 modules, cohort-based, with applied frameworks from day one. Not theory — operating systems."
                anchor="accelerator"
                tag="Program"
                tagColor="#FFBB00"
              />
              <OfferingRow
                name="Interim CRO Bridge Program"
                line="Don't let a vacant CRO seat cost you a year. 90-day operational revenue leadership while you hire — from people who've run revenue functions, not theorized about them."
                anchor="interim-bridge"
                tag="Interim"
                tagColor="#8B5CF6"
              />
              <OfferingRow
                name="CRO in Transition"
                line="Career architecture for CROs between roles. Positioning, narrative, network activation, and a diagnostic of what kind of seat you should take next."
                anchor="transition"
                tag="Career"
                tagColor="#EF476F"
              />
              <OfferingRow
                name="CRO Roundtable Sponsorship"
                line="Intimate executive dinners with CROs, CEOs, and PE partners in 14+ cities. Put your brand in the room where revenue leadership decisions get made."
                anchor="roundtable"
                tag="Events"
                tagColor="#E4572E"
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
          </div>
        </div>

        {/* ─── BOTTOM CTA ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="rounded-2xl p-10 md:p-12 text-center print:rounded-none print:border print:border-navy" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Assess Your Organization?
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              Take the free CRO Readiness Assessment to see where your company stands across all 10 dimensions — or talk to us directly about your CRO hiring plans.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFBB00] hover:bg-white text-[#00164D] font-display font-bold rounded-lg transition-colors"
              >
                Take the CRO Diagnostic
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
        </div>

        {/* ─── FOOTER ─── */}
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <div className="pt-6 border-t border-light-alt text-center text-sm text-slate-light">
            <p>&copy; {new Date().getFullYear()} The CRO Collective. All rights reserved.</p>
            <p className="mt-1">
              <a href="https://thecrocollective.com" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                thecrocollective.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FailureCard({ icon, color, name, desc }: { icon: React.ReactNode; color: string; name: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white border overflow-hidden" style={{ borderColor: '#E3E8F1', boxShadow: cardShadow }}>
      <div className="flex items-start gap-4 p-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '15', color }}>
          {icon}
        </div>
        <div>
          <h4 className="font-display font-bold text-navy mb-1.5">{name}</h4>
          <p className="text-sm text-slate leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

function DimRow({ id, name, desc, critical }: { id: string; name: string; desc: string; critical?: boolean }) {
  return (
    <div className="px-5 py-3 flex items-start gap-3">
      <span className="text-xs font-mono text-slate-light mt-0.5 shrink-0 w-7">{id}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-navy text-sm">{name}</span>
          {critical && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF476F] bg-[#EF476F]/10 rounded px-1.5 py-0.5">Critical</span>
          )}
        </div>
        <p className="text-xs text-slate-light mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

function CROTypeBlock({ type, pct, desc, stage, color }: { type: string; pct: string; desc: string; stage: string; color: string }) {
  return (
    <div className="rounded-xl p-6 border border-white/10" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 rounded-lg text-xs font-display font-bold" style={{ backgroundColor: color, color: color === '#FFBB00' ? '#00164D' : '#FFFFFF' }}>{pct}</span>
        <span className="text-xs text-white/40">{stage}</span>
      </div>
      <h4 className="font-display font-bold text-white mb-2">{type}</h4>
      <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
    </div>
  )
}

function PhaseBlock({ number, title, items }: { number: number; title: string; items: string[] }) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0" style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}>
          <span className="text-white font-display font-bold">{number}</span>
        </div>
      </div>
      <div className="rounded-xl bg-white border border-light-alt p-6" style={{ boxShadow: cardShadow }}>
        <h4 className="font-display font-bold text-navy text-center mb-4">{title}</h4>
        <div className="grid gap-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#3778F4] shrink-0 mt-0.5" />
              <span className="text-sm text-slate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OfferingRow({ name, line, anchor, tag, tagColor }: { name: string; line: string; anchor: string; tag: string; tagColor: string }) {
  return (
    <Link
      to={`/readiness/offerings#${anchor}`}
      className="flex items-start gap-4 p-5 rounded-xl bg-white border border-light-alt hover:border-blue/30 transition-all group"
      style={{ boxShadow: '0 1px 2px rgba(0,22,77,0.04)' }}
    >
      <span className="px-2 py-0.5 rounded text-[10px] font-display font-bold uppercase tracking-wider shrink-0 mt-0.5" style={{ backgroundColor: tagColor + '15', color: tagColor }}>{tag}</span>
      <div className="flex-1">
        <h4 className="font-display font-bold text-navy group-hover:text-blue transition-colors">{name}</h4>
        <p className="text-sm text-slate-light mt-1 leading-relaxed">{line}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-light group-hover:text-blue shrink-0 mt-1 transition-colors" />
    </Link>
  )
}

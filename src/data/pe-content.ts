import type { FailurePattern, CompoundPattern } from './pe-types';

export interface PatternContent {
  peName: string;
  tccName: string;
  description: string;
  valuePlanImpact: string;
  firstHundredDays: string[];
  preCloseActions: string[];
  lifecycleStage: 'pre-close' | 'first-100-days' | 'month-6-12' | 'exit-prep';
  severity: 'critical' | 'serious' | 'moderate';
}

export interface CompoundContent {
  peName: string;
  description: string;
  escalation: string;
}

export const patternContent: Record<FailurePattern, PatternContent> = {
  'role-definition-ambiguity': {
    peName: 'Mandate-Authority Gap',
    tccName: 'Role Definition Ambiguity',
    description:
      "The title says CRO. The org chart says something different. This person reports to the COO, not the CEO. Decision rights were never written down — they're understood, except everyone understands them differently. Marketing reports elsewhere. CS has a dotted line to nobody. The mandate is either everything or nothing, depending on who you ask. You didn't hire a revenue leader. You hired an expensive middle manager with a C-suite title.",
    valuePlanImpact:
      "Your value creation plan assumes coordinated commercial execution. What you actually have is a leader who can't coordinate because they don't control the pieces. Every initiative that touches more than one function will stall while your CRO negotiates authority they were supposed to have on day one. Timeline slippage starts here.",
    firstHundredDays: [
      'Watch for the CRO requesting "clarity" on decision rights in their first board update — that means they already hit the wall.',
      'Track how many cross-functional initiatives die in committee vs. ship to completion.',
      'Listen for marketing or CS leaders saying "that wasn\'t communicated to us" about revenue initiatives.',
      'Count how many times the CRO is overridden on a pricing, territory, or hiring decision.',
      'If the CRO starts building their own mini-ops team to work around silos, the structure is already failing them.',
    ],
    preCloseActions: [
      'Document decision rights in writing — who owns pricing, hiring, territory, and process changes — and get the CEO to sign it before close.',
      'Require a single reporting line to the CEO. If the CRO reports to the COO, renegotiate the structure.',
      'Map every customer-facing function and confirm which ones report to the commercial leader. Any split requires explicit justification.',
    ],
    lifecycleStage: 'first-100-days',
    severity: 'serious',
  },

  'ceo-expectation-misalignment': {
    peName: 'Transformation-Measurement Disconnect',
    tccName: 'CEO Expectation Misalignment',
    description:
      "The board deck says transformation. The comp plan says quarterly bookings. The CEO told the CRO to rebuild the GTM engine, then measured them on pipeline coverage in Q2. There's no transformation budget — the CRO is supposed to rebuild the airplane in flight using parts from the airplane. No one discussed a realistic timeline because the word 'transformation' makes everyone feel good without committing to what it actually costs.",
    valuePlanImpact:
      "You're asking for a two-year outcome on a six-month measurement cycle. The CRO will triage — and they'll triage toward whatever keeps the board off their back, which is short-term bookings. Your transformation never starts. Eighteen months from now you'll replace the CRO and call it a talent problem.",
    firstHundredDays: [
      "Compare the CRO's stated transformation plan to the metrics on their first performance review. If there's no overlap, the disconnect is already active.",
      'Check whether the CRO has asked for (and received) a dedicated transformation budget. If they haven\'t asked, they\'ve already accepted the constraint.',
      'Watch for the CRO deprioritizing systems or process work to hit a quarterly number — it means the short-term pressure won.',
      "Ask the CEO: 'If the CRO misses next quarter's number but delivers the transformation milestones, is that acceptable?' The answer tells you everything.",
    ],
    preCloseActions: [
      "Negotiate explicit transformation milestones into the CRO's compensation and performance framework — separate from financial targets.",
      'Require a dedicated transformation budget line item in the operating plan. "Fund it from existing" is code for "it won\'t happen."',
      'Establish a realistic timeline with the CEO and board before the hire, not after. If the CEO won\'t commit to 12–18 months, the transformation mandate is performative.',
    ],
    lifecycleStage: 'first-100-days',
    severity: 'critical',
  },

  'founder-control-dynamic': {
    peName: 'Founder-Operator Tension',
    tccName: 'Founder Control Dynamic',
    description:
      "The founder built this company from nothing and they're not ready to hand over the keys — especially to someone they just met. You'll see it in the org chart: the CRO reports to the founder, but the founder still approves every pricing change, every territory move, every key hire. The VPs who've been here since the early days go around the CRO to the founder because they can. The CRO title exists; the CRO authority doesn't.",
    valuePlanImpact:
      "Your value creation plan requires professional commercial leadership. What you have is a founder who will override that leader whenever their instincts disagree — and the founder's instincts will disagree often, because the transformation you're paying for looks like dismantling what they built. The CRO becomes a buffer between PE expectations and founder resistance. Average tenure in this dynamic: 14 months.",
    firstHundredDays: [
      'Track how many times the founder weighs in on operational GTM decisions after the CRO is in seat.',
      "Watch for legacy VPs scheduling \"quick syncs\" with the founder that bypass the CRO's chain of command.",
      'Listen for the founder saying things like "I just want to make sure we don\'t lose what got us here." That\'s the control reflex.',
      'Count how many of the CRO\'s first 10 proposals get modified or delayed by the founder.',
      'If the founder and CRO disagree publicly in their first leadership meeting, the authority question will spread to every VP in the room.',
    ],
    preCloseActions: [
      "Negotiate the founder's operational role and GTM involvement explicitly in the deal terms. 'Advisory' needs to mean advisory.",
      "Require the CRO to report directly to the CEO (not the founder, if they're different) or to the board.",
      'Identify which existing VPs are founder loyalists and plan for the political dynamic before the CRO starts.',
    ],
    lifecycleStage: 'first-100-days',
    severity: 'critical',
  },

  'cross-functional-warfare': {
    peName: 'Organizational Misalignment',
    tccName: 'Cross-Functional Warfare',
    description:
      "Sales, marketing, and CS each have their own leader, their own priorities, and their own version of what's working. The VPs were here before the CRO and they don't report to the CRO — or if they do on paper, they run their functions like independent businesses. Decision rights are verbal at best. The CRO's mandate includes coordinating these groups, but coordination without authority is just meeting facilitation.",
    valuePlanImpact:
      "Revenue growth at this company requires the functions to row together. They won't — not because people are bad, but because the incentive structure and reporting lines actively prevent it. Every cross-functional initiative will take 3x longer than it should. Your CRO will spend 60% of their time on internal politics instead of market execution.",
    firstHundredDays: [
      'Map the informal power structure in the first two weeks. Who actually makes decisions when the CRO isn\'t in the room?',
      "Track handoff quality between marketing and sales, and between sales and CS. Broken handoffs are the clearest symptom.",
      'Watch for VPs publicly disagreeing about pipeline definitions, lead quality, or account ownership.',
      "If the CRO's first reorg proposal gets watered down to protect existing VP roles, the warfare dynamic won.",
      "Listen for 'we've always done it this way' from any VP when the CRO proposes process changes.",
    ],
    preCloseActions: [
      'Before close, map which functions report to the CRO and which don\'t. Any "split reporting" arrangement needs an explicit rationale and a plan to consolidate.',
      'Identify VP tenure and relationships — VPs who predate the CRO and have board relationships are the biggest political risk.',
      'Get the CEO to commit to backing the CRO on structural changes in the first 90 days, in writing if possible.',
    ],
    lifecycleStage: 'month-6-12',
    severity: 'serious',
  },

  'pe-pressure-dynamic': {
    peName: 'Value Creation Plan Stress',
    tccName: 'PE Pressure Dynamic',
    description:
      "The growth thesis says 30–50% annual growth. The hold period is 3–5 years. Nobody's discussed a transformation timeline or budget because the plan assumes the current team just needs to execute harder. The CRO walks into a role where the only acceptable outcome is hitting a number that was modeled in a deal room, and the clock is already running. When they miss Q2, the board starts talking about 'fit.'",
    valuePlanImpact:
      "This is the most common CRO failure pattern in PE-backed companies, and it's entirely self-inflicted. Your value creation plan requires commercial transformation, but the timeline and measurement framework punish it. The CRO you hired to transform will optimize instead, because optimization shows quarterly progress. The structural changes that would have delivered the 5-year outcome never happen.",
    firstHundredDays: [
      'Compare the value creation plan growth assumptions to the current run rate. If the gap requires structural change but the plan doesn\'t allocate time for it, you have this pattern.',
      'Watch for the CRO defaulting to "quick wins" instead of system-level changes. That\'s them adapting to the pressure.',
      'Check whether board discussions focus on quarterly metrics or transformation progress. If transformation never comes up, the plan has already collapsed to short-term execution.',
      'If the CRO asks for a longer timeline and the response is "let\'s see how Q1 goes," the pressure dynamic is active.',
      'Track CRO engagement. Disengagement at month 6 usually means they\'ve accepted they can\'t deliver the thesis and are managing to an exit.',
    ],
    preCloseActions: [
      'Stress-test the value creation plan\'s growth assumptions against the actual commercial infrastructure. If the plan requires 40% growth and the current machine does 15%, name the gap explicitly.',
      'Build a 100-day commercial transformation plan with the operating partner before hiring the CRO — so the CRO walks into a plan, not a number.',
      'Allocate a transformation budget and a realistic timeline in the operating model. "Do more with the same" is not a plan.',
    ],
    lifecycleStage: 'pre-close',
    severity: 'critical',
  },

  'stage-mismatch': {
    peName: 'Commercial Leader–Stage Misfit',
    tccName: 'Stage Mismatch',
    description:
      "You hired an optimizer for a build job, or a builder for a company that needs refinement. The CRO's resume looks great — at a different stage company. A $5M company that needs its first real GTM system doesn't need someone who spent 10 years optimizing a $200M machine. And the company that's had two CROs fail in three years? The problem probably isn't the talent — it's the environment they walked into.",
    valuePlanImpact:
      "Stage mismatch is the silent killer in CRO hiring. The leader's playbook doesn't fit the company's actual needs, and it takes 6–9 months for both sides to realize it. By then you've burned half your hold period's transformation window on the wrong approach. If you've already churned through multiple CROs, the environment itself is producing the failure — the next hire won't fix it without structural changes.",
    firstHundredDays: [
      "Watch for the CRO's 90-day plan. If it reads like their last company's playbook pasted onto this one, they're running a stage-inappropriate approach.",
      'Listen for the CRO saying "at my last company we..." more than they say "here\'s what this company needs."',
      "Track whether the CRO is building from scratch vs. refining what exists. The wrong one for the stage will be obvious within 60 days.",
      "If the company has churned 2+ CROs, ask what was different about each one's departure. Same failure pattern = environment, not talent.",
    ],
    preCloseActions: [
      'Before hiring, define whether the commercial leader role requires a Builder, Optimizer, Fixer, or Operator. Map that to the company\'s actual stage, not where the value creation plan says it should be.',
      'If the company has a history of CRO failure, commission an environment assessment before making the next hire. The answer might be structural — not a person.',
    ],
    lifecycleStage: 'pre-close',
    severity: 'serious',
  },
};

export const compoundContent: Record<CompoundPattern, CompoundContent> = {
  'hire-and-handcuff': {
    peName: 'The Hire-and-Handcuff',
    description:
      "You've hired (or are about to hire) a commercial leader into a company where the founder still controls GTM and the leader's profile doesn't match the stage. The CRO can't execute their playbook because the founder won't let go, and even if the founder stepped back, the playbook is wrong for this company. The typical failure timeline is 9–14 months: 3 months of honeymoon, 4 months of friction, 3 months of disengagement, then departure.",
    escalation:
      "Either pattern alone is survivable with the right intervention. Together, they create a doom loop: the CRO can't prove their approach works because they don't have authority, and the founder's resistance feels validated because the CRO isn't delivering. Each side blames the other, and both are right.",
  },
  'thesis-trap': {
    peName: 'The Thesis Trap',
    description:
      "The value creation plan demands aggressive growth on a compressed timeline, but the measurement framework and budget don't support the transformation required to deliver it. The CRO is trapped between a PE thesis that requires structural change and a board that measures quarterly bookings. This typically unravels by month 8–12, when the gap between the thesis assumptions and actual performance becomes undeniable.",
    escalation:
      "PE Pressure creates the impossible timeline. CEO Expectation Misalignment removes the tools to meet it. The CRO has a transformation mandate without a transformation budget, measured on execution metrics, on an execution timeline. There is no version of this that ends well without intervention before close.",
  },
  'political-minefield': {
    peName: 'The Political Minefield',
    description:
      "The CRO's authority is ambiguous on paper and contested in practice. Functions don't report cleanly, VPs have their own power bases, and no one documented who gets to make what decision. The CRO spends their first six months navigating politics instead of executing. By the time they've built enough political capital to act, the board is already questioning their impact.",
    escalation:
      "Role Definition Ambiguity means the CRO doesn't know where their authority starts and stops. Cross-Functional Warfare means the people they need to lead don't recognize that authority. The combination means every decision becomes a negotiation, and the CRO's job becomes full-time consensus-building instead of commercial leadership.",
  },
};

export const noPatternContent = {
  snapshot:
    "Based on your responses, this company's commercial infrastructure doesn't show the structural risk patterns we typically see in PE-backed portfolio companies. The reporting lines are clear, the mandate is defined, and the environment appears supportive of a senior commercial leader. That's genuinely uncommon — and it's a strong signal for the value creation plan.",
  whatToMonitor: [
    'Re-run this diagnostic at 90 days post-close to check for patterns that emerge once the PE relationship is operational.',
    "Watch for informal authority shifts that aren't visible in the org chart — especially if the founder's role changes post-close.",
    "Track whether the commercial leader's first 100-day plan gets executed as written or silently modified by organizational resistance.",
    'Monitor board meeting dynamics — specifically whether transformation progress gets equal airtime with quarterly financial metrics.',
  ],
  positive:
    "A clean structural read doesn't mean there are no risks — it means the most common failure modes aren't present in the data you provided. The commercial leader has the structural conditions to succeed. Now it's about execution.",
};

export const allPatternsContent = {
  prioritization:
    "When you see this many structural risk patterns in a single company, the priority isn't fixing each one individually — it's reassessing whether the commercial infrastructure can support your value creation plan at all. Start with the highest-severity patterns and work inward.",
  recommendation:
    "Consider whether the value creation plan's growth assumptions are realistic given the structural state of the commercial organization. A company showing 4+ failure patterns typically needs 12–18 months of foundational work before a CRO hire can succeed. Hiring into this environment without structural changes first will produce the same outcome it always does.",
};

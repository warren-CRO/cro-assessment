import type {
  RespondentType, CompanyStage, GTMMotion, TeamSize, CROStatus,
  CROType, ReportingLine, Mandate, FounderRole, FounderGTMControl,
  DecisionRights, CrossFuncStructure, ExistingVPTenure, HoldPeriod,
  GrowthExpectation, TransformationTimeline, SuccessMetrics,
  TransformationBudget, PreviousCROHistory,
} from './pe-types';

type PEAnswerKey =
  | 'respondentType' | 'companyStage' | 'gtmMotion' | 'teamSize'
  | 'croStatus' | 'croType' | 'croReportingLine' | 'mandate'
  | 'founderRole' | 'founderGTMControl' | 'decisionRights'
  | 'crossFuncStructure' | 'existingVPTenure' | 'holdPeriod'
  | 'growthExpectation' | 'transformationTimeline' | 'successMetrics'
  | 'transformationBudget' | 'previousCROHistory';

export interface PEQuestionOption {
  id: string;
  label: string;
}

export interface PEQuestion {
  id: PEAnswerKey;
  question: string;
  options: PEQuestionOption[];
  category: 'context' | 'cro' | 'organization' | 'pe';
  conditional?: { field: PEAnswerKey; showWhen: string[] };
}

export const peQuestions: PEQuestion[] = [
  {
    id: 'respondentType',
    question: "What's your role in this evaluation?",
    category: 'context',
    options: [
      { id: 'operating-partner' satisfies RespondentType, label: 'Operating Partner' },
      { id: 'talent-partner' satisfies RespondentType, label: 'Talent Partner' },
      { id: 'deal-team' satisfies RespondentType, label: 'Deal Team Member' },
      { id: 'portco-cro' satisfies RespondentType, label: 'Portfolio Company CRO' },
      { id: 'ceo' satisfies RespondentType, label: 'CEO of Target Company' },
    ],
  },
  {
    id: 'companyStage',
    question: "Where is the target company in its commercial maturity?",
    category: 'context',
    options: [
      { id: 'pre-revenue' satisfies CompanyStage, label: 'Pre-revenue / Early ($0–$5M)' },
      { id: 'growth' satisfies CompanyStage, label: 'Growth ($5M–$20M)' },
      { id: 'scale' satisfies CompanyStage, label: 'Scale ($20M–$50M)' },
      { id: 'mature' satisfies CompanyStage, label: 'Mature ($50M+)' },
    ],
  },
  {
    id: 'gtmMotion',
    question: "What's the primary go-to-market motion?",
    category: 'context',
    options: [
      { id: 'product-led' satisfies GTMMotion, label: 'Product-led (self-serve + expansion)' },
      { id: 'sales-led' satisfies GTMMotion, label: 'Sales-led (outbound + direct)' },
      { id: 'hybrid' satisfies GTMMotion, label: 'Hybrid (product + sales)' },
      { id: 'channel' satisfies GTMMotion, label: 'Channel / partner-driven' },
      { id: 'enterprise' satisfies GTMMotion, label: 'Enterprise (complex, long-cycle)' },
    ],
  },
  {
    id: 'teamSize',
    question: "How large is the go-to-market team (sales, marketing, CS, RevOps combined)?",
    category: 'context',
    options: [
      { id: 'under-10' satisfies TeamSize, label: 'Under 10' },
      { id: '10-25' satisfies TeamSize, label: '10–25' },
      { id: '25-50' satisfies TeamSize, label: '25–50' },
      { id: '50-100' satisfies TeamSize, label: '50–100' },
      { id: 'over-100' satisfies TeamSize, label: 'Over 100' },
    ],
  },
  {
    id: 'croStatus',
    question: "What's the current state of senior commercial leadership?",
    category: 'cro',
    options: [
      { id: 'no-cro' satisfies CROStatus, label: 'No CRO or equivalent in place' },
      { id: 'cro-in-place' satisfies CROStatus, label: 'CRO currently in role' },
      { id: 'cro-candidate' satisfies CROStatus, label: 'CRO candidate identified (not yet hired)' },
      { id: 'recently-departed' satisfies CROStatus, label: 'Previous CRO recently departed' },
    ],
  },
  {
    id: 'croType',
    question: "Which best describes the commercial leader's profile?",
    category: 'cro',
    conditional: { field: 'croStatus', showWhen: ['cro-in-place', 'cro-candidate'] },
    options: [
      { id: 'builder' satisfies CROType, label: 'Builder (creates systems from scratch)' },
      { id: 'optimizer' satisfies CROType, label: 'Optimizer (refines and scales existing systems)' },
      { id: 'fixer' satisfies CROType, label: 'Fixer (turnaround specialist)' },
      { id: 'operator' satisfies CROType, label: 'Operator (steady-state execution)' },
    ],
  },
  {
    id: 'croReportingLine',
    question: "Who does (or will) the commercial leader report to?",
    category: 'cro',
    conditional: { field: 'croStatus', showWhen: ['cro-in-place', 'cro-candidate'] },
    options: [
      { id: 'ceo' satisfies ReportingLine, label: 'CEO' },
      { id: 'coo' satisfies ReportingLine, label: 'COO' },
      { id: 'board' satisfies ReportingLine, label: 'Board directly' },
      { id: 'pe-partner' satisfies ReportingLine, label: 'PE Operating Partner' },
      { id: 'founder' satisfies ReportingLine, label: 'Founder (if different from CEO)' },
    ],
  },
  {
    id: 'mandate',
    question: "What is the commercial leader expected to accomplish in the first 12–18 months?",
    category: 'cro',
    options: [
      { id: 'transform' satisfies Mandate, label: 'Transform the revenue engine (rebuild GTM)' },
      { id: 'execute' satisfies Mandate, label: 'Execute the existing playbook at scale' },
      { id: 'both' satisfies Mandate, label: 'Both transform AND hit aggressive targets' },
      { id: 'unclear' satisfies Mandate, label: "Mandate hasn't been clearly defined" },
    ],
  },
  {
    id: 'founderRole',
    question: "What role does the founder play in the business today?",
    category: 'organization',
    options: [
      { id: 'active-ceo' satisfies FounderRole, label: 'Active CEO — still running day-to-day' },
      { id: 'board-only' satisfies FounderRole, label: 'Board/advisory only — not operational' },
      { id: 'departed' satisfies FounderRole, label: 'Fully departed' },
      { id: 'active-non-ceo' satisfies FounderRole, label: 'Active in operations but not CEO' },
    ],
  },
  {
    id: 'founderGTMControl',
    question: "How involved is the founder in go-to-market decisions?",
    category: 'organization',
    options: [
      { id: 'full' satisfies FounderGTMControl, label: 'Still makes or approves most GTM decisions' },
      { id: 'partial' satisfies FounderGTMControl, label: 'Involved in major decisions only' },
      { id: 'none' satisfies FounderGTMControl, label: 'Not involved in GTM' },
    ],
  },
  {
    id: 'decisionRights',
    question: "How are commercial decision rights (pricing, territory, hiring, process changes) allocated?",
    category: 'organization',
    options: [
      { id: 'formal-documented' satisfies DecisionRights, label: 'Formally documented and communicated' },
      { id: 'informal-verbal' satisfies DecisionRights, label: 'Informal / verbal agreements' },
      { id: 'not-defined' satisfies DecisionRights, label: 'Not clearly defined' },
    ],
  },
  {
    id: 'crossFuncStructure',
    question: "How do marketing, sales, and customer success relate to the commercial leader?",
    category: 'organization',
    options: [
      { id: 'all-report-cro' satisfies CrossFuncStructure, label: 'All report directly to the commercial leader' },
      { id: 'split-reporting' satisfies CrossFuncStructure, label: 'Split reporting (some to CRO, some to CEO/COO)' },
      { id: 'independent-silos' satisfies CrossFuncStructure, label: 'Operate as independent silos with separate leadership' },
      { id: 'dotted-line' satisfies CrossFuncStructure, label: 'Dotted-line relationships without clear authority' },
    ],
  },
  {
    id: 'existingVPTenure',
    question: "When did the current VPs of Sales, Marketing, and/or CS join relative to the commercial leader?",
    category: 'organization',
    options: [
      { id: 'predate-cro' satisfies ExistingVPTenure, label: 'Most predate the commercial leader' },
      { id: 'installed-by-cro' satisfies ExistingVPTenure, label: 'Most were installed by the commercial leader' },
      { id: 'mix' satisfies ExistingVPTenure, label: 'Mix of both' },
      { id: 'no-vps' satisfies ExistingVPTenure, label: 'No VP-level reports in place' },
    ],
  },
  {
    id: 'holdPeriod',
    question: "What's the expected hold period for this investment?",
    category: 'pe',
    options: [
      { id: 'under-3' satisfies HoldPeriod, label: 'Under 3 years' },
      { id: '3-5' satisfies HoldPeriod, label: '3–5 years' },
      { id: '5-7' satisfies HoldPeriod, label: '5–7 years' },
      { id: 'over-7' satisfies HoldPeriod, label: 'Over 7 years' },
    ],
  },
  {
    id: 'growthExpectation',
    question: "What annual revenue growth rate does the value creation plan assume?",
    category: 'pe',
    options: [
      { id: 'under-15' satisfies GrowthExpectation, label: 'Under 15% (optimization)' },
      { id: '15-30' satisfies GrowthExpectation, label: '15–30% (moderate growth)' },
      { id: '30-50' satisfies GrowthExpectation, label: '30–50% (aggressive growth)' },
      { id: 'over-50' satisfies GrowthExpectation, label: 'Over 50% (hypergrowth)' },
    ],
  },
  {
    id: 'transformationTimeline',
    question: "What timeline has been discussed for commercial transformation?",
    category: 'pe',
    options: [
      { id: 'under-6mo' satisfies TransformationTimeline, label: 'Under 6 months' },
      { id: '6-12mo' satisfies TransformationTimeline, label: '6–12 months' },
      { id: '12-18mo' satisfies TransformationTimeline, label: '12–18 months' },
      { id: 'no-timeline' satisfies TransformationTimeline, label: 'No transformation timeline discussed' },
    ],
  },
  {
    id: 'successMetrics',
    question: "How will the commercial leader's success be measured?",
    category: 'pe',
    options: [
      { id: 'quarterly-bookings' satisfies SuccessMetrics, label: 'Quarterly bookings / pipeline metrics' },
      { id: 'annual-growth' satisfies SuccessMetrics, label: 'Annual revenue growth' },
      { id: 'transformation-milestones' satisfies SuccessMetrics, label: 'Transformation milestones (systems, process, team)' },
      { id: 'mix' satisfies SuccessMetrics, label: 'Mix of financial and transformation metrics' },
    ],
  },
  {
    id: 'transformationBudget',
    question: "Is there a dedicated budget for commercial transformation (systems, hires, process redesign)?",
    category: 'pe',
    options: [
      { id: 'dedicated' satisfies TransformationBudget, label: 'Yes — dedicated transformation budget' },
      { id: 'from-existing' satisfies TransformationBudget, label: 'Expected to fund from existing operating budget' },
      { id: 'none-discussed' satisfies TransformationBudget, label: "Budget hasn't been discussed" },
    ],
  },
  {
    id: 'previousCROHistory',
    question: "What's the company's history with senior commercial leadership?",
    category: 'pe',
    options: [
      { id: 'none' satisfies PreviousCROHistory, label: 'No prior CRO or equivalent' },
      { id: 'one-departed' satisfies PreviousCROHistory, label: 'One prior CRO who departed' },
      { id: 'two-plus-departed' satisfies PreviousCROHistory, label: 'Two or more prior CROs who departed' },
      { id: 'successful-tenure' satisfies PreviousCROHistory, label: 'CRO with successful tenure in place' },
    ],
  },
];

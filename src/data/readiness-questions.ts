import type { DimensionQuestion, ReadinessRole, ReadinessRevenue, ReadinessFunding, HireReason } from './readiness-types';

export const roleOptions: { id: ReadinessRole; label: string; description: string }[] = [
  { id: 'ceo', label: 'CEO / Founder', description: 'Leading the company, making the CRO hiring decision' },
  { id: 'board', label: 'Board Member', description: 'Advising on or approving executive revenue leadership' },
  { id: 'pe-operator', label: 'PE Operating Partner', description: 'Managing revenue leadership across portfolio companies' },
  { id: 'hr-talent', label: 'Head of HR / Talent', description: 'Leading the executive search process' },
  { id: 'search-firm', label: 'Search Firm / Recruiter', description: 'Placing a CRO for a client company' },
];

export const revenueOptions: { id: ReadinessRevenue; label: string }[] = [
  { id: 'under-10m', label: 'Under $10M' },
  { id: '10-50m', label: '$10M – $50M' },
  { id: '50-100m', label: '$50M – $100M' },
  { id: '100-300m', label: '$100M – $300M' },
  { id: '300m-plus', label: '$300M+' },
];

export const fundingOptions: { id: ReadinessFunding; label: string }[] = [
  { id: 'bootstrapped', label: 'Bootstrapped / Self-funded' },
  { id: 'pe-backed', label: 'PE-Backed' },
  { id: 'vc-backed', label: 'VC-Backed' },
  { id: 'public', label: 'Public' },
];

export const hireReasonOptions: { id: HireReason; label: string; description: string }[] = [
  { id: 'first-cro', label: 'First CRO Hire', description: "We've never had a CRO before" },
  { id: 'replacing', label: 'Replacing a CRO', description: 'Our previous CRO departed and we need a successor' },
  { id: 'restructuring', label: 'Restructuring Revenue Leadership', description: "We're reorganizing how revenue is led" },
  { id: 'exploring', label: 'Exploring the Idea', description: "Not sure if a CRO is the right move yet" },
];

export const dimensionQuestions: DimensionQuestion[] = [
  {
    id: 'D1',
    dimension: 'CEO Alignment',
    layer: 'strategic',
    question: 'How does the CEO view this revenue leadership role?',
    options: [
      { label: 'As a senior sales leader who reports into the existing structure', score: 1 },
      { label: 'As someone to own the revenue number and manage the sales team', score: 2 },
      { label: 'As a revenue leader with specific authority, though the CEO stays hands-on', score: 3 },
      { label: 'As a true partner who co-owns the go-to-market strategy with defined decision rights', score: 4 },
      { label: 'As the single accountable executive for end-to-end revenue architecture', score: 5 },
    ],
  },
  {
    id: 'D2',
    dimension: 'Data Maturity',
    layer: 'foundational',
    question: 'When you need to understand how revenue is actually performing, what happens?',
    options: [
      { label: 'We rely on tribal knowledge — the data lives in people\'s heads', score: 1 },
      { label: 'We have a CRM but it\'s messy — reporting requires manual work and spreadsheets', score: 2 },
      { label: 'We have basic dashboards but can\'t easily answer ad-hoc questions', score: 3 },
      { label: 'We have reliable reporting and can track leading indicators across the funnel', score: 4 },
      { label: 'We have a mature data stack with real-time visibility and predictive analytics', score: 5 },
    ],
  },
  {
    id: 'D3',
    dimension: 'Team Readiness',
    layer: 'foundational',
    question: 'How would you describe the revenue team a CRO would inherit?',
    options: [
      { label: 'Mostly founder-led sales with a few reps — no real structure', score: 1 },
      { label: 'A sales team exists but we lack specialized functions like RevOps, CS, or demand gen', score: 2 },
      { label: 'Functional teams exist but operate independently with minimal coordination', score: 3 },
      { label: 'Strong functional leads across sales, marketing, and CS who collaborate when pushed', score: 4 },
      { label: 'A mature, cross-functional revenue team that could execute a strategic vision', score: 5 },
    ],
  },
  {
    id: 'D4',
    dimension: 'Process Maturity',
    layer: 'operational',
    question: 'What would a CRO find when they look at how revenue gets generated?',
    options: [
      { label: 'No documented processes — everyone does things their own way', score: 1 },
      { label: 'Some processes exist but they\'re inconsistent or poorly followed', score: 2 },
      { label: 'Core processes are in place and mostly followed, but not optimized', score: 3 },
      { label: 'Processes are documented, followed, and regularly reviewed', score: 4 },
      { label: 'Mature, measurable processes with continuous improvement built in', score: 5 },
    ],
  },
  {
    id: 'D5',
    dimension: 'Tech Stack Readiness',
    layer: 'operational',
    question: 'What\'s the state of your revenue technology?',
    options: [
      { label: 'Minimal tools — maybe a CRM that nobody uses properly', score: 1 },
      { label: 'We have tools but they\'re not integrated or well-configured', score: 2 },
      { label: 'Basic stack in place with some integration, but gaps in key areas', score: 3 },
      { label: 'Integrated tech stack that supports the current revenue process well', score: 4 },
      { label: 'Modern, well-integrated stack with automation, analytics, and real visibility', score: 5 },
    ],
  },
  {
    id: 'D6',
    dimension: 'Cultural Readiness',
    layer: 'foundational',
    question: 'How does the organization respond to change in how revenue is generated?',
    options: [
      { label: 'Change is resisted — people protect their turf and their processes', score: 1 },
      { label: 'There\'s appetite for change in theory, but execution always stalls', score: 2 },
      { label: 'Some teams embrace change, others resist — it\'s inconsistent', score: 3 },
      { label: 'Genuine openness to new approaches, backed by executive sponsorship', score: 4 },
      { label: 'The culture actively embraces continuous improvement and cross-functional collaboration', score: 5 },
    ],
  },
  {
    id: 'D7',
    dimension: 'Financial Transparency',
    layer: 'operational',
    question: 'How visible are the financial metrics a CRO would need to make decisions?',
    options: [
      { label: 'Top-line revenue is known — unit economics and margins are unclear', score: 1 },
      { label: 'We see headline numbers but can\'t do cohort or segment-level analysis', score: 2 },
      { label: 'Functional metrics exist but aren\'t consolidated into a revenue-system view', score: 3 },
      { label: 'Most metrics a CRO needs are accessible, with some gaps', score: 4 },
      { label: 'Full transparency — CAC, LTV, margins, cohort analysis, all accessible', score: 5 },
    ],
  },
  {
    id: 'D8',
    dimension: 'Cross-Functional Governance',
    layer: 'operational',
    question: 'How do Sales, Marketing, and Customer Success work together today?',
    options: [
      { label: 'They don\'t — each function operates as its own island', score: 1 },
      { label: 'Occasional alignment meetings but no shared metrics or accountability', score: 2 },
      { label: 'Some shared goals and regular meetings, but each VP runs their own show', score: 3 },
      { label: 'Structured coordination with shared metrics and cross-functional cadence', score: 4 },
      { label: 'Truly integrated revenue operations with shared goals, processes, and governance', score: 5 },
    ],
  },
  {
    id: 'D9',
    dimension: 'Board Support',
    layer: 'strategic',
    question: 'What kind of runway would the board give a new CRO to show results?',
    options: [
      { label: 'We expect visible revenue impact within the first quarter or two', score: 1 },
      { label: 'About 6 months to show progress — patience is already thin', score: 2 },
      { label: 'A year, as long as leading indicators are moving in the right direction', score: 3 },
      { label: '12–18 months with board support for a real transformation timeline', score: 4 },
      { label: 'The board explicitly understands and has endorsed a multi-year transformation', score: 5 },
    ],
  },
  {
    id: 'D10',
    dimension: 'Market Position',
    layer: 'strategic',
    question: 'How would you describe your competitive position in your market?',
    options: [
      { label: 'Crowded, commoditized market — we compete mostly on price', score: 1 },
      { label: 'Some differentiation but we struggle to articulate it consistently', score: 2 },
      { label: 'Clear value proposition but facing increasing competitive pressure', score: 3 },
      { label: 'Strong market position with room to grow through expansion or adjacencies', score: 4 },
      { label: 'Category leader or clear niche leader with strong brand and differentiation', score: 5 },
    ],
  },
];

import type { ICP, ICPOption, Q2Fork, Revenue, Funding, Intent, Duration, PriorAction, OrgAwareness } from './types';

export const icpOptions: ICPOption[] = [
  { id: 'ceo', label: 'CEO / Founder', description: 'Leading the company, responsible for revenue leadership decisions' },
  { id: 'cro', label: 'CRO / In-Seat', description: 'Currently in a Chief Revenue Officer role' },
  { id: 'revenue-leader', label: 'Revenue Leader', description: 'VP Sales, VP Revenue, or similar revenue leadership role' },
  { id: 'aspiring-cro', label: 'Aspiring CRO', description: 'Working toward a CRO role' },
  { id: 'cro-transition', label: 'CRO in Transition', description: 'Recently left a CRO role' },
  { id: 'pe-operator', label: 'PE Operating Partner', description: 'Managing revenue leadership across portfolio companies' },
];

export const q2Forks: Record<ICP, Q2Fork> = {
  'ceo': {
    question: "What's the biggest revenue leadership challenge you're facing right now?",
    options: [
      { label: "I'm looking to hire a CRO and want to get it right", archetype: 'hunt-for-hero' },
      { label: "I hired a CRO but something's off — I'm not sure we got the right person", archetype: 'miscast-role' },
      { label: "My CRO is talented but they're not delivering what I expected", archetype: 'panda-problem' },
      { label: "We keep losing revenue leaders — I can't figure out why it never sticks", archetype: 'revolving-door' },
      { label: "Revenue is coming in but I don't trust that it's repeatable", archetype: 'forecast-theater' },
    ],
  },
  'cro': {
    question: "What frustrates you most about your role right now?",
    options: [
      { label: "They call me a CRO but all I really do is run sales", archetype: 'miscast-role' },
      { label: "I know what needs to happen but I can't get the authority or resources to do it", archetype: 'panda-problem' },
      { label: "I spend all my time on this quarter instead of building for next year", archetype: 'forecast-theater' },
      { label: "Nothing moves unless I'm in the room — I am the system", archetype: 'hero-trap' },
    ],
  },
  'revenue-leader': {
    question: "Where are you feeling the most friction right now?",
    options: [
      { label: "We're hitting numbers but it's all muscle, no machine", archetype: 'forecast-theater' },
      { label: "I'm doing the work of a CRO without the title or the authority", archetype: 'miscast-role' },
      { label: "I know I need to think and operate differently but I haven't figured out how", archetype: 'leadership-gap' },
    ],
  },
  'aspiring-cro': {
    question: "What's the biggest thing on your mind about making the move to CRO?",
    options: [
      { label: "I want the seat but I'm honestly not sure I'm ready", archetype: 'leadership-gap' },
      { label: "I have the CRO title but the job is really VP Sales — and I know it", archetype: 'title-trap' },
      { label: "I don't know what kind of CRO role is the right fit for me", archetype: 'miscast-role' },
      { label: "I'm actively interviewing for CRO roles right now", archetype: 'the-interview' },
    ],
  },
  'cro-transition': {
    question: "Looking back at your last role, what feels most true?",
    options: [
      { label: "I was set up to fail — the environment made it impossible", archetype: 'panda-problem' },
      { label: "The role I walked into wasn't what I was sold", archetype: 'miscast-role' },
      { label: "I burned out — everything ran through me and I hit a wall", archetype: 'hero-trap' },
      { label: "Honestly, I'm not sure what went wrong — I just need to regroup", archetype: 'the-reset' },
    ],
  },
  'pe-operator': {
    question: "What revenue leadership pattern do you keep seeing across your portfolio?",
    options: [
      { label: "We install CROs and they keep churning — across multiple companies", archetype: 'revolving-door' },
      { label: "Our portfolio companies aren't set up to support a revenue leader", archetype: 'panda-problem' },
      { label: "The revenue numbers look fine but there's no real system underneath", archetype: 'forecast-theater' },
      { label: "We keep forcing the CRO hire before companies are ready for one", archetype: 'leadership-gap' },
    ],
  },
};

export const revenueOptions: { id: Revenue; label: string }[] = [
  { id: 'under-5m', label: 'Under $5M' },
  { id: '5-20m', label: '$5M – $20M' },
  { id: '20-50m', label: '$20M – $50M' },
  { id: '50-100m', label: '$50M – $100M' },
  { id: '100m-plus', label: '$100M+' },
];

export const fundingOptions: { id: Funding; label: string }[] = [
  { id: 'bootstrapped', label: 'Bootstrapped / Self-funded' },
  { id: 'pe-backed', label: 'PE-backed' },
  { id: 'vc-backed', label: 'VC-backed' },
  { id: 'public', label: 'Public' },
];

export const intentOptions: { id: Intent; label: string; description: string }[] = [
  { id: 'research', label: 'Just trying to understand the problem better', description: '' },
  { id: 'warming', label: 'I know this needs to change — figuring out how', description: '' },
  { id: 'in-market', label: 'Actively looking for help solving this', description: '' },
  { id: 'hot', label: "This is urgent — we need to move on it now", description: '' },
];

export const durationOptions: { id: Duration; label: string }[] = [
  { id: 'new', label: "This is new — it's just becoming clear to me" },
  { id: 'months-6-12', label: "It's been building for 6–12 months" },
  { id: 'over-a-year', label: "This has been going on for over a year" },
  { id: 'recurring', label: "This is a recurring cycle — it's happened before" },
];

export const priorActionOptions: { id: PriorAction; label: string }[] = [
  { id: 'nothing', label: "Nothing yet — I'm still figuring out what's wrong" },
  { id: 'conversations', label: "I've had conversations, but nothing's really changed" },
  { id: 'made-changes', label: "I've made changes, but the results haven't followed" },
  { id: 'outside-help', label: "I've brought in outside help before" },
];

export const orgAwarenessOptions: { id: OrgAwareness; label: string }[] = [
  { id: 'just-me', label: "Just me — I don't think anyone else sees it" },
  { id: 'team-not-leadership', label: "My team sees it, but leadership doesn't" },
  { id: 'leadership-disagrees', label: "Leadership knows, but we disagree on the solution" },
  { id: 'everyone-knows', label: "Everyone knows — we just can't seem to fix it" },
];

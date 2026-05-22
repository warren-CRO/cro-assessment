export type ICP = 'ceo' | 'cro' | 'revenue-leader' | 'aspiring-cro' | 'cro-transition' | 'pe-operator';

export type Archetype =
  | 'hunt-for-hero'
  | 'miscast-role'
  | 'panda-problem'
  | 'revolving-door'
  | 'forecast-theater'
  | 'leadership-gap'
  | 'hero-trap'
  | 'title-trap'
  | 'the-interview'
  | 'the-reset';

export type Intent = 'research' | 'warming' | 'in-market' | 'hot';
export type Revenue = 'under-5m' | '5-20m' | '20-50m' | '50-100m' | '100m-plus';
export type Funding = 'bootstrapped' | 'pe-backed' | 'vc-backed' | 'public';

export type Duration = 'new' | 'months-6-12' | 'over-a-year' | 'recurring';
export type PriorAction = 'nothing' | 'conversations' | 'made-changes' | 'outside-help';
export type OrgAwareness = 'just-me' | 'team-not-leadership' | 'leadership-disagrees' | 'everyone-knows';

export interface ICPOption {
  id: ICP;
  label: string;
  description: string;
}

export interface Q2Option {
  label: string;
  archetype: Archetype;
}

export interface Q2Fork {
  question: string;
  options: Q2Option[];
}

export interface AssessmentResult {
  icp: ICP;
  archetype: Archetype;
  revenue: Revenue;
  funding: Funding;
  intent: Intent;
  duration: Duration;
  priorAction: PriorAction;
  orgAwareness: OrgAwareness;
}

export interface ArchetypeContent {
  name: string;
  subtitle: string;
  description: string;
  commentary: string;
  whyStuck: string;
  stopDoing: string[];
  startDoing: string[];
  insights: string[];
  offering: string;
  cta: string;
  readinessSeed?: string;
}

export interface DiagnosticModifiers {
  duration: Duration;
  priorAction: PriorAction;
  orgAwareness: OrgAwareness;
}

export interface ModifiedResult extends ArchetypeContent {
  shiftedFrom?: Archetype;
  secondaryArchetype?: string;
  severityLevel: 'early' | 'mid' | 'entrenched';
  caveat?: string;
}

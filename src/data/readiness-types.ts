export type ReadinessRole = 'ceo' | 'board' | 'pe-operator' | 'hr-talent' | 'search-firm';
export type ReadinessRevenue = '1-5m' | '5-10m' | '10-25m' | '25-50m' | '50-100m' | '200m-plus';
export type ReadinessFunding = 'bootstrapped' | 'pe-backed' | 'vc-backed' | 'public';
export type HireReason = 'first-cro' | 'replacing' | 'restructuring' | 'exploring';

export type DimensionId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'D10';

export type ReadinessBand = 'critical' | 'limited' | 'moderate' | 'strong' | 'exceptional';

export type ReadinessLayer = 'strategic' | 'operational' | 'foundational';

export interface DimensionQuestion {
  id: DimensionId;
  dimension: string;
  layer: ReadinessLayer;
  question: string;
  options: { label: string; score: 1 | 2 | 3 | 4 | 5 }[];
}

export interface ContextAnswers {
  role: ReadinessRole;
  revenue: ReadinessRevenue;
  funding: ReadinessFunding;
  hireReason: HireReason;
}

export interface DimensionScore {
  id: DimensionId;
  dimension: string;
  layer: ReadinessLayer;
  score: number;
  selectedLabel: string;
}

export interface ReadinessResult {
  context: ContextAnswers;
  scores: DimensionScore[];
  totalScore: number;
  band: ReadinessBand;
  overrideApplied: boolean;
  overrideReason?: string;
}

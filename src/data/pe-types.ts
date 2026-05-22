export type CompanyStage = 'pre-revenue' | 'early' | 'growth' | 'scale' | 'mature';
export type GTMMotion = 'product-led' | 'sales-led' | 'hybrid' | 'channel' | 'enterprise';
export type CROStatus = 'no-cro' | 'cro-in-place' | 'cro-candidate' | 'recently-departed';
export type CROType = 'builder' | 'optimizer' | 'fixer' | 'operator' | 'unknown';
export type ReportingLine = 'ceo' | 'coo' | 'board' | 'pe-partner' | 'founder';
export type Mandate = 'transform' | 'execute' | 'both' | 'unclear';
export type FounderRole = 'active-ceo' | 'board-only' | 'departed' | 'active-non-ceo';
export type FounderGTMControl = 'full' | 'partial' | 'none';
export type DecisionRights = 'formal-documented' | 'informal-verbal' | 'not-defined';
export type CrossFuncStructure = 'all-report-cro' | 'split-reporting' | 'independent-silos' | 'dotted-line';
export type ExistingVPTenure = 'predate-cro' | 'installed-by-cro' | 'mix' | 'no-vps';
export type HoldPeriod = 'under-3' | '3-5' | '5-7' | 'over-7';
export type GrowthExpectation = 'under-15' | '15-30' | '30-50' | 'over-50';
export type TransformationTimeline = 'under-6mo' | '6-12mo' | '12-18mo' | 'no-timeline';
export type SuccessMetrics = 'quarterly-bookings' | 'annual-growth' | 'transformation-milestones' | 'mix';
export type TransformationBudget = 'dedicated' | 'from-existing' | 'none-discussed';
export type PreviousCROHistory = 'none' | 'one-departed' | 'two-plus-departed' | 'successful-tenure';
export type RespondentType = 'operating-partner' | 'talent-partner' | 'deal-team' | 'portco-cro' | 'ceo';
export type TeamSize = 'under-10' | '10-25' | '25-50' | '50-100' | 'over-100';

export type FailurePattern =
  | 'role-definition-ambiguity'
  | 'ceo-expectation-misalignment'
  | 'founder-control-dynamic'
  | 'cross-functional-warfare'
  | 'pe-pressure-dynamic'
  | 'stage-mismatch';

export type CompoundPattern =
  | 'hire-and-handcuff'
  | 'thesis-trap'
  | 'political-minefield';

export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';

export interface PEAnswers {
  respondentType?: RespondentType;
  companyStage?: CompanyStage;
  gtmMotion?: GTMMotion;
  teamSize?: TeamSize;
  croStatus?: CROStatus;
  croType?: CROType;
  croReportingLine?: ReportingLine;
  mandate?: Mandate;
  founderRole?: FounderRole;
  founderGTMControl?: FounderGTMControl;
  decisionRights?: DecisionRights;
  crossFuncStructure?: CrossFuncStructure;
  existingVPTenure?: ExistingVPTenure;
  holdPeriod?: HoldPeriod;
  growthExpectation?: GrowthExpectation;
  transformationTimeline?: TransformationTimeline;
  successMetrics?: SuccessMetrics;
  transformationBudget?: TransformationBudget;
  previousCROHistory?: PreviousCROHistory;
}

export interface DetectedPattern {
  pattern: FailurePattern;
  confidence: Confidence;
  triggerCount: number;
  totalPossible: number;
}

export interface DetectedCompound {
  compound: CompoundPattern;
  patterns: [FailurePattern, FailurePattern];
}

export interface DiagnosticResult {
  patterns: DetectedPattern[];
  compounds: DetectedCompound[];
  answers: PEAnswers;
}

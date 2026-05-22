import type {
  PEAnswers, DetectedPattern, DetectedCompound, FailurePattern, Confidence,
} from './pe-types';

function toConfidence(count: number, thresholds: { high: number; medium: number }): Confidence {
  if (count >= thresholds.high) return 'HIGH';
  if (count >= thresholds.medium) return 'MEDIUM';
  return 'LOW';
}

function detectRoleDefinitionAmbiguity(a: PEAnswers): DetectedPattern | null {
  const total = 4;
  let count = 0;

  if (a.croReportingLine === 'coo') count++;
  if (a.decisionRights === 'not-defined') count++;
  if (a.crossFuncStructure === 'split-reporting' || a.crossFuncStructure === 'dotted-line') count++;
  if (a.mandate === 'both' || a.mandate === 'unclear') count++;

  if (count < 2) return null;
  return {
    pattern: 'role-definition-ambiguity',
    confidence: toConfidence(count, { high: 3, medium: 2 }),
    triggerCount: count,
    totalPossible: total,
  };
}

function detectCEOExpectationMisalignment(a: PEAnswers): DetectedPattern | null {
  const total = 4;
  let count = 0;

  if (a.mandate === 'transform' && a.successMetrics === 'quarterly-bookings') count++;
  if (a.transformationTimeline === 'no-timeline') count++;
  if ((a.growthExpectation === 'over-50' || a.growthExpectation === '30-50') && a.mandate === 'transform') count++;
  if (a.transformationBudget === 'from-existing' || a.transformationBudget === 'none-discussed') count++;

  if (count < 2) return null;
  return {
    pattern: 'ceo-expectation-misalignment',
    confidence: toConfidence(count, { high: 3, medium: 2 }),
    triggerCount: count,
    totalPossible: total,
  };
}

function detectFounderControlDynamic(a: PEAnswers): DetectedPattern | null {
  const total = 4;
  let count = 0;

  if (a.founderRole === 'active-ceo') count++;
  if (a.founderGTMControl === 'full' || a.founderGTMControl === 'partial') count++;
  if (a.croReportingLine === 'founder') count++;
  if (a.existingVPTenure === 'predate-cro') count++;

  if (count < 2) return null;
  return {
    pattern: 'founder-control-dynamic',
    confidence: toConfidence(count, { high: 3, medium: 2 }),
    triggerCount: count,
    totalPossible: total,
  };
}

function detectCrossFunctionalWarfare(a: PEAnswers): DetectedPattern | null {
  const total = 4;
  let count = 0;

  if (a.existingVPTenure === 'predate-cro') count++;
  if (a.crossFuncStructure === 'split-reporting' || a.crossFuncStructure === 'independent-silos') count++;
  if (a.decisionRights === 'informal-verbal' || a.decisionRights === 'not-defined') count++;
  if (a.mandate === 'unclear' || a.mandate === 'both') count++;

  if (count < 2) return null;
  return {
    pattern: 'cross-functional-warfare',
    confidence: toConfidence(count, { high: 4, medium: 2 }),
    triggerCount: count,
    totalPossible: total,
  };
}

function detectPEPressureDynamic(a: PEAnswers): DetectedPattern | null {
  const total = 5;
  let count = 0;

  if (a.growthExpectation === '30-50' || a.growthExpectation === 'over-50') count++;
  if (a.holdPeriod === 'under-3' || a.holdPeriod === '3-5') count++;
  if (a.transformationTimeline === 'no-timeline') count++;
  if (a.mandate === 'execute' && (a.growthExpectation === '30-50' || a.growthExpectation === 'over-50')) count++;
  if (a.transformationBudget === 'none-discussed') count++;

  if (count < 2) return null;
  return {
    pattern: 'pe-pressure-dynamic',
    confidence: toConfidence(count, { high: 4, medium: 2 }),
    triggerCount: count,
    totalPossible: total,
  };
}

function detectStageMismatch(a: PEAnswers): DetectedPattern | null {
  const total = 4;
  let count = 0;

  const earlyStage = a.companyStage === 'pre-revenue' || a.companyStage === 'early' || a.companyStage === 'growth';
  const lateStage = a.companyStage === 'mature' || a.companyStage === 'scale';

  if (earlyStage && (a.croType === 'optimizer' || a.croType === 'operator')) count++;
  if (lateStage && a.croType === 'builder') count++;
  if (a.mandate === 'transform' && (a.croType === 'operator' || a.croType === 'optimizer')) count++;
  if (a.previousCROHistory === 'two-plus-departed') count++;

  if (count < 2) return null;
  return {
    pattern: 'stage-mismatch',
    confidence: toConfidence(count, { high: 3, medium: 2 }),
    triggerCount: count,
    totalPossible: total,
  };
}

const severityOrder: Record<FailurePattern, number> = {
  'pe-pressure-dynamic': 0,
  'ceo-expectation-misalignment': 1,
  'founder-control-dynamic': 2,
  'role-definition-ambiguity': 3,
  'cross-functional-warfare': 4,
  'stage-mismatch': 5,
};

function confidenceRank(c: Confidence): number {
  if (c === 'HIGH') return 0;
  if (c === 'MEDIUM') return 1;
  return 2;
}

export function detectPatterns(answers: PEAnswers): { patterns: DetectedPattern[]; compounds: DetectedCompound[] } {
  const detectors = [
    detectRoleDefinitionAmbiguity,
    detectCEOExpectationMisalignment,
    detectFounderControlDynamic,
    detectCrossFunctionalWarfare,
    detectPEPressureDynamic,
    detectStageMismatch,
  ];

  const patterns = detectors
    .map(fn => fn(answers))
    .filter((p): p is DetectedPattern => p !== null)
    .sort((a, b) => {
      const confDiff = confidenceRank(a.confidence) - confidenceRank(b.confidence);
      if (confDiff !== 0) return confDiff;
      return severityOrder[a.pattern] - severityOrder[b.pattern];
    });

  const patternSet = new Set(patterns.map(p => p.pattern));
  const compounds: DetectedCompound[] = [];

  if (patternSet.has('founder-control-dynamic') && patternSet.has('stage-mismatch')) {
    compounds.push({ compound: 'hire-and-handcuff', patterns: ['founder-control-dynamic', 'stage-mismatch'] });
  }
  if (patternSet.has('pe-pressure-dynamic') && patternSet.has('ceo-expectation-misalignment')) {
    compounds.push({ compound: 'thesis-trap', patterns: ['pe-pressure-dynamic', 'ceo-expectation-misalignment'] });
  }
  if (patternSet.has('cross-functional-warfare') && patternSet.has('role-definition-ambiguity')) {
    compounds.push({ compound: 'political-minefield', patterns: ['cross-functional-warfare', 'role-definition-ambiguity'] });
  }

  return { patterns, compounds };
}

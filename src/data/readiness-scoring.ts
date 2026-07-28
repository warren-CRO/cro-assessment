import type {
  DimensionScore,
  ReadinessBand,
  ReadinessResult,
  ReadinessLayer,
  ReadinessRevenue,
  ContextAnswers,
  DimensionId,
} from './readiness-types';

export function computeReadinessResult(
  context: ContextAnswers,
  scores: DimensionScore[],
): ReadinessResult {
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);

  const d1 = scores.find(s => s.id === 'D1');
  const d9 = scores.find(s => s.id === 'D9');

  let overrideApplied = false;
  let overrideReason: string | undefined;
  let band: ReadinessBand;

  if ((d1 && d1.score <= 2) || (d9 && d9.score <= 2)) {
    overrideApplied = true;
    band = 'critical';
    if (d1 && d1.score <= 2 && d9 && d9.score <= 2) {
      overrideReason = 'Both CEO Alignment and Board Support scored critically low. No aggregate score compensates for a CEO who does not want a partner or a board that will not give runway.';
    } else if (d1 && d1.score <= 2) {
      overrideReason = 'CEO Alignment scored critically low. Without genuine CEO partnership intent, no CRO can succeed regardless of other conditions.';
    } else {
      overrideReason = 'Board Support scored critically low. Without board-endorsed runway, the CRO will be evaluated on timelines that don\'t match the transformation required.';
    }
  } else {
    band = scoreToBand(totalScore);
  }

  return { context, scores, totalScore, band, overrideApplied, overrideReason };
}

function scoreToBand(total: number): ReadinessBand {
  if (total <= 19) return 'critical';
  if (total <= 29) return 'limited';
  if (total <= 39) return 'moderate';
  if (total <= 45) return 'strong';
  return 'exceptional';
}

export const bandConfig: Record<ReadinessBand, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  headline: string;
  description: string;
  croScope: string;
}> = {
  critical: {
    label: 'Critical',
    color: '#EF476F',
    bgColor: '#FEF2F5',
    borderColor: '#FECDD6',
    headline: 'Your company is not ready for a CRO.',
    description: 'The structural foundations aren\'t in place. Hiring a CRO now would set an expensive clock on a predictable failure. The good news: these gaps are fixable — but they need to be fixed before the hire, not after.',
    croScope: 'VP Sales or fractional revenue leadership until readiness improves',
  },
  limited: {
    label: 'Limited',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    headline: 'Significant gaps exist. A CRO-Lite scope is realistic.',
    description: 'You could hire a revenue leader, but the full CRO mandate would outrun your current infrastructure. A narrower scope — focused on the functions and authority you can actually support — is the honest path.',
    croScope: 'CRO-Lite: narrowed scope aligned to current infrastructure',
  },
  moderate: {
    label: 'Moderate',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    headline: 'You\'re getting closer. Targeted investment closes the remaining gaps.',
    description: 'The foundation is forming. A CRO with Standard scope could succeed here — but specific dimensions need attention before or during the first 90 days. The gaps are manageable if you name them and commit to closing them.',
    croScope: 'CRO-Standard: defined scope with specific infrastructure investments',
  },
  strong: {
    label: 'Strong',
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    headline: 'Your company can support a full-scope CRO.',
    description: 'The conditions for success are in place. The right CRO, matched to your stage and type, has a real chance here. Focus on the hire quality and CEO-CRO alignment.',
    croScope: 'CRO-Full: end-to-end revenue leadership with real authority',
  },
  exceptional: {
    label: 'Exceptional',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#6EE7B7',
    headline: 'You\'re in the top tier of CRO-readiness.',
    description: 'The infrastructure, culture, and leadership alignment are mature. A Strategic CRO — board-level, architecturally focused — could thrive here. This is rare. Don\'t waste it on the wrong hire.',
    croScope: 'CRO-Strategic: board-level revenue architect and organizational designer',
  },
};

export const layerConfig: Record<ReadinessLayer, {
  label: string;
  description: string;
  dimensions: DimensionId[];
}> = {
  foundational: {
    label: 'Foundation',
    description: 'Must be in place first — skip this layer and everything above is unstable',
    dimensions: ['D2', 'D3', 'D6'],
  },
  operational: {
    label: 'Operations',
    description: 'The execution layer — processes, technology, governance, and financial visibility',
    dimensions: ['D4', 'D5', 'D7', 'D8'],
  },
  strategic: {
    label: 'Strategic',
    description: 'The ceiling — leadership alignment, board support, and market context',
    dimensions: ['D1', 'D9', 'D10'],
  },
};

export function getDimensionStatus(score: number): 'red' | 'yellow' | 'green' {
  if (score <= 2) return 'red';
  if (score <= 3) return 'yellow';
  return 'green';
}

export const dimensionStatusConfig = {
  red: { label: 'Gap', color: '#EF476F', bgColor: '#FEF2F5' },
  yellow: { label: 'Developing', color: '#F59E0B', bgColor: '#FFFBEB' },
  green: { label: 'Ready', color: '#10B981', bgColor: '#ECFDF5' },
};

export function getCROType(context: ContextAnswers): { type: string; description: string } {
  if (context.hireReason === 'replacing') {
    return { type: 'Replacement CRO', description: 'Successor hire — focus on diagnosing why the last tenure ended and what structural changes are needed' };
  }
  if (context.hireReason === 'restructuring') {
    return { type: 'Turnaround CRO', description: 'Restructuring requires someone who can redesign the revenue system while keeping current revenue flowing' };
  }

  const revenueToStage: Record<ReadinessRevenue, { type: string; description: string }> = {
    '1-5m': { type: 'Builder / Starter CRO', description: 'Creating the revenue system from scratch — needs a hands-on operator who can build while doing' },
    '5-10m': { type: 'Builder / Starter CRO', description: 'Creating the revenue system from scratch — needs a hands-on operator who can build while doing' },
    '10-25m': { type: 'Growth CRO', description: 'Taking a working foundation and building the machine — systematizing what the founder started' },
    '25-50m': { type: 'Growth CRO', description: 'Taking a working foundation and building the machine — systematizing what the founder started' },
    '50-100m': { type: 'Scaling CRO', description: 'Approaching the $100M Competency Cliff — needs someone who\'s navigated multi-motion complexity' },
    '200m-plus': { type: 'Strategic CRO', description: 'Board-level revenue architect — portfolio management, M&A integration, enterprise transformation' },
  };

  return revenueToStage[context.revenue];
}

export function getGapRecommendations(scores: DimensionScore[]): {
  dimension: string;
  id: DimensionId;
  score: number;
  recommendation: string;
  tccOffering: string;
}[] {
  const recommendations: Record<DimensionId, { rec: string; offering: string }> = {
    D1: { rec: 'The CEO needs to genuinely commit to a revenue partner — not a sales manager with a bigger title. A CEO Alignment session can surface and resolve the gap between stated intent and operational reality.', offering: 'CEO Advisory' },
    D2: { rec: 'A CRO without data is flying blind. Invest in CRM hygiene, basic reporting, and leading indicators before the hire — or budget for it as a Day 1 CRO priority with pre-approved resources.', offering: 'Revenue Architecture Diagnostic' },
    D3: { rec: 'The team needs at minimum a RevOps function and clear functional leadership before a CRO can operate. Consider interim leadership or fractional support to build the bench.', offering: 'CRO Readiness Program' },
    D4: { rec: 'Process gaps mean the CRO will spend their first year building basics instead of transforming. Documenting and stabilizing core processes before the hire dramatically improves CRO success rates.', offering: 'Revenue Architecture Diagnostic' },
    D5: { rec: 'Technology gaps create friction the CRO will fight daily. Audit the stack, fix critical integrations, and budget for the tools the CRO will need on Day 1.', offering: 'Revenue Architecture Diagnostic' },
    D6: { rec: 'Cultural resistance will undermine even the best CRO. The CEO must visibly sponsor the CRO\'s authority and model openness to change before and after the hire.', offering: 'CEO Advisory' },
    D7: { rec: 'A CRO needs to see the full financial picture to make strategic decisions. Invest in financial reporting that connects revenue activity to business outcomes.', offering: 'Revenue Architecture Diagnostic' },
    D8: { rec: 'Without cross-functional governance, the CRO will spend their energy mediating turf wars instead of building systems. Establish shared metrics and regular cross-functional cadence before the hire.', offering: 'CRO Readiness Program' },
    D9: { rec: 'The board needs to explicitly endorse a transformation timeline. A 12-18 month runway isn\'t generous — it\'s the minimum for real CRO impact. Get this in writing before extending an offer.', offering: 'Board Advisory' },
    D10: { rec: 'Market headwinds compound every other challenge. Be honest about whether the growth thesis is achievable in the current market before loading a CRO with the expectation.', offering: 'Advisory' },
  };

  return scores
    .filter(s => s.score <= 3)
    .sort((a, b) => a.score - b.score)
    .map(s => ({
      dimension: s.dimension,
      id: s.id,
      score: s.score,
      recommendation: recommendations[s.id].rec,
      tccOffering: recommendations[s.id].offering,
    }));
}

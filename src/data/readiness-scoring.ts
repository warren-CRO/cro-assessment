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
  return 'strong';
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
    headline: 'The infrastructure isn\'t there yet. Hiring now means your CRO builds plumbing instead of strategy.',
    description: 'You could hire a revenue leader, but the full CRO mandate would outrun what you\'ve built so far. Companies at this stage get the most value from scoping the role tightly and investing in the gaps before handing someone the keys.',
    croScope: 'CRO-Lite: narrowed scope aligned to current infrastructure',
  },
  moderate: {
    label: 'Moderate',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    headline: 'You\'ve built the foundation. Now the CRO decision becomes an architecture problem.',
    description: 'The basics are in place — but "ready enough to hire" and "ready to get the hire right" are two different things. The dimensions you\'ve scored well on buy you optionality. The ones you haven\'t determine what kind of CRO can actually succeed here, and what scope they should walk into.',
    croScope: 'CRO-Standard: defined scope with targeted infrastructure investments',
  },
  strong: {
    label: 'Advanced',
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    headline: 'Your organization is well-positioned. Now the hard work begins.',
    description: 'Most companies never build this level of readiness — you have. That\'s a real achievement. But building the infrastructure and successfully integrating a CRO into it are two very different challenges. The companies that get this far and still fail do so because they treat the hire like the finish line. It\'s the starting line. Getting the match right — stage, operating style, decision rights, the CEO-CRO dynamic — is where the real work happens.',
    croScope: 'Full-scope CRO with board-level authority — the integration is what matters now',
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

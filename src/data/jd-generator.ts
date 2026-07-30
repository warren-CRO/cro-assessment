import type {
  ContextAnswers,
  DimensionScore,
  ReadinessBand,
  ReadinessRevenue,
  ReadinessFunding,
} from './readiness-types'
import { getCROType, getGapRecommendations, getDimensionStatus } from './readiness-scoring'

export interface GeneratedJD {
  title: string
  croType: string
  subtitle: string
  companyContext: string
  roleSummary: string
  scopeAreas: string[]
  responsibilities: string[]
  firstNinetyDays: { priority: string; detail: string }[]
  qualificationsRequired: string[]
  qualificationsPreferred: string[]
  successMetrics: { timeframe: string; metrics: string[] }[]
  notThisRole: string[]
  compensationRange: string
  interviewFocus: { area: string; why: string }[]
  readinessWarnings: string[]
}

const revenueLabels: Record<ReadinessRevenue, string> = {
  '1-5m': '$1M–$5M',
  '5-10m': '$5M–$10M',
  '10-25m': '$10M–$25M',
  '25-50m': '$25M–$50M',
  '50-100m': '$50M–$100M',
  '200m-plus': '$200M+',
}

const fundingLabels: Record<ReadinessFunding, string> = {
  'bootstrapped': 'bootstrapped',
  'pe-backed': 'PE-backed',
  'vc-backed': 'VC-backed',
  'public': 'publicly traded',
}

const compRanges: Record<ReadinessRevenue, string> = {
  '1-5m': '$180K–$280K total compensation (base + variable + equity)',
  '5-10m': '$220K–$350K total compensation (base + variable + equity)',
  '10-25m': '$280K–$420K total compensation (base + variable + equity)',
  '25-50m': '$350K–$500K total compensation (base + variable + equity)',
  '50-100m': '$400K–$600K total compensation (base + variable + equity)',
  '200m-plus': '$500K–$800K+ total compensation (base + variable + equity)',
}

export function generateJD(
  context: ContextAnswers,
  scores: DimensionScore[],
  band: ReadinessBand,
  totalScore: number,
): GeneratedJD {
  const croType = getCROType(context)
  const gaps = getGapRecommendations(scores)
  const redGaps = scores.filter(s => getDimensionStatus(s.score) === 'red')
  const yellowGaps = scores.filter(s => getDimensionStatus(s.score) === 'yellow')
  const revLabel = revenueLabels[context.revenue]
  const fundLabel = fundingLabels[context.funding]
  const isPE = context.funding === 'pe-backed'
  const isEarlyStage = context.revenue === '1-5m' || context.revenue === '5-10m'
  const isMidMarket = context.revenue === '10-25m' || context.revenue === '25-50m'
  const isEnterprise = context.revenue === '50-100m' || context.revenue === '200m-plus'

  const title = `Chief Revenue Officer — ${croType.type}`

  const subtitle = getSubtitle(croType.type, band, isPE)

  const companyContext = buildCompanyContext(revLabel, fundLabel, band, isPE, isEarlyStage, isMidMarket)

  const roleSummary = buildRoleSummary(croType.type, band, context, isPE)

  const scopeAreas = buildScope(croType.type, band)

  const responsibilities = buildResponsibilities(croType.type, band, gaps, isPE, context)

  const firstNinetyDays = buildFirstNinetyDays(croType.type, gaps, redGaps, band, isPE)

  const qualificationsRequired = buildRequiredQualifications(croType.type, context.revenue, isPE, context.funding)

  const qualificationsPreferred = buildPreferredQualifications(croType.type, context.revenue, isPE, gaps)

  const successMetrics = buildSuccessMetrics(croType.type, band, gaps, isPE)

  const notThisRole = buildNotThisRole(croType.type, band, context)

  const interviewFocus = buildInterviewFocus(gaps, redGaps, yellowGaps, croType.type, context)

  const readinessWarnings = buildReadinessWarnings(band, redGaps, totalScore, context)

  return {
    title,
    croType: croType.type,
    subtitle,
    companyContext,
    roleSummary,
    scopeAreas,
    responsibilities,
    firstNinetyDays,
    qualificationsRequired,
    qualificationsPreferred,
    successMetrics,
    notThisRole,
    compensationRange: compRanges[context.revenue],
    interviewFocus,
    readinessWarnings,
  }
}

function getSubtitle(type: string, band: ReadinessBand, isPE: boolean): string {
  if (type === 'Turnaround CRO') return 'Restructure the revenue engine while keeping current revenue flowing.'
  if (type === 'Replacement CRO') return 'Diagnose what failed last time and build the system that prevents it from happening again.'

  if (isPE) {
    if (band === 'strong') return 'Drive the growth thesis with full operational authority and board alignment.'
    return 'Accelerate portfolio company revenue growth within a PE-defined timeline and operating thesis.'
  }

  switch (type) {
    case 'Builder / Starter CRO': return 'Build the revenue system from scratch — this is a hands-on operator role, not a strategy seat.'
    case 'Growth CRO': return 'Systematize what the founder started and build a repeatable, scalable revenue machine.'
    case 'Scaling CRO': return 'Navigate multi-motion complexity and lead the organization through the $100M competency cliff.'
    case 'Strategic CRO': return 'Board-level revenue architect — portfolio management, market strategy, and enterprise transformation.'
    default: return 'Lead end-to-end revenue strategy and execution.'
  }
}

function buildCompanyContext(revLabel: string, fundLabel: string, band: ReadinessBand, isPE: boolean, isEarlyStage: boolean, isMidMarket: boolean): string {
  const baseContext = `This position is for a ${fundLabel} B2B company at ${revLabel} in annual revenue.`

  if (isPE) {
    return `${baseContext} The company operates within a PE portfolio with defined growth expectations and an operating thesis that the CRO will be expected to execute against. The board and operating partners are engaged and have specific revenue milestones tied to the investment timeline.`
  }

  if (isEarlyStage) {
    return `${baseContext} The company is in a growth stage where the revenue function is transitioning from founder-led sales to a structured, repeatable system. The CRO will be building infrastructure, not inheriting it.`
  }

  if (isMidMarket) {
    return `${baseContext} The company has proven product-market fit and an established customer base. The revenue function needs systematization, cross-functional integration, and the operational discipline to scale predictably.`
  }

  return `${baseContext} At this scale, the company requires a CRO who can architect multi-motion revenue strategies, manage organizational complexity, and operate at a board-governance level.`
}

function buildRoleSummary(type: string, band: ReadinessBand, context: ContextAnswers, isPE: boolean): string {
  const bandContext = band === 'critical' || band === 'limited'
    ? ' Note: this organization has identified readiness gaps that should be addressed in parallel with or prior to this hire. The role scope below reflects those conditions.'
    : ''

  if (type === 'Builder / Starter CRO') {
    return `This is a hands-on revenue leadership role. The CRO will build the revenue system — processes, team structure, metrics, technology, and go-to-market strategy — largely from scratch. This is not a strategy-only seat. The right candidate is an operator who can sell, hire, build process, and set up the infrastructure that doesn't exist yet. They should expect to carry a bag early while building the team underneath them.${bandContext}`
  }

  if (type === 'Growth CRO') {
    return `The CRO will take what the founder built and systematize it into a repeatable, scalable revenue engine. This means codifying tribal knowledge into process, building cross-functional alignment between Sales, Marketing, and Customer Success, and establishing the metrics and governance that allow the company to grow predictably. The right candidate has done this before — they've walked into a company that grew on instinct and built the machine that makes growth intentional.${bandContext}`
  }

  if (type === 'Scaling CRO') {
    return `This is a multi-motion revenue leadership role. The CRO will manage the complexity that comes with scale — multiple product lines, market segments, revenue motions, and organizational layers. The $100M competency cliff is real: the skills that got the company here are not the skills that get it there. The right candidate has navigated this transition before and can architect the organizational and operational changes required.${bandContext}`
  }

  if (type === 'Strategic CRO') {
    return `This is a board-level revenue architecture role. The CRO will operate as the senior executive accountable for end-to-end revenue strategy, market positioning, M&A revenue integration, and enterprise transformation. The right candidate brings both strategic vision and the executive presence to lead at the highest organizational level.${bandContext}`
  }

  if (type === 'Turnaround CRO') {
    return `The company is restructuring its revenue leadership. The CRO will need to diagnose what's broken, redesign the revenue system, and execute the turnaround — all while keeping current revenue flowing. This requires a candidate who can simultaneously run the existing business and rebuild it. Turnaround CROs must be comfortable making difficult personnel and structural decisions quickly.${bandContext}`
  }

  if (type === 'Replacement CRO') {
    return `This role replaces a previous CRO. The most critical task is understanding why the last tenure ended — whether it was a talent mismatch, structural problem, or both — and ensuring the same failure pattern doesn't repeat. The right candidate will conduct their own diagnostic during the interview process and walk in with a 90-day plan that addresses root causes, not just symptoms.${bandContext}`
  }

  return `The CRO will own end-to-end revenue strategy and execution across all customer-facing functions.${bandContext}`
}

function buildScope(type: string, band: ReadinessBand): string[] {
  const base = ['Revenue strategy and annual/quarterly planning', 'Pipeline management and forecasting']

  if (type === 'Builder / Starter CRO') {
    return [
      ...base,
      'Sales team hiring, onboarding, and management',
      'Go-to-market strategy and initial channel development',
      'CRM setup and sales process design',
      'Pricing strategy and deal architecture',
      'Early marketing alignment (demand gen prioritization)',
    ]
  }

  if (type === 'Growth CRO') {
    return [
      ...base,
      'Sales organization design and team development',
      'Marketing alignment and demand generation oversight',
      'Customer Success integration and retention/expansion strategy',
      'Revenue operations and tech stack governance',
      'Cross-functional process standardization',
      'Board reporting and revenue forecasting',
    ]
  }

  if (type === 'Scaling CRO') {
    return [
      ...base,
      'Multi-segment and multi-motion go-to-market architecture',
      'Sales, Marketing, CS, and RevOps organizational design',
      'Revenue operations and business intelligence',
      'Strategic partnerships and channel development',
      'Board and investor reporting',
      'M&A revenue due diligence and integration (if applicable)',
    ]
  }

  if (type === 'Strategic CRO') {
    return [
      ...base,
      'Enterprise go-to-market architecture',
      'Full P&L or revenue P&L ownership',
      'Market strategy and competitive positioning',
      'M&A revenue integration and portfolio management',
      'Board-level strategic planning',
      'Executive team leadership and organizational design',
    ]
  }

  if (type === 'Turnaround CRO') {
    return [
      ...base,
      'Revenue system diagnosis and redesign',
      'Team assessment and restructuring',
      'Process reengineering across revenue functions',
      'Rapid stabilization of existing revenue streams',
      'Stakeholder communication and change management',
    ]
  }

  return [
    ...base,
    'Sales organization leadership',
    'Marketing alignment',
    'Customer Success oversight',
    'Revenue operations governance',
  ]
}

function buildResponsibilities(type: string, band: ReadinessBand, gaps: ReturnType<typeof getGapRecommendations>, isPE: boolean, context: ContextAnswers): string[] {
  const responsibilities: string[] = []

  if (type === 'Builder / Starter CRO') {
    responsibilities.push(
      'Design and implement the company\'s first structured sales process from lead to close',
      'Build and lead the revenue team — hiring the first sales reps, SDRs, and eventually a RevOps function',
      'Establish CRM discipline and reporting infrastructure that doesn\'t exist today',
      'Develop pricing strategy and deal structures appropriate to the company\'s stage',
      'Create the initial go-to-market playbook and refine it through rapid iteration',
      'Own the revenue number — including personally closing deals in the early months',
      'Collaborate with Product and Marketing to refine ICP, messaging, and positioning',
      'Report directly to the CEO with weekly revenue cadence and monthly board updates',
    )
  } else if (type === 'Growth CRO') {
    responsibilities.push(
      'Codify tribal knowledge and founder-driven sales motion into repeatable, documented processes',
      'Build cross-functional alignment between Sales, Marketing, and Customer Success with shared metrics',
      'Design and implement a revenue operations function that provides visibility and predictability',
      'Develop and execute a data-driven go-to-market strategy across segments and channels',
      'Build a scalable sales organization — hiring, onboarding, enablement, and management systems',
      'Establish revenue forecasting discipline that the board and leadership team can rely on',
      'Drive customer retention and expansion as a strategic revenue lever, not an afterthought',
      'Implement cross-functional governance cadence — pipeline reviews, QBRs, revenue council',
    )
  } else if (type === 'Scaling CRO') {
    responsibilities.push(
      'Architect multi-motion revenue strategy across enterprise, mid-market, and SMB segments',
      'Lead organizational redesign to support the complexity that comes with scale',
      'Build and manage a leadership bench — VPs of Sales, Marketing, CS, and RevOps',
      'Drive operational excellence through standardized processes, metrics, and accountability frameworks',
      'Own revenue forecasting accuracy and board-level reporting',
      'Lead strategic planning including market expansion, new product revenue, and partnerships',
      'Oversee technology architecture decisions that impact revenue operations at scale',
      'Manage the cultural transition from startup hustle to disciplined execution',
    )
  } else if (type === 'Strategic CRO') {
    responsibilities.push(
      'Set enterprise-wide revenue strategy and present to the board quarterly',
      'Own the revenue P&L — top-line growth, margins, and unit economics across all motions',
      'Lead M&A revenue due diligence, integration planning, and post-merger execution',
      'Architect organizational design for a complex, multi-division revenue function',
      'Drive market positioning and competitive strategy at the enterprise level',
      'Represent the company externally — analyst relations, strategic partnerships, key customer relationships',
      'Build and develop the executive revenue leadership bench',
      'Operate as a true CEO partner — co-owning business strategy, not just revenue execution',
    )
  } else if (type === 'Turnaround CRO') {
    responsibilities.push(
      'Conduct a rapid diagnostic of the existing revenue system — people, process, technology, and strategy',
      'Stabilize current revenue streams while redesigning the underlying architecture',
      'Make difficult personnel decisions — restructure teams where needed within the first 90 days',
      'Redesign the go-to-market strategy based on actual market feedback, not inherited assumptions',
      'Rebuild trust with the board and key stakeholders through transparent, data-backed reporting',
      'Establish new KPIs and accountability frameworks that align with the actual business reality',
      'Implement quick wins that demonstrate momentum while building long-term systems',
      'Create a 12-month transformation roadmap with quarterly milestones the board can track',
    )
  } else {
    responsibilities.push(
      'Diagnose why the previous CRO tenure ended — structural, cultural, or talent factors',
      'Audit existing revenue systems, processes, and team capabilities against the company\'s growth thesis',
      'Build a 90-day entry plan that addresses root causes, not just inherited priorities',
      'Re-establish trust with the revenue team who may be experiencing change fatigue',
      'Assess and potentially restructure the existing team based on the forward strategy',
      'Realign revenue strategy with board expectations — closing any gaps between stated goals and operational reality',
      'Implement the governance and operating cadence that was missing in the previous tenure',
      'Document decision rights, escalation paths, and CEO-CRO operating norms explicitly',
    )
  }

  if (isPE) {
    responsibilities.push(
      'Partner with PE operating partners on growth thesis execution, reporting cadence, and value creation milestones',
    )
  }

  const dataGap = gaps.find(g => g.id === 'D2')
  if (dataGap) {
    responsibilities.push(
      'Prioritize data infrastructure and CRM hygiene as a Day 1 operational prerequisite',
    )
  }

  const govGap = gaps.find(g => g.id === 'D8')
  if (govGap) {
    responsibilities.push(
      'Establish cross-functional governance structures — the current siloed operating model is a known gap',
    )
  }

  return responsibilities
}

function buildFirstNinetyDays(type: string, gaps: ReturnType<typeof getGapRecommendations>, redGaps: DimensionScore[], band: ReadinessBand, isPE: boolean): { priority: string; detail: string }[] {
  const priorities: { priority: string; detail: string }[] = []

  priorities.push({
    priority: 'Complete a full revenue system diagnostic',
    detail: 'Assess the current state of people, process, technology, data, and strategy. Do not take inherited narratives at face value — verify everything independently.',
  })

  if (type === 'Replacement CRO') {
    priorities.push({
      priority: 'Understand why the last CRO failed',
      detail: 'Interview key stakeholders, review the previous CRO\'s strategy documents, and identify whether the failure was talent, structural, or both. Do not repeat the same playbook.',
    })
  }

  if (isPE) {
    priorities.push({
      priority: 'Align with operating partners on milestones',
      detail: 'Clarify exactly what the growth thesis expects, what timeline applies, and what resources are available. Get this in writing before committing to a plan.',
    })
  }

  for (const gap of gaps.slice(0, 3)) {
    const isRed = redGaps.some(r => r.id === gap.id)
    if (gap.id === 'D1') {
      priorities.push({
        priority: 'Formalize the CEO-CRO operating dynamic',
        detail: 'Document decision rights, escalation protocols, and the weekly operating cadence. CEO alignment scored low — this must be resolved in the first 30 days or the role fails.',
      })
    } else if (gap.id === 'D2') {
      priorities.push({
        priority: 'Fix the data foundation',
        detail: 'CRM hygiene, basic reporting, and leading indicators. You cannot manage what you cannot see. Budget for a RevOps hire or contractor if one doesn\'t exist.',
      })
    } else if (gap.id === 'D3') {
      priorities.push({
        priority: 'Assess and restructure the revenue team',
        detail: `The team ${isRed ? 'is not ready' : 'has gaps'} for the strategy this role requires. Complete an honest skills assessment within 60 days and make hiring/restructuring decisions by day 90.`,
      })
    } else if (gap.id === 'D4') {
      priorities.push({
        priority: 'Document and standardize core revenue processes',
        detail: 'Map the current sales process, lead handoff protocols, and customer journey. Identify the three most impactful process gaps and fix them first.',
      })
    } else if (gap.id === 'D5') {
      priorities.push({
        priority: 'Audit the tech stack',
        detail: 'Assess current tools, identify integration gaps, and create a 90-day technology roadmap. Don\'t rip and replace — stabilize first.',
      })
    } else if (gap.id === 'D6') {
      priorities.push({
        priority: 'Address cultural resistance to change',
        detail: 'Cultural readiness is a gap. The CRO will need visible CEO sponsorship and early wins to build credibility before pushing structural changes.',
      })
    } else if (gap.id === 'D8') {
      priorities.push({
        priority: 'Establish cross-functional governance',
        detail: 'Set up a revenue council or cross-functional cadence with Sales, Marketing, and CS leadership. Shared metrics and mutual accountability are prerequisites for CRO effectiveness.',
      })
    } else if (gap.id === 'D9') {
      priorities.push({
        priority: 'Secure board commitment to a transformation timeline',
        detail: 'Board patience is thin. Get explicit written alignment on what "success" looks like at 90, 180, and 365 days — before accepting the role.',
      })
    }
  }

  priorities.push({
    priority: 'Present a 12-month revenue transformation roadmap',
    detail: 'By day 90, present a data-backed plan to the CEO and board that maps current state to target state with quarterly milestones, resource requirements, and risk factors.',
  })

  return priorities
}

function buildRequiredQualifications(type: string, revenue: ReadinessRevenue, isPE: boolean, funding: ReadinessFunding): string[] {
  const quals: string[] = []

  const revRange: Record<ReadinessRevenue, string> = {
    '1-5m': '$5M–$25M',
    '5-10m': '$10M–$50M',
    '10-25m': '$25M–$100M',
    '25-50m': '$50M–$200M',
    '50-100m': '$100M–$500M',
    '200m-plus': '$200M+',
  }

  if (type === 'Builder / Starter CRO') {
    quals.push(
      `Experience building a revenue function from early stage through ${revRange[revenue]}`,
      '5+ years in revenue leadership with at least one ground-up build',
      'Hands-on selling capability — this role requires carrying deals, not just managing them',
      'Experience hiring, onboarding, and managing a sales team from 0 to 10+',
      'CRM and sales process design experience',
      'Comfort with ambiguity and incomplete infrastructure',
    )
  } else if (type === 'Growth CRO') {
    quals.push(
      `10+ years in B2B revenue leadership with experience scaling from founder-led sales through ${revRange[revenue]}`,
      'Track record of building repeatable, documented sales processes where none existed',
      'Experience leading cross-functional revenue teams (Sales + Marketing + CS)',
      'Strong operational discipline — forecasting accuracy, pipeline management, metrics-driven decision making',
      'Experience building and leading a RevOps function',
    )
  } else if (type === 'Scaling CRO') {
    quals.push(
      `15+ years in B2B revenue leadership with experience at ${revRange[revenue]} scale`,
      'Multi-motion go-to-market experience (enterprise + mid-market, or multiple product lines)',
      'Organizational design experience — building and restructuring revenue orgs of 50+',
      'Board-level communication and reporting experience',
      'Track record navigating the complexity transition that comes with scale',
    )
  } else if (type === 'Strategic CRO') {
    quals.push(
      `15+ years in executive revenue leadership at ${revRange[revenue]} companies`,
      'P&L ownership experience — not just revenue targets, but margin management',
      'Board-level strategic planning and investor relations experience',
      'M&A revenue integration experience preferred',
      'Enterprise organizational design and executive team building',
    )
  } else if (type === 'Turnaround CRO') {
    quals.push(
      '10+ years in B2B revenue leadership with at least one turnaround or restructuring',
      'Experience diagnosing broken revenue systems and rebuilding them under pressure',
      'Comfort making difficult personnel and structural decisions quickly',
      'Strong change management and stakeholder communication skills',
      'Track record of stabilizing revenue while simultaneously transforming the underlying system',
    )
  } else {
    quals.push(
      '10+ years in B2B revenue leadership',
      'Experience entering an organization after a leadership transition',
      'Diagnostic mindset — ability to assess root causes rather than accepting inherited narratives',
      'Strong relationship building with existing teams who may be change-fatigued',
      'Track record of establishing credibility quickly in a new organization',
    )
  }

  if (isPE) {
    quals.push('Prior experience in PE-backed portfolio companies with defined growth theses and operating partner engagement')
  }

  return quals
}

function buildPreferredQualifications(type: string, revenue: ReadinessRevenue, isPE: boolean, gaps: ReturnType<typeof getGapRecommendations>): string[] {
  const prefs: string[] = []

  if (isPE) {
    prefs.push(
      'Experience across multiple PE portfolio companies',
      'Understanding of PE value creation frameworks and exit timelines',
    )
  }

  if (type === 'Builder / Starter CRO' || type === 'Growth CRO') {
    prefs.push('Startup or growth-stage company experience (not just enterprise background)')
  }

  if (gaps.some(g => g.id === 'D5')) {
    prefs.push('Revenue technology architecture experience — CRM, marketing automation, analytics platforms')
  }

  if (gaps.some(g => g.id === 'D2')) {
    prefs.push('Experience building data-driven revenue cultures in organizations with limited existing data maturity')
  }

  prefs.push(
    'Industry-relevant experience (B2B SaaS, professional services, or similar)',
    'Experience with the company\'s primary go-to-market motion (inbound, outbound, product-led, channel)',
  )

  return prefs
}

function buildSuccessMetrics(type: string, band: ReadinessBand, gaps: ReturnType<typeof getGapRecommendations>, isPE: boolean): { timeframe: string; metrics: string[] }[] {
  const metrics: { timeframe: string; metrics: string[] }[] = []

  if (band === 'critical' || band === 'limited') {
    metrics.push({
      timeframe: '90 Days',
      metrics: [
        'Completed revenue system diagnostic with findings presented to CEO/board',
        'Identified and begun addressing the top 3 readiness gaps',
        'Established baseline metrics for all key revenue KPIs',
        'Built or restructured the core revenue team to support the forward strategy',
      ],
    })
    metrics.push({
      timeframe: '6 Months',
      metrics: [
        'Readiness gaps in foundational layer showing measurable improvement',
        'Revenue forecasting accuracy improving quarter over quarter',
        'Cross-functional governance cadence established and operational',
        'Pipeline coverage and velocity trending positive',
      ],
    })
    metrics.push({
      timeframe: '12 Months',
      metrics: [
        'Revenue system operating at a fundamentally higher level of maturity',
        'Key readiness dimensions moved from Gap/Developing to Developing/Ready',
        'Team structure and capabilities aligned to the 18-month growth thesis',
        'Board confidence in revenue leadership and trajectory',
      ],
    })
  } else {
    metrics.push({
      timeframe: '90 Days',
      metrics: [
        'Completed assessment of current revenue architecture and team capabilities',
        '12-month transformation roadmap presented and approved',
        'Quick wins identified and first improvements shipped',
        isPE ? 'Alignment with operating partners confirmed and documented' : 'CEO-CRO operating cadence established',
      ],
    })
    metrics.push({
      timeframe: '6 Months',
      metrics: [
        'Revenue growth rate on trajectory to meet annual targets',
        'Key process and technology gaps addressed',
        'Cross-functional metrics and accountability frameworks operational',
        'Forecasting accuracy demonstrating predictability improvement',
      ],
    })
    metrics.push({
      timeframe: '12–18 Months',
      metrics: [
        'Annual revenue targets met or exceeded',
        'Revenue system operating at scale with documented, repeatable processes',
        'Team bench strength built — next-level leaders identified and developing',
        'Board views revenue as a strategic asset, not an operational concern',
      ],
    })
  }

  return metrics
}

function buildNotThisRole(type: string, band: ReadinessBand, context: ContextAnswers): string[] {
  const warnings: string[] = []

  warnings.push('This is not a VP of Sales with a bigger title — the CRO owns cross-functional revenue strategy, not just the sales number')

  if (type === 'Builder / Starter CRO') {
    warnings.push('This is not a strategy-only role — the CRO must be willing to sell, build process, and hire simultaneously')
    warnings.push('This is not a role for someone who needs a mature infrastructure to operate — the infrastructure is what they\'re building')
  }

  if (band === 'critical' || band === 'limited') {
    warnings.push('This is not a role where the CRO walks in and immediately executes a growth playbook — structural readiness work must happen first')
  }

  if (context.hireReason === 'replacing') {
    warnings.push('This is not a role where the new CRO should simply continue the previous CRO\'s strategy — the departure happened for a reason that must be diagnosed')
  }

  warnings.push('This is not a role where the CEO retains veto power over day-to-day revenue decisions — defined decision rights are a prerequisite for CRO success')
  warnings.push('This is not a short-term hire — if the organization cannot commit to a 12–18 month runway, the CRO will be set up to fail')

  return warnings
}

function buildInterviewFocus(gaps: ReturnType<typeof getGapRecommendations>, redGaps: DimensionScore[], yellowGaps: DimensionScore[], type: string, context: ContextAnswers): { area: string; why: string }[] {
  const focus: { area: string; why: string }[] = []

  if (type === 'Builder / Starter CRO') {
    focus.push({
      area: 'Ground-up build experience',
      why: 'Ask for specific examples of building a revenue function from scratch — not inheriting one. Probe: what was the first thing they built? What did they get wrong?',
    })
  }

  if (type === 'Replacement CRO') {
    focus.push({
      area: 'Successor entry diagnostic',
      why: 'Ask how they would diagnose why the previous CRO failed before proposing their own plan. Red flag: candidates who present a plan before understanding the context.',
    })
  }

  if (context.funding === 'pe-backed') {
    focus.push({
      area: 'PE operating environment',
      why: 'Probe their experience working with operating partners and against an investment thesis timeline. Do they understand that the CRO in a PE portco operates under constraints that a VC-backed CRO doesn\'t?',
    })
  }

  if (gaps.some(g => g.id === 'D1')) {
    focus.push({
      area: 'CEO-CRO dynamic',
      why: 'CEO alignment scored low. Ask the candidate how they would handle a CEO who struggles to delegate revenue authority. Their answer reveals whether they can navigate this specific gap.',
    })
  }

  if (gaps.some(g => g.id === 'D6')) {
    focus.push({
      area: 'Change management',
      why: 'Cultural readiness is a gap. Ask for examples of entering organizations resistant to change. How did they build credibility? How did they handle pushback?',
    })
  }

  if (gaps.some(g => g.id === 'D8')) {
    focus.push({
      area: 'Cross-functional leadership',
      why: 'The functions currently operate as silos. Ask how the candidate has previously built cross-functional alignment — specific structures, not general philosophy.',
    })
  }

  focus.push({
    area: 'Diagnostic before prescription',
    why: 'The strongest CRO candidates ask more questions than they answer in the interview. If a candidate presents a detailed 90-day plan before understanding the organization, they are running a playbook — not solving your problem.',
  })

  focus.push({
    area: 'References from direct reports and CEOs',
    why: 'Talk to people who reported to this candidate AND the CEOs they reported to. The delta between those two perspectives is the most revealing data point.',
  })

  return focus
}

function buildReadinessWarnings(band: ReadinessBand, redGaps: DimensionScore[], totalScore: number, context: ContextAnswers): string[] {
  const warnings: string[] = []

  if (band === 'critical') {
    warnings.push(`Your organization scored ${totalScore}/50 (Critical). Hiring a CRO now carries significant risk. The structural gaps identified in this assessment should be addressed before making this hire. Consider interim or fractional revenue leadership while you build readiness.`)
  }

  if (band === 'limited') {
    warnings.push(`Your organization scored ${totalScore}/50 (Limited). A CRO hire is possible but should be scoped narrowly — the full CRO mandate would outrun what your infrastructure supports today. Address the gaps flagged below before expanding the role.`)
  }

  for (const gap of redGaps) {
    if (gap.id === 'D1') {
      warnings.push('CEO Alignment scored critically low. Without genuine CEO partnership intent, no CRO can succeed. This must be resolved before the hire — not after.')
    }
    if (gap.id === 'D9') {
      warnings.push('Board Support scored critically low. Get written board commitment to a 12–18 month transformation timeline before extending an offer.')
    }
  }

  return warnings
}

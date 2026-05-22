import type { ICP, Archetype, DiagnosticModifiers, ModifiedResult, ArchetypeContent } from './types';
import { getResult } from './results';

interface ShiftRule {
  condition: (icp: ICP, arch: Archetype, m: DiagnosticModifiers) => boolean;
  shiftTo: Archetype;
  reason: string;
}

const shiftRules: ShiftRule[] = [
  // CEO thinks Miscast Role but it's recurring → Revolving Door
  {
    condition: (icp, arch, m) => icp === 'ceo' && arch === 'miscast-role' && m.duration === 'recurring',
    shiftTo: 'revolving-door',
    reason: "This isn't about this CRO. The pattern across multiple hires points to a systemic issue — the company keeps creating conditions where revenue leaders can't succeed.",
  },
  // CEO thinks Miscast Role but changes failed + everyone sees it → Panda Problem
  {
    condition: (icp, arch, m) => icp === 'ceo' && arch === 'miscast-role' && m.priorAction === 'made-changes' && m.orgAwareness === 'everyone-knows',
    shiftTo: 'panda-problem',
    reason: "You've already tried redesigning the role and it didn't work. When the problem persists through interventions and everyone can see it, the issue isn't the role definition — it's the environment.",
  },
  // CRO/RevLeader Forecast Theater + recurring → Hero Trap
  {
    condition: (_, arch, m) => arch === 'forecast-theater' && m.duration === 'recurring',
    shiftTo: 'hero-trap',
    reason: "If this pattern follows you across roles, the common thread isn't the companies — it's the approach. You're replacing systems with personal performance wherever you go.",
  },
  // CRO Panda Problem + recurring → The Reset
  {
    condition: (icp, arch, m) => (icp === 'cro' || icp === 'revenue-leader') && arch === 'panda-problem' && m.duration === 'recurring',
    shiftTo: 'the-reset',
    reason: "If you keep ending up in companies that won't give you what you need, the pattern isn't about the companies anymore. Your selection criteria need an overhaul.",
  },
  // CRO Panda Problem + leadership disagrees → Miscast Role
  {
    condition: (icp, arch, m) => icp === 'cro' && arch === 'panda-problem' && m.orgAwareness === 'leadership-disagrees',
    shiftTo: 'miscast-role',
    reason: "If leadership is aware of the friction but sees the solution differently than you do, this isn't a support gap — it's an expectations gap. You and the company have different definitions of what this role should be.",
  },
  // CRO Panda Problem + made changes but no results → Hero Trap
  {
    condition: (icp, arch, m) => icp === 'cro' && arch === 'panda-problem' && m.priorAction === 'made-changes',
    shiftTo: 'hero-trap',
    reason: "You've been compensating for the lack of support by doing it all yourself. That's not solving the problem — it's becoming the system. The heroics mask the structural gap.",
  },
  // PE operator any archetype + recurring → Revolving Door
  {
    condition: (icp, _, m) => icp === 'pe-operator' && m.duration === 'recurring',
    shiftTo: 'revolving-door',
    reason: "When this pattern repeats across portfolio companies, it's not bad luck with individual hires — it's a systematic approach that produces predictable churn.",
  },
  // Aspiring CRO leadership gap + everyone knows + outside help → shift to Interview
  {
    condition: (icp, arch, m) => icp === 'aspiring-cro' && arch === 'leadership-gap' && m.priorAction === 'outside-help',
    shiftTo: 'the-interview',
    reason: "You've already invested in development. The gap isn't readiness — it's positioning. You need to learn how to translate your capabilities into a CRO interview.",
  },
];

function getSeverity(m: DiagnosticModifiers): 'early' | 'mid' | 'entrenched' {
  if (m.duration === 'new' && m.priorAction === 'nothing') return 'early';
  if (m.duration === 'over-a-year' || m.duration === 'recurring') return 'entrenched';
  if (m.priorAction === 'made-changes' || m.priorAction === 'outside-help') return 'entrenched';
  return 'mid';
}

function getSecondaryArchetype(_icp: ICP, arch: Archetype, m: DiagnosticModifiers): string | undefined {
  // Forecast Theater + team sees but leadership doesn't → secondary Panda Problem
  if (arch === 'forecast-theater' && m.orgAwareness === 'team-not-leadership') {
    return "There are also signs of The Panda Problem — leadership may not be creating the conditions for this to be fixed.";
  }
  // Miscast Role + conversations but no change → secondary Panda Problem
  if (arch === 'miscast-role' && m.priorAction === 'conversations' && m.orgAwareness !== 'just-me') {
    return "There are also signs of The Panda Problem — the organization may not be equipped to support a revenue leader regardless of how the role is defined.";
  }
  // Hero Trap + team sees it → secondary Leadership Gap
  if (arch === 'hero-trap' && m.orgAwareness === 'team-not-leadership') {
    return "There are also signs of The Leadership Gap — your team can see the bottleneck but the company isn't ready to invest in building the systems that would replace your involvement.";
  }
  return undefined;
}

function getCaveat(severity: 'early' | 'mid' | 'entrenched', m: DiagnosticModifiers): string | undefined {
  if (severity === 'early' && m.duration === 'new' && m.priorAction === 'nothing') {
    return "Important: you're seeing this early, which is actually an advantage. The patterns below describe where this goes if left unaddressed — not necessarily where you are today. You have a window to act before it becomes entrenched.";
  }
  return undefined;
}

function modifyContent(base: ArchetypeContent, icp: ICP, arch: Archetype, m: DiagnosticModifiers, severity: 'early' | 'mid' | 'entrenched'): ArchetypeContent {
  const content = { ...base, stopDoing: [...base.stopDoing], startDoing: [...base.startDoing], insights: [...base.insights] };

  // Duration-based modifications
  if (m.duration === 'new') {
    content.whyStuck = "You're catching this early — which means you're paying attention. " + content.whyStuck;
  } else if (m.duration === 'over-a-year') {
    content.whyStuck = "This has been entrenched for over a year, which means the pattern has become normalized. " + content.whyStuck;
  }

  // Prior action modifications
  if (m.priorAction === 'conversations') {
    content.insights.push("You've already tried the conversation route. Conversations without structural follow-through are just shared awareness — not change.");
  } else if (m.priorAction === 'made-changes') {
    content.insights.push("The changes you've made haven't worked — which means the problem is deeper than the interventions you've tried. The diagnosis needs to go one level below where you've been looking.");
  } else if (m.priorAction === 'outside-help') {
    content.insights.push("You've brought in outside help before. If it didn't stick, the issue was likely that the intervention treated symptoms without diagnosing the underlying system.");
  }

  // Org awareness modifications
  if (m.orgAwareness === 'just-me') {
    content.startDoing.push("Build the case with data before escalating — your credibility depends on specifics, not feelings");
  } else if (m.orgAwareness === 'everyone-knows') {
    content.insights.push("Everyone in the organization can see this problem. Shared awareness without coordinated action is its own failure pattern — it means the system has absorbed the dysfunction as normal.");
  }

  // Offering adjustments based on severity
  if (severity === 'early') {
    content.offering = content.offering.includes('Readiness') ? content.offering : content.offering;
    // Early stage → lighter touch
  } else if (severity === 'entrenched') {
    // Entrenched → escalate offering
    if (!content.offering.includes('Readiness') && (icp === 'ceo' || icp === 'pe-operator')) {
      content.offering = 'CRO Readiness Assessment';
    }
  }

  // CRO Panda Problem over a year + everyone knows → transition offering
  if (icp === 'cro' && arch === 'panda-problem' && m.duration === 'over-a-year' && m.orgAwareness === 'everyone-knows') {
    content.offering = 'CRO in Transition Program';
    content.cta = "This role may be over. Let's plan your exit strategically and make sure the next one is built on better ground.";
    content.insights.push("Sometimes the most strategic move is leaving well — with clarity, a story, and a plan for what's next.");
  }

  return content;
}

export function applyModifiers(icp: ICP, originalArchetype: Archetype, modifiers: DiagnosticModifiers): ModifiedResult {
  // Check for archetype shifts
  let finalArchetype = originalArchetype;
  let shiftedFrom: Archetype | undefined;
  let shiftReason: string | undefined;

  for (const rule of shiftRules) {
    if (rule.condition(icp, originalArchetype, modifiers)) {
      shiftedFrom = originalArchetype;
      finalArchetype = rule.shiftTo;
      shiftReason = rule.reason;
      break; // First matching rule wins
    }
  }

  const baseContent = getResult(icp, finalArchetype) || getResult(icp, originalArchetype);
  if (!baseContent) {
    // Fallback: try getting the shifted archetype from any ICP
    const fallback = getResult('cro', finalArchetype) || getResult('ceo', finalArchetype);
    if (!fallback) throw new Error(`No result content for ${icp}:${finalArchetype}`);
    return {
      ...fallback,
      severityLevel: getSeverity(modifiers),
      shiftedFrom,
    };
  }

  const severity = getSeverity(modifiers);
  const modified = modifyContent(baseContent, icp, finalArchetype, modifiers, severity);
  const secondaryArchetype = getSecondaryArchetype(icp, finalArchetype, modifiers);
  const caveat = getCaveat(severity, modifiers);

  // If shifted, prepend the shift explanation to commentary
  if (shiftedFrom && shiftReason) {
    modified.commentary = shiftReason + "\n\n" + modified.commentary;
  }

  return {
    ...modified,
    shiftedFrom,
    secondaryArchetype,
    severityLevel: severity,
    caveat,
  };
}

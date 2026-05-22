import type { ICP, Archetype, ArchetypeContent } from './types';

const resultKey = (icp: ICP, arch: Archetype) => `${icp}:${arch}`;

export const results: Record<string, ArchetypeContent> = {
  // ═══════════════════════════════════════
  // CEO
  // ═══════════════════════════════════════
  [resultKey('ceo', 'hunt-for-hero')]: {
    name: 'On the Hunt for a Hero',
    subtitle: "You're looking for someone to come in and fix revenue. That instinct is the first thing we need to talk about.",
    description: "You know the company needs dedicated revenue leadership. Maybe you've been carrying it yourself, maybe a VP Sales has hit their ceiling, maybe the board is pushing for it. Either way, you're ready to make the hire. The risk isn't that you'll hire the wrong person — it's that you'll hire the right person into the wrong environment.",
    commentary: "Most CEOs at this stage are building a job description based on what they think a CRO does — which is usually a super-powered VP Sales. They post the role, interview impressive candidates, and pick the one who sounds most confident about hitting next year's number. Eighteen months later, that person is gone and everyone is confused about what happened. The problem was never the person. The problem was that nobody defined what the role actually needed to be, whether the org was ready for it, or what kind of CRO matches the company's actual stage.",
    whyStuck: "Because hiring feels like action. You're doing something about the revenue problem. But hiring without readiness is just converting a leadership gap into a leadership failure with a severance package.",
    stopDoing: [
      "Writing a CRO job description based on other companies' JDs",
      'Interviewing candidates before defining what success looks like',
      'Assuming a great sales track record means they can build a revenue system',
    ],
    startDoing: [
      'Assessing whether your company is actually CRO-ready (authority, data, culture, resources)',
      'Defining what type of CRO you need for your stage (Builder, Optimizer, Turnaround, Scaling)',
      "Treating the interview as a two-way consultation — if the candidate isn't teaching you something, they're wrong for the job",
    ],
    insights: [
      'The CRO role needs to be designed before it\'s filled — most companies skip this entirely',
      'The environment the CRO walks into determines whether they succeed more than their resume does',
      "Getting this hire wrong isn't just expensive — it sets the company back 12-18 months every time",
    ],
    offering: 'CRO Readiness Assessment',
    cta: 'Before you hire, find out if your company is ready to support the leader you need.',
  },

  [resultKey('ceo', 'miscast-role')]: {
    name: 'The Miscast Role',
    subtitle: "You hired a CRO. Something's off. It might not be them.",
    description: "You brought in a revenue leader — someone with a strong resume and a confident plan. But it's not clicking. They're either doing less than you expected or doing different things than you expected. The frustration is building on both sides. Before you start thinking about a replacement, consider this: the problem might be in how the role was defined, not who's filling it.",
    commentary: 'You probably hired for what you thought a CRO does — which, for most CEOs, means "someone who owns the number and makes it go up." But a real CRO\'s job is to build the revenue system, not just run sales. If your CRO is spending all their time managing pipelines and running forecast calls, that\'s not failure — that\'s what the org is demanding of them, even if it\'s not what you hired them to do. The role pulled them into what was urgent instead of what was important. And nobody ever stopped to reconcile those two versions of the job.',
    whyStuck: "Because the gap between what a CRO should do and what a company lets them do is invisible until it's a crisis. Both sides thought they agreed. They were agreeing about different things.",
    stopDoing: [
      'Evaluating your CRO against a job description that was never realistic',
      'Assuming they should "just figure it out" without structural support',
      'Treating the symptom (performance) instead of the cause (role design)',
    ],
    startDoing: [
      "Having an honest conversation about what the role was supposed to be vs. what it's become",
      "Defining the CRO's actual scope, authority, and decision rights — in writing",
      'Asking yourself: did I hire a Sales+ CRO when I needed a Builder?',
    ],
    insights: [
      'The CRO they hired might be the right person in the wrong setup',
      '"Scope without authority" is the silent killer — they\'re accountable for everything and control almost nothing',
      'Redefining the role is faster, cheaper, and less disruptive than replacing the person',
    ],
    offering: 'Advisory / Coaching',
    cta: "Let's figure out whether this is a people problem or a design problem — before you make a move you can't undo.",
  },

  [resultKey('ceo', 'panda-problem')]: {
    name: 'The Panda Problem',
    subtitle: "Your CRO is talented. Your company is making it impossible for them to prove it.",
    description: "You hired a strong revenue leader. You believe in their capability. But the results aren't there, and you're starting to wonder. Here's what most CEOs don't see: even the best CRO will fail in the wrong environment. Like a panda in the wrong habitat — the problem isn't the animal, it's the conditions. Your company may be starving its revenue leader of exactly what they need to succeed.",
    commentary: "Your CRO probably has authority on paper but not in practice. They were told they'd own the revenue org, but every strategic decision still routes through you or the board. They were promised resources that never fully materialized. The runway they were given — \"show results in two quarters\" — doesn't match the transformation they were hired to deliver. They're caught in what I call the CRO Paradox: hired to change the system, but constrained by the very system they're supposed to change.",
    whyStuck: 'Because CEOs genuinely believe they\'re supportive. You want your CRO to succeed. But wanting it and building the conditions for it are two different things. The gap between "agreement" and "commitment" is where CROs go to die.',
    stopDoing: [
      "Overriding your CRO's decisions and then wondering why they're not taking ownership",
      'Measuring transformation on a quarterly sales timeline',
      'Assuming support means "I gave them the title and a team"',
    ],
    startDoing: [
      'Auditing the AARR: do they have real Authority, Autonomy, Resources, and Runway?',
      "Asking your CRO what's blocking them — and actually removing those blockers",
      'Giving the transformation a realistic timeline that matches what you hired them to do',
    ],
    insights: [
      "They've been unconsciously undermining the role they created",
      "The CRO's frustration isn't attitude — it's a rational response to an irrational setup",
      'Fixing the environment is cheaper and faster than finding a new CRO and repeating the cycle',
    ],
    offering: 'Advisory / Coaching',
    cta: "Let's assess whether your company is giving your CRO what they actually need to succeed.",
  },

  [resultKey('ceo', 'revolving-door')]: {
    name: 'The Revolving Door',
    subtitle: 'New CRO, new strategy, same outcome. Every 17 months.',
    description: "This isn't your first revenue leader. Maybe it's your second. Maybe your third. Each one arrived with a new plan, reorganized the team, made promises, and then it fell apart. You're starting to wonder if the role is just impossible at your company. It's not. But the pattern will repeat until you stop treating it as a hiring problem and start treating it as a system problem.",
    commentary: "Every time a CRO leaves, the company does a post-mortem that blames the individual — wrong culture fit, wrong skillset, couldn't handle the pace. Then you write a slightly different job description and hire someone who's the opposite of the last person. And the cycle starts again. What nobody examines is what stayed the same through all those hires: the org structure, the board expectations, the authority model, the timeline for results. The CROs changed. The system didn't. That's why the outcome doesn't change either.",
    whyStuck: 'Because replacing the person feels like taking action. Examining the system feels like admitting you were the problem all along. It takes real honesty to look at a pattern and say "the common denominator is us."',
    stopDoing: [
      'Writing a post-mortem that blames the departing CRO',
      'Hiring the "opposite" of the last person as if that\'s a strategy',
      'Expecting different results from the same operating environment',
    ],
    startDoing: [
      'Auditing what was the same across every failed CRO tenure — org structure, authority, resources, timeline',
      'Getting an outside perspective on whether your company is CRO-ready',
      'Treating the next hire as a system redesign, not a personnel swap',
    ],
    insights: [
      'Replacing the CRO is not a strategy — governing the revenue system is',
      "The pattern reveals the problem: it's not three wrong people, it's one wrong setup",
      'The next hire will fail too unless the underlying system changes first',
    ],
    offering: 'Advisory + CRO Readiness',
    cta: "Before you make the next hire, let's figure out why the last three didn't work.",
  },

  [resultKey('ceo', 'forecast-theater')]: {
    name: 'Forecast Theater',
    subtitle: "The numbers look fine. You don't trust what's underneath them.",
    description: "Revenue is coming in. The team is busy. The board deck looks good. But something feels off. You can't point to exactly what it is — it's more like a suspicion that the whole thing is held together by individual heroics, not a real system. You're right to be suspicious. What you're feeling is the difference between revenue that's happening to you and revenue that's being built by you.",
    commentary: 'Your forecast meetings are confidence contests. People report numbers they believe because believing them is the path of least resistance. Nobody wants to be the one who says "I\'m not sure" — so the forecast hardens into a fiction that everyone performs. Meanwhile, the pipeline is thinner than it looks, the deals that closed last quarter had their own unique stories that won\'t repeat, and there\'s no systematic engine generating predictable demand. You\'re one bad quarter away from a crisis that "nobody saw coming" — except you kind of did.',
    whyStuck: "Because the numbers aren't bad. It's hard to argue with revenue. The problem is that it's fragile revenue masquerading as healthy revenue, and the only way to tell the difference is to look at the system underneath — which most companies don't have.",
    stopDoing: [
      "Accepting forecasts that nobody can explain the methodology behind",
      "Celebrating closed deals without understanding what's repeatable about them",
      'Letting "we hit the number" end the conversation about how',
    ],
    startDoing: [
      'Asking your revenue team to explain the system that produces results, not just the results',
      'Distinguishing between revenue from heroics and revenue from a machine',
      'Investing in the infrastructure that makes revenue predictable, not just the people chasing it',
    ],
    insights: [
      'Revenue and a revenue system are two completely different things — you can have one without the other',
      "The fragility they're sensing is real, and it compounds until it breaks",
      "Building the system is a CRO's job — if they're not doing it, the role isn't working",
    ],
    offering: 'Advisory / Coaching',
    cta: "Let's look underneath the numbers and figure out what's actually holding your revenue together.",
  },

  // ═══════════════════════════════════════
  // CRO IN-SEAT
  // ═══════════════════════════════════════
  [resultKey('cro', 'miscast-role')]: {
    name: 'The Miscast Role',
    subtitle: 'They call you a CRO but all you do is run sales.',
    description: "You have the title. You have the accountability. But the actual job looks nothing like what a Chief Revenue Officer is supposed to do. You're running pipeline reviews, managing sales reps, and chasing the quarterly number — the same work a VP Sales does, just with more pressure and a fancier title.",
    commentary: "You walked into this role expecting to build a revenue system — align marketing, sales, and customer success, create real forecasting governance, and design a repeatable engine. Instead, the company handed you the sales org and said \"grow the number.\" Every time you try to think long-term, something urgent pulls you back into the quarter. You're not failing at the CRO job. You're succeeding at a VP Sales job that was mislabeled. And the longer you stay in this version of the role, the more it hollows out your ability to do the real one somewhere else.",
    whyStuck: "Because the work feels important. You're busy. You're closing deals. The company needs you doing what you're doing. But being needed and being utilized are different things. You're a Ferrari being used for grocery runs.",
    stopDoing: [
      'Accepting "that\'s just how it is here" as a reason to stay in a diminished role',
      'Letting the quarter consume every hour of strategic thinking',
      "Building your CRO track record on work that's actually VP Sales work",
    ],
    startDoing: [
      "Having a direct conversation with your CEO about what this role was supposed to be vs. what it's become",
      'Documenting the gap between your actual authority and your stated accountability',
      "Deciding whether this company will ever let you do the real job — and acting accordingly",
    ],
    insights: [
      "The title isn't the role — the longer you do the wrong job under the right title, the harder it gets",
      "The company may genuinely not understand what a CRO is supposed to do",
      'You have more leverage to redefine the role than you think — but it requires a conversation most people avoid',
    ],
    offering: 'Coaching + Masters Council',
    cta: "Let's figure out whether this role can become what it should be — or whether it's time to find one that already is.",
  },

  [resultKey('cro', 'panda-problem')]: {
    name: 'The Panda Problem',
    subtitle: "You have the skills. The company won't let you use them.",
    description: "You know what needs to happen. You can see the strategy. You have the experience to execute it. But every time you try to move, something blocks you — a CEO who overrides your decisions, a board with unrealistic timelines, a culture that resists change, resources that were promised but never delivered.",
    commentary: "This is what I call the CRO Paradox: hired to change the system, but constrained by the very system they're supposed to change. If the company didn't give you the AARR — Authority, Autonomy, Resources, Runway — then it didn't matter how good you were. Capability without conditions isn't underperformance. It's captivity.",
    whyStuck: "Because you internalize it. When a capable person can't produce results, the default assumption — yours and everyone else's — is that you're the problem. But capability without conditions isn't underperformance. It's captivity.",
    stopDoing: [
      "Blaming yourself for results the environment won't allow",
      'Working around blockers instead of naming them',
      'Hoping things will "settle in" and the support will materialize',
    ],
    startDoing: [
      "Cataloging exactly what you need: Authority, Autonomy, Resources, Runway",
      'Presenting this as a gap analysis with business consequences, not a complaint',
      "Setting a private timeline — if conditions don't change by X, the answer is clear",
    ],
    insights: [
      "They're not failing — they're being failed. That distinction matters.",
      "The company may genuinely not know what they're withholding",
      'Either the environment changes or you do. Staying erodes confidence and trajectory.',
    ],
    offering: 'Coaching + Masters Council',
    cta: "You need a sounding board that understands what you're dealing with — not another board deck to defend.",
  },

  [resultKey('cro', 'forecast-theater')]: {
    name: 'Forecast Theater',
    subtitle: "You're firefighting every quarter instead of building for the next four.",
    description: "You know what the revenue org needs — real systems, real process, real governance. But you can't get to any of it because every week is consumed by this quarter's number. The forecast calls are performative. The pipeline is thinner than anyone admits. You're personally willing deals across the line.",
    commentary: "You're operating as the revenue system instead of building one. Your team is talented but they're freelancing. Your forecast is based on feel, not mechanics. The board keeps congratulating you on the quarters you gut out while never giving you the space to build the thing that would make gut-outs unnecessary. You're city planning by day and house flipping by night, and the house flipping always wins.",
    whyStuck: "Because you're hitting the number. It's hard to argue for system investment when the results are coming in. But you know the truth — this isn't sustainable. You're trading future quarters for current ones, and the debt is compounding.",
    stopDoing: [
      'Personally rescuing deals every quarter and calling it leadership',
      "Accepting a forecast process that's performance art",
      'Postponing system-building because "next quarter will be calmer"',
    ],
    startDoing: [
      "Carving out 20% of your time for system architecture — protect it like a board meeting",
      "Presenting your CEO with the real picture: repeatable vs. heroic",
      'Building one system at a time — start with forecast governance',
    ],
    insights: [
      'The company rewards the heroics that prevent the system from ever being built',
      'Next quarter will never be calmer — the system has to be built during chaos',
      'You need someone in your corner to help make the case for investment',
    ],
    offering: 'Coaching + Accelerator',
    cta: "Let's build the case and the plan for the revenue system your company doesn't know it needs yet.",
  },

  [resultKey('cro', 'hero-trap')]: {
    name: 'The Hero Trap',
    subtitle: "Nothing moves unless you're in the room. That's not leadership — that's a bottleneck.",
    description: "You're in every deal review. Every escalation comes to you. Every strategic decision waits for your input. The team has learned that the fastest way to get something done is to bring it to you. The organization doesn't have a revenue system. It has you.",
    commentary: "This probably started as a strength. You came in, rolled up your sleeves, and showed the team what good looks like. And it worked. But somewhere the scaffolding became the building. The team stopped developing their own judgment because yours was always available. Now you're trapped — exhausted, overwhelmed, and terrified of what happens if you take a week off. You've become the system. And systems made of people don't scale.",
    whyStuck: "Because it feels like leadership. Being needed, being the one who knows, being the person who can always fix it — that's addictive. It's also a dead end.",
    stopDoing: [
      'Attending every deal review and escalation call',
      'Making decisions your directors should be making',
      'Measuring your value by how much the team needs you',
    ],
    startDoing: [
      'Identifying the 3 decisions you make most often and delegating with frameworks',
      'Letting your team fail on small things so they develop judgment',
      'Building the system that replaces your involvement',
    ],
    insights: [
      "Being indispensable isn't great leadership — it means you haven't built one",
      "The team's dependence on you is your creation, not their weakness",
      'The best CROs make themselves unnecessary to daily operations',
    ],
    offering: 'Coaching + Masters Council',
    cta: "You need a space where you can be honest about what's happening — and a plan to build yourself out of the center.",
  },

  // ═══════════════════════════════════════
  // REVENUE LEADER
  // ═══════════════════════════════════════
  [resultKey('revenue-leader', 'forecast-theater')]: {
    name: 'Forecast Theater',
    subtitle: "You're hitting numbers on muscle, not a machine.",
    description: "The results are there — for now. But you know how they're being produced. It's effort, instinct, and late nights, not a system that generates predictable outcomes. You're outworking the problem instead of outbuilding it.",
    commentary: "You're good at your job. That's actually the problem. Because you're good enough to hit the number without a real system, nobody's forcing you to build one. You're operating at the ceiling of what muscle can do. The next level requires a machine.",
    whyStuck: "Because success hides the fragility. As long as the number comes in, nobody questions how. But you know. And the gap between where you are and where this needs to go is the gap between a revenue leader and a CRO.",
    stopDoing: [
      'Treating your personal effort as a sustainable revenue strategy',
      'Avoiding process investment because "we don\'t have time"',
      'Accepting a forecast that only you can explain',
    ],
    startDoing: [
      "Documenting the repeatable parts of what you do — that's the seed of a system",
      "Building forecast discipline that doesn't require your intuition",
      'Studying what CROs actually build, not just what they deliver',
    ],
    insights: [
      "The skills that got you here — hustle, instinct, personal relationships — won't get you to the next level",
      "System-building isn't a distraction from your job, it IS the next version of your job",
      'The move from revenue leader to CRO is the move from being the engine to building the engine',
    ],
    offering: 'CRO Accelerator',
    cta: "This is the exact transition the Accelerator is built for — from delivering revenue to designing the system that delivers it.",
  },

  [resultKey('revenue-leader', 'miscast-role')]: {
    name: 'The Miscast Role',
    subtitle: "You're doing CRO work without the title or the authority.",
    description: "You're running revenue operations that span sales, marketing, and customer success. You're in the strategy conversations. But your title says VP or Director, and your authority matches the title, not the work. You're carrying CRO-level accountability with mid-management leverage.",
    commentary: "The company knows you're operating above your title. They might even acknowledge it privately. But they haven't formalized it because that means restructuring, comp adjustments, and political conversations. So you keep doing the work. You're being penalized for your own competence — locked in because moving you up creates a problem the company would rather avoid.",
    whyStuck: 'Because the work feels like proof. You think "if I just keep delivering at this level, they\'ll have to promote me." Sometimes they do. More often, they don\'t — because the current arrangement is working too well for them to change it.',
    stopDoing: [
      "Waiting for the company to notice and reward what you're already doing",
      'Accepting CRO-scope work without CRO-level authority',
      'Assuming more proof of competence will trigger the conversation',
    ],
    startDoing: [
      "Documenting what you're doing vs. what your role is supposed to be",
      'Having the conversation directly — as a business case, not a request',
      'Deciding: the title here, or the role somewhere else that already has it',
    ],
    insights: [
      "Companies keep their best people locked in functional roles because promoting them creates a gap they don't want to fill",
      "The CRO title isn't just prestige — it comes with the authority and structural support you need",
      'Sometimes the fastest path to CRO is out, not up',
    ],
    offering: 'CRO Accelerator',
    cta: "Build the strategic toolkit and the network that turns what you're already doing into a CRO-level career.",
  },

  [resultKey('revenue-leader', 'leadership-gap')]: {
    name: 'The Leadership Gap',
    subtitle: "You know you need to operate differently. You haven't figured out how yet.",
    description: "You're strong operationally. You can manage teams, build pipeline, close quarters. But you've started to sense that the next level requires something different — strategic thinking, cross-functional leadership, system design, board-level communication.",
    commentary: "You're at the edge of a real transformation. The skills that made you excellent — execution, pipeline discipline, team management — are necessary but insufficient for the CRO role. It's the shift from running the plays to designing the playbook. From managing a team to architecting an organization. Most revenue leaders feel this gap as vague discomfort. Nobody teaches this transition — people are expected to figure it out when they get the title. Most don't.",
    whyStuck: "Because the gap is invisible from the inside. You can't see what you don't know yet. And the people around you aren't equipped to show you, because they're looking at the same picture from the same angle.",
    stopDoing: [
      'Assuming the CRO role is a bigger version of what you already do',
      'Waiting until you get the title to start developing the skills',
      'Measuring readiness by revenue results alone',
    ],
    startDoing: [
      'Studying what CROs actually do day-to-day — the real work, not the JD',
      'Building strategic muscle now: cross-functional alignment, system design, exec communication',
      "Finding CROs who've made this transition and learning how",
    ],
    insights: [
      "The leap from revenue leader to CRO isn't a promotion — it's a transformation",
      'The soft skills — leadership presence, decision-making under ambiguity, organizational design — are actually the hard skills',
      "The best time to prepare for the CRO role is before you're in it, not after",
    ],
    offering: 'CRO Accelerator',
    cta: "This is exactly what the Accelerator exists for — a structured path from revenue leader to CRO.",
  },

  // ═══════════════════════════════════════
  // ASPIRING CRO
  // ═══════════════════════════════════════
  [resultKey('aspiring-cro', 'leadership-gap')]: {
    name: 'The Leadership Gap',
    subtitle: "You want the seat. Let's be honest about what's between you and it.",
    description: "You have ambition and ability. Those aren't the same as readiness. The CRO role isn't a title you earn by being great at your current job — it's a fundamentally different job that requires capabilities most revenue professionals have never been asked to develop.",
    commentary: 'You\'re probably looking at CRO job descriptions and thinking "I can do that." The job description is about 30% of what the role actually requires. The rest — navigating board dynamics, redesigning an organization while running it, making high-stakes decisions with incomplete data — none of that shows up in the posting. The most dangerous CRO candidates are the ones who don\'t know what they don\'t know.',
    whyStuck: "Because the confidence that made you successful so far can blind you to what you don't know yet.",
    stopDoing: [
      'Applying for CRO roles based on revenue management track record alone',
      "Assuming you'll figure it out once you're in the seat",
      "Comparing yourself to CROs who are also figuring it out",
    ],
    startDoing: [
      "Getting honest about which CRO competencies you have and which you're guessing at",
      'Investing in development before you need it',
      "Talking to CROs who've been through year one",
    ],
    insights: [
      "The gap between wanting the role and being ready for it is bridgeable — but only if you're honest about it",
      'Preparing now gives you a massive advantage over every CRO who showed up unprepared',
      "The best CROs didn't wing it. They built the skills before the role demanded them.",
    ],
    offering: 'CRO Accelerator',
    cta: "Close the gap before you're in the seat. That's the difference between a 17-month tenure and a career-defining role.",
  },

  [resultKey('aspiring-cro', 'title-trap')]: {
    name: 'The Title Trap',
    subtitle: 'You have the CRO title. You know the job was really VP Sales.',
    description: "At some point, a company gave you the title of Chief Revenue Officer. But you know the truth — the job was managing a sales team, not building a revenue system. The title on LinkedIn says CRO. The experience says VP Sales. That gap will cost you if you don't close it.",
    commentary: "This is one of the most common traps in revenue leadership and I'm not going to sugarcoat it. You took a CRO title at a company that wasn't really running a CRO role — probably under $30M in revenue, probably with sales as the only function under you. Now you're in a bind: your resume says CRO, but when a real CRO role at a $50M+ company interviews you deeply, the gap will show. The piper will be paid eventually. The good news? You can close this gap. But you have to be honest about it first.",
    whyStuck: "Because the title feels like proof. And in a market where CRO titles are handed out loosely, it's easy to mistake the label for the competency.",
    stopDoing: [
      "Using the CRO title as evidence of CRO experience if the job didn't match",
      'Pursuing bigger CRO roles without closing the skills gap',
      'Avoiding the honest self-assessment',
    ],
    startDoing: [
      'Auditing what you actually did vs. what a real CRO role requires',
      'Building the missing competencies: system design, cross-functional leadership',
      'Positioning your next move as a step toward a real CRO role',
    ],
    insights: [
      'An honest VP Sales who\'s developing CRO skills is worth more than a paper CRO who can\'t deliver',
      'The market is getting smarter — companies that know what a CRO is will see through the title',
      'Closing this gap now, on your terms, is infinitely better than having it exposed in your next role',
    ],
    offering: 'CRO Accelerator',
    cta: "Build the real skills behind the title. That's what makes the next role stick.",
  },

  [resultKey('aspiring-cro', 'miscast-role')]: {
    name: 'The Miscast Role',
    subtitle: "You want to be a CRO. You're not sure what kind.",
    description: "You know you want the role. What you haven't figured out is which version. CRO at a Series B startup is a completely different job than CRO at a $100M enterprise. Builder is different from Optimizer is different from Turnaround. Chasing the wrong version is how capable people end up miserable.",
    commentary: '"CRO" is four or five different jobs wearing the same title. A Builder creates systems from scratch. An Optimizer refines what exists. A Turnaround walks into a burning building. A Scaling CRO takes a working machine and makes it bigger. If you\'re a Builder and you take a Turnaround role, you\'ll be miserable. The most important question isn\'t "can I be a CRO?" It\'s "which CRO am I?"',
    whyStuck: "Because the market treats CRO as one role. Job descriptions blur the types. Companies often don't know which type they need.",
    stopDoing: [
      "Applying for every CRO role as if they're the same job",
      'Defining yourself by industry instead of operating style',
      'Ignoring the environment in favor of title and comp',
    ],
    startDoing: [
      'Identifying your CRO type: Builder, Optimizer, Turnaround, or Scaling',
      'Evaluating companies on whether their situation matches your type',
      'Interviewing the company as much as they interview you',
    ],
    insights: [
      "Knowing your CRO type is the single most important career decision you'll make",
      'A great CRO in the wrong type of role looks like a bad CRO',
      "The best moves aren't the biggest titles — they're the ones where your type matches their situation",
    ],
    offering: 'CRO Accelerator',
    cta: 'Figure out what kind of CRO you are — and build a career strategy around it.',
  },

  [resultKey('aspiring-cro', 'the-interview')]: {
    name: 'The Interview',
    subtitle: "You're about to land the role. You're not ready for what comes after.",
    description: "You're in the process. Interviews are happening. Maybe you're in final rounds. The energy right now is focused on getting the offer — the comp, the title, the opportunity. But here's what nobody tells first and second-time CRO candidates: getting the job is the easy part. Keeping it — and doing it well — is where most people get blindsided.",
    commentary: "Most CRO candidates prepare for interviews the way they'd prepare for a VP Sales interview — they talk about their number, their wins, their team. But a CRO interview should be a consultation, not a pitch. If you're not teaching the CEO something they didn't know about their own revenue organization in the interview, you're already positioning yourself wrong. And the bigger issue: nobody is coaching you on what to negotiate before you sign. Not comp — alignment. The CEO and the CRO need to agree on scope, authority, timeline, resources, and what success actually looks like before the contract is signed. After you sign, your leverage disappears. Every misalignment you don't surface in the interview becomes a landmine in month three.",
    whyStuck: "Because the interview process rewards confidence, not preparation. You're being selected for how you make people feel, not for whether the role is actually set up for you to succeed.",
    stopDoing: [
      'Treating the CRO interview like a sales pitch about your track record',
      'Accepting the role description at face value without pressure-testing it',
      'Negotiating comp and title while ignoring scope, authority, and runway',
    ],
    startDoing: [
      'Running a Reverse Interview — you should be evaluating them as much as they evaluate you',
      'Aligning with the CEO on what the role actually is before you sign — scope, authority, decision rights, timeline',
      "Preparing for the first 90 days now, not after you start — the onboarding plan should be part of the negotiation",
    ],
    insights: [
      'The interview is the highest-leverage moment in the entire CRO engagement — more gets decided here than in any board meeting',
      'CEO-CRO alignment before signature is the single biggest predictor of tenure',
      'The candidates who ask the hardest questions in interviews are the ones who get the best offers',
    ],
    offering: 'CRO Interview Program',
    cta: 'Get coached through the interview process and build the CEO-CRO alignment strategy that makes the role work before you sign.',
  },

  // ═══════════════════════════════════════
  // CRO IN TRANSITION
  // ═══════════════════════════════════════
  [resultKey('cro-transition', 'panda-problem')]: {
    name: 'The Panda Problem',
    subtitle: "You didn't fail. The environment failed you.",
    description: "You just left a role — fired, pushed out, or quit before it got worse. You're carrying the weight of it. But here's what you need to hear: you were set up to fail. The company hired a CRO without building the conditions for one to succeed.",
    commentary: "You're probably replaying everything in your head. What you could have done differently. Why you didn't see the red flags. Some of that reflection is useful. But I need you to separate your performance from the conditions you performed in. If the company didn't give you the AARR — Authority, Autonomy, Resources, Runway — then it didn't matter how good you were. Pandas die in the wrong habitat. That's not a character flaw. It's biology.",
    whyStuck: "Because failure feels personal even when it isn't. The temptation is to take the next thing quickly to prove you're not damaged goods. That impulse is the most dangerous thing you can act on right now.",
    stopDoing: [
      'Blaming yourself for outcomes the environment made inevitable',
      'Rushing into the next role to prove something',
      "Hiding what happened — every CRO has a story like this",
    ],
    startDoing: [
      "Debriefing honestly: conditions, when you knew, what you'd change",
      'Building a red flag checklist — the AARR framework is your filter now',
      "Taking time to figure out what you want, not just what's available",
    ],
    insights: [
      "The failure wasn't theirs — but the next one will be if they don't learn from the environment",
      'The story of what happened, told honestly and with insight, is actually a strength in interviews',
      'The best next move is a deliberate one, not a fast one',
    ],
    offering: 'CRO in Transition Program',
    cta: "Let's debrief what happened, rebuild your positioning, and make sure the next role is the right one.",
  },

  [resultKey('cro-transition', 'miscast-role')]: {
    name: 'The Miscast Role',
    subtitle: 'The role was wrong — not you.',
    description: "You took a CRO role and it wasn't what you were told. Maybe the scope shrank. Maybe the company needed a VP Sales and called it CRO. The mismatch between what you signed up for and what you got made it impossible to succeed on terms that mattered to you.",
    commentary: "The interview process for CRO roles is fundamentally broken — companies sell a vision that doesn't match reality, and candidates accept based on conversations that never got specific enough. You probably heard \"you'll own the full revenue org\" and \"we want someone strategic.\" Then you arrived and found out those meant \"manage the sales team\" and \"hit the quarterly number.\" The mismatch wasn't because anyone lied. Both sides were speaking different languages and neither knew it.",
    whyStuck: "Because the pain of a miscast role feels like personal failure. You wonder if you misjudged yourself, not just the company.",
    stopDoing: [
      'Second-guessing your abilities based on a role that was never the right match',
      'Describing what happened vaguely in interviews',
      'Evaluating your next move on title and comp instead of fit',
    ],
    startDoing: [
      'Getting crystal clear on what type of CRO role matches your style',
      'Building a Reverse Interview framework',
      "Understanding the company's actual situation before accepting",
    ],
    insights: [
      "They didn't fail at the CRO job — they succeeded at recognizing a bad fit",
      'The specificity they develop from this experience becomes their biggest advantage',
      'The right fit matters more than the right title — every time',
    ],
    offering: 'CRO in Transition Program',
    cta: "Let's figure out exactly what the right role looks like — and how to verify it before you sign.",
  },

  [resultKey('cro-transition', 'hero-trap')]: {
    name: 'The Hero Trap',
    subtitle: 'You burned out because the org leaned on you instead of building systems.',
    description: "You gave everything. Every deal, every decision, every escalation ran through you. The company got dependent. You got exhausted. And at some point it broke. The cruel irony: the thing that got you praised is the thing that destroyed the role.",
    commentary: "You were celebrated for closing the deal, saving the quarter, handling the escalation. Nobody celebrated the system that wasn't built because nobody missed what never existed. Now you're carrying two things: exhaustion and the knowledge that you'll do it differently next time. That knowledge is worth everything.",
    whyStuck: "Because heroes don't see themselves as the problem. The Hero Trap feels like dedication. Recognizing that it was a failure mode — not of character but of approach — takes real honesty.",
    stopDoing: [
      'Wearing burnout as a badge of effort',
      'Looking for "a place to make impact" without defining what that means structurally',
      'Defaulting to the hero playbook when the next job gets hard',
    ],
    startDoing: [
      'Defining non-negotiables: what systems must exist before you walk in',
      'Developing a 90-day plan that prioritizes system-building over personal performance',
      'Practicing: "what would need to be true for this to work without me?"',
    ],
    insights: [
      'The hero approach has a shelf life — it works for 12-18 months and then the physics catch up',
      'The next role needs to be evaluated on whether the company will let you build systems',
      "The best CROs aren't the hardest workers — they're the ones who make themselves unnecessary",
    ],
    offering: 'CRO in Transition Program',
    cta: "Let's debrief the pattern, rebuild your operating model, and make sure the next role doesn't burn you the same way.",
  },

  [resultKey('cro-transition', 'the-reset')]: {
    name: 'The Reset',
    subtitle: "Before you figure out what's next, let's figure out what actually happened.",
    description: "You're between roles and not entirely sure how you got here. Maybe it was political. Maybe performance. Maybe the company changed direction. You don't have a clean narrative yet — and that ambiguity is eating at you. The instinct is to move fast. That instinct is wrong.",
    commentary: 'The CROs who struggle most in transition are the ones who never process what happened. They jump into the next role carrying unresolved questions and unexamined patterns. The market will ask you what happened. Your next CEO will ask. "It wasn\'t a good fit" isn\'t good enough. You need to understand — really understand — what went wrong, what was in your control, and what you\'d do differently. Not as therapy. As strategy.',
    whyStuck: "Because ambiguity is uncomfortable, and action feels better than reflection. The job market rewards motion. Sitting with uncertainty feels like falling behind. But moving forward without clarity is how you repeat the pattern.",
    stopDoing: [
      'Rushing into the next role to make the discomfort go away',
      'Telling a vague story — vagueness reads as evasion',
      'Treating this as a gap to hide instead of a transition to use',
    ],
    startDoing: [
      'Honest debrief with someone who will push back on your narrative',
      'Building a specific story that demonstrates self-awareness, not bitterness',
      'Getting strategic: what do you actually want, what kind of company, what conditions',
    ],
    insights: [
      "The ambiguity isn't weakness — it's data that hasn't been processed yet",
      'The story they build from this transition becomes one of their most powerful interview tools',
      'The leaders who take the time to reset properly end up in dramatically better roles',
    ],
    offering: 'CRO in Transition Program',
    cta: "This is exactly what the program is built for — make sense of what happened and build the strategy for what's next.",
  },

  // ═══════════════════════════════════════
  // PE OPERATING PARTNER
  // ═══════════════════════════════════════
  [resultKey('pe-operator', 'revolving-door')]: {
    name: 'The Revolving Door',
    subtitle: 'You keep installing CROs across portfolio and they keep churning.',
    description: "This isn't a one-company problem. Across your portfolio, revenue leaders are churning at a rate that should be alarming. Different companies, different industries, different people — same result. The playbook that installs these leaders is the same playbook every time.",
    commentary: "PE firms tend to manage revenue leadership the same way across portfolio — a standard CRO profile, standard expectations, standard timelines. \"Standard\" doesn't account for whether each company is actually ready for a CRO, what type they need, or whether the environment can support one. You install a strong operator into a company that hasn't done the groundwork, give them 12-18 months, then replace when it doesn't work. This isn't a portfolio of individual failures. It's a systematic approach that produces predictable churn.",
    whyStuck: "Because the PE model rewards standardization. You want repeatable playbooks across portfolio. But revenue leadership isn't something you can standardize — each company's readiness, stage, and needs are different.",
    stopDoing: [
      'Using the same CRO profile and timeline across every portfolio company',
      'Blaming the individual when the engagement follows the same arc',
      'Treating CRO installation as plug-and-play',
    ],
    startDoing: [
      "Assessing each company's CRO-readiness before making the hire",
      'Matching CRO type (Builder/Optimizer/Turnaround/Scaling) to actual stage',
      'Building onboarding infrastructure that gives each CRO a real chance',
    ],
    insights: [
      "The churn isn't bad luck or bad talent — it's a broken process applied consistently",
      'CRO-readiness assessment before the hire would prevent most of these failures',
      'The cost of getting this right is a fraction of the cost of the revolving door',
    ],
    offering: 'Advisory + CRO Readiness',
    cta: "Let's assess your portfolio companies for CRO-readiness before the next install — and fix the playbook producing the churn.",
  },

  [resultKey('pe-operator', 'panda-problem')]: {
    name: 'The Panda Problem',
    subtitle: "Your portfolio companies aren't set up to support the leaders you're placing.",
    description: "You're hiring strong revenue leaders — experienced, capable, proven. And they're underperforming. Not because of skill. Because the companies they're walking into don't have the infrastructure, authority models, or cultural readiness to let a CRO succeed.",
    commentary: "When a PE firm installs a CRO, the expectation is: professionalize revenue, accelerate growth, create board metrics. What's not reasonable is expecting this when the company has never had a real revenue leader, the CEO runs everything, the data doesn't exist, and CRO authority was never established. The talent you're placing is walking into a system that doesn't have room for them.",
    whyStuck: "Because from the PE side, the investment thesis is clear: install revenue leadership, accelerate growth, increase enterprise value. The logic is sound. What's missing is the readiness layer.",
    stopDoing: [
      'Placing CROs into companies not assessed for readiness',
      'Assuming a strong hire will overcome a weak environment',
      'Setting 12-month timelines without accounting for baseline conditions',
    ],
    startDoing: [
      'Running CRO-readiness assessments before making the hire',
      'Building infrastructure before or alongside the CRO hire',
      'Adjusting timeline expectations based on actual readiness',
    ],
    insights: [
      'The readiness gap is the #1 predictor of CRO failure — more than talent or pedigree',
      'A 90-day readiness investment before the hire pays for itself many times over',
      'A readiness framework becomes a competitive advantage for the entire firm',
    ],
    offering: 'Advisory + CRO Readiness',
    cta: "Let's build a readiness framework for your portfolio — assess before you place, and the outcomes change dramatically.",
  },

  [resultKey('pe-operator', 'forecast-theater')]: {
    name: 'Forecast Theater',
    subtitle: "Revenue looks solid on paper. The system underneath doesn't exist.",
    description: "Portfolio companies are reporting healthy numbers. But when you dig in, confidence is thin. Forecasts are gut feel. Pipeline coverage is overstated. Revenue concentration risk is hidden in the aggregate.",
    commentary: "Board meetings follow a familiar script: revenue leader presents the number, explains variance, talks pipeline with confidence. Nobody asks: what is the system that produces this number? Is it repeatable? Could a different person produce the same outcome? In most cases, no. That's not a business — it's a performance. And performances end.",
    whyStuck: "Because the numbers aren't bad. It's hard to justify intervention when the portfolio is growing. But the difference between revenue and a revenue system is the difference between a growing company and a valuable one.",
    stopDoing: [
      "Accepting forecasts nobody can explain the mechanics behind",
      'Confusing revenue growth with revenue system maturity',
      'Letting "we hit the number" end the conversation',
    ],
    startDoing: [
      'Assessing revenue system maturity across portfolio',
      'Asking revenue leaders to present the system, not just the forecast',
      'Investing in the governance layer that makes revenue predictable',
    ],
    insights: [
      'Revenue system maturity is a better predictor of enterprise value than revenue growth rate',
      'The portfolio companies with real systems are worth more and survive leadership transitions',
      'Building this assessment into portfolio operations is a firm-wide competitive advantage',
    ],
    offering: 'Advisory',
    cta: "Let's assess revenue system maturity across your portfolio — the companies with real systems command real multiples.",
  },

  [resultKey('pe-operator', 'leadership-gap')]: {
    name: 'The Leadership Gap',
    subtitle: "You're forcing the CRO hire before companies are ready for one.",
    description: "The investment thesis says \"install revenue leadership.\" The timeline says \"now.\" But some portfolio companies aren't ready. They don't have the data infrastructure, organizational maturity, or cultural readiness. Forcing the hire before readiness is the most expensive mistake in PE revenue leadership.",
    commentary: "The investment closes, the value creation plan gets drafted, and somewhere on page 3 it says \"hire CRO\" within the first 6 months. Nobody asks if the company is ready. They assume the CRO will create readiness. That's backwards. Hiring a CRO to create CRO-readiness is like hiring an architect to build on land you haven't surveyed. A 90-day readiness investment that leads to a 3-year tenure is infinitely more valuable than a fast hire that churns in 14 months.",
    whyStuck: "Because the PE model rewards speed. Every month without revenue leadership feels like value leaking. But the math is simple: a 90-day readiness investment beats a 14-month churn cycle every time.",
    stopDoing: [
      'Putting "hire CRO" on value creation plans without a readiness gate',
      'Treating all portfolio companies as same-stage',
      'Measuring the operating team on speed of hire vs. quality of outcome',
    ],
    startDoing: [
      'Adding CRO-readiness assessment to post-acquisition playbook',
      'Sequencing: some companies need fractional/interim before permanent',
      'Building readiness benchmarks the operating team can use across portfolio',
    ],
    insights: [
      'The "hire fast" instinct is costing more than the "assess first" discipline ever would',
      "CRO-readiness isn't a nice-to-have — it's a predictable driver of retention and performance",
      'Firms that build this into their operating model will outperform the install-and-replace game',
    ],
    offering: 'Advisory + CRO Readiness',
    cta: "Let's build a readiness gate into your portfolio operating model — assess first, hire right, and the tenure math changes completely.",
  },
};

export function getResult(icp: ICP, archetype: Archetype): ArchetypeContent | undefined {
  return results[resultKey(icp, archetype)];
}

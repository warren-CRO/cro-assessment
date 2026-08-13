import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Packer,
  Header,
  Footer,
  PageNumber,
  PageBreak,
} from 'docx'
import { writeFileSync } from 'fs'

const NAVY = '00164D'
const BLUE = '3778F4'
const SLATE = '3C3C3E'
const GRAY = '6B7280'
const GOLD = 'FFBB00'
const RULE = 'CCCCCC'
const CYAN = '1AA0D0'
const RED = 'EF476F'

function h1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 200 },
    children: [new TextRun({ text, font: 'Archivo', size: 36, color: NAVY, bold: true })],
  })
}

function h2(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: RULE } },
    children: [new TextRun({ text: text.toUpperCase(), font: 'Archivo', size: 22, color: NAVY, bold: true })],
  })
}

function h3(text: string) {
  return new Paragraph({
    spacing: { before: 300, after: 120 },
    children: [new TextRun({ text, font: 'Archivo', size: 24, color: NAVY, bold: true })],
  })
}

function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string }) {
  return new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text, font: 'Inter', size: 21, color: opts?.color ?? SLATE, bold: opts?.bold, italics: opts?.italic })],
  })
}

function bodyMulti(...runs: { text: string; bold?: boolean; italic?: boolean; color?: string }[]) {
  return new Paragraph({
    spacing: { after: 160 },
    children: runs.map(r => new TextRun({ text: r.text, font: 'Inter', size: 21, color: r.color ?? SLATE, bold: r.bold, italics: r.italic })),
  })
}

function bullet(text: string) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, font: 'Inter', size: 21, color: SLATE })],
  })
}

function spacer(size = 120) {
  return new Paragraph({ spacing: { after: size }, children: [] })
}

function statLine(value: string, label: string, source: string) {
  return new Paragraph({
    spacing: { after: 100 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: value, font: 'Archivo', size: 24, color: NAVY, bold: true }),
      new TextRun({ text: `  ${label}`, font: 'Inter', size: 21, color: SLATE }),
      new TextRun({ text: `  (${source})`, font: 'Inter', size: 18, color: GRAY, italics: true }),
    ],
  })
}

function failureItem(num: number, name: string, desc: string) {
  return [
    new Paragraph({
      spacing: { before: 200, after: 40 },
      children: [
        new TextRun({ text: `${num}. `, font: 'Archivo', size: 21, color: BLUE, bold: true }),
        new TextRun({ text: name, font: 'Archivo', size: 21, color: NAVY, bold: true }),
      ],
    }),
    body(desc, { color: GRAY }),
  ]
}

function dimLine(id: string, name: string, desc: string, critical = false) {
  const runs: { text: string; bold?: boolean; color?: string }[] = [
    { text: `${id}  `, color: GRAY },
    { text: name, bold: true, color: NAVY },
  ]
  if (critical) runs.push({ text: '  [CRITICAL]', bold: true, color: RED })
  runs.push({ text: ` — ${desc}`, color: GRAY })
  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360 },
    children: runs.map(r => new TextRun({ text: r.text, font: 'Inter', size: 20, color: r.color ?? SLATE, bold: r.bold })),
  })
}

async function build() {
  const children: Paragraph[] = []

  // ─── TITLE PAGE ───
  children.push(spacer(600))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'THE CRO COLLECTIVE', font: 'Archivo', size: 20, color: GOLD, bold: true })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: 'The CRO Readiness Crisis:', font: 'Archivo', size: 44, color: NAVY, bold: true })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Why 70% of CROs Fail and', font: 'Archivo', size: 44, color: NAVY, bold: true })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'What Companies Get Wrong', font: 'Archivo', size: 44, color: NAVY, bold: true })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: BLUE } },
    children: [],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: 'By Warren Zenna & Derek Sather', font: 'Inter', size: 22, color: GRAY })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: 'The CRO Collective | 2026', font: 'Inter', size: 22, color: GRAY })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: 'thecrocollective.com', font: 'Inter', size: 20, color: BLUE })],
  }))

  // Page break
  children.push(new Paragraph({ children: [new TextRun({ children: [PageBreak.BEFORE] })] }))

  // ─── EXECUTIVE SUMMARY ───
  children.push(h2('Executive Summary'))
  children.push(body('The Chief Revenue Officer role has become one of the most structurally broken seats in the C-suite. With average tenure under 18 months and replacement costs between $1.5M and $4M per failed hire, the CRO position represents both the highest-leverage and highest-risk executive investment a company can make.'))
  children.push(bodyMulti(
    { text: 'This overview presents research from The CRO Collective\'s analysis of hundreds of CRO engagements across growth-stage and PE-backed B2B companies. The central finding: ' },
    { text: 'CRO failure is not a talent problem — it is a structural readiness problem.', bold: true },
    { text: ' Companies that score below threshold on organizational readiness dimensions will fail their CRO hire regardless of the candidate\'s resume.' },
  ))

  // ─── THE PROBLEM ───
  children.push(h2('The Problem: A $4M Mistake on Repeat'))
  children.push(spacer(80))
  children.push(statLine('18 months', 'Average CRO tenure', 'Korn Ferry, 2023'))
  children.push(statLine('70%', 'Involuntary departures', 'Forrester Research'))
  children.push(statLine('$1.5–4M', 'Cost per failed hire', 'Search + salary + opportunity cost'))
  children.push(statLine('91%', 'Miss year-one targets', 'SBI Growth Advisory'))
  children.push(spacer(120))
  children.push(body('Companies keep making the same hire the same way, expecting different results. The board pressures the CEO, the CEO hires a search firm, the search firm produces candidates who look right on paper, and 12–18 months later the CRO is gone.'))
  children.push(bodyMulti(
    { text: 'The assumption behind this pattern is that CRO success is a talent problem. Our research shows the opposite. ' },
    { text: 'The #1 predictor of CRO success is not the person. It\'s whether the company was structurally ready for one.', bold: true },
  ))

  // Pull quote
  children.push(spacer(120))
  children.push(new Paragraph({
    spacing: { after: 40 },
    indent: { left: 480, right: 480 },
    children: [new TextRun({
      text: '"Companies bought something they didn\'t know how to use. They hired a CRO to fix revenue — but the system the CRO was supposed to operate within didn\'t exist yet. No architecture, no alignment, no governance. Just a title and an expectation."',
      font: 'Inter', size: 22, color: NAVY, italics: true,
    })],
  }))
  children.push(new Paragraph({
    spacing: { after: 200 },
    indent: { left: 480 },
    children: [new TextRun({ text: '— Warren Zenna, Founder, The CRO Collective', font: 'Inter', size: 18, color: GRAY })],
  }))

  // ─── SIX FAILURE PATTERNS ───
  children.push(h2('The Six Predictable Failure Patterns'))
  children.push(body('CRO failures are not random. They cluster into six systemic patterns that are identifiable before the hire is made — and preventable if addressed.'))
  children.push(...failureItem(1, 'Role Definition Ambiguity',
    '50% of CROs cite role ambiguity as their primary obstacle. The company hasn\'t decided what a CRO actually does — Super VP of Sales or cross-functional revenue architect? Without defined scope, authority, and success metrics, the CRO walks into an organization that doesn\'t know what it hired.'))
  children.push(...failureItem(2, 'CEO Expectation Misalignment',
    'Hired to Build, Evaluated to Sell. The CEO says "transform the revenue engine" but measures quarterly bookings. Comp plans reward new logos when the mandate was retention and expansion. The spoken mandate and the measured mandate are different things.'))
  children.push(...failureItem(3, 'The Founder Control Dynamic',
    'Responsibility without authority. The CEO can\'t let go — still approves every deal, overrides pricing, sits in on pipeline reviews. The CRO becomes a buffer between the founder and the sales team, not a leader.'))
  children.push(...failureItem(4, 'Cross-Functional Warfare',
    'VP of Marketing and VP of Sales treat the CRO as a threat, not a leader. Without CEO-backed authority and governance structure, the CRO spends year one fighting political battles instead of building revenue architecture.'))
  children.push(...failureItem(5, 'The PE Pressure Dynamic',
    '58% of CROs in newly acquired PE portcos are replaced within 24 months. Aggressive growth theses meet operational reality with no transformation timeline, and the CRO absorbs the blame.'))
  children.push(...failureItem(6, 'Stage Mismatch',
    'Externally hired CROs with prior CRO experience produced a 7.1% revenue decline vs. 1.1% for first-time CROs promoted internally. The issue isn\'t experience — it\'s fit. A Builder CRO in a Scale seat will underperform regardless of pedigree.'))

  // Page break
  children.push(new Paragraph({ children: [new TextRun({ children: [PageBreak.BEFORE] })] }))

  // ─── 10-DIMENSION FRAMEWORK ───
  children.push(h2('The 10-Dimension CRO-Readiness Framework'))
  children.push(body('To move CRO hiring from intuition to architecture, The CRO Collective developed a diagnostic that scores organizational readiness across 10 dimensions. Each dimension is scored 1–5 (total 50), mapping to a readiness band that determines what kind of CRO role — if any — the company can support.'))

  children.push(h3('The Three-Layer Readiness Architecture'))
  children.push(body('The 10 dimensions form layered dependencies. Think of them as load-bearing floors: skip one, and everything above it is unstable.'))

  // Strategic
  children.push(spacer(120))
  children.push(new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: '▎ ', font: 'Inter', size: 21, color: GOLD }),
      new TextRun({ text: 'STRATEGIC LAYER', font: 'Archivo', size: 20, color: NAVY, bold: true }),
      new TextRun({ text: '  — The Ceiling', font: 'Inter', size: 18, color: GRAY, italics: true }),
    ],
  }))
  children.push(dimLine('D1', 'CEO Alignment', 'Does the CEO genuinely want a partner who owns end-to-end revenue?', true))
  children.push(dimLine('D9', 'Board Support', 'Will the board give the CRO enough runway to execute a transformation?', true))
  children.push(dimLine('D10', 'Market Position', 'Does the market context support the growth the CRO is being hired to deliver?'))

  // Operational
  children.push(spacer(120))
  children.push(new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: '▎ ', font: 'Inter', size: 21, color: BLUE }),
      new TextRun({ text: 'OPERATIONAL LAYER', font: 'Archivo', size: 20, color: NAVY, bold: true }),
      new TextRun({ text: '  — The Execution Engine', font: 'Inter', size: 18, color: GRAY, italics: true }),
    ],
  }))
  children.push(dimLine('D4', 'Process Maturity', 'Are there processes to improve, or must the CRO build from scratch?'))
  children.push(dimLine('D5', 'Tech Stack Readiness', 'Does the technology enable or obstruct revenue operations?'))
  children.push(dimLine('D7', 'Financial Transparency', 'Can leadership see the numbers they need to make decisions?'))
  children.push(dimLine('D8', 'Cross-Functional Governance', 'Are there structures for Sales, Marketing, and CS to work together?'))

  // Foundational
  children.push(spacer(120))
  children.push(new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: '▎ ', font: 'Inter', size: 21, color: CYAN }),
      new TextRun({ text: 'FOUNDATIONAL LAYER', font: 'Archivo', size: 20, color: NAVY, bold: true }),
      new TextRun({ text: '  — Must Be in Place First', font: 'Inter', size: 18, color: GRAY, italics: true }),
    ],
  }))
  children.push(dimLine('D2', 'Data Maturity', 'Can you make decisions based on the data that exists today?'))
  children.push(dimLine('D3', 'Team Readiness', 'Does the revenue team have the capability to execute a CRO\'s strategy?'))
  children.push(dimLine('D6', 'Cultural Readiness', 'Will the culture support or resist the changes a CRO brings?'))

  // Critical override
  children.push(spacer(120))
  children.push(bodyMulti(
    { text: 'Critical Override Rule: ', bold: true, color: RED },
    { text: 'If CEO Alignment (D1) or Board Support (D9) scores 2 or below, the company is rated Critical regardless of aggregate score. No aggregate score compensates for a CEO who doesn\'t want a partner or a board that won\'t give runway.', color: GRAY },
  ))

  // ─── FOUR CRO TYPES ───
  children.push(h2('The Four CRO Types'))
  children.push(body('Not all CROs do the same job. The damage happens at the mismatch — a Strategic CRO in a Super VP of Sales seat gets frustrated; a tactical sales leader in a Full-Stack seat drowns.'))
  children.push(spacer(80))

  for (const t of [
    { type: 'Super VP of Sales (~40%)', stage: 'Common under $25M', desc: 'Tactical sales leadership with a CRO title. Focused on pipeline, quota, and team management.' },
    { type: 'Revenue Owner (~35%)', stage: '$10M–$75M', desc: 'Owns the revenue number across functions but primarily through a sales lens. The most common — and most commonly misunderstood — variant.' },
    { type: 'Full-Stack CRO (~15%)', stage: '$50M–$200M', desc: 'True cross-functional revenue leader: Sales + Marketing + CS + RevOps integrated. Requires high organizational maturity.' },
    { type: 'Strategic CRO (~10%)', stage: '$200M+', desc: 'Board-level strategist focused on revenue architecture, market positioning, and organizational design. The rarest and most misplaced.' },
  ]) {
    children.push(new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: t.type, font: 'Archivo', size: 21, color: NAVY, bold: true }),
        new TextRun({ text: `  [${t.stage}]`, font: 'Inter', size: 18, color: GRAY }),
      ],
    }))
    children.push(body(t.desc, { color: GRAY }))
  }

  // ─── WHAT TO DO DIFFERENTLY ───
  children.push(h2('What Companies Should Do Differently'))
  children.push(body('The path from "we need a CRO" to a successful hire has three phases — and most companies skip the first two.'))

  children.push(h3('Phase 1: Diagnose Before You Search'))
  children.push(bullet('Score your organization across the 10 readiness dimensions'))
  children.push(bullet('Identify which failure patterns you\'re at risk for'))
  children.push(bullet('Determine which CRO type matches your stage'))
  children.push(bullet('Build the CEO Alignment Document before talking to candidates'))

  children.push(h3('Phase 2: Fix the Structure Before You Hire'))
  children.push(bullet('Close readiness gaps in the Foundational and Operational layers'))
  children.push(bullet('Define role scope, authority boundaries, and success metrics'))
  children.push(bullet('Align the board on transformation timeline'))
  children.push(bullet('Build cross-functional governance the CRO can inherit'))

  children.push(h3('Phase 3: Architect the Role, Then Find the Person'))
  children.push(bullet('Write a CRO job description matched to your readiness profile'))
  children.push(bullet('Design the 90-day onboarding architecture'))
  children.push(bullet('Establish CEO-CRO operating cadence and escalation protocols'))
  children.push(bullet('Plan the first board presentation as a joint deliverable'))

  // Page break
  children.push(new Paragraph({ children: [new TextRun({ children: [PageBreak.BEFORE] })] }))

  // ─── OFFERINGS ───
  children.push(h2('Our CRO Solutions & Programs'))
  children.push(body('The CRO Collective is the only firm built around the CRO role itself — from diagnosis to deployment to ongoing operating support. Each program addresses a specific phase of the CRO lifecycle.'))
  children.push(spacer(80))

  for (const o of [
    { name: 'CRO Readiness Assessment', desc: 'Free diagnostic. Score your organization across 10 dimensions, identify failure patterns, and get a CRO type recommendation — before you write the check.' },
    { name: 'CRO Readiness Architecture Implementation', desc: 'Close the gaps the assessment found. Full-scope consulting: stakeholder alignment, process design, governance setup, role architecture — everything between diagnosis and a successful CRO hire.' },
    { name: 'CRO Accelerator', desc: 'The only comprehensive development program for sitting and aspiring CROs. 20 modules, cohort-based, with applied frameworks from day one.' },
    { name: 'Interim CRO Bridge Program', desc: 'Don\'t let a vacant CRO seat cost you a year. 90-day operational revenue leadership while you hire — from people who\'ve run revenue functions, not theorized about them.' },
    { name: 'CRO in Transition', desc: 'Career architecture for CROs between roles. Positioning, narrative, network activation, and a diagnostic of what kind of seat you should take next.' },
    { name: 'CRO Roundtable Sponsorship', desc: 'Intimate executive dinners with CROs, CEOs, and PE partners in 14+ cities. Put your brand in the room where revenue leadership decisions get made.' },
  ]) {
    children.push(new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: o.name, font: 'Archivo', size: 21, color: NAVY, bold: true })],
    }))
    children.push(body(o.desc, { color: GRAY }))
  }

  // ─── CTA ───
  children.push(spacer(300))
  children.push(new Paragraph({
    spacing: { after: 60 },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: BLUE } },
    children: [],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: 'Ready to Assess Your Organization?', font: 'Archivo', size: 28, color: NAVY, bold: true })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Take the free CRO Readiness Assessment at cro-assessment.vercel.app/readiness', font: 'Inter', size: 21, color: BLUE })],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Or book a discovery call: calendly.com/warren-zenna/cro-readiness-discovery', font: 'Inter', size: 21, color: GRAY })],
  }))

  // Footer disclaimer
  children.push(spacer(200))
  children.push(body('© 2026 The CRO Collective. All rights reserved. — thecrocollective.com', { color: GRAY }))

  const doc = new Document({
    styles: {
      default: {
        heading1: { run: { font: 'Archivo', size: 36, color: NAVY, bold: true }, paragraph: { spacing: { after: 200 } } },
        heading2: { run: { font: 'Archivo', size: 22, color: NAVY, bold: true }, paragraph: { spacing: { before: 400, after: 160 } } },
      },
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1200, left: 1440, right: 1440 },
          pageNumbers: { start: 1 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'The CRO Collective  |  Confidential', font: 'Inter', size: 16, color: GRAY })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'thecrocollective.com  |  Page ', font: 'Inter', size: 16, color: GRAY }),
              new TextRun({ children: [PageNumber.CURRENT], font: 'Inter', size: 16, color: GRAY }),
            ],
          })],
        }),
      },
      children,
    }],
  })

  const buffer = await Packer.toBuffer(doc)
  const outPath = new URL('../dist/CRO-Readiness-Overview-The-CRO-Collective.docx', import.meta.url).pathname
  writeFileSync(outPath, buffer)
  console.log(`✓ Written to ${outPath}`)

  const downloadsPath = `${process.env.HOME}/Downloads/CRO-Readiness-Overview-The-CRO-Collective.docx`
  writeFileSync(downloadsPath, buffer)
  console.log(`✓ Copied to ${downloadsPath}`)
}

build()

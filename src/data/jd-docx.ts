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
} from 'docx'
import type { GeneratedJD } from './jd-generator'

const NAVY = '00164D'
const BLUE = '3778F4'
const SLATE = '3C3C3E'
const GRAY = '6B7280'
const RULE = 'CCCCCC'

function sectionHeading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: RULE } },
    children: [
      new TextRun({ text: text.toUpperCase(), font: 'Archivo', size: 22, color: NAVY, bold: true }),
    ],
  })
}

function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; spacing?: { before?: number; after?: number } }) {
  return new Paragraph({
    spacing: opts?.spacing ?? { after: 160 },
    children: [
      new TextRun({
        text,
        font: 'Inter',
        size: 21,
        color: opts?.color ?? SLATE,
        bold: opts?.bold,
        italics: opts?.italic,
      }),
    ],
  })
}

function bullet(text: string, opts?: { bold?: boolean; color?: string }) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 100 },
    children: [
      new TextRun({
        text,
        font: 'Inter',
        size: 21,
        color: opts?.color ?? SLATE,
        bold: opts?.bold,
      }),
    ],
  })
}

function spacer(size = 120) {
  return new Paragraph({ spacing: { after: size }, children: [] })
}

export async function downloadJDAsDocx(jd: GeneratedJD) {
  const children: Paragraph[] = []

  // Title block
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({ text: 'THE CRO COLLECTIVE', font: 'Archivo', size: 18, color: GRAY, bold: true }),
    ],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: jd.title, font: 'Archivo', size: 40, color: NAVY, bold: true }),
    ],
  }))
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({ text: jd.subtitle, font: 'Inter', size: 22, color: GRAY, italics: true }),
    ],
  }))
  children.push(new Paragraph({
    spacing: { after: 300 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: BLUE } },
    children: [],
  }))

  // Readiness warnings
  if (jd.readinessWarnings.length > 0) {
    children.push(sectionHeading('Readiness Advisory'))
    for (const warning of jd.readinessWarnings) {
      children.push(new Paragraph({
        spacing: { after: 120 },
        indent: { left: 200 },
        children: [
          new TextRun({ text: 'NOTE: ', font: 'Inter', size: 21, color: NAVY, bold: true }),
          new TextRun({ text: warning, font: 'Inter', size: 21, color: SLATE }),
        ],
      }))
    }
  }

  // About the Role
  children.push(sectionHeading('About the Role'))
  children.push(body(jd.companyContext))
  children.push(body(jd.roleSummary))

  // Scope & Ownership
  children.push(sectionHeading('Scope & Ownership'))
  for (const area of jd.scopeAreas) {
    children.push(bullet(area))
  }

  // Key Responsibilities
  children.push(sectionHeading('Key Responsibilities'))
  for (const resp of jd.responsibilities) {
    children.push(bullet(resp))
  }

  // First 90 Days
  children.push(sectionHeading('Critical First 90 Days'))
  children.push(body(
    'These priorities reflect specific readiness conditions identified in the assessment. The CRO should enter with a plan that addresses these directly.',
    { italic: true, color: GRAY },
  ))
  children.push(spacer(80))
  for (const item of jd.firstNinetyDays) {
    children.push(new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: item.priority, font: 'Archivo', size: 21, color: NAVY, bold: true }),
      ],
    }))
    children.push(body(item.detail, { color: GRAY, spacing: { after: 200 } }))
  }

  // Qualifications — Required
  children.push(sectionHeading('Qualifications'))
  children.push(new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: 'Required', font: 'Archivo', size: 20, color: NAVY, bold: true }),
    ],
  }))
  for (const qual of jd.qualificationsRequired) {
    children.push(bullet(qual))
  }

  // Qualifications — Preferred
  children.push(spacer(160))
  children.push(new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: 'Preferred', font: 'Archivo', size: 20, color: NAVY, bold: true }),
    ],
  }))
  for (const qual of jd.qualificationsPreferred) {
    children.push(bullet(qual, { color: GRAY }))
  }

  // Success Metrics
  children.push(sectionHeading('Success Metrics'))
  for (const period of jd.successMetrics) {
    children.push(new Paragraph({
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({ text: period.timeframe, font: 'Archivo', size: 21, color: BLUE, bold: true }),
      ],
    }))
    for (const metric of period.metrics) {
      children.push(bullet(metric))
    }
  }

  // What This Role Is Not
  children.push(sectionHeading('What This Role Is Not'))
  children.push(body(
    'The most common CRO failures happen when the organization treats the title as one thing and the candidate expects another. Be explicit:',
    { italic: true, color: GRAY },
  ))
  children.push(spacer(80))
  for (const item of jd.notThisRole) {
    children.push(bullet(item))
  }

  // Compensation Guidance
  children.push(sectionHeading('Compensation Guidance'))
  children.push(new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: jd.compensationRange, font: 'Archivo', size: 26, color: NAVY, bold: true }),
    ],
  }))
  children.push(body(
    "Ranges based on The CRO Collective's market data for B2B companies at this revenue stage. Actual compensation varies by geography, industry, and candidate experience. Variable compensation should be tied to metrics the CRO can directly influence.",
    { italic: true, color: GRAY },
  ))

  // Interview Architecture
  children.push(sectionHeading('Interview Architecture'))
  children.push(body(
    'Based on assessment results, these are the areas to probe most deeply during the interview process.',
    { italic: true, color: GRAY },
  ))
  children.push(spacer(80))
  for (const focus of jd.interviewFocus) {
    children.push(new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: focus.area, font: 'Archivo', size: 21, color: NAVY, bold: true }),
      ],
    }))
    children.push(body(focus.why, { color: GRAY, spacing: { after: 200 } }))
  }

  // Footer disclaimer
  children.push(spacer(300))
  children.push(new Paragraph({
    spacing: { after: 60 },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: RULE } },
    children: [],
  }))
  children.push(body(
    "This job description was generated by The CRO Collective's CRO Readiness Assessment based on your organization's specific readiness profile. It should be adapted to your company's voice, industry, and specific requirements.",
    { italic: true, color: GRAY, spacing: { after: 80 } },
  ))
  children.push(body(
    '© 2026 The CRO Collective. All rights reserved. — thecrocollective.com',
    { color: GRAY },
  ))

  const doc = new Document({
    styles: {
      default: {
        heading2: {
          run: { font: 'Archivo', size: 22, color: NAVY, bold: true },
          paragraph: { spacing: { before: 400, after: 160 } },
        },
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
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: 'The CRO Collective  |  Confidential', font: 'Inter', size: 16, color: GRAY }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'thecrocollective.com  |  Page ', font: 'Inter', size: 16, color: GRAY }),
                new TextRun({ children: [PageNumber.CURRENT], font: 'Inter', size: 16, color: GRAY }),
              ],
            }),
          ],
        }),
      },
      children,
    }],
  })

  const blob = await Packer.toBlob(doc)
  const filename = `CRO-Job-Description-${jd.croType.replace(/[^a-zA-Z0-9]/g, '-')}.docx`
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

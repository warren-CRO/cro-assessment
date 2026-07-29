import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name, company, title, linkedin, band, score, role, revenue, funding, hireReason, gaps, dimensionCount } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email required' })
  }

  const notifyEmail = process.env.NOTIFY_EMAIL || 'warren@thecrocollective.com'
  const resendKey = process.env.RESEND_API_KEY

  const isIntake = !!dimensionCount
  const subjectPrefix = isIntake ? 'CRO Assessment Intake' : 'CRO Assessment Lead'

  const gapList = gaps?.length
    ? gaps.map((g: { dimension: string; score: number }) => `  • ${g.dimension}: ${g.score}/5`).join('\n')
    : '  None identified'

  const subject = band
    ? `${subjectPrefix}: ${name || email} — ${band} (${score}/50)`
    : `${subjectPrefix}: ${name || email} (${company || 'unknown company'})`

  const lines = [
    `New CRO Readiness Assessment submission:`,
    ``,
    `Name: ${name || '—'}`,
    `Company: ${company || '—'}`,
    `Title: ${title || '—'}`,
    `Email: ${email}`,
    `LinkedIn: ${linkedin || '—'}`,
    ``,
    `Assessment Context:`,
    `  Role: ${role || '—'}`,
    `  Revenue: ${revenue || '—'}`,
    `  Funding: ${funding || '—'}`,
    `  Hire Reason: ${hireReason || '—'}`,
  ]

  if (band) {
    lines.push(``, `Result: ${band} (${score}/50)`, ``, `Gaps:`, gapList)
  }

  lines.push(``, `---`, `Captured from cro-assessment.vercel.app`)
  const body = lines.join('\n')

  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'CRO Assessment <assessment@thecrocollective.com>',
          to: notifyEmail,
          subject,
          text: body,
        }),
      })
    } catch {
      // notification failed — still capture the lead
    }
  }

  console.log(`[LEAD] ${subject}\n${body}`)

  return res.status(200).json({ ok: true })
}

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, band, score, role, revenue, funding, hireReason, gaps } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email required' })
  }

  const notifyEmail = process.env.NOTIFY_EMAIL || 'warren@thecrocollective.com'
  const resendKey = process.env.RESEND_API_KEY

  const gapList = gaps?.length
    ? gaps.map((g: { dimension: string; score: number }) => `  • ${g.dimension}: ${g.score}/5`).join('\n')
    : '  None identified'

  const subject = `CRO Readiness Lead: ${email} — ${band} (${score}/50)`
  const body = [
    `New CRO Readiness Assessment submission:`,
    ``,
    `Email: ${email}`,
    `Band: ${band} (${score}/50)`,
    `Role: ${role}`,
    `Revenue: ${revenue}`,
    `Funding: ${funding}`,
    `Hire Reason: ${hireReason}`,
    ``,
    `Gaps:`,
    gapList,
    ``,
    `---`,
    `Captured from cro-assessment.vercel.app`,
  ].join('\n')

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

  // Log to Vercel function logs as backup
  console.log(`[LEAD] ${subject}\n${body}`)

  return res.status(200).json({ ok: true })
}

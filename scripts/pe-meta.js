import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const html = readFileSync('dist/index.html', 'utf8')

const peHtml = html
  .replace(
    '<title>Revenue Leadership Diagnostic | The CRO Collective</title>',
    '<title>PE Revenue Infrastructure Diagnostic | The CRO Collective</title>'
  )
  .replace(
    'content="Find out what\'s really going on with your revenue leadership in 3 minutes. Personalized diagnosis, actionable insights, and a clear next step."',
    'content="58% of CROs in PE-backed companies are replaced within 24 months. This diagnostic shows operating partners what\'s hiding in the org chart before it breaks the next leader."'
  )
  .replaceAll(
    'content="Is Your Approach to Revenue Leadership Actually Working?"',
    'content="Revenue Infrastructure Due Diligence for PE Operating Partners"'
  )
  .replaceAll(
    'content="Most companies don\'t have a revenue problem — they have a revenue leadership problem. Take the 3-minute diagnostic."',
    'content="58% of CROs in PE-backed companies are replaced within 24 months. Discover the structural risk hiding in the org chart — 18 questions, under 10 minutes."'
  )
  .replace(
    'content="https://cro-assessment.pages.dev"',
    'content="https://cro-assessment.pages.dev/pe"'
  )

mkdirSync('dist/pe', { recursive: true })
writeFileSync('dist/pe/index.html', peHtml)
console.log('✓ PE meta tags written to dist/pe/index.html')

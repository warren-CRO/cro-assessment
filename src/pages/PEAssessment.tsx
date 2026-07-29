import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { peQuestions } from '../data/pe-questions'
import type { PEAnswers, DetectedPattern, DetectedCompound } from '../data/pe-types'
import { detectPatterns } from '../data/pe-detection'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function trackEvent(eventName: string, params?: Record<string, string | number>) {
  window.gtag?.('event', eventName, params)
}

// TODO: Warren to create Google Apps Script web app and paste URL here
const SHEETS_ENDPOINT = ''

async function submitToSheets(answers: PEAnswers, patterns: DetectedPattern[], compounds: DetectedCompound[]) {
  if (!SHEETS_ENDPOINT) return
  try {
    await fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...answers,
        detectedPatterns: patterns.map(p => `${p.pattern}:${p.confidence}`).join(', '),
        compoundPatterns: compounds.map(c => c.compound).join(', '),
        patternCount: patterns.length,
      }),
    })
  } catch {
    // fire-and-forget
  }
}

export default function PEAssessment() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<PEAnswers>({})
  const [animating, setAnimating] = useState(false)

  const activeQuestions = useMemo(() =>
    peQuestions.filter(q => {
      if (!q.conditional) return true
      const fieldValue = answers[q.conditional.field]
      return fieldValue !== undefined && q.conditional.showWhen.includes(fieldValue as string)
    }),
  [answers])

  const currentQuestion = activeQuestions[stepIndex]
  const totalSteps = activeQuestions.length

  const advance = useCallback((value: string) => {
    if (!currentQuestion) return
    setAnimating(true)

    const updatedAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(updatedAnswers)

    trackEvent('pe_step', {
      step: currentQuestion.id,
      value,
      stepNumber: stepIndex + 1,
    })

    setTimeout(() => {
      const nextQuestions = peQuestions.filter(q => {
        if (!q.conditional) return true
        const fieldValue = updatedAnswers[q.conditional.field]
        return fieldValue !== undefined && q.conditional.showWhen.includes(fieldValue as string)
      })

      const currentIndexInAll = nextQuestions.findIndex(q => q.id === currentQuestion.id)
      const nextIndex = currentIndexInAll + 1

      if (nextIndex >= nextQuestions.length) {
        const { patterns, compounds } = detectPatterns(updatedAnswers)
        submitToSheets(updatedAnswers, patterns, compounds)
        const encoded = btoa(JSON.stringify(updatedAnswers))
        navigate(`/pe/results/${encoded}`)
      } else {
        setStepIndex(nextIndex)
        setAnimating(false)
      }
    }, 300)
  }, [answers, currentQuestion, stepIndex, navigate])

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1)
    } else {
      navigate('/pe')
    }
  }

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F6FA' }}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 pt-22">
        <div className="flex items-center justify-between mb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-sm text-slate-light">
            {stepIndex + 1} of {totalSteps}
          </span>
        </div>
        <div className="h-2 bg-[#E3E8F1] rounded-full overflow-hidden mb-12">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%`, background: 'linear-gradient(90deg, #3778F4, #FFBB00)' }}
          />
        </div>
      </div>

      <div className={`max-w-2xl mx-auto w-full px-4 flex-1 flex flex-col justify-center transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <div>
          <p className="text-sm font-display font-semibold text-[#1AA0D0] uppercase tracking-widest mb-3">
            Question {stepIndex + 1}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 leading-snug text-navy">
            {currentQuestion.question}
          </h2>
          <div className="grid gap-3">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => advance(opt.id)}
                className="w-full text-left flex items-start gap-4 px-5 py-4 rounded-[14px] bg-white transition-all duration-200 group hover:border-[#3778F4]"
                style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1.5px solid #E3E8F1' }}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#F4F6FA] flex items-center justify-center font-display font-semibold text-sm text-[#00164D]">
                  {String.fromCharCode(65 + i)}
                </span>
                <div>
                  <span className="block font-medium text-[#00164D] group-hover:text-[#3778F4]">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { ICP, Archetype, Revenue, Funding, Intent, Duration, PriorAction, OrgAwareness } from '../data/types'
import {
  icpOptions, q2Forks, revenueOptions, fundingOptions, intentOptions,
  durationOptions, priorActionOptions, orgAwarenessOptions,
} from '../data/questions'

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
const TOTAL_STEPS = 8

interface Answers {
  icp?: ICP
  archetype?: Archetype
  duration?: Duration
  priorAction?: PriorAction
  orgAwareness?: OrgAwareness
  revenue?: Revenue
  funding?: Funding
  intent?: Intent
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function trackEvent(eventName: string, params?: Record<string, string | number>) {
  window.gtag?.('event', eventName, params)
}

export default function Quiz() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [animating, setAnimating] = useState(false)

  const advance = useCallback((nextStep: Step | 'done', patch: Partial<Answers>) => {
    setAnimating(true)
    setAnswers(prev => ({ ...prev, ...patch }))
    trackEvent('quiz_step', { step: nextStep === 'done' ? 'complete' : String(nextStep), ...Object.fromEntries(Object.entries(patch).map(([k, v]) => [k, String(v)])) })
    setTimeout(() => {
      if (nextStep === 'done') {
        const final = { ...answers, ...patch }
        const encoded = btoa(JSON.stringify({
          i: final.icp,
          a: final.archetype,
          r: final.revenue,
          f: final.funding,
          t: final.intent,
          d: final.duration,
          p: final.priorAction,
          o: final.orgAwareness,
        }))
        navigate(`/results/${encoded}`)
      } else {
        setStep(nextStep)
        setAnimating(false)
      }
    }, 300)
  }, [answers, navigate])

  const goBack = () => {
    if (step > 1) setStep((step - 1) as Step)
    else navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F6F8FB' }}>
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
        </div>
      </div>

      {/* Top bar */}
      <div className="max-w-2xl mx-auto w-full px-4 pt-22">
        <div className="flex items-center justify-between mb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-light hover:text-navy text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-sm text-slate-light">
            {step} of {TOTAL_STEPS}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-light-alt rounded-full overflow-hidden mb-12">
          <div
            className="h-full bg-cyan rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className={`max-w-2xl mx-auto w-full px-4 flex-1 flex flex-col justify-center transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        {step === 1 && <Q1 onSelect={icp => advance(2, { icp })} />}
        {step === 2 && answers.icp && <Q2 icp={answers.icp} onSelect={archetype => advance(3, { archetype })} />}
        {step === 3 && <QDuration onSelect={duration => advance(4, { duration })} />}
        {step === 4 && <QPriorAction onSelect={priorAction => advance(5, { priorAction })} />}
        {step === 5 && <QOrgAwareness onSelect={orgAwareness => advance(6, { orgAwareness })} />}
        {step === 6 && <Q3 onSelect={revenue => advance(7, { revenue })} />}
        {step === 7 && <Q4 onSelect={funding => advance(8, { funding })} />}
        {step === 8 && <Q5 onSelect={intent => advance('done', { intent })} />}
      </div>
    </div>
  )
}

function Q1({ onSelect }: { onSelect: (icp: ICP) => void }) {
  return (
    <QuestionLayout label="Question 1" question="Which best describes you?">
      <div className="grid gap-3">
        {icpOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} sublabel={opt.description} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function Q2({ icp, onSelect }: { icp: ICP; onSelect: (a: Archetype) => void }) {
  const fork = q2Forks[icp]
  return (
    <QuestionLayout label="Question 2" question={fork.question}>
      <div className="grid gap-3">
        {fork.options.map((opt, i) => (
          <OptionButton key={i} label={opt.label} onClick={() => onSelect(opt.archetype)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QDuration({ onSelect }: { onSelect: (d: Duration) => void }) {
  return (
    <QuestionLayout label="Question 3" question="How long has this been the situation?">
      <div className="grid gap-3">
        {durationOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QPriorAction({ onSelect }: { onSelect: (p: PriorAction) => void }) {
  return (
    <QuestionLayout label="Question 4" question="What have you done about it so far?">
      <div className="grid gap-3">
        {priorActionOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QOrgAwareness({ onSelect }: { onSelect: (o: OrgAwareness) => void }) {
  return (
    <QuestionLayout label="Question 5" question="Who else sees this as a problem?">
      <div className="grid gap-3">
        {orgAwarenessOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function Q3({ onSelect }: { onSelect: (r: Revenue) => void }) {
  return (
    <QuestionLayout label="Question 6" question="What's your company's annual recurring revenue?">
      <div className="grid gap-3">
        {revenueOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function Q4({ onSelect }: { onSelect: (f: Funding) => void }) {
  return (
    <QuestionLayout label="Question 7" question="How is the company funded?">
      <div className="grid gap-3">
        {fundingOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function Q5({ onSelect }: { onSelect: (i: Intent) => void }) {
  return (
    <QuestionLayout label="Question 8" question="Where are you in thinking about this?">
      <div className="grid gap-3">
        {intentOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QuestionLayout({ label, question, children }: { label: string; question: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-display font-semibold text-cyan uppercase tracking-widest mb-3">{label}</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 leading-snug text-navy">{question}</h2>
      {children}
    </div>
  )
}

function OptionButton({ label, sublabel, onClick }: { label: string; sublabel?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-2xl bg-white transition-all duration-200 group hover:translate-y-[-1px] hover:shadow-lg"
      style={{ boxShadow: '0 1px 3px rgba(2,3,60,0.08), 0 8px 32px rgba(2,3,60,0.06)', border: '1px solid rgba(2,3,60,0.06)' }}
    >
      <span className="block font-medium text-navy group-hover:text-blue">{label}</span>
      {sublabel && <span className="block text-sm text-slate-light mt-0.5">{sublabel}</span>}
    </button>
  )
}

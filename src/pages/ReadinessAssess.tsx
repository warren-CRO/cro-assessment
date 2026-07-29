import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReadinessRole, ReadinessRevenue, ReadinessFunding, HireReason, DimensionId, DimensionQuestion } from '../data/readiness-types'
import {
  roleOptions, revenueOptions, fundingOptions, hireReasonOptions,
  getDimensionQuestions,
} from '../data/readiness-questions'

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
const TOTAL_STEPS = 15

interface Answers {
  role?: ReadinessRole
  revenue?: ReadinessRevenue
  funding?: ReadinessFunding
  hireReason?: HireReason
  dimensions: Map<DimensionId, { score: number; label: string }>
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function trackEvent(eventName: string, params?: Record<string, string | number>) {
  window.gtag?.('event', eventName, params)
}

export default function ReadinessAssess() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [role, setRole] = useState<ReadinessRole | undefined>()
  const [, setAnswers] = useState<Answers>({ dimensions: new Map() })
  const [animating, setAnimating] = useState(false)

  const answersRef = useRef<Answers>({ dimensions: new Map() })

  const advance = useCallback((nextStep: Step | 'done', patch: Partial<Omit<Answers, 'dimensions'>> & { dimensionEntry?: { id: DimensionId; score: number; label: string } }) => {
    setAnimating(true)
    const { dimensionEntry, ...contextPatch } = patch
    const updated = { ...answersRef.current, ...contextPatch }
    if (dimensionEntry) {
      const dims = new Map(updated.dimensions)
      dims.set(dimensionEntry.id, { score: dimensionEntry.score, label: dimensionEntry.label })
      updated.dimensions = dims
    }
    answersRef.current = updated
    setAnswers(updated)
    trackEvent('readiness_step', { step: nextStep === 'done' ? 'complete' : String(nextStep) })
    setTimeout(() => {
      if (nextStep === 'done') {
        const final = answersRef.current
        const encoded = btoa(encodeURIComponent(JSON.stringify({
          ctx: { role: final.role, revenue: final.revenue, funding: final.funding, hireReason: final.hireReason },
          dim: Array.from(final.dimensions.entries()).map(([id, v]) => ({ id, score: v.score, label: v.label })),
        })))
        navigate(`/readiness/results/${encoded}`)
      } else {
        setStep(nextStep)
        setAnimating(false)
      }
    }, 300)
  }, [navigate])

  const goBack = () => {
    if (step > 1) setStep((step - 1) as Step)
    else navigate('/readiness')
  }

  const dimIndex = step > 4 ? step - 5 : -1
  const questions = role ? getDimensionQuestions(role) : getDimensionQuestions('ceo')
  const currentDimension = dimIndex >= 0 ? questions[dimIndex] : null

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
            {step} of {TOTAL_STEPS}
          </span>
        </div>
        <div className="h-1.5 bg-light-alt rounded-full overflow-hidden mb-12">
          <div
            className="h-full bg-blue rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className={`max-w-2xl mx-auto w-full px-4 flex-1 flex flex-col justify-center transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        {step === 1 && (
          <QRole onSelect={r => { setRole(r); advance(2, { role: r }) }} />
        )}
        {step === 2 && (
          <QRevenue onSelect={revenue => advance(3, { revenue })} />
        )}
        {step === 3 && (
          <QFunding onSelect={funding => advance(4, { funding })} />
        )}
        {step === 4 && (
          <QHireReason onSelect={hireReason => advance(5, { hireReason })} />
        )}
        {step >= 5 && step <= 13 && currentDimension && (
          <QDimension
            key={currentDimension.id}
            dimension={currentDimension}
            onSelect={(score, label) => advance((step + 1) as Step, { dimensionEntry: { id: currentDimension.id, score, label } })}
          />
        )}
        {step === 14 && currentDimension && (
          <QDimension
            key={currentDimension.id}
            dimension={currentDimension}
            onSelect={(score, label) => advance(15, { dimensionEntry: { id: currentDimension.id, score, label } })}
          />
        )}
        {step === 15 && (
          <QIntake onSubmit={(contact) => {
            setAnimating(true)
            const final = answersRef.current
            const encoded = btoa(encodeURIComponent(JSON.stringify({
              ctx: { role: final.role, revenue: final.revenue, funding: final.funding, hireReason: final.hireReason },
              dim: Array.from(final.dimensions.entries()).map(([id, v]) => ({ id, score: v.score, label: v.label })),
              contact,
            })))

            fetch('/api/capture', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...contact,
                role: final.role,
                revenue: final.revenue,
                funding: final.funding,
                hireReason: final.hireReason,
                dimensionCount: final.dimensions.size,
              }),
            }).catch(() => {})

            trackEvent('readiness_intake', { email: contact.email })
            setTimeout(() => navigate(`/readiness/results/${encoded}`), 300)
          }} />
        )}
      </div>
    </div>
  )
}

function QRole({ onSelect }: { onSelect: (role: ReadinessRole) => void }) {
  return (
    <QuestionLayout label="About Your Company" question="Which best describes you?">
      <div className="grid gap-3">
        {roleOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} sublabel={opt.description} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QRevenue({ onSelect }: { onSelect: (revenue: ReadinessRevenue) => void }) {
  return (
    <QuestionLayout label="About Your Company" question="What's your company's annual revenue?">
      <div className="grid gap-3">
        {revenueOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QFunding({ onSelect }: { onSelect: (funding: ReadinessFunding) => void }) {
  return (
    <QuestionLayout label="About Your Company" question="How is the company funded?">
      <div className="grid gap-3">
        {fundingOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QHireReason({ onSelect }: { onSelect: (reason: HireReason) => void }) {
  return (
    <QuestionLayout label="About Your Company" question="Why are you considering a CRO?">
      <div className="grid gap-3">
        {hireReasonOptions.map(opt => (
          <OptionButton key={opt.id} label={opt.label} sublabel={opt.description} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QDimension({ dimension, onSelect }: { dimension: DimensionQuestion; onSelect: (score: number, label: string) => void }) {
  return (
    <QuestionLayout label={dimension.dimension} question={dimension.question}>
      <div className="grid gap-3">
        {dimension.options.map((opt, i) => (
          <OptionButton key={i} label={opt.label} onClick={() => onSelect(opt.score, opt.label)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

interface ContactInfo {
  name: string
  company: string
  title: string
  email: string
  linkedin: string
}

function QIntake({ onSubmit }: { onSubmit: (contact: ContactInfo) => void }) {
  const [form, setForm] = useState<ContactInfo>({ name: '', company: '', title: '', email: '', linkedin: '' })
  const update = (field: keyof ContactInfo, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <QuestionLayout label="Almost Done" question="Where should we send your results?">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Full Name" value={form.name} onChange={v => update('name', v)} required placeholder="Warren Zenna" />
          <InputField label="Company" value={form.company} onChange={v => update('company', v)} required placeholder="Acme Corp" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Title" value={form.title} onChange={v => update('title', v)} required placeholder="CEO" />
          <InputField label="Email" value={form.email} onChange={v => update('email', v)} required type="email" placeholder="you@company.com" />
        </div>
        <InputField label="LinkedIn Profile" value={form.linkedin} onChange={v => update('linkedin', v)} placeholder="linkedin.com/in/yourprofile" />
        <button
          type="submit"
          className="group mt-4 w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan hover:bg-blue text-navy hover:text-white font-display font-semibold text-lg rounded-lg transition-all duration-200"
        >
          See My Results
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-xs text-slate-light text-center">Your information is kept confidential. No spam, ever.</p>
      </form>
    </QuestionLayout>
  )
}

function InputField({ label, value, onChange, required, type, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-1.5">{label}{required && <span className="text-coral ml-0.5">*</span>}</label>
      <input
        type={type || 'text'}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-light-alt bg-white text-sm text-navy placeholder:text-slate-light/60 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
      />
    </div>
  )
}

function QuestionLayout({ label, question, children }: { label: string; question: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-display font-semibold text-blue uppercase tracking-widest mb-3">{label}</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 leading-snug text-navy">{question}</h2>
      {children}
    </div>
  )
}

function OptionButton({ label, sublabel, onClick }: { label: string; sublabel?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-xl border border-light-alt bg-white hover:border-blue hover:bg-blue-light transition-all duration-200 group"
    >
      <span className="block font-medium text-navy group-hover:text-blue">{label}</span>
      {sublabel && <span className="block text-sm text-slate-light mt-0.5">{sublabel}</span>}
    </button>
  )
}

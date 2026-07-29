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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F6FA' }}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 pt-22">
        <div className="flex items-center justify-between mb-3">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-light hover:text-navy text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-sm font-display font-semibold text-navy/50">
            {step} of {TOTAL_STEPS}
          </span>
        </div>
        <div className="h-2 bg-[#E3E8F1] rounded-full overflow-hidden mb-10">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(step / TOTAL_STEPS) * 100}%`,
              background: 'linear-gradient(90deg, #3778F4, #FFBB00)',
            }}
          />
        </div>
      </div>

      <div className={`max-w-2xl mx-auto w-full px-4 flex-1 flex flex-col justify-center pb-12 transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
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
        {roleOptions.map((opt, i) => (
          <OptionButton key={opt.id} label={opt.label} sublabel={opt.description} letterKey={String.fromCharCode(65 + i)} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QRevenue({ onSelect }: { onSelect: (revenue: ReadinessRevenue) => void }) {
  return (
    <QuestionLayout label="About Your Company" question="What's your company's annual revenue?">
      <div className="grid gap-3">
        {revenueOptions.map((opt, i) => (
          <OptionButton key={opt.id} label={opt.label} letterKey={String.fromCharCode(65 + i)} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QFunding({ onSelect }: { onSelect: (funding: ReadinessFunding) => void }) {
  return (
    <QuestionLayout label="About Your Company" question="How is the company funded?">
      <div className="grid gap-3">
        {fundingOptions.map((opt, i) => (
          <OptionButton key={opt.id} label={opt.label} letterKey={String.fromCharCode(65 + i)} onClick={() => onSelect(opt.id)} />
        ))}
      </div>
    </QuestionLayout>
  )
}

function QHireReason({ onSelect }: { onSelect: (reason: HireReason) => void }) {
  return (
    <QuestionLayout label="About Your Company" question="Why are you considering a CRO?">
      <div className="grid gap-3">
        {hireReasonOptions.map((opt, i) => (
          <OptionButton key={opt.id} label={opt.label} sublabel={opt.description} letterKey={String.fromCharCode(65 + i)} onClick={() => onSelect(opt.id)} />
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
          <OptionButton key={i} label={opt.label} letterKey={String.fromCharCode(65 + i)} onClick={() => onSelect(opt.score, opt.label)} />
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

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com','icloud.com',
  'mail.com','protonmail.com','zoho.com','yandex.com','gmx.com','live.com',
  'msn.com','me.com','mac.com','fastmail.com','tutanota.com','hey.com',
])

function isCompanyEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return !!domain && !FREE_EMAIL_DOMAINS.has(domain)
}

function isLinkedInProfile(url: string): boolean {
  const cleaned = url.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '')
  return /^linkedin\.com\/in\/[a-z0-9_-]{3,100}\/?$/.test(cleaned)
}

function QIntake({ onSubmit }: { onSubmit: (contact: ContactInfo) => void }) {
  const [form, setForm] = useState<ContactInfo>({ name: '', company: '', title: '', email: '', linkedin: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({})
  const update = (field: keyof ContactInfo, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof ContactInfo, string>> = {}

    if (!isCompanyEmail(form.email)) {
      newErrors.email = 'Please use your company email address'
    }
    if (!isLinkedInProfile(form.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn profile URL (linkedin.com/in/yourname)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(form)
  }

  return (
    <QuestionLayout label="Almost Done" question="Where should we send your results?">
      <div
        className="rounded-2xl bg-white p-8"
        style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)' }}
      >
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name" value={form.name} onChange={v => update('name', v)} required placeholder="Warren Zenna" />
            <InputField label="Company" value={form.company} onChange={v => update('company', v)} required placeholder="Acme Corp" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Title" value={form.title} onChange={v => update('title', v)} required placeholder="CEO" />
            <InputField label="Work Email" value={form.email} onChange={v => update('email', v)} required type="email" placeholder="you@company.com" error={errors.email} />
          </div>
          <InputField label="LinkedIn Profile" value={form.linkedin} onChange={v => update('linkedin', v)} required placeholder="linkedin.com/in/yourprofile" error={errors.linkedin} />
          <button
            type="submit"
            className="group mt-2 w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFBB00] hover:bg-white text-[#00164D] font-display font-bold text-lg rounded-xl transition-all duration-200"
          >
            See My Results
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-slate-light text-center">Your information is kept confidential. No spam, ever.</p>
        </form>
      </div>
    </QuestionLayout>
  )
}

function InputField({ label, value, onChange, required, type, placeholder, error }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string; error?: string
}) {
  return (
    <div>
      <label className="block text-sm font-display font-semibold text-navy mb-1.5">{label}{required && <span className="text-coral ml-0.5">*</span>}</label>
      <input
        type={type || 'text'}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-sm text-navy placeholder:text-slate-light/60 focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-[#E4572E] focus:border-[#E4572E] focus:ring-[#E4572E]/14'
            : 'border-[#E3E8F1] focus:border-[#3778F4] focus:ring-[#3778F4]/14'
        }`}
      />
      {error && <p className="text-xs text-[#E4572E] mt-1.5">{error}</p>}
    </div>
  )
}

function QuestionLayout({ label, question, children }: { label: string; question: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-display font-semibold text-[#1AA0D0] uppercase tracking-widest mb-3">{label}</p>
      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-snug text-navy">{question}</h2>
      {children}
    </div>
  )
}

function OptionButton({ label, sublabel, onClick, letterKey }: { label: string; sublabel?: string; onClick: () => void; letterKey: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-start gap-4 px-5 py-4 rounded-[14px] bg-white transition-all duration-200 group hover:border-[#3778F4]"
      style={{ boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)', border: '1.5px solid #E3E8F1' }}
    >
      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#F4F6FA] flex items-center justify-center font-display font-semibold text-sm text-[#00164D]">
        {letterKey}
      </span>
      <div>
        <span className="block font-medium text-[#00164D] group-hover:text-[#3778F4]">{label}</span>
        {sublabel && <span className="block text-sm text-[#6B7280] mt-0.5">{sublabel}</span>}
      </div>
    </button>
  )
}

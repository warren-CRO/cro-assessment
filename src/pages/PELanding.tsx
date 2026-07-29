import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, Shield, Tag, Zap } from 'lucide-react'

export default function PELanding() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F6F8FB' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <a
            href="https://calendly.com/warren-zenna/cro-readiness-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-navy bg-cyan hover:bg-blue hover:text-white rounded-lg px-4 py-1.5 font-semibold transition-colors"
          >
            Book a Call
          </a>
        </div>
      </nav>

      <div
        className="relative flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(241.73deg, #02033C 26.8%, #033E8A 95.98%)' }}
      >
        <img
          src="/maze-60.png"
          alt=""
          className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[500px] opacity-[0.06] pointer-events-none"
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            18–20 questions &middot; Under 10 minutes
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Revenue Infrastructure{' '}
            <span className="text-cyan">Due Diligence</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            58% of CROs in PE-backed companies are replaced within 24 months.
            Most operating partners discover the structural risk too late.
            This diagnostic shows you what's hiding in the org chart.
          </p>

          <button
            onClick={() => navigate('/pe/assess')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan hover:bg-blue text-navy hover:text-white font-display font-semibold text-lg rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Start the Diagnostic
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="px-4 py-16" style={{ backgroundColor: '#F6F8FB' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueProp
            icon={<Shield className="w-5 h-5" style={{ color: '#00CCF5' }} />}
            title="Pre-close intelligence"
            desc="Structural patterns visible from due diligence data. No financials required — just the org chart and the operating plan."
          />
          <ValueProp
            icon={<Tag className="w-5 h-5" style={{ color: '#00CCF5' }} />}
            title="Named risk patterns"
            desc="Not a score, not a grade. Specific failure patterns you'll recognize from your own portfolio — with pre-close actions."
          />
          <ValueProp
            icon={<Zap className="w-5 h-5" style={{ color: '#00CCF5' }} />}
            title="Instant results"
            desc="No email gate, no waiting. Your risk brief loads immediately. Share the URL with your deal team."
          />
        </div>
      </div>

      <div className="py-6 text-center text-sm text-slate-light" style={{ backgroundColor: '#F6F8FB' }}>
        A diagnostic tool by{' '}
        <a
          href="https://thecrocollective.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue hover:underline"
        >
          The CRO Collective
        </a>
      </div>
    </div>
  )
}

function ValueProp({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(2,3,60,0.08), 0 8px 32px rgba(2,3,60,0.06)',
        border: '1px solid rgba(2,3,60,0.06)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,204,245,0.1)' }}
        >
          {icon}
        </div>
        <h3 className="font-display font-semibold text-sm text-navy">{title}</h3>
      </div>
      <p className="text-sm text-slate-light leading-relaxed">{desc}</p>
    </div>
  )
}

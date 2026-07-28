import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, Target, Zap, FileText } from 'lucide-react'

export default function ReadinessLanding() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <a
            href="https://thecrocollective.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 border border-white/30 rounded-lg px-4 py-1.5 hover:border-white hover:text-white transition-colors"
          >
            Contact Us
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
            14 questions &middot; 5 minutes
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Is Your Company Ready{' '}
            <span className="text-blue">for a CRO?</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            70% of CROs fail within 18 months. The #1 predictor isn't the
            person you hire — it's whether your company was ready for one.
            This free assessment scores your organization across the 10
            dimensions that determine CRO success or failure.
          </p>

          <button
            onClick={() => navigate('/readiness/assess')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan hover:bg-blue text-navy font-display font-semibold text-lg rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
          >
            Start the Readiness Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="bg-navy/5 px-4 py-5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-navy/60 font-medium">
          <span>18mo avg CRO tenure</span>
          <span className="hidden md:inline text-navy/20">&middot;</span>
          <span>70% involuntary departures</span>
          <span className="hidden md:inline text-navy/20">&middot;</span>
          <span>$1.5M–$4M cost per failed hire</span>
          <span className="hidden md:inline text-navy/20">&middot;</span>
          <span>91% miss year-one targets</span>
        </div>
      </div>

      <div className="bg-white px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueProp
            icon={<Target className="w-5 h-5 text-blue" />}
            title="10-Dimension Scoring"
            desc="Based on The CRO Collective's proprietary Readiness Framework — the same diagnostic used with PE firms and boards."
          />
          <ValueProp
            icon={<Zap className="w-5 h-5 text-blue" />}
            title="Instant Readiness Score"
            desc="See exactly where your organization stands — and which gaps would derail a CRO hire."
          />
          <ValueProp
            icon={<FileText className="w-5 h-5 text-blue" />}
            title="Custom JD Generator"
            desc="Get a CRO job description tailored to your company's stage, type, and readiness level."
          />
        </div>
      </div>

      <div className="bg-white border-t border-light-alt py-6 text-center text-sm text-slate-light">
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
    <div className="rounded-xl border border-light-alt p-6 hover:border-blue/30 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-display font-semibold text-sm text-navy">{title}</h3>
      </div>
      <p className="text-sm text-slate-light leading-relaxed">{desc}</p>
    </div>
  )
}

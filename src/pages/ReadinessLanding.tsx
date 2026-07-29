import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, Target, Zap, FileText } from 'lucide-react'

export default function ReadinessLanding() {
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
        className="relative flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(241.73deg, #02033C 26.8%, #033E8A 95.98%)' }}
      >
        <img
          src="/maze-60.png"
          alt=""
          className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[500px] opacity-[0.06] pointer-events-none"
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            14 questions &middot; 5 minutes
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Is Your Company Ready{' '}
            <span className="text-cyan">for a CRO?</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            70% of CROs fail within 18 months. The #1 predictor isn't the
            person you hire — it's whether your company was ready for one.
            This free assessment scores your organization across the 10
            dimensions that determine CRO success or failure.
          </p>

          <button
            onClick={() => navigate('/readiness/assess')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan hover:bg-blue text-navy font-display font-bold text-lg rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
          >
            Start the Readiness Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="px-4 py-6"
        style={{ background: 'linear-gradient(241.73deg, #010228 26.8%, #02033C 95.98%)' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-display text-2xl font-bold text-cyan">18mo</div>
            <div className="text-xs text-white/50 mt-1">Avg CRO tenure</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-cyan">70%</div>
            <div className="text-xs text-white/50 mt-1">Involuntary departures</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-cyan">$1.5–4M</div>
            <div className="text-xs text-white/50 mt-1">Cost per failed hire</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-cyan">91%</div>
            <div className="text-xs text-white/50 mt-1">Miss year-one targets</div>
          </div>
        </div>
      </div>

      {/* Value props */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueProp
            icon={<Target className="w-6 h-6 text-blue" />}
            title="10-Dimension Scoring"
            desc="Based on The CRO Collective's proprietary Readiness Framework — the same diagnostic used with PE firms and boards."
          />
          <ValueProp
            icon={<Zap className="w-6 h-6 text-cyan" />}
            title="Instant Readiness Score"
            desc="See exactly where your organization stands — and which gaps would derail a CRO hire."
          />
          <ValueProp
            icon={<FileText className="w-6 h-6 text-coral" />}
            title="Custom JD Generator"
            desc="Get a CRO job description tailored to your company's stage, type, and readiness level."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 pb-6 border-t border-light-alt text-center text-sm text-slate-light">
        <p>&copy; {new Date().getFullYear()} The CRO Collective. All rights reserved.</p>
        <p className="mt-1">
          <a
            href="https://thecrocollective.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue hover:underline"
          >
            thecrocollective.com
          </a>
        </p>
      </div>
    </div>
  )
}

function ValueProp({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div
      className="rounded-2xl bg-white p-8 hover:translate-y-[-2px] transition-all duration-200"
      style={{
        boxShadow: '0 1px 3px rgba(2,3,60,0.08), 0 8px 32px rgba(2,3,60,0.06)',
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-light flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-display font-bold text-navy text-base mb-2">{title}</h3>
      <p className="text-sm text-slate leading-relaxed">{desc}</p>
    </div>
  )
}

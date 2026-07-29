import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, Target, Zap } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F6FA' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src="/logo-white.png" alt="The CRO Collective" className="h-7" />
          <a
            href="https://calendly.com/warren-zenna/cro-readiness-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#00164D] bg-[#FFBB00] rounded-lg px-4 py-2 transition-colors hover:bg-white"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(241.73deg, #00164D 26.8%, #0147C9 95.98%)' }}
      >
        {/* Maze watermark */}
        <img
          src="/maze-60.png"
          alt=""
          className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[500px] opacity-[0.06] pointer-events-none"
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            8 questions &middot; 3 minutes
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Is Your Approach to Revenue Leadership{' '}
            <span className="text-[#FFBB00]">Actually Working?</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Most companies don't have a revenue problem — they have a revenue{' '}
            <em>leadership</em> problem. This quick diagnostic will tell you
            exactly what's going on and what to do about it.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate('/quiz')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FFBB00] text-[#00164D] font-display font-semibold text-lg rounded-xl transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
          >
            Start the Clarity Check
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Value props */}
      <div className="px-4 py-16" style={{ backgroundColor: '#F4F6FA' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueProp
            icon={<Target className="w-5 h-5" style={{ color: '#1AA0D0' }} />}
            title="Personalized diagnosis"
            desc="Not a generic quiz — your results map to your exact ICP, stage, and situation."
          />
          <ValueProp
            icon={<Zap className="w-5 h-5" style={{ color: '#1AA0D0' }} />}
            title="Actionable insight"
            desc="Walk away with a specific Stop/Start playbook you can act on today."
          />
          <ValueProp
            icon={<Clock className="w-5 h-5" style={{ color: '#1AA0D0' }} />}
            title="Instant results"
            desc="No email gate, no waiting. Your custom results page loads immediately."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center text-sm text-slate-light" style={{ backgroundColor: '#F4F6FA', borderColor: 'rgba(0,22,77,0.05)' }}>
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
      className="rounded-[16px] p-6"
      style={{
        background: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0,22,77,0.05), 0 12px 32px rgba(0,22,77,0.05)',
        border: '1px solid #E3E8F1',
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(55,120,244,0.10)' }}>
        {icon}
      </div>
      <h3 className="font-display font-semibold text-sm text-navy mb-1">{title}</h3>
      <p className="text-sm text-slate-light leading-relaxed">{desc}</p>
    </div>
  )
}

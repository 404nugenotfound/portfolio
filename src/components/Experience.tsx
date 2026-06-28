const experiences = [
  {
    period: 'April 2026 – June 2026',
    role: 'VENTARA',
    type: 'Project Manager & Fullstack Developer · BRIN Collaboration',
    desc: 'Led a 5-member cross-functional team developing a web-based energy forecasting application for Wind Power Plants with BRIN. Coordinated stakeholder communication, managed task delegation, and delivered 7-day ahead forecasting using XGB + LSTM ensemble models.',
    side: 'left',
  },
  {
    period: 'August 2025 – December 2025',
    role: 'SIMJUR',
    type: 'Project Manager & Frontend Developer · Team Project',
    desc: 'Built a prototype departmental financial information system — led a 4-member team to digitalize submission and approval of financial documents with role-based access control.',
    side: 'right',
  },
  {
    period: 'March – April 2025',
    role: 'Photo Enhancer Website',
    type: 'Freelance · Project Manager & Frontend Developer',
    desc: 'Managed the full project lifecycle as PM and sole developer — overseeing task planning, timeline management, UI design direction, and client deliverables within scope.',
    side: 'left',
  },
  {
    period: 'March 2025',
    role: 'Portfolio Website – Bhinneka Dev',
    type: 'Freelance · Project Manager & Frontend Developer',
    desc: 'Conducted direct client consultations to define project scope, gathered requirements, and developed a fully responsive company profile website aligned to the client\'s brand identity.',
    side: 'right',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-section-padding px-gutter max-w-3xl mx-auto">
      <h2 className="text-headline-lg font-semibold mb-16 text-center reveal">Work Experience</h2>
      <div className="relative space-y-12">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
        {experiences.map((exp) => (
          <div
            key={exp.role}
            className={`relative flex flex-col ${exp.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center md:justify-between reveal`}
          >
            <div className={`hidden md:block w-5/12 ${exp.side === 'right' ? 'text-left pl-12' : 'text-right pr-12'}`}>
              <span className="text-outline font-mono text-code">{exp.period}</span>
            </div>
            <div className="z-10 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-dot-glow" />
            <div className={`w-full md:w-5/12 ${exp.side === 'right' ? 'pr-8 md:pr-12 text-right' : 'pl-8 md:pl-12'} mt-4 md:mt-0`}>
              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-1">{exp.role}</h4>
                <p className="text-primary text-sm mb-4">{exp.type}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">{exp.desc}</p>
                <span className="md:hidden block mt-4 text-xs text-outline font-mono">{exp.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

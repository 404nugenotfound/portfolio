const certs = [
  {
    icon: "school",
    title: "HCIA-AI V4.0 Course",
    issuer: "Huawei ICT Academy",
    date: "March 2026",
    desc: "Professional AI certification covering deep learning, framework usage, and implementation.",
  },
  {
    icon: "terminal",
    title: "Python Programming Basics",
    issuer: "Huawei ICT Academy",
    date: "March 2026",
    desc: "Comprehensive fundamentals and advanced concepts in Python for data science and automation.",
  },
  {
    icon: "psychology",
    title: "Overview of AI",
    issuer: "Huawei ICT Academy",
    date: "February 2026",
    desc: "Strategic foundations of artificial intelligence and its multi-disciplinary applications.",
  },
  {
    icon: "translate",
    title: "TOEFL EPT — Score 563",
    issuer: "Daily Bahasa Inggris",
    date: "October 2025",
    desc: "Advanced English proficiency demonstrating strong global communication skills.",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6 mb-20 md:px-gutter max-w-container-max mx-auto">
      <h2 className="text-headline-lg font-semibold mb-20 text-center reveal">
        Certifications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {certs.map((c) => (
          <div
            key={c.title}
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center reveal"
          >
            <span className="material-symbols-outlined text-4xl text-primary mb-6">
              {c.icon}
            </span>
            <h4 className="font-bold mb-1 min-h-[3rem] flex items-center justify-center">
              {c.title}
            </h4>
            <p className="text-xs text-outline uppercase tracking-widest mb-1">
              {c.issuer}
            </p>
            <p className="text-xs text-primary/70 mb-4">{c.date}</p>
            <p className="text-sm text-on-surface-variant mt-auto">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

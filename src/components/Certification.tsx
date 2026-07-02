"use client";

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
    <section
      id="certifications"
      className="w-full"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #ffffff 90%, #6b6f85 95%, #14161f 100%)",
      }}
    >
      <div className="pt-16 pb-section-padding px-6 md:px-12 max-w-container-max mx-auto">
        {/* Eyebrow + headline — same pattern as other sections */}
        <div className="flex flex-col items-center gap-6 mb-12 reveal">
          <p
            className="font-jetbrains text-[1rem] tracking-[0.3em] uppercase"
            style={{ color: "#818cf8" }}
          >
            — Credentials
          </p>
          <h2
            className="font-condensed font-black uppercase leading-[0.87] text-center"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.01em",
              color: "#000000",
            }}
          >
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {certs.map((c) => (
            <div
              key={c.title}
              className="p-8 rounded-2xl flex flex-col items-center text-center reveal"
              style={{
                background: "#1a1c2b",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
              }}
            >
              <span
                className="material-symbols-outlined text-4xl mb-8"
                style={{ color: "#818cf8" }}
              >
                {c.icon}
              </span>
              <h4
                className="font-condensed font-black uppercase text-xl mb-3 min-h-[3rem] flex items-center justify-center text-white"
                style={{ letterSpacing: "-0.01em" }}
              >
                {c.title}
              </h4>
              <p className="font-jetbrains text-[0.65rem] tracking-[0.2em] lowercase text-outline mb-2">
                {c.issuer}
              </p>
              <p
                className="font-jetbrains text-[0.65rem] tracking-[0.15em] lowercase mb-6"
                style={{ color: "#818cf8" }}
              >
                {c.date}
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant mt-auto">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

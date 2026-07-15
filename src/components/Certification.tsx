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
      className="w-full scroll-mt-16 md:scroll-mt-24"
      style={{
        background: "linear-gradient(to bottom, #1c1e2c, #14161f)",
      }}
    >
      <div className="pt-16 pb-20 md:pb-64 px-6 md:px-12 max-w-container-max mx-auto">
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
              color: "#ffffff",
            }}
          >
            Certifications
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {certs.map((c) => (
            <div
              key={c.title}
              className="p-5 sm:p-8 rounded-2xl flex flex-col items-center text-center reveal"
              style={{
                background: "#1a1c2b",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
              }}
            >
              <span
                className="material-symbols-outlined text-4xl mb-4 sm:mb-8"
                style={{ color: "#818cf8" }}
              >
                {c.icon}
              </span>
              <h4
                className="font-condensed font-black uppercase text-xl mb-3 sm:min-h-[3rem] flex items-center justify-center text-white"
                style={{ letterSpacing: "0.01em" }}
              >
                {c.title}
              </h4>
              <p
                className="text-[0.8rem] mb-1"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {c.issuer}
              </p>
              <p
                className="text-[0.8rem] mb-6"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "#818cf8",
                }}
              >
                {c.date}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.01em" }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
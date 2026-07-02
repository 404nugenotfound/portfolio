"use client";

const experiences = [
  {
    period: "April 2026 – June 2026",
    role: "VENTARA",
    type: "Project Manager & Fullstack Developer · BRIN Collaboration",
    desc: "Led a 5-member cross-functional team developing a web-based energy forecasting application for Wind Power Plants with BRIN. Coordinated stakeholder communication, managed task delegation, and delivered 7-day ahead forecasting using XGB + LSTM ensemble models.",
    side: "left",
  },
  {
    period: "August 2025 – December 2025",
    role: "SIMJUR",
    type: "Project Manager & Frontend Developer · Team Project",
    desc: "Built a prototype departmental financial information system — led a 4-member team to digitalize submission and approval of financial documents with role-based access control.",
    side: "right",
  },
  {
    period: "March – April 2025",
    role: "Photo Enhancer Website",
    type: "Freelance · Project Manager & Frontend Developer",
    desc: "Managed the full project lifecycle as PM and sole developer — overseeing task planning, timeline management, UI design direction, and client deliverables within scope.",
    side: "left",
  },
  {
    period: "March 2025",
    role: "Portfolio Website – Bhinneka Dev",
    type: "Freelance · Project Manager & Frontend Developer",
    desc: "Conducted direct client consultations to define project scope, gathered requirements, and developed a fully responsive company profile website aligned to the client's brand identity.",
    side: "right",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full"
      style={{
        background:
          "linear-gradient(to bottom, #c7c8d1 0%, #e2e3ea 50%, #ffffff 100%)",
      }}
    >
      <div className="py-section-padding px-6 md:px-12 max-w-6xl mx-auto">
        {/* Eyebrow + headline — same pattern as other sections */}
        <div className="flex flex-col items-center gap-6 mb-20 reveal">
          <p
            className="font-jetbrains text-[1rem] tracking-[0.3em] uppercase"
            style={{ color: "#4f46e5" }}
          >
            — Career
          </p>
          <h2
            className="font-condensed font-black uppercase leading-[0.87] text-center"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.01em",
              color: "#111114",
            }}
          >
            Work Experience
          </h2>
        </div>

        <div className="relative space-y-12">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/15 -translate-x-1/2" />
          {experiences.map((exp) => (
            <div
              key={exp.role}
              className={`relative flex flex-col ${
                exp.side === "right" ? "md:flex-row-reverse" : "md:flex-row"
              } items-center md:justify-between reveal`}
            >
              <div
                className={`hidden md:block w-4/12 ${
                  exp.side === "right" ? "text-left pl-12" : "text-right pr-12"
                }`}
              >
                <span
                  className="font-jetbrains text-[0.8rem] tracking-[0.15em] lowercase inline-block px-3 py-1.5 rounded-full"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    background: "rgba(13,15,24,0.55)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {exp.period}
                </span>
              </div>

              <div
                className="z-10 w-4 h-4 rounded-full border-4"
                style={{
                  background: "#6366f1",
                  borderColor: "#0d0f18",
                  boxShadow: "0 0 0 4px rgba(99,102,241,0.15)",
                }}
              />

              <div
                className={`w-full md:w-6/12 ${
                  exp.side === "right"
                    ? "pr-8 md:pr-12 text-right"
                    : "pl-8 md:pl-12"
                } mt-4 md:mt-0`}
              >
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: "#1a1c2b",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
                  }}
                >
                  <h4
                    className="font-condensed font-black uppercase text-2xl mb-1 text-white"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {exp.role}
                  </h4>
                  <p
                    className="font-jetbrains text-[0.7rem] tracking-[0.1em] lowercase mb-4"
                    style={{ color: "#818cf8" }}
                  >
                    {exp.type}
                  </p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                  <span
                    className="md:hidden inline-block mt-4 font-jetbrains text-[0.7rem] tracking-[0.15em] lowercase px-3 py-1.5 rounded-full"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      background: "rgba(13,15,24,0.55)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

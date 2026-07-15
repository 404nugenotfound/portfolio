"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

const ACCENT = "#6366f1";
const INK = "rgba(255,255,255,0.92)";
const MUTED = "rgba(255,255,255,0.52)";
const FAINT = "rgba(255,255,255,0.32)";
const DIM = "rgba(255,255,255,0.10)";
const BG = "#111319";

const projects = [
  {
    name: "VENTARA",
    badge: "BRIN Affiliated",
    desc: "Web-based energy forecasting application for Wind Power Plants (PLTB) in collaboration with BRIN, predicting weather-driven energy output using XGB + LSTM ensemble models.",
    tags: ["Next.js", "Flask", "Supabase", "Vercel"],
    img: "/projects/ventara.png",
  },
  {
    name: "SIMJUR",
    badge: "Web App",
    desc: "Departmental financial information system built as PM & Frontend Developer — role-based access control for Students, Treasurer, Secretary, and Department Head.",
    tags: ["React", "Tailwind CSS", "PostgreSQL"],
    img: "/projects/simjur.png",
  },
  {
    name: "Photo Enhancer Website",
    badge: "Freelance",
    desc: "AI-integrated photo processing platform with Real-ESRGAN model for automated image resolution enhancement and lighting improvement across devices.",
    tags: ["Python", "Flask", "HTML/CSS", "JavaScript"],
    img: "/projects/photo-enhancer.png",
  },
  {
    name: "Portfolio Website – Bhinneka Dev",
    badge: "Freelance",
    desc: "Bespoke company profile website for Bhinneka Dev — managed end-to-end as PM and sole developer, with multiple client revision cycles.",
    tags: ["HTML", "CSS", "JavaScript"],
    img: "/projects/bhinneka-dev.png",
  },
];

const n = projects.length;
const extended = [projects[n - 1], ...projects, projects[0]];
const pad2 = (num: number) => String(num).padStart(2, "0");

export default function Projects() {
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [carousel, setCarousel] = useState({ trackIndex: 1, instant: true });
  const current = useMemo(
    () => (((carousel.trackIndex - 1) % n) + n) % n,
    [carousel.trackIndex],
  );

  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const clampTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number, jump = false) => {
    setCarousel({ trackIndex: idx, instant: jump });
  }, []);

  const clampIfNeeded = useCallback(
    (idx: number) => {
      // ADD
      if (idx > n) goTo(1, true);
      else if (idx < 1) goTo(n, true);
    },
    [goTo],
  );

  const next = useCallback(() => {
    setCarousel((c) => {
      const idx = c.trackIndex + 1;
      if (clampTimerRef.current) clearTimeout(clampTimerRef.current);
      clampTimerRef.current = setTimeout(() => clampIfNeeded(idx), 720);
      return { trackIndex: idx, instant: false };
    });
  }, [clampIfNeeded]);

  const prev = useCallback(() => {
    setCarousel((c) => {
      const idx = c.trackIndex - 1;
      if (clampTimerRef.current) clearTimeout(clampTimerRef.current);
      clampTimerRef.current = setTimeout(() => clampIfNeeded(idx), 720);
      return { trackIndex: idx, instant: false };
    });
  }, [clampIfNeeded]);
  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next();
    }, 4500);
  }, [next]);

  const handleTransitionEnd = useCallback(() => {
    if (clampTimerRef.current) clearTimeout(clampTimerRef.current);
    clampIfNeeded(carousel.trackIndex);
  }, [carousel.trackIndex, clampIfNeeded]);

  useEffect(() => {
    startAuto();

    const handleVisibility = () => {
      if (document.hidden) {
        pausedRef.current = true;
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        // resync index ke range valid, hindari drift
        setCarousel((c) => ({
          trackIndex: current + 1, // current udah dihitung via modulo, aman
          instant: true,
        }));
        pausedRef.current = false;
        startAuto();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (clampTimerRef.current) clearTimeout(clampTimerRef.current); // ADD
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startAuto, current]);

  return (
    <section
      id="projects"
      className="w-full min-h-screen flex flex-col justify-center scroll-mt-16 md:scroll-mt-24"
      style={{
        background: "linear-gradient(to bottom, #2a2d40, #232538)",
      }}
    >
      <div className="py-section-padding px-6 md:px-14 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-10 reveal">
          <div className="flex flex-col gap-5">
            <span
              className="text-[1rem] tracking-[0.3em] uppercase"
              style={{
                color: ACCENT,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              — Selected Work
            </span>
            <h2
              className="font-condensed font-black leading-[0.87]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.01em",
                color: INK,
              }}
            >
              WORK THAT SHIPS
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-[280px] lg:text-right"
            style={{ color: "#ffffff" }}
          >
            Four projects I&apos;m proud to have built and shipped — from
            research collaborations to freelance work.
          </p>
        </div>

        <div className="relative max-w-[1180px] mx-auto reveal">
          <div
            className="overflow-hidden"
            style={{
              borderTop: `1px solid ${DIM}`,
              borderBottom: `1px solid ${DIM}`,
            }}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${carousel.trackIndex * 100}%)`,
                transition: carousel.instant
                  ? "none"
                  : "transform 0.7s cubic-bezier(0.65,0,0.35,1)",
              }}
              onTransitionEnd={handleTransitionEnd}
              onMouseEnter={() => {
                pausedRef.current = true;
              }}
              onMouseLeave={() => {
                pausedRef.current = false;
              }}
              onTouchStart={(e) => {
                touchStartX.current = e.changedTouches[0].screenX;
              }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].screenX - touchStartX.current;
                if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
                startAuto();
              }}
            >
              {extended.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="w-full shrink-0 py-6 md:py-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 md:gap-24 items-center">
                    {/* Image — old card treatment: rounded, shadow-glow hover, badge overlay */}
                    <div className="flex flex-col gap-3">
                      <div
                        className="relative overflow-hidden rounded-2xl group transition-all duration-300"
                        style={{
                          aspectRatio: "16 / 10",
                          maxHeight: "360px",
                          background: "#1a1c2b",
                          boxShadow: "none",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.img}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.opacity = "0";
                          }}
                        />
                        <span
                          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase"
                          style={{
                            color: INK,
                            background: "rgba(20,20,24,0.45)",
                            backdropFilter: "blur(8px)",
                            border: `1px solid ${DIM}`,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {p.badge}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-5">
                      <span
                        className="text-xs tracking-[0.2em]"
                        style={{
                          color: FAINT,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {pad2(i === 0 ? n : i === n + 1 ? 1 : i)} / {pad2(n)}
                      </span>
                      <h3
                        className="font-condensed font-black leading-[0.95]"
                        style={{
                          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                          letterSpacing: "-0.01em",
                          color: INK,
                        }}
                      >
                        {p.name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed max-w-[46ch] line-clamp-2"
                        style={{ color: MUTED }}
                      >
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] tracking-wider lowercase"
                            style={{
                              color: "#ffffff",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {/* <button
                        onClick={() => setActiveProject(p)}
                        className="group mt-3 flex items-center gap-2 text-sm font-medium w-fit"
                        style={{ color: INK }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = ACCENT)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = INK)
                        }
                      >
                        View project
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls — numbered index, hairline segments + old dot row combined */}
          <div className="flex items-center justify-between pt-6">
            <span
              className="text-xs tracking-[0.2em]"
              style={{
                color: FAINT,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {pad2(current + 1)} — {pad2(n)}
            </span>

            <div className="flex items-center gap-3">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    goTo(i + 1);
                    startAuto();
                  }}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6" : "w-2"}`}
                  style={{
                    background:
                      i === current ? ACCENT : "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  prev();
                  startAuto();
                }}
                aria-label="Previous project"
                className="flex size-11 md:size-9 items-center justify-center rounded-full transition-colors duration-200"
                style={{ border: `1px solid ${DIM}`, color: MUTED }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.color = INK;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = DIM;
                  e.currentTarget.style.color = MUTED;
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  next();
                  startAuto();
                }}
                aria-label="Next project"
                className="flex size-11 md:size-9 items-center justify-center rounded-full transition-colors duration-200"
                style={{ border: `1px solid ${DIM}`, color: MUTED }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.color = INK;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = DIM;
                  e.currentTarget.style.color = MUTED;
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-6"
          style={{
            background: "rgba(8,9,13,0.82)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden"
            style={{
              background: "#14151f",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full transition-colors duration-200"
              style={{
                border: `1px solid ${DIM}`,
                color: MUTED,
                background: "rgba(10,11,15,0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = INK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = DIM;
                e.currentTarget.style.color = MUTED;
              }}
            >
              ✕
            </button>

            <div className="aspect-[16/9] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProject.img}
                alt={activeProject.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 md:p-8 overflow-y-auto max-h-[50vh]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3
                  className="font-condensed font-black leading-none"
                  style={{
                    fontSize: "1.75rem",
                    letterSpacing: "-0.01em",
                    color: INK,
                  }}
                >
                  {activeProject.name}
                </h3>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase shrink-0 pt-1.5"
                  style={{
                    color: FAINT,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {activeProject.badge}
                </span>
              </div>
              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: MUTED }}
              >
                {activeProject.desc}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {activeProject.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] tracking-wider lowercase"
                    style={{
                      color: FAINT,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

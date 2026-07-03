"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const projects = [
  {
    name: "VENTARA",
    badge: "BRIN Affiliated",
    desc: "Web-based energy forecasting application for Wind Power Plants (PLTB) in collaboration with BRIN, predicting weather-driven energy output using XGB + LSTM ensemble models.",
    tags: ["Next.js", "Flask", "Supabase", "Vercel"],
    img: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80",
  },
  {
    name: "SIMJUR",
    badge: "Web App",
    desc: "Departmental financial information system built as PM & Frontend Developer — role-based access control for Students, Treasurer, Secretary, and Department Head.",
    tags: ["React", "Tailwind CSS", "PostgreSQL"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    name: "Photo Enhancer Website",
    badge: "Freelance",
    desc: "AI-integrated photo processing platform with Real-ESRGAN model for automated image resolution enhancement and lighting improvement across devices.",
    tags: ["Python", "Flask", "HTML/CSS", "JavaScript"],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  },
  {
    name: "Portfolio Website – Bhinneka Dev",
    badge: "Freelance",
    desc: "Bespoke company profile website for Bhinneka Dev — managed end-to-end as PM and sole developer, with multiple client revision cycles.",
    tags: ["HTML", "CSS", "JavaScript"],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
];

const n = projects.length;
const extended = [projects[n - 1], ...projects, projects[0]];

const TRANSITION = "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const trackIndexRef = useRef(1);

  const render = useCallback((idx: number, instant: boolean) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;
    const slideW = slides[0].offsetWidth;

    if (slideW === 0) {
      requestAnimationFrame(() => render(idx, instant));
      return;
    }

    const centerOffset = (container.offsetWidth - slideW) / 2;
    track.style.transition = instant ? "none" : TRANSITION;
    track.style.transform = `translateX(${-(idx * slideW) + centerOffset}px)`;
    if (instant) {
      void track.offsetHeight;
      track.style.transition = TRANSITION;
    }
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
  }, []);

  const goToTrack = useCallback(
    (idx: number, instant = false) => {
      trackIndexRef.current = idx;
      render(idx, instant);
      setCurrent((((idx - 1) % n) + n) % n);
    },
    [render],
  );

  const next = useCallback(() => {
    goToTrack(trackIndexRef.current + 1);
  }, [goToTrack]);

  const prev = useCallback(() => {
    goToTrack(trackIndexRef.current - 1);
  }, [goToTrack]);

  const goToReal = useCallback(
    (i: number) => {
      goToTrack(i + 1);
    },
    [goToTrack],
  );

  const pausedRef = useRef(false);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next();
    }, 4000);
  }, [next]);

  const handleTransitionEnd = useCallback(() => {
    const t = trackIndexRef.current;
    if (t === n + 1) goToTrack(1, true);
    else if (t === 0) goToTrack(n, true);
  }, [goToTrack]);

  useEffect(() => {
    goToTrack(1, true);
    startAuto();
    const onResize = () => render(trackIndexRef.current, true);
    window.addEventListener("resize", onResize);

    const imgs = trackRef.current?.querySelectorAll("img") ?? [];
    const onImgLoad = () => render(trackIndexRef.current, true);
    imgs.forEach((img) => img.addEventListener("load", onImgLoad));

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("resize", onResize);
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
    };
  }, []); // eslint-disable-line

  return (
    <section
      id="projects"
      className="w-full"
      style={{
        background: "linear-gradient(to bottom, #2a2d40, #232538)",
      }}
    >
      <div className="py-section-padding px-6 md:px-12 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20 reveal">
          <div className="flex flex-col gap-6">
            <p
              className="font-jetbrains text-[1rem] tracking-[0.3em] uppercase"
              style={{ color: "#818cf8" }}
            >
              — Selected Work
            </p>
            <h2
              className="font-condensed font-black leading-[0.87]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.01em",
                color: "#ffffff",
              }}
            >
              WORK THAT SHIPS
            </h2>
          </div>
          <p
            className="leading-[1.6] font-light lg:text-right max-w-[420px] lg:ml-auto"
            style={{ fontSize: "1.15rem", color: "rgba(220,220,226,0.6)" }}
          >
            Four projects I&apos;m proud to have built and shipped — from
            research collaborations to freelance work.
          </p>
        </div>

        <div className="relative max-w-350 mx-auto reveal">
          <div
            ref={containerRef}
            className="relative overflow-visible"
            style={{ perspective: "1000px" }}
          >
            <div
              ref={trackRef}
              className="flex"
              style={{ transition: TRANSITION, willChange: "transform" }}
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
                  className={`carousel-slide ${i === 1 ? "active" : ""}`}
                >
                  <div
                    className="rounded-2xl overflow-hidden group h-full transition-all duration-300"
                    style={{
                      background: "#1a1c2b",
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 0 1px rgba(99,102,241,0.4), 0 20px 60px rgba(0,0,0,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)";
                    }}
                  >
                    <div className="h-64 bg-surface-container overflow-hidden relative">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] tracking-[0.08em] capitalize text-white"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          background: "rgba(20,20,24,0.45)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.18)",
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div className="p-8">
                      <h3
                        className="mb-3"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: "1.45rem",
                          letterSpacing: "-0.02em",
                          color: "#ffffff",
                        }}
                      >
                        {p.name}
                      </h3>
                      <p
                        className="mb-6 line-clamp-2"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-[12px] tracking-[0.08em] lowercase rounded-full"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.75)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setActiveProject(p)}
                        className="flex items-center font-bold hover:translate-x-2 transition-all duration-300"
                        style={{ color: "#ffffff" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#818cf8")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#ffffff")
                        }
                      >
                        View Project{" "}
                        <span className="material-symbols-outlined ml-2">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                prev();
                startAuto();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-primary hover:scale-110 active:scale-95 transition-all"
              style={{
                background: "#1a1c2b",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={() => {
                next();
                startAuto();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-primary hover:scale-110 active:scale-95 transition-all"
              style={{
                background: "#1a1c2b",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div className="flex justify-center space-x-3 mt-12">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goToReal(i);
                  startAuto();
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`indicator-dot h-2 rounded-full bg-white/70 cursor-pointer ${
                  i === current ? "active" : "w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{
              background: "#1a1c2b",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="h-72 overflow-hidden">
              <img
                src={activeProject.img}
                alt={activeProject.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  {activeProject.name}
                </h3>
                <span
                  className="px-3 py-1 rounded-full text-[11px] tracking-[0.08em] capitalize text-white shrink-0 ml-4"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {activeProject.badge}
                </span>
              </div>

              <p
                className="mb-6 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {activeProject.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[12px] tracking-[0.08em] lowercase rounded-full"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.75)",
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

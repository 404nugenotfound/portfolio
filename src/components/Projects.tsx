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
// clone last at start, clone first at end -> seamless infinite loop
const extended = [projects[n - 1], ...projects, projects[0]];

const TRANSITION = "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)";

export default function Projects() {
  const [current, setCurrent] = useState(0); // real dot index (0..n-1)
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const trackIndexRef = useRef(1); // position in `extended` array

  const render = useCallback((idx: number, instant: boolean) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;
    const slideW = slides[0].offsetWidth;
    const centerOffset = (container.offsetWidth - slideW) / 2;
    track.style.transition = instant ? "none" : TRANSITION;
    track.style.transform = `translateX(${-(idx * slideW) + centerOffset}px)`;
    if (instant) {
      void track.offsetHeight; // force reflow so transition:none applies before we restore it
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

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) next();
    }, 4000);
  }, [paused, next]);

  const handleTransitionEnd = useCallback(() => {
    const t = trackIndexRef.current;
    if (t === n + 1)
      goToTrack(1, true); // landed on clone-of-first -> snap to real first
    else if (t === 0) goToTrack(n, true); // landed on clone-of-last -> snap to real last
  }, [goToTrack]);

  useEffect(() => {
    goToTrack(1, true);
    startAuto();
    const onResize = () => render(trackIndexRef.current, true);
    window.addEventListener("resize", onResize);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []); // eslint-disable-line

  return (
    <section
      id="projects"
      className="w-full"
      style={{
        background:
          "linear-gradient(to bottom, #2a2d40 0%, #6b6f85 45%, #c7c8d1 100%)",
      }}
    >
      <div className="py-section-padding px-6 md:px-12 max-w-container-max mx-auto">
        {/* Header — eyebrow + headline left, intro right */}
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
            style={{ fontSize: "1.15rem", color: "#ffffff" }}
          >
            Four projects I'm proud to have built and shipped — from research
            collaborations to freelance work.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-350 mx-auto reveal">
          <div
            ref={containerRef}
            className="relative overflow-visible"
            style={{ perspective: "1000px" }}
          >
            <div
              ref={trackRef}
              className="flex"
              style={{
                transition: TRANSITION,
                willChange: "transform",
              }}
              onTransitionEnd={handleTransitionEnd}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
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
                    className="rounded-2xl overflow-hidden group h-full"
                    style={{
                      background: "#1a1c2b",
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
                    }}
                  >
                    <div className="h-64 bg-surface-container overflow-hidden relative">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3
                          className="font-condensed font-black uppercase text-3xl text-white"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {p.name}
                        </h3>
                        <span className="font-jetbrains px-4 py-1.5 rounded-full text-[13px] tracking-[0.1em] lowercase text-white shrink-0 ml-4 border border-white/15">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-on-surface-variant mb-6 line-clamp-2">
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="font-jetbrains px-4 py-1.5 text-primary text-[14px] tracking-[0.1em] lowercase rounded-full border border-primary/25"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href="#"
                        className="flex items-center text-primary font-bold hover:translate-x-2 transition-transform duration-300"
                      >
                        View Project{" "}
                        <span className="material-symbols-outlined ml-2">
                          arrow_forward
                        </span>
                      </a>
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
    </section>
  );
}

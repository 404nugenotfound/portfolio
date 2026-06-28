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

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const updateCarousel = useCallback((idx: number) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;
    const slideW = slides[0].offsetWidth;
    const centerOffset = (container.offsetWidth - slideW) / 2;
    track.style.transform = `translateX(${-(idx * slideW) + centerOffset}px)`;
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const next =
        ((idx % projects.length) + projects.length) % projects.length;
      setCurrent(next);
      updateCarousel(next);
    },
    [updateCarousel],
  );

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused)
        setCurrent((c) => {
          const n = (c + 1) % projects.length;
          updateCarousel(n);
          return n;
        });
    }, 4000);
  }, [paused, updateCarousel]);

  useEffect(() => {
    updateCarousel(0);
    startAuto();
    window.addEventListener("resize", () => updateCarousel(current));
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []); // eslint-disable-line

  return (
    <section id="projects" className="py-section-padding overflow-hidden">
      <h2 className="text-headline-lg font-semibold mb-16 text-center reveal">
        Featured Works
      </h2>

      <div className="relative max-w-350 mx-auto px-gutter reveal">
        <div
          ref={containerRef}
          className="relative overflow-visible"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{
              transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
              willChange: "transform",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0].screenX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].screenX - touchStartX.current;
              if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
              startAuto();
            }}
          >
            {projects.map((p, i) => (
              <div
                key={p.name}
                className={`carousel-slide ${i === 0 ? "active" : ""}`}
              >
                <div className="glass-card rounded-2xl overflow-hidden group h-full">
                  <div className="h-64 bg-surface-container overflow-hidden relative">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-headline-md text-white">{p.name}</h3>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-tighter text-outline shrink-0 ml-4">
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
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
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
              goTo(current - 1);
              startAuto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:text-primary hover:scale-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={() => {
              goTo(current + 1);
              startAuto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:text-primary hover:scale-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="flex justify-center space-x-3 mt-12">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i);
                startAuto();
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`indicator-dot h-2 rounded-full bg-white/30 cursor-pointer ${
                i === current ? "active" : "w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

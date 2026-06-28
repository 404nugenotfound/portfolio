"use client";
import { useEffect, useRef } from "react";

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let count = 0;
          const step = () => {
            count += 1;
            el.textContent = String(count);
            if (count < target) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="text-4xl font-bold text-primary mb-1">
      0
    </div>
  );
}

const stats = [
  { target: 7, label: "Projects" },
  { target: 2, label: "Clients" },
  { target: 2, label: "Years Experience" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-section-padding px-6 md:px-gutter max-w-container-max mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — text */}
        <div className="reveal flex flex-col gap-8">
          {/* Eyebrow + heading */}
          <div>
            <p className="text-[31px] tracking-[0.2em] uppercase text-primary mb-3">
              About Me
            </p>
            <div className="w-16 h-px bg-primary mb-6" />
          </div>

          {/* Bio */}
          <p className="text-body-md text-on-surface-variant leading-relaxed text-justify mb-8">
            D4 Informatics Engineering student at{" "}
            <span className="text-on-surface font-medium">
              Politeknik Negeri Jakarta
            </span>{" "}
            with experience across frontend, fullstack, and AI integration.
            Skilled in building modern, responsive interfaces using React,
            Next.js, and Tailwind CSS, with backend support in Python and Flask
            — including a research collaboration with{" "}
            <span className="text-primary font-medium">BRIN</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map(({ target, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-5 px-3 rounded-2xl border border-outline-variant bg-surface-container text-center"
              >
                <Counter target={target} />
                <div className="text-[11px] uppercase tracking-[0.15em] text-outline mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="reveal relative rounded-3xl overflow-hidden group h-[320px] md:h-[480px]">
          {/* accent border */}
          <div className="absolute inset-0 rounded-3xl border border-primary/20 z-10 pointer-events-none" />

          <img
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
            alt="Code aesthetic"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* floating label */}
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-on-surface-variant">
              Open to Work · 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

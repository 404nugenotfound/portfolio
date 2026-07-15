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
    <div ref={ref} className="font-condensed font-black text-4xl md:text-5xl leading-none mb-2" style={{ color: "#a5aafa" }}>
      0
    </div>
  );
}

const stats = [
  { target: 7, label: "Projects" },
  { target: 2, label: "Clients" },
  { target: 2, label: "Years Experience" },
  { target: 1, label: "Research Collab (BRIN)" },
];

export default function About() {
  return (
    <section
      id="about"
      className="w-full scroll-mt-16 md:scroll-mt-24"
      style={{
        background: "linear-gradient(to bottom, #0d0f18, #14161f)",
      }}
    >
      <div className="py-section-padding px-6 md:px-12 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div className="reveal flex flex-col gap-8">
            <div>
              <p
                className="font-jetbrains text-[1rem] tracking-[0.3em] uppercase mb-4"
                style={{ color: "#818cf8" }}
              >
                — About Me
              </p>
              <h2
                className="font-condensed font-black leading-[0.87] mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.01em",
                  color: "#eaeaf0",
                }}
              >
                CODE
                WITH
                <br />
                INTENT
              </h2>
            </div>
            <p
              className="leading-[1.8] font-light max-w-[500px]"
              style={{
                fontSize: "1.05rem",
                color: "rgba(234,234,240,0.55)",
              }}
            >
              D4 Informatics Engineering student at{" "}
              <span className="font-medium" style={{ color: "#eaeaf0" }}>
                Politeknik Negeri Jakarta
              </span>
              , turning complex problems into interfaces people actually
              enjoy using — spanning frontend, fullstack, and applied AI,
              with a research collaboration at{" "}
              <span className="text-white font-medium">BRIN</span>.
            </p>
          </div>
          {/* Right — stats grid */}
          <div
            className="reveal grid grid-cols-2 gap-px rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            {stats.map(({ target, label }) => (
              <div
                key={label}
                className="flex flex-col justify-center py-6 md:py-10 px-6"
                style={{ background: "#0d0f18" }}
              >
                <Counter target={target} />
                <div
                  className="font-jetbrains text-[0.7rem] tracking-[0.1em] uppercase"
                  style={{ color: "rgba(234,234,240,0.33)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
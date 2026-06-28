"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  // Film grain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Animated indigo orbs
  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;
    let t = 0;
    let rafId: number;
    const animate = () => {
      t += 0.003;
      const x1 = 50 + Math.sin(t * 0.7) * 20;
      const y1 = 30 + Math.cos(t * 0.5) * 15;
      const x2 = 20 + Math.cos(t * 0.4) * 25;
      const y2 = 70 + Math.sin(t * 0.6) * 20;
      el.style.background = `
        radial-gradient(ellipse 60% 50% at ${x1}% ${y1}%, rgba(123,132,184,0.13) 0%, transparent 70%),
        radial-gradient(ellipse 40% 60% at ${x2}% ${y2}%, rgba(74,82,128,0.09) 0%, transparent 65%),
        radial-gradient(ellipse 80% 40% at 80% 90%, rgba(90,80,150,0.06) 0%, transparent 60%),
        #09090E
      `;
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Animated gradient bg */}
      <div ref={gradientRef} className="absolute inset-0 pointer-events-none" />

      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/background/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.32,
        }}
      />

      {/* Film grain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
        style={{ opacity: 0.2 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(9,9,14,0.85) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #09090E 0%, transparent 100%)",
        }}
      />

      {/* Content — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-gutter pb-16 md:pb-14">
        {/* Accent line */}
        <div className="mb-5 h-px w-10 bg-primary" />

        {/* Eyebrow */}
        <p className="mb-4 text-label-md tracking-[0.22em] uppercase text-primary opacity-80">
          Personal Portfolio · Open to Work 
        </p>

        {/* Name */}
        <h1
          className="leading-[1.05] font-light text-on-surface"
          style={{
            fontSize: "clamp(36px, 6.5vw, 60px)",
            letterSpacing: "-0.025em",
          }}
        >
          Anugerah Rachmat
        </h1>
        <h1
          className="mb-6 leading-[1.05] font-semibold text-primary"
          style={{
            fontSize: "clamp(36px, 6.5vw, 68px)",
            letterSpacing: "-0.025em",
          }}
        >
          Indriansyah
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-body-lg font-light text-outline leading-relaxed">
              Fullstack Developer & Designer —{" "}
            </p>
            <p className="text-body-lg font-light text-on-surface-variant leading-relaxed">
              building purposeful digital experiences
            </p>
          </div>

          {/* CTA */}
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 self-start md:self-auto"
          >
            <span className="text-label-md tracking-[0.15em] uppercase text-primary transition-opacity duration-200 group-hover:opacity-70">
              View My Work
            </span>
            <span
              className="inline-flex items-center justify-center rounded-full border border-primary/40 text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/80 group-hover:shadow-glow"
              style={{ width: 38, height: 38 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="hidden md:flex flex-col items-center gap-2 absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-50">
        <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-on-surface px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
          Scroll Down
        </span>
        <span className="material-symbols-outlined text-2xl text-on-surface animate-bounce">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  );
}

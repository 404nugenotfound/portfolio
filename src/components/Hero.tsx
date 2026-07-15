"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Hero overlap fix — Loader dispatches this right as its exit wipe
  // *starts*, not when it finishes, so this entrance begins while the
  // curtain is still moving instead of waiting for it to fully clear.
  useEffect(() => {
    const onReveal = () => setRevealed(true);
    window.addEventListener("loader:reveal", onReveal);
    // Fallback: if Loader isn't mounted for some reason (e.g. dev hot
    // reload skipped it), don't leave Hero stuck invisible forever.
    const fallback = setTimeout(() => setRevealed(true), 3000);
    return () => {
      window.removeEventListener("loader:reveal", onReveal);
      clearTimeout(fallback);
    };
  }, []);

  // Film grain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let frameCount = 0;
    const draw = () => {
      if (frameCount++ % 3 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }
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
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Animated gradient bg */}
      <div ref={gradientRef} className="absolute inset-0 pointer-events-none" />

      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/background/background-compressed.png')",
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
        {/* Eyebrow */}
        <p
          data-cursor="text"
          className="mb-4 md:mb-6 font-mono text-[0.8rem] md:text-[0.9rem] tracking-[0.15em] md:tracking-[0.3em] uppercase text-primary"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 550ms cubic-bezier(0.23,1,0.32,1), transform 550ms cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          — Fullstack Developer & Designer
        </p>

        {/* Name */}
        <h1
          data-cursor="text"
          className="m-0 -ml-1 pb-1 font-black leading-[0.87] tracking-[-0.01em] text-on-surface"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.5rem, 9vw, 5rem)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 650ms cubic-bezier(0.23,1,0.32,1) 80ms, transform 650ms cubic-bezier(0.23,1,0.32,1) 80ms",
          }}
        >
          <span className="block">ANUGERAH</span>
          <span className="block">RACHMAT</span>
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "2px rgba(245,245,247,0.55)" }}
          >
            INDRIANSYAH
          </span>
        </h1>

        {/* Bottom row */}
        <div
          className="mt-10 mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 550ms cubic-bezier(0.23,1,0.32,1) 200ms, transform 550ms cubic-bezier(0.23,1,0.32,1) 200ms",
          }}
        >
          <p data-cursor="text" className="max-w-[550px] text-body-lg font-light leading-relaxed text-on-surface-variant">
            <span className="block">
              Building purposeful digital experiences —
            </span>
            <span className="block">
              from full-stack engineering to end-to-end product design
            </span>
          </p>

          {/* CTA — magnetic hover on the icon circle */}
          <a
            ref={ctaRef}
            href="#projects"
            data-cursor="link"
            className="group inline-flex items-center gap-3 self-start md:self-auto cursor-none"
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
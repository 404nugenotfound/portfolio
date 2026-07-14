"use client";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#6366f1";
const INK = "rgba(255,255,255,0.92)";
const BG = "#111319";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";

// Retimed to remove the purely-sequential "wait, then wait, then wait"
// stacking that pushed total runtime past 3s. Draw + count now overlap
// (both are legitimate "something is happening" signals, no reason to
// block one behind the other) instead of running back-to-back.
const DRAW_MS = 700; // mark stroke-draw duration (signature moment, unchanged)
const COUNT_START_MS = 480; // count phase starts while draw is still finishing
const FAST_MS = 380; // counter 0 -> 80
const SLOW_MS = 320; // counter 80 -> 99
const HOLD_MS = 1120; // brief hold at 100 before exit, so it registers
const EXIT_MS = 450; // wipe duration
// Total mount -> gone: ~480 + 380 + 320 + 1120 + 450 ≈ 2.45s (was ~3.1s)

export default function Loader() {
  const [phase, setPhase] = useState<"draw" | "count" | "exit" | "done">(
    "draw",
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const countLabelRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);
  const inertedEls = useRef<Element[]>([]);
  const previouslyFocused = useRef<Element | null>(null);

  // Fix #4: focus trap. While the loader is visible, everything else in
  // <body> gets `inert` (blocks focus + interaction, not just visual
  // hiding like aria-hidden does).
  //
  // IMPORTANT: this component never truly unmounts — it just returns null
  // once phase is "done". A cleanup function here would never fire, which
  // means `inert` would stay on every sibling forever and the whole page
  // becomes unclickable. So removal is done explicitly below, keyed off
  // `phase === "done"`, not via effect cleanup.
  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const siblings = Array.from(document.body.children).filter(
      (el) => el !== rootRef.current,
    );
    siblings.forEach((el) => el.setAttribute("inert", ""));
    inertedEls.current = siblings;

    rootRef.current?.focus();
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    inertedEls.current.forEach((el) => el.removeAttribute("inert"));
    if (previouslyFocused.current instanceof HTMLElement) {
      previouslyFocused.current.focus();
    }
  }, [phase]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.body.style.overflow = "hidden";

    if (reducedMotion.current) {
      const t = setTimeout(() => setPhase("exit"), 250);
      return () => clearTimeout(t);
    }

    const toCount = setTimeout(() => setPhase("count"), COUNT_START_MS);
    return () => clearTimeout(toCount);
  }, []);

  // Fix #2: counter/divider no longer go through React state. A single
  // rAF loop writes straight to the DOM via refs (textContent + style.width),
  // so this doesn't trigger a React re-render on every tick.
  useEffect(() => {
    if (phase !== "count" || reducedMotion.current) return;

    let raf: number;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const tick = (now: number) => {
      const t = now - start;
      let value: number;
      if (t <= FAST_MS) {
        const p = t / FAST_MS;
        value = Math.floor((1 - Math.pow(1 - p, 2)) * 80);
      } else if (t <= FAST_MS + SLOW_MS) {
        const p = (t - FAST_MS) / SLOW_MS;
        value = 80 + Math.floor((1 - Math.pow(1 - p, 3)) * 19);
      } else {
        value = 100;
      }

      if (countLabelRef.current) {
        countLabelRef.current.textContent = `${String(value).padStart(2, "0")} / 100`;
      }
      if (barRef.current) {
        barRef.current.style.width = `${value}%`;
      }

      if (value < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        holdTimer = setTimeout(() => setPhase("exit"), HOLD_MS);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (holdTimer !== undefined) clearTimeout(holdTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;

    const el = rootRef.current;
    if (!el) return;

    let cancelled = false;
    let clone: HTMLElement | null = null;
    let flight: Animation | null = null;
    let wipe: Animation | null = null;

    document.body.style.overflow = "";

    // Hero overlap handoff — fires as the wipe *starts*, not when it ends.
    window.dispatchEvent(new CustomEvent("loader:reveal"));
    document.documentElement.classList.add("loader-exiting");

    const finish = () => {
      if (cancelled) return;
      document.documentElement.classList.remove("loader-exiting");
      setPhase("done");
    };

    if (reducedMotion.current) {
      const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        easing: "ease",
        fill: "forwards",
      });
      fade.onfinish = () => {
        if (!cancelled) setPhase("done");
      };
      window.dispatchEvent(new CustomEvent("loader:logo-arrived"));
      return () => {
        cancelled = true;
        fade.cancel();
        document.documentElement.classList.remove("loader-exiting");
      };
    }

    // Shared element transition: the wordmark itself flies from its
    // centered loader position into the navbar's logo slot, landing right
    // as the wipe finishes — one continuous move instead of "loader logo
    // disappears, navbar logo separately appears."
    const source = wordmarkRef.current;
    const target = document.getElementById("nav-logo");

    if (source && target) {
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      source.style.visibility = "hidden"; // the clone takes over visually

      clone = source.cloneNode(true) as HTMLElement;
      clone.dataset.loaderClone = "true";
      clone.style.position = "fixed";
      clone.style.left = `${sourceRect.left}px`;
      clone.style.top = `${sourceRect.top}px`;
      clone.style.margin = "0";
      clone.style.zIndex = "10000";
      clone.style.pointerEvents = "none";
      clone.style.visibility = "visible";
      clone.style.transformOrigin = "top left";
      document.body.appendChild(clone);

      const dx = targetRect.left - sourceRect.left;
      const dy = targetRect.top - sourceRect.top;
      const scale = targetRect.height / sourceRect.height;

      // translate() runs first, scale() then happens anchored at the
      // now-translated top-left origin — so it lands at the target's
      // corner and scales in place there, rather than scaling in the
      // wrong spot and jumping.
      flight = clone.animate(
        [
          { transform: "translate(0px, 0px) scale(1)" },
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        ],
        { duration: EXIT_MS, easing: EASE_OUT, fill: "forwards" },
      );

      flight.onfinish = () => {
        if (cancelled) return;
        clone?.remove();
        clone = null;
        window.dispatchEvent(new CustomEvent("loader:logo-arrived"));
      };
    } else {
      // Navbar logo not found/mounted — skip the flight, just reveal it.
      window.dispatchEvent(new CustomEvent("loader:logo-arrived"));
    }

    wipe = el.animate(
      [{ clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(0 0 100% 0)" }],
      { duration: EXIT_MS, easing: EASE_OUT, fill: "forwards" },
    );
    wipe.onfinish = finish;

    return () => {
      cancelled = true;
      flight?.cancel();
      wipe?.cancel();
      clone?.remove();
      document
        .querySelectorAll('[data-loader-clone="true"]')
        .forEach((node) => node.remove());
      if (source) source.style.visibility = "";
      document.documentElement.classList.remove("loader-exiting");
    };
  }, [phase]);

  if (phase === "done") return null;

  const markDrawn = phase !== "draw";

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 outline-none"
      style={{ background: BG }}
    >
      {/* Mark: <N/> drawn with stroke-dashoffset (line drawing) */}
      <svg
        viewBox="0 0 160 80"
        width="220"
        height="110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="45,15 15,40 45,65"
          stroke={ACCENT}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: markDrawn ? 0 : 100,
            transition: `stroke-dashoffset ${DRAW_MS}ms ${EASE_IN_OUT}`,
          }}
        />
        <polyline
          points="65,65 65,15 95,65 95,15"
          stroke={INK}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: markDrawn ? 0 : 100,
            transition: `stroke-dashoffset ${DRAW_MS}ms ${EASE_IN_OUT} 60ms`,
          }}
        />
        <polyline
          points="130,15 100,65"
          stroke={ACCENT}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: markDrawn ? 0 : 100,
            transition: `stroke-dashoffset ${DRAW_MS}ms ${EASE_IN_OUT} 110ms`,
          }}
        />
        <polyline
          points="115,15 145,40 115,65"
          stroke={ACCENT}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: markDrawn ? 0 : 100,
            transition: `stroke-dashoffset ${DRAW_MS}ms ${EASE_IN_OUT} 170ms`,
          }}
        />
      </svg>

      {/* Wordmark — enters as the mark is finishing, not after a separate wait */}
      <span
        ref={wordmarkRef}
        className="font-bodoni text-[34px] tracking-wide"
        style={{
          color: INK,
          fontWeight: 700,
          letterSpacing: "0.01em",
          opacity: markDrawn ? 1 : 0,
          transform: markDrawn ? "translateY(0)" : "translateY(6px)",
          transition: `opacity 260ms ${EASE_OUT} 300ms, transform 260ms ${EASE_OUT} 300ms`,
        }}
      >
        NUGS.
      </span>

      {/* Divider — width driven directly via ref in the rAF loop above, no React state */}
      <div
        className="h-px overflow-hidden"
        style={{ width: 160, background: "rgba(255,255,255,0.10)" }}
      >
        <div
          ref={barRef}
          style={{ height: "100%", width: "0%", background: ACCENT }}
        />
      </div>

      {/* Counter — text also written directly via ref, tabular-nums so digits don't jiggle */}
      <span
        ref={countLabelRef}
        className="font-jetbrains text-sm tracking-[0.2em] tabular-nums"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        00 / 100
      </span>
    </div>
  );
}

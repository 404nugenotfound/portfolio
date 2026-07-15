"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (!isTouchDevice) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let targetX = 0;
    let targetY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let rafId = 0;
    let initialized = false;

    // Continuous lerp loop — outline chases target pos each frame instead
    // of snapping straight to it.
    const LERP_FACTOR = 0.2;
    const tick = () => {
      outlineX += (targetX - outlineX) * LERP_FACTOR;
      outlineY += (targetY - outlineY) * LERP_FACTOR;
      outline.style.left = `${outlineX - 20}px`;
      outline.style.top = `${outlineY - 20}px`;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.left = `${targetX}px`;
      dot.style.top = `${targetY}px`;

      if (!initialized) {
        // Snap outline to first position instead of lerping in from (0,0)
        outlineX = targetX;
        outlineY = targetY;
        initialized = true;
      }
    };

    const onEnter = () => {
      outline.style.transform = "scale(1.5)";
      outline.style.backgroundColor = "rgba(123, 132, 184, 0.1)";
    };
    const onLeave = () => {
      outline.style.transform = "scale(1)";
      outline.style.backgroundColor = "transparent";
    };
    const onScroll = () => {
      dot.style.opacity = "0";
      outline.style.opacity = "0";
    };
    const onMoveShow = () => {
      dot.style.opacity = "1";
      outline.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onMoveShow);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    const interactables = document.querySelectorAll(
      "a, button, .glass-card, .indicator-dot",
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onMoveShow);
      window.removeEventListener("scroll", onScroll);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[10001] pointer-events-none w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: "0 0 10px #3B82F6" }}
      />
      <div
        ref={outlineRef}
        className="fixed z-[10000] pointer-events-none w-10 h-10 border border-primary/50 rounded-full transition-transform duration-150"
      />
    </>
  );
}
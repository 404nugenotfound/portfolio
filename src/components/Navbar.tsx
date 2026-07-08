"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Shared element transition landing spot. Loader flies its own "NUGS."
  // wordmark to this exact element's position, then fires this event the
  // instant it lands — that's the cue to swap on the real navbar logo
  // (which stays invisible until then, so there's never a duplicate).
  useEffect(() => {
    const onArrived = () => setLogoVisible(true);
    window.addEventListener("loader:logo-arrived", onArrived);
    // Fallback: if Loader can't find/measure this element for any reason,
    // don't leave the logo invisible forever.
    const fallback = setTimeout(() => setLogoVisible(true), 3000);
    return () => {
      window.removeEventListener("loader:logo-arrived", onArrived);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-24 transition-all duration-500 ${
        visible
          ? "bg-white/5 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-full px-6 md:px-8 max-w-container-max mx-auto">
        <span
          id="nav-logo"
          className="font-bodoni text-[34px] text-on-surface transition-all duration-500"
          style={{
            fontWeight: 700,
            letterSpacing: "0.01em",
            opacity: logoVisible ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          NUGS.
        </span>
        <a
          href="#contact"
          className="px-6 py-2 rounded-lg text-white font-bold transition-all active:scale-95 hover:brightness-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] cursor-none"
          style={{ backgroundColor: "#6366f1" }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
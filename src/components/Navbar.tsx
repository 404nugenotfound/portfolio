"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          className="text-[34px] text-on-surface transition-all duration-500"
          style={{
            fontFamily: "'Mr Dafoe', cursive",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          
        </span>
        <a
          href="#contact"
          className="px-6 py-2 rounded-lg text-white font-bold transition-all active:scale-95 hover:brightness-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
          style={{ backgroundColor: "#6366f1" }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}

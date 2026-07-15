"use client";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onArrived = () => setLogoVisible(true);
    window.addEventListener("loader:logo-arrived", onArrived);
    const fallback = setTimeout(() => setLogoVisible(true), 3000);
    return () => {
      window.removeEventListener("loader:logo-arrived", onArrived);
      clearTimeout(fallback);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-16 md:h-24 transition-all duration-500 ${
        visible || menuOpen
          ? "bg-white/5 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-full px-6 md:px-8 max-w-container-max mx-auto">
        <a
          href="#hero"
          id="nav-logo"
          onClick={closeMenu}
          className="font-bodoni text-[26px] md:text-[34px] text-on-surface transition-all duration-500 cursor-none"
          style={{
            fontWeight: 700,
            letterSpacing: "0.01em",
            opacity: logoVisible ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          NUGS.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#contact"
            className="px-6 py-2 rounded-lg text-white font-bold transition-all active:scale-95 hover:brightness-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] md:cursor-none"
            style={{ backgroundColor: "#6366f1" }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile — menu toggle + compact CTA */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="#contact"
            onClick={closeMenu}
            className="px-4 py-1.5 rounded-lg text-white text-sm font-bold transition-all active:scale-95"
            style={{ backgroundColor: "#6366f1" }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}

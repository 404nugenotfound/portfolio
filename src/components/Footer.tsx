"use client";
import { ArrowUp } from "lucide-react";

const SURFACE = "#16161f";
const INDIGO = "#7B84B8";
const MUTED = "rgba(255,255,255,0.62)";
const DIM = "rgba(255,255,255,0.44)";
const CTA = "#6366f1";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const socials = [
  {
    label: "GITHUB",
    href: "https://github.com/404nugenotfound",
    svg: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/anugerah-rachmat-indriansyah",
    svg: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
  label: "INSTAGRAM",
  href: "https://instagram.com/nuugee.__",
  svg: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
},
];

export default function Footer() {
  return (
    <footer
      className="relative w-full flex-shrink-0 overflow-hidden px-6 md:px-14 pt-4 pb-5 bg-background"
      style={{ borderTop: `1px solid ${DIM}` }}
    >
      {/* Ghost "LET'S TALK" */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <span
          className="whitespace-nowrap font-black leading-none"
          style={{
            fontSize: "clamp(100px, 22vw, 260px)",
            color: "transparent",
            WebkitTextStroke: `1px rgba(255,255,255,0.1)`,
            letterSpacing: "-0.04em",
          }}
        >
          {"LET'S TALK"}
        </span>
      </div>

      {/* Top row */}
       <div className="relative flex items-center justify-between mb-4 md:mb-5">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: DIM, fontWeight: 500 }}
        >
          © 2026 Anugerah Rachmat Indriansyah
        </span>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3"
          aria-label="Back to top"
        >
          <span
            className="text-xs tracking-widest uppercase font-medium transition-colors duration-200"
            style={{ color: INDIGO }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = CTA)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = INDIGO)
            }
          >
            BACK TO TOP
          </span>
          <span
            className="flex size-9 items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: SURFACE,
              border: `1px solid rgba(255,255,255,0.12)`,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = CTA;
              el.style.borderColor = CTA;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = SURFACE;
              el.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <ArrowUp
              size={14}
              className="text-white/70"
              style={{ strokeWidth: 2 }}
            />
          </span>
        </button>
      </div>

      {/* Middle */}
      <div className="relative mb-4 md:mb-20">
        <p
          className="mb-1.5 text-xs tracking-widest uppercase font-medium"
          style={{ color: INDIGO, letterSpacing: "0.18em" }}
        >
          HAVE A PROJECT IN MIND?
        </p>
        <a
          href="mailto:rachmat.anugerah21@gmail.com"
          className="group inline-block"
        >
          <h2
            className="font-black leading-none transition-colors duration-300"
            style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              color: "rgba(255,255,255,0.88)",
              letterSpacing: "-0.04em",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#ffffff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.88)")
            }
          >
            {"LET'S TALK."}
          </h2>
        </a>
      </div>

      {/* Bottom row */}
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-3 md:gap-4">
          {socials.map(({ label, svg, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mt-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200"
              style={{
                border: `1px solid rgba(255,255,255,0.18)`,
                color: MUTED,
                letterSpacing: "0.12em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = INDIGO;
                el.style.color = "#ffffff";
                el.style.background = "rgba(123,132,184,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.18)";
                el.style.color = MUTED;
                el.style.background = "transparent";
              }}
            >
              {svg}
              {label}
            </a>
          ))}
        </nav>
        <p className="text-xs md:text-right" style={{ color: DIM }}>
          Design &amp; Development by{" "}
          <span style={{ color: MUTED, fontWeight: 600 }}>
            Anugerah Rachmat Indriansyah
          </span>{" "}
          · Built with precision.
        </p>
      </div>
    </footer>
  );
}
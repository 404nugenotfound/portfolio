"use client";

import { useState } from "react";

interface Tech {
  name: string;
  slug?: string;
  color?: string;
  localSrc?: string; // path to local icon in /public/icons
  label?: string; // fallback text when no logo available
}

const row1: Tech[] = [
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS3", slug: "css", color: "1572B6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PHP", slug: "php", color: "777BB4" },
  { name: "Java", localSrc: "/icons/Java.png" },
];

const row2: Tech[] = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Flask", slug: "flask", color: "FFFFFF" },
  { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Laravel", slug: "laravel", color: "FF2D20" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
];

const row3: Tech[] = [
  { name: "Git", slug: "git", color: "F05032" },
  { name: "GitHub", slug: "github", color: "FFFFFF" },
  { name: "Vercel", slug: "vercel", color: "FFFFFF" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "Firebase", slug: "firebase", color: "FFCA28" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
];

const creativeRow: Tech[] = [
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Adobe Lightroom", localSrc: "/icons/adobe-lightroom.png" },
  { name: "Adobe Photoshop", localSrc: "/icons/adobe-photoshop.png" },
  { name: "Filmora", localSrc: "/icons/filmora.png" },
  { name: "CapCut", localSrc: "/icons/capcut-logo.svg" },
];

const KEY = 78;
const GAP = 9;
const PAD = 18;
const BED = 14;

const ROWW = 8 * KEY + 7 * GAP;
const R1_OFF = Math.round((ROWW - (6 * KEY + 5 * GAP)) / 2);
const R3_OFF = Math.round((ROWW - (7 * KEY + 6 * GAP)) / 2);

const SKEY = 64;
const SGAP = 9;
const SPAD = 16;
const SBED = 12;

function getIconSrc(tech: Tech) {
  if (tech.localSrc) return tech.localSrc;
  if (tech.slug)
    return `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`;
  return null;
}

function Key({ tech, size = KEY }: { tech: Tech; size?: number }) {
  const [on, setOn] = useState(false);
  const iconSrc = getIconSrc(tech);

  return (
    <div
      style={{ position: "relative", flexShrink: 0, zIndex: on ? 20 : 1 }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 14px)",
          left: "50%",
          transform: `translateX(-50%) scale(${on ? 1 : 0.9}) translateY(${on ? 0 : 3}px)`,
          background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
          color: "#fff",
          padding: "5px 13px",
          borderRadius: "7px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase" as const,
          whiteSpace: "nowrap" as const,
          pointerEvents: "none" as const,
          opacity: on ? 1 : 0,
          transition: "opacity 0.15s ease, transform 0.15s ease",
          boxShadow: "0 4px 20px rgba(99,102,241,0.55)",
        }}
      >
        {tech.name}
        <span
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "block",
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #6366f1",
          }}
        />
      </div>

      {/* Socket */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          background: on
            ? "radial-gradient(ellipse at 50% 65%, rgba(99,102,241,0.20) 0%, #040405 68%)"
            : "#040405",
          boxShadow:
            "inset 0 3px 12px rgba(0,0,0,0.95), inset 0 0 0 1px rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s ease",
        }}
      >
        {/* Keycap */}
        <div
          style={{
            width: size - 8,
            height: size - 8,
            borderRadius: 9,
            background: on
              ? "linear-gradient(to bottom, #221a3c 0%, #0c0918 100%)"
              : "linear-gradient(to bottom, #3a3a3e 0%, #181819 100%)",
            boxShadow: on
              ? [
                  "inset 0 1px 0 rgba(165,170,250,0.38)",
                  "inset 0 -2px 0 rgba(0,0,0,0.90)",
                  "inset 0 5px 14px rgba(0,0,0,0.50)",
                  "0 0 18px rgba(99,102,241,0.92)",
                  "0 0 36px rgba(99,102,241,0.65)",
                  "0 0 60px rgba(99,102,241,0.38)",
                ].join(", ")
              : [
                  "inset 0 1px 0 rgba(255,255,255,0.24)",
                  "inset 0 -2px 0 rgba(0,0,0,0.90)",
                  "inset 0 5px 14px rgba(0,0,0,0.60)",
                  "0 9px 0 0 #060607",
                  "0 10px 18px rgba(0,0,0,0.6)",
                ].join(", "),
            transform: on ? "translateY(-6px)" : "translateY(0px)",
            transition:
              "background 0.2s ease, box-shadow 0.2s ease, transform 0.18s cubic-bezier(0.22,1,0.36,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            userSelect: "none" as const,
          }}
        >
          {/* Gloss */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "48%",
              background: on
                ? "linear-gradient(to bottom, rgba(165,170,250,0.14) 0%, rgba(99,102,241,0) 100%)"
                : "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
              borderRadius: "9px 9px 0 0",
              transition: "background 0.2s ease",
              pointerEvents: "none",
            }}
          />

          {/* Icon or text fallback */}
          {iconSrc ? (
            <img
              src={iconSrc}
              alt={tech.name}
              width={size === KEY ? 36 : 28}
              height={size === KEY ? 36 : 28}
              style={{
                objectFit: "contain",
                position: "relative",
                zIndex: 1,
                filter: on
                  ? "drop-shadow(0 0 6px rgba(129,140,248,0.98)) drop-shadow(0 0 2px rgba(99,102,241,0.8))"
                  : "drop-shadow(0 1px 2px rgba(0,0,0,0.85)) opacity(0.92)",
                transition: "filter 0.2s ease",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontSize: size === KEY ? 18 : 15,
                fontWeight: 800,
                letterSpacing: "0.02em",
                color: on ? "#a5aafa" : "rgba(255,255,255,0.85)",
                filter: on
                  ? "drop-shadow(0 0 6px rgba(129,140,248,0.98))"
                  : "drop-shadow(0 1px 2px rgba(0,0,0,0.85))",
                transition: "color 0.2s ease, filter 0.2s ease",
              }}
            >
              {tech.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="w-full"
      style={{
        background:
          "linear-gradient(to bottom, #14161f 0%, #1e2032 45%, #2a2d40 100%)",
      }}
    >
      <div className="py-section-padding px-6 md:px-12 max-w-container-max mx-auto">
        {/* Text left, keyboards stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — text, centered against full right-side height */}
          <div className="reveal flex flex-col gap-6 justify-center h-full">
            <p
              className="font-jetbrains text-[1rem] tracking-[0.3em] uppercase"
              style={{ color: "#818cf8" }}
            >
              — Tech Stack
            </p>
            <h2
              className="font-condensed font-black leading-[0.87]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.01em",
                color: "#dcdce2",
              }}
            >
              TOOLS
              <br />
              I THINK
              <br />
              WITH
            </h2>
            <p
              className="leading-[1.8] font-light max-w-[300px]"
              style={{
                fontSize: "1.05rem",
                color: "rgba(220,220,226,0.6)",
              }}
            >
              Hover the keys to explore my toolkit. Each lit key is a technology
              I reach for daily — from prototyping through to shipping
              production code, spanning languages, frameworks, and the tools
              that connect them.
            </p>
            <span
              className="font-jetbrains text-[0.8rem] tracking-[0.12em] uppercase"
              style={{ color: "rgba(220,220,226,0.45)" }}
            >
              Hover a key ↗
            </span>
          </div>

          {/* Right — Main Keyboard + Beyond Code label + Mini Keyboard, stacked */}
          <div className="reveal flex flex-col items-center gap-10 pr-6">
            {/* Main Keyboard (Dev Stack) */}
            <div
              style={{ perspective: "1800px", perspectiveOrigin: "50% 30%" }}
            >
              <div style={{ transform: "rotateX(10deg) rotateY(-2deg)" }}>
                <div
                  style={{
                    position: "relative",
                    background: [
                      "repeating-linear-gradient(180deg, rgba(255,255,255,0.009) 0px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 3px, rgba(255,255,255,0.006) 4px)",
                      "linear-gradient(to bottom, #222226 0%, #1C1C1E 25%, #1d1d1f 100%)",
                    ].join(", "),
                    borderRadius: 20,
                    padding: PAD,
                    boxShadow: [
                      "inset 0 1px 0 rgba(255,255,255,0.07)",
                      "0 0 0 1px rgba(255,255,255,0.055)",
                      "0 6px 30px rgba(0,0,0,0.7)",
                      "0 2px 8px rgba(0,0,0,0.5)",
                    ].join(", "),
                  }}
                >
                  <div
                    style={{
                      background: "#040405",
                      borderRadius: 14,
                      padding: BED,
                      boxShadow: [
                        "inset 0 4px 18px rgba(0,0,0,0.92)",
                        "inset 0 2px 6px rgba(0,0,0,0.7)",
                        "inset 0 0 0 1px rgba(0,0,0,0.65)",
                      ].join(", "),
                      display: "flex",
                      flexDirection: "column" as const,
                      gap: GAP,
                    }}
                  >
                    <div
                      style={{ display: "flex", gap: GAP, marginLeft: R1_OFF }}
                    >
                      {row1.map((t) => (
                        <Key key={t.name} tech={t} />
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: GAP }}>
                      {row2.map((t) => (
                        <Key key={t.name} tech={t} />
                      ))}
                    </div>
                    <div
                      style={{ display: "flex", gap: GAP, marginLeft: R3_OFF }}
                    >
                      {row3.map((t) => (
                        <Key key={t.name} tech={t} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Beyond Code label */}
            <p
              className="font-jetbrains text-[0.62rem] tracking-[0.3em] uppercase"
              style={{ color: "#818cf8" }}
            >
              — Beyond Code
            </p>

            {/* Mini Keyboard — Creative Tools */}
            <div
              style={{ perspective: "1800px", perspectiveOrigin: "50% 30%" }}
            >
              <div style={{ transform: "rotateX(10deg) rotateY(-2deg)" }}>
                <div
                  style={{
                    position: "relative",
                    background: [
                      "repeating-linear-gradient(180deg, rgba(255,255,255,0.009) 0px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 3px, rgba(255,255,255,0.006) 4px)",
                      "linear-gradient(to bottom, #222226 0%, #1C1C1E 25%, #1d1d1f 100%)",
                    ].join(", "),
                    borderRadius: 18,
                    padding: SPAD,
                    boxShadow: [
                      "inset 0 1px 0 rgba(255,255,255,0.07)",
                      "0 0 0 1px rgba(255,255,255,0.055)",
                      "0 6px 30px rgba(0,0,0,0.7)",
                      "0 2px 8px rgba(0,0,0,0.5)",
                    ].join(", "),
                  }}
                >
                  <div
                    style={{
                      background: "#040405",
                      borderRadius: 12,
                      padding: SBED,
                      boxShadow: [
                        "inset 0 4px 18px rgba(0,0,0,0.92)",
                        "inset 0 2px 6px rgba(0,0,0,0.7)",
                        "inset 0 0 0 1px rgba(0,0,0,0.65)",
                      ].join(", "),
                      display: "flex",
                      gap: SGAP,
                    }}
                  >
                    {creativeRow.map((t) => (
                      <Key key={t.name} tech={t} size={SKEY} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

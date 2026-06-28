"use client";
import { useState } from "react";

const SURFACE = "#16161f";
const CTA = "#6366f1";
const MUTED = "rgba(255,255,255,0.32)";
const DIM = "rgba(255,255,255,0.14)";
const EMAIL = "rachmat.anugerah21@gmail.com";
const PHONE = "+62 851-2800-6119";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="w-full flex flex-col items-center text-center px-6 md:px-14 pt-14 pb-12"
      style={{ borderTop: `1px solid ${DIM}` }}
    >
      <h2
        className="mb-3 font-black leading-tight"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 4.5vw, 52px)",
          letterSpacing: "-0.03em",
          color: "rgba(255,255,255,0.90)",
        }}
      >
        Ready to collaborate?
      </h2>

      <p
        className="mb-8 max-w-lg text-sm leading-relaxed"
        style={{ color: "rgba(255,255,255,0.52)" }}
      >
        I&apos;m currently available for freelance projects and full-time opportunities.
      </p>

      {/* Email copy */}
      <button
        onClick={handleCopy}
        className="relative inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-70 mb-3"
        aria-label="Copy email address"
      >
        <span
          className="font-semibold"
          style={{
            fontSize: "clamp(15px, 2vw, 22px)",
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "-0.01em",
          }}
        >
          {EMAIL}
        </span>
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
          style={{
            background: copied ? "rgba(99,102,241,0.18)" : SURFACE,
            border: `1px solid ${copied ? CTA : "rgba(255,255,255,0.10)"}`,
          }}
        >
          {copied ? (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={CTA} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </span>
        {copied && (
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium"
            style={{
              background: SURFACE,
              border: `1px solid rgba(255,255,255,0.10)`,
              color: MUTED,
            }}
          >
            Copied!
          </span>
        )}
      </button>

      {/* Phone */}
      <span className="text-md" style={{ color: "rgba(255,255,255,0.48)" }}>
        {PHONE}
      </span>
    </section>
  );
}
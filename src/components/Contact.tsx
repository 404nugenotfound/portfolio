"use client";
import { useEffect, useId, useRef, useState } from "react";

/* ---------------------------------------------------------------------- */
/*  Tokens — kept from the existing system (dark editorial, indigo CTA)   */
/* ---------------------------------------------------------------------- */
const BG = "#0e0f17";
const SURFACE = "#14151f";
const INPUT_BG = "#181926";
const CTA = "#6366f1";
const CTA_SOFT = "rgba(99,102,241,0.14)";
const INK = "rgba(255,255,255,0.92)";
const MUTED = "rgba(255,255,255,0.56)";
const FAINT = "rgba(255,255,255,0.34)";
const DIM = "rgba(255,255,255,0.12)";
const ERROR = "#f87171";

const EMAIL = "rachmat.anugerah21@gmail.com";
const PHONE = "+62 851-2800-6119";
const MESSAGE_LIMIT = 600;

const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');";

type FormState = "idle" | "loading" | "success" | "error";
type FieldKey = "nama" | "email" | "subjek" | "pesan";
type Errors = Partial<Record<FieldKey, string>>;

/* ---------------------------------------------------------------------- */
/*  Field — floating label for single-line inputs, static caption for the */
/*  textarea (floating overlays don't work on multi-line fields)          */
/* ---------------------------------------------------------------------- */
function Field({
  label,
  type = "text",
  value,
  onChange,
  error,
  textarea = false,
  maxLength,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? ERROR : focused ? CTA : DIM;

  if (textarea) {
    return (
      <div className="flex flex-col gap-1.5 text-left w-full">
        <span
          className="pl-1 text-xs"
          style={{
            color: error ? ERROR : FAINT,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {label}
        </span>
        <div
          className="relative w-full rounded-lg transition-shadow duration-300 motion-reduce:transition-none"
          style={{
            background: INPUT_BG,
            border: `1px solid ${borderColor}`,
            boxShadow: focused && !error ? `0 0 0 3px ${CTA_SOFT}` : "none",
          }}
        >
          <textarea
            id={id}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={3}
            style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
            className="w-full rounded-lg bg-transparent px-3.5 pt-3 pb-1.5 text-sm outline-none resize-none placeholder:text-[13px]"
          />
          <span
            aria-hidden
            className="absolute bottom-0 left-3.5 right-3.5 h-px origin-left transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              background: error ? ERROR : CTA,
              transform: focused && !error ? "scaleX(1)" : "scaleX(0)",
            }}
          />
          {maxLength && (
            <span
              className="absolute bottom-2 right-3 text-[11px] tabular-nums"
              style={{
                color: value.length > maxLength * 0.9 ? ERROR : FAINT,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {value.length}/{maxLength}
            </span>
          )}
        </div>
        {error && (
          <span
            className="text-xs pl-1"
            style={{ color: ERROR, fontFamily: "'Inter', sans-serif" }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 text-left w-full">
      <span
        className="pl-1 text-xs"
        style={{
          color: error ? ERROR : FAINT,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {label}
      </span>
      <div
        className="relative w-full rounded-lg transition-shadow duration-300 motion-reduce:transition-none"
        style={{
          background: INPUT_BG,
          border: `1px solid ${borderColor}`,
          boxShadow: focused && !error ? `0 0 0 3px ${CTA_SOFT}` : "none",
        }}
      >
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
          className="w-full rounded-lg bg-transparent px-3.5 py-3 text-sm outline-none"
        />

        {/* signature underline — draws under the field on focus, like a pen */}
        <span
          aria-hidden
          className="absolute bottom-0 left-3.5 right-3.5 h-px origin-left transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            background: error ? ERROR : CTA,
            transform: focused && !error ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>
      {error && (
        <span
          className="text-xs pl-1"
          style={{ color: ERROR, fontFamily: "'Inter', sans-serif" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Main section                                                          */
/* ---------------------------------------------------------------------- */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PHONE);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const clear = (key: FieldKey) =>
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!nama.trim()) e.nama = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Invalid email format";
    if (!subjek.trim()) e.subjek = "Subject is required";
    if (!pesan.trim()) e.pesan = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }
    setErrors({});
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nama,
          email,
          subject: subjek,
          message: pesan,
        }),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const resetForm = () => {
    setNama("");
    setEmail("");
    setSubjek("");
    setPesan("");
    setFormState("idle");
  };

  useEffect(() => {
    if (formState === "success" && liveRegionRef.current) {
      liveRegionRef.current.textContent = "Message sent.";
    }
  }, [formState]);

  return (
    <section
      id="contact"
      className="w-full flex-1 flex flex-col justify-center px-6 md:px-14 py-6 md:py-8"
      style={{
        background: BG,
        borderTop: `1px solid ${DIM}`,
        scrollMarginTop: "96px",
      }}
    >
      <style>{FONTS}</style>

      <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 lg:items-start">
        {/* ------------------------------------------------------------ */}
        {/* Left — statement + direct contact                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col text-left self-start h-fit pt-7">
          <span
            className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em]"
            style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="relative flex size-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping motion-reduce:hidden"
                style={{ background: CTA }}
              />
              <span
                className="relative inline-flex size-1.5 rounded-full"
                style={{ background: CTA }}
              />
            </span>
            Available for work
          </span>

          <h2
            className="mb-4 font-black leading-[0.92]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            Got an idea? Let&apos;s make it{" "}
            <span
              style={{
                WebkitTextStroke: `1.5px ${INK}`,
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              real.
            </span>
          </h2>

          <p
            className="mb-6 max-w-sm text-sm leading-relaxed"
            style={{ color: MUTED, fontFamily: "'Inter', sans-serif" }}
          >
            Open to freelance projects and full-time roles — fullstack
            development, product design, or both at once.
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
            style={{ borderTop: `1px solid ${DIM}` }}
          >
            <button
              onClick={handleCopy}
              className="group flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-left transition-colors duration-200 motion-reduce:transition-none"
              style={{ background: SURFACE, border: `1px solid ${DIM}` }}
              aria-label="Copy email address"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span
                  className="text-[11px] uppercase tracking-wider"
                  style={{
                    color: FAINT,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Email
                </span>
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
                >
                  {EMAIL}
                </span>
              </div>
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 motion-reduce:transition-none"
                style={{
                  background: copied ? CTA_SOFT : "transparent",
                  border: `1px solid ${copied ? CTA : DIM}`,
                }}
              >
                {copied ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={CTA}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={FAINT}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-200 group-hover:stroke-current"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </span>
            </button>

            <button
              onClick={handleCopyPhone}
              className="group flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-left transition-colors duration-200 motion-reduce:transition-none"
              style={{ background: SURFACE, border: `1px solid ${DIM}` }}
              aria-label="Copy phone number"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span
                  className="text-[11px] uppercase tracking-wider"
                  style={{
                    color: FAINT,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Phone
                </span>
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
                >
                  {PHONE}
                </span>
              </div>
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 motion-reduce:transition-none"
                style={{
                  background: copiedPhone ? CTA_SOFT : "transparent",
                  border: `1px solid ${copiedPhone ? CTA : DIM}`,
                }}
              >
                {copiedPhone ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={CTA}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={FAINT}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-200 group-hover:stroke-current"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Right — form card                                             */}
        {/* ------------------------------------------------------------ */}
        <div
          className="relative rounded-2xl p-5 md:p-6 self-start h-fit"
          style={{ background: SURFACE, border: `1px solid ${DIM}` }}
        >
          <span
            className="mb-4 block text-xs uppercase tracking-[0.18em]"
            style={{ color: FAINT, fontFamily: "'JetBrains Mono', monospace" }}
          >
            Or write a message
          </span>

          <div ref={liveRegionRef} aria-live="polite" className="sr-only" />

          {formState === "success" ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center animate-[fadeIn_0.4s_ease-out] motion-reduce:animate-none">
              <span
                className="relative flex size-14 items-center justify-center rounded-full animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:animate-none"
                style={{
                  background: CTA_SOFT,
                  border: `1px solid ${CTA}`,
                  boxShadow: `0 0 0 6px rgba(99,102,241,0.06), 0 0 24px rgba(99,102,241,0.25)`,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={CTA}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline
                    points="20 6 9 17 4 12"
                    pathLength="1"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: 0,
                      animation: "draw 0.5s ease-out 0.15s both",
                    }}
                    className="motion-reduce:[animation:none]"
                  />
                </svg>
              </span>

              <div className="flex flex-col gap-1.5">
                <span
                  className="text-xs uppercase tracking-[0.18em]"
                  style={{
                    color: FAINT,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Delivered
                </span>
                <p
                  className="font-black leading-none"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(28px, 3.5vw, 38px)",
                    letterSpacing: "-0.01em",
                    color: INK,
                  }}
                >
                  Message sent.
                </p>
              </div>

              <p
                className="max-w-[30ch] text-sm leading-relaxed"
                style={{ color: MUTED, fontFamily: "'Inter', sans-serif" }}
              >
                I&apos;ll get back to you soon, usually within 1–2 days.
              </p>

              <button
                onClick={resetForm}
                className="mt-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 motion-reduce:transition-none"
                style={{
                  border: `1px solid ${DIM}`,
                  color: MUTED,
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = CTA;
                  el.style.color = INK;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = DIM;
                  el.style.color = MUTED;
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Your name"
                  placeholder="Your name"
                  value={nama}
                  onChange={(v) => {
                    setNama(v);
                    clear("nama");
                  }}
                  error={errors.nama}
                />
                <Field
                  label="Your email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    clear("email");
                  }}
                  error={errors.email}
                />
              </div>
              <Field
                label="Subject"
                placeholder="Subject"
                value={subjek}
                onChange={(v) => {
                  setSubjek(v);
                  clear("subjek");
                }}
                error={errors.subjek}
              />
              <Field
                label="Message"
                placeholder="Tell me about your project or idea..."
                value={pesan}
                onChange={(v) => {
                  setPesan(v);
                  clear("pesan");
                }}
                error={errors.pesan}
                textarea
                maxLength={MESSAGE_LIMIT}
              />

              <button
                type="submit"
                disabled={formState === "loading"}
                className="group relative mt-1.5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-3 px-5 text-sm font-semibold transition-transform duration-200 motion-reduce:transition-none active:scale-[0.985] disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: CTA,
                  color: "#ffffff",
                }}
              >
                {formState === "loading" ? (
                  <>
                    <svg
                      className="motion-safe:animate-spin motion-reduce:hidden"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="3"
                      />
                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-0.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              {formState === "error" && (
                <p
                  className="text-xs pl-1"
                  style={{ color: ERROR, fontFamily: "'Inter', sans-serif" }}
                >
                  Failed to send, try again —{" "}
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="underline"
                  >
                    retry
                  </button>
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
}

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09090E',           // was #0a0a0a — lebih cool undertone
        primary: '#7B84B8',              // was #3B82F6 — antique indigo
        'primary-container': '#9198CC',  // was #4d8eff
        surface: '#111118',              // was #10131a
        'surface-dim': '#0D0D12',        // was #10131a
        'surface-container': '#181822',  // was #1d2027
        'surface-container-low': '#141420',   // was #191b23
        'surface-container-high': '#1E1E2A',  // was #272a31
        'surface-container-highest': '#252532', // was #32353c
        'surface-bright': '#2A2A38',     // was #363941
        'on-surface': '#E4E2EE',         // was #e1e2ec
        'on-surface-variant': '#C2C0D6', // was #c2c6d6
        'on-background': '#E4E2EE',      // was #e1e2ec
        outline: '#6E6C84',              // was #8c909f
        'outline-variant': '#2E2C42',    // was #424754
        'inverse-surface': '#E4E2EE',    // was #e1e2ec
        'inverse-on-surface': '#2A2838', // was #2e3038
        secondary: '#A8ACCC',            // was #b1c6f9
        'secondary-container': '#2A3055', // was #304671
        tertiary: '#ffb786',             // tetap — warm pop contrast bagus
        'tertiary-container': '#df7412', // tetap
        error: '#ffb4ab',                // tetap
        'surface-tint': '#7B84B8',       // was #adc6ff
        'primary-fixed-dim': '#9198CC',  // was #adc6ff
        'on-primary': '#0D0F28',         // was #002e6a
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.25rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        'stack-sm': '8px',
        'stack-md': '24px',
        'stack-lg': '48px',
        'section-padding': '120px',
        'container-max': '1280px',
        gutter: '40px',
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        condensed: ['var(--font-barlow)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains)', 'monospace'],
        bodoni: ['var(--font-bodoni)', 'serif'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '600' }],
        'headline-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-md': ['16px', { lineHeight: '1.6', letterSpacing: '0' }],
        'label-md': ['14px', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '500' }],
        code: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      maxWidth: {
        'container-max': '1280px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(123, 132, 184, 0.2)',
        'glow-strong': '0 0 40px rgba(123, 132, 184, 0.7)',
        'glow-sm': '0 0 15px rgba(145, 152, 204, 0.5)',
        'dot-glow': '0 0 15px rgba(123, 132, 184, 0.8)',
      },
    },
  },
  plugins: [],
}

export default config

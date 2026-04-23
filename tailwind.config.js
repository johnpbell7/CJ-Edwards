/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        display: ['Anton', 'Inter', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        ink: 'var(--ink)',
        'ink-dim': 'var(--ink-dim)',
        'ink-mute': 'var(--ink-mute)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
      },
    },
  },
  plugins: [],
}

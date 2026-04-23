# CJ Edwards

One-page marketing site for CJ Edwards — DJ, producer, selector based in Birmingham. Dark theme, immersive, motion-driven. Inspired by Anyflow Labs and Kaleida.

Built with Vite + React + Tailwind CSS. All animation is hand-rolled CSS (no heavy motion libraries).

---

## Stack

- **Vite 6** — build tool
- **React 18** — UI framework
- **Tailwind CSS 3** — utility-first styling
- **Anton** (display) + **Inter** (body) + **JetBrains Mono** (labels) — typography
- **Google Fonts** — loaded via `<link>` in `index.html`

No runtime dependencies beyond React. All animation is CSS keyframes.

---

## Features

- **Fixed floating nav pill** (Anyflow-inspired) with full-screen overlay menu
- **Cinematic hero** with three animated gradient orbs, grain overlay, floating particles, and magnetic CTA
- **Now Playing widget** that slides in after scrolling past the hero
- **Work** (bento grid of past shows with hover card effects)
- **Mixes** (interactive play/pause rows with animated waveforms)
- **Shows** (2026 tour dates with hover accent bars and sold-out states)
- **Weddings** (colour-graded DJ photo + split-screen layout, £1,450 pricing)
- **Press** (large pull quotes with ambient glow)
- **Book** (form with typed booking category tabs, magnetic submit button)
- **Stat counters** that count up on scroll
- **Custom SVG logo** integrated as brand mark, menu anchor, and footer

---

## Local development

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173/CJ-Edwards/` (or similar).

---

## Build

```bash
npm run build
```

Output goes to `dist/`.

```bash
npm run preview
```

Serves the production build locally for verification.

---

## Deploy to GitHub Pages

1. Ensure `base` in `vite.config.js` is set correctly:
   - For this repo (`johnpbell7/CJ-Edwards`) → `'/CJ-Edwards/'` (already set)
   - For a custom domain or user site (`username.github.io`) → `'/'`

2. Deploy:
   ```bash
   npm run deploy
   ```
   This runs `gh-pages -d dist`, which pushes `dist/` to a `gh-pages` branch.

3. In the GitHub repo settings → **Pages**, set the source to `gh-pages` branch, `/ (root)`.

4. Site will be live at:
   ```
   https://johnpbell7.github.io/CJ-Edwards/
   ```

---

## Project structure

```
cj-edwards/
├── public/
│   ├── cje-logo.svg          # The CJE geometric zigzag logo
│   └── dj-setup.jpg          # Weddings section photo (colour-graded in CSS)
├── src/
│   ├── App.jsx               # All components + data
│   ├── main.jsx              # React entry
│   └── index.css             # Tailwind + custom styles (animations, glow orbs, grain)
├── index.html                # HTML shell with font loading
├── tailwind.config.js        # Custom xs breakpoint + theme extensions
├── postcss.config.js
├── vite.config.js            # base: '/CJ-Edwards/' for GH Pages
└── package.json
```

---

## Customising content

All copy, mix list, show dates, press quotes and nav items live in `src/App.jsx` at the top of the file under `/* Data */`.

Accent colour is defined once as a CSS variable in `src/index.css`:

```css
:root {
  --accent: #e8673c;   /* warm ember */
  --accent-2: #c49a5a; /* brass */
}
```

Change those two values to rebrand the entire site.

---

## License

© CJ Edwards · 2026. All rights reserved.

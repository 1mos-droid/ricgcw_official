# Aether Voyages — Cinematic Space-Travel Landing Page

A premium, highly interactive single-page landing site featuring a shared liquid-glass design system, high-performance requestAnimationFrame-driven background video looping and crossfading, and fluid Framer Motion scroll and entrance animations.

## ✨ Highlights

- **Cinematic Visuals**: Uses two full-height sections (Hero + Capabilities) driven by high-quality background videos.
- **Custom JS Video Crossfading**: Fully custom `FadingVideo` component using direct `requestAnimationFrame` interpolation. Bypasses CSS transitions for seamless, performance-optimized opacity fading before the video loops.
- **Liquid-Glass Design System**: Implements high-fidelity glassmorphism with two customized glass variants:
  - `.liquid-glass`: Subtle backdrop blur and custom dual-gradient masking for outline borders. Used on navigation pills, stat chips, and capability cards.
  - `.liquid-glass-strong`: Double-layered blur and heavier shadow depth, specifically optimized for primary calls-to-action (CTAs).
- **Framer Motion Staggers**:
  - **BlurText component**: Splits copy into words, triggering custom staggered keyframe blur and y-offset transitions when entering viewport (IntersectionObserver threshold: 10%).
  - **Capabilities Grid**: Beautifully staggered scroll-reveal animations for columns.
- **Professional SEO Best Practices**: Title, metadata descriptions, Open Graph protocol tags, accessibility-enhanced semantic markup, and descriptive IDs.

## 🛠 Technical Stack (CDN-Only & Pinned)

- **UI Framework**: React 18.3.1 (via CDN)
- **Renderer**: ReactDOM 18.3.1 (via CDN)
- **Styling Engine**: Tailwind CSS (via CDN)
- **Animation Suite**: Framer Motion 11.11.17 (via CDN)
- **Compilation**: Babel Standalone (via CDN)

## 🚀 Setup & Execution

1. **Install dependencies** (optional, for running standard scripts):
   ```bash
   npm install
   ```

2. **Start Vite development server**:
   ```bash
   npm run dev
   ```
   This serves `index.html` statically. In-browser Babel standalone compiles all `<script type="text/babel">` files dynamically.

3. **Build for production**:
   ```bash
   npm run build
   ```
   Compiles the project assets into `/dist` which can be served immediately as pure, lightweight static files.

## 🏗 Directory Architecture

```text
public/
└── components/
    ├── FadingVideo.js     # requestAnimationFrame crossfade loop video player
    ├── BlurText.js        # Staggered keyframe word-by-word blur loader
    ├── Navbar.js          # Glassmorphic header and CTA
    ├── Hero.js            # Hero content, Stats, and Partner space agencies
    ├── Capabilities.js    # Staggered three-card capability grid
    └── App.js             # Main React mounting node and list key error filter
index.html                 # Pinned unpkg links, Tailwind configs, and glass styles
```

# Raw Feature Idea

## Feature Description

Implement the foundation of the liquid morphing portfolio:

### Phase 1: Perfect Metaballs (The Foundation)

1. **Fix Cursor Pulsing Bug** - Line 419: Use proximity variable for dynamic scaling (1.0 → 1.4), not fixed 1.1
2. **Upgrade to 60 FPS** - Increase from 30fps with adaptive quality for lower-end devices
3. **Cinematic Section Transitions** - Metaballs lead (200ms head start), content follows
4. **Enhanced Color Choreography** - Section-specific colors (home: cool blues, work: warm coral, about: balanced pastels, contact: calming greens)
5. **Mobile Experience Parity** - Touch interactions, larger spheres, 60fps on mobile
6. **Metaball Sound Design** - Ultra-minimal audio synced to movements (can be muted)

### Phase 2: Liquid Interface (Everything Morphs)

7. **Liquid Morphing Navigation Buttons** - SVG path animations using Flubber.js
8. **Metaball-Button Integration** - Buttons distort nearby metaballs when hovered
9. **Morphing Text Reveals** - Split-text animations with staggered wave pattern
10. **SVG Morphing Illustrations** - 2-3 abstract shapes in about section
11. **Liquid Number Counting** - Stats count up with morph effect
12. **Morphing Loading Sequence** - Blobs coalesce into logo

## Tech Stack

- React 18 + Vite
- Three.js (WebGL metaballs - already implemented)
- GSAP (section transitions)
- Flubber.js (SVG morphing)
- Web Audio API (sound design)

## Existing Code Context

- **MetaballBackground.jsx** - WebGL shader with cursor-reactive metaballs
- **Current bug at line 419** where proximity variable is unused
- **30 FPS cap** currently (line 492)
- **Section-based metaball positions** already working

## Project Location

Portfolio project located at: `D:/PROJECTS/Web/portfolio`

## Date Initiated

2025-11-17

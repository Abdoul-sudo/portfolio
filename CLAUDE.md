# claude.md — Abdoul Portfolio Redesign (Sharlee-Inspired Clone)

## Overview

Goal: Clone the structure, animations, and interaction patterns of Sharlee’s award-winning portfolio while adapting to Abdoul’s content, expertise, and style. Keep it elegant, minimal, animation-first, and section-per-view, with a clean hamburger, custom cursor, and GSAP-driven transitions.

Reference: Sharlee (https://itssharl.ee) — one-screen sections, overlapping text reveals, crisp overlays, cursor-led interactions, minimal chrome, and high contrast aesthetic.

***

## Brand \& Voice

### Hero Copy (Sharlee-style: short, creative, confident)

- Line 1: “Hey, I’m Abdoul”
- Line 2: “But you can call me Code Architect”
- Line 3: “I build games \& AI-powered experiences”
- Line 4: “Turning ideas into interactive realities”

Notes:

- Tone: creative but still professional
- Four lines, full-width text blocks, no per-character splits
- Keep all-caps/letter spacing optional based on font


### About Copy (Short \& Punchy)

- Option A (approved):
“I’m a passionate Full-Stack developer with 4 years of experience building games, AI automation, and web experiences.

From competitive multiplayer games to hackathon-winning AI platforms, I create digital solutions that engage and inspire.”
- Option B (even tighter):
“Full-Stack dev with 4 years crafting games, AI tools, and web experiences. Blending code and creativity to ship work that engages and lasts.”

***

## Information Architecture

- Single-screen sections (no internal scroll): Home, About, Work, Contact
- Full-screen overlay menu via hamburger (top-right)
- Each section = 100vh with GSAP transitions
- Dedicated project pages and a lightweight About subpage, navigated via overlay menu
- Cursor present on desktop, simplified on mobile

Menu Items:

- Home
- About
- Work
- Contact

***

## Visual Identity

- Base: pure black background (\#000000), pure white text (\#FFFFFF)
- Accent: Neon Cyan (\#22D3EE) for highlights, hover, cursor halo
- Typography: clean, geometric sans (match feel of Inter/Soehne/Neue Montreal; pick one family and stick to 2 weights)
- Spacing: generous whitespace, single-column hero lines, grid for Work
- Background: subtle animated field with GSAP (particles/lines/shapes) responsive to cursor

***

## Animations (Exact Sharlee Feel)

### Hero Text Reveal (overlapping lines)

- No character-level splitting
- Each line uses the same upward motion and easing
- Overlap entries so the sequence feels fluid (not staggered with long delays)

Pseudocode:

```javascript
// Hero lines: .hero-line-1 ... .hero-line-4
const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });

tl.from(".hero-line-1", { y: 100, opacity: 0 })
  .from(".hero-line-2", { y: 100, opacity: 0 }, "-=0.6")
  .from(".hero-line-3", { y: 100, opacity: 0 }, "-=0.6")
  .from(".hero-line-4", { y: 100, opacity: 0 }, "-=0.6")
  .from(".bg-animated", { opacity: 0, duration: 1 }, "-=0.4");
```


### Section Transitions

- No default scroll; transition on menu click
- Fade-cross with slight Z or scale (subtle), content out → content in
- Duration target ~0.6–0.8s, ease: power2.out
- Maintain background continuity to avoid “reset” feel


### Custom Cursor

- Default: small white dot
- Hover on interactive: expand + cyan ring + slight blur/glow
- Project cards: cursor text change (e.g., “view”) optional
- Cursor trails: extremely subtle particles that fade quickly


### Hamburger \& Overlay

- Icon morph on open (lines turn into close)
- Full-screen overlay slides in from right or fades up
- Items large, vertically stacked, strong hover response
- Background blur optional; keep crisp performance


### Micro-interactions

- Buttons: scale 1.00 → 1.03 on hover; glow with accent
- Links: underline lengthening or cyan sweep
- Project cards: gentle tilt or parallax on cursor proximity

***

## Work (Projects) and Filtering

Categories:

- All Projects
- Game Development
- Web Development
- Mobile Apps (present in code, hidden until >0 items)

Data-first structure:

```javascript
export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "games", name: "Game Development" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Apps" } // future-ready, hide if none
];

export const projectsData = [
  {
    id: "pixel-dunking",
    name: "Pixel Dunking",
    categories: ["games"],
    description: "Competitive 2v2 basketball in 2D with dynamic courts and team play.",
    techs: ["Godot"],
    demo_link: "https://deadpixelmg.itch.io/pixel-dunking",
    featured: true,
    cover: "/assets/projects/pixel-dunking.jpg"
  },
  {
    id: "onirix",
    name: "Onirix",
    categories: ["web"],
    description: "AI-powered dream interpretation. 3rd place at Webcup Madagascar (24h).",
    techs: ["React", "Tailwind", "ChatGPT API", "Figma"],
    demo_link: "https://onirix.vercel.app/",
    featured: true,
    cover: "/assets/projects/onirix.jpg"
  },
  {
    id: "slime-adventure",
    name: "Slime Adventure",
    categories: ["games"],
    description: "A short platformer following a young slime’s rite of passage.",
    techs: ["Unity"],
    demo_link: "https://wahhaab.itch.io/slime-adventure",
    cover: "/assets/projects/slime-adventure.jpg"
  },
  {
    id: "gamefeat",
    name: "GameFeat",
    categories: ["web"],
    description: "Features a different game on every refresh.",
    techs: ["Next.js", "Tailwind", "Upstash"],
    demo_link: "https://gamefeat.vercel.app/",
    cover: "/assets/projects/gamefeat.jpg"
  },
  {
    id: "juicy",
    name: "Juicy",
    categories: ["web"],
    description: "Recipe sharing app connecting people through culinary ideas.",
    techs: ["Next.js", "Tailwind"],
    demo_link: "https://juicy-recipe.vercel.app",
    cover: "/assets/projects/juicy.jpg"
  },
  {
    id: "facebook-clone",
    name: "Facebook Clone",
    categories: ["web"],
    description: "Posts, likes, comments. Built to master React fundamentals.",
    techs: ["React", "Tailwind"],
    demo_link: "https://abd-fb-clone.vercel.app/",
    cover: "/assets/projects/fb-clone.jpg"
  }
];
```

Filtering UX:

- Categories rendered as pill buttons (outline → cyan fill on active)
- Animate card out → filter → animate card in (scale+fade or flip)
- Maintain grid; prefer 2–3 columns desktop, 1–2 columns mobile/tablet

Project Cards:

- Cover image dominant; title and tags minimal
- Hover: slight tilt, parallax following cursor, cyan border glow
- Click → dedicated project page

***

## Dedicated Project Pages

Template sections:

- Title + concise subtitle
- Role, year, stack (badges)
- Hero media (image or looped muted video/gif)
- Problem → Approach → Result (three short blocks)
- Live demo button (primary)
- Optional: challenges, learnings (compact)
- Back/Next nav (edge swipe or arrows)

Animation:

- Enter: fade+scale media, text slides in with small overlap
- Exit: reverse quickly; keep perceived speed high

***

## Expertise

Two blocks (replace old Experience/Skills):

- Game Development
    - Unity, Godot, 2D gameplay systems, multiplayer, shipping to Itch.io
- Web \& AI Tools
    - React, Next.js, full-stack, AI automation \& integrations

Badges:

- Keep minimal: solid monochrome with subtle cyan hover ring
- Avoid “tool clouds”; present only what supports the narrative

***

## Accessibility \& Performance

- Respect prefers-reduced-motion → reduce animation intensity
- Cursor disabled on touch devices
- Images lazy-loaded; prefetch next section assets
- GPU transforms only; avoid layout thrash
- Aim Lighthouse 90+ on Performance/Best Practices/SEO
- Semantic HTML and clear focus states

***

## Tech Stack \& Structure

- Next.js or vanilla + Vite; both valid, choose based on your comfort
- GSAP for all motion (Timeline, ease consistency)
- Split code by feature: animations.js, cursor.js, router/transitions.js, work.js

Suggested structure:

```
/
├─ public/
│  └─ assets/
│     ├─ projects/
│     └─ icons/
├─ src/
│  ├─ data/
│  │  └─ projects.js
│  ├─ styles/
│  │  ├─ base.css
│  │  ├─ theme.css
│  │  ├─ components.css
│  │  └─ animations.css
│  ├─ js/
│  │  ├─ main.js
│  │  ├─ animations.js
│  │  ├─ cursor.js
│  │  ├─ router.js
│  │  ├─ work.js
│  │  └─ menu.js
│  └─ pages/
│     ├─ index.html
│     ├─ about.html
│     ├─ work.html
│     └─ contact.html
└─ package.json
```

Note: If going SPA with sections-as-views, keep one HTML and switch “views” via state + GSAP timelines.

***

## Must-Have Sharlee Details

- Full-screen overlay menu with large typographic items
- Overlapping hero line reveals (not staggered delays)
- Cursor that expands and changes state over interactive elements
- Section-per-view, no internal scroll; transitions between sections
- Extremely minimal UI chrome; content is the design
- Crisp performance; nothing feels heavy or jittery
- Dedicated project views with simple, elegant storytelling

***

## Implementation Order

1) Shell + Sections + Menu overlay
2) Exact hero animation timeline + background motion
3) Cursor system and interactive states
4) Work grid + filtering animations
5) Project page template + routing transitions
6) About section layout + expertise badges
7) Mobile pass: simplify motion, adjust spacing
8) Performance pass: images, GSAP timings, throttling
9) Polish: micro-interactions, hover details, focus states

***

## Content Checklist (Final)

- Hero: 4 lines as specified
- About: Short version (max 3 short paragraphs)
- Expertise: 2 blocks (Game Dev, Web \& AI Tools)
- Work: 6 projects with covers, categories, demo links only
- Contact: Email + minimal socials
- No experience/skills sections; no source links
- Accent cyan present but restrained

***

## Quick Snippets

Hamburger open:

```javascript
const openMenu = () => {
  gsap.timeline()
    .set(".menu-overlay", { display: "block" })
    .fromTo(".menu-overlay", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" })
    .from(".menu-item", { y: 40, opacity: 0, stagger: 0.06, duration: 0.4, ease: "power2.out" }, "-=0.2");
};
```

Filter animation:

```javascript
const applyFilter = (cat) => {
  const cards = gsap.utils.toArray(".project-card");
  gsap.to(cards, { opacity: 0, y: 20, duration: 0.2, stagger: 0.03, onComplete: () => {
    renderGrid(filterProjects(cat));
    const newCards = gsap.utils.toArray(".project-card");
    gsap.fromTo(newCards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.03, ease: "power2.out" });
  }});
};
```

Cursor states:

```javascript
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power3.out" });
});
document.querySelectorAll("a, button, .card").forEach(el => {
  el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 1.8, backgroundColor: "rgba(34,211,238,0.15)", borderColor: "#22D3EE" }));
  el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, backgroundColor: "transparent", borderColor: "#fff" }));
});
```


***

## Deployment

- Vercel target with Next.js or static export
- Preload hero font weights and critical CSS
- Add meta titles/descriptions per route
- OG image per project page for shareability

***

## Done Criteria

- Hero animation feels fluid and overlapping (not staggered delays)
- Menu overlay is crisp, typographic, and fast
- Cursor states are obvious but tasteful
- Projects filter instantly with smooth card transitions
- Dedicated project pages load fast with succinct storytelling
- Mobile interaction is clean, with reduced motion
- No extraneous sections; only what matters

---

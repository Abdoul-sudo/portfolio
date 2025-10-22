
# claude.md — Abdoul Portfolio Redesign (Sharlee-Inspired Clone)

## Overview

**Goal:** Clone the structure, animations, and interaction patterns of Sharlee's award-winning portfolio while adapting to Abdoul's content, expertise, and style. Keep it elegant, minimal, animation-first, and section-per-view, with a clean hamburger, custom cursor, and GSAP-driven transitions.

**Reference:** Sharlee (https://itssharl.ee) — one-screen sections, overlapping text reveals, crisp overlays, cursor-led interactions, minimal chrome, and high contrast aesthetic. Check /sharlee_references if needing image reference

---

## Brand & Voice

### Hero Copy (Sharlee-style: short, creative, confident)

- Line 1: "Hey, I'm Abdoul"
- Line 2: "But you can call me Code Architect"
- Line 3: "I build games & AI-powered experiences"
- Line 4: "Turning ideas into interactive realities"

**Notes:**
- Tone: creative but still professional
- Four lines, full-width text blocks, no per-character splits
- Keep all-caps/letter spacing optional based on font

### About Copy (Short & Punchy)

**Option A (approved):**
"I'm a passionate Full-Stack developer with 4 years of experience building games, AI automation, and web experiences.

From competitive multiplayer games to hackathon-winning AI platforms, I create digital solutions that engage and inspire."

**Option B (even tighter):**
"Full-Stack dev with 4 years crafting games, AI tools, and web experiences. Blending code and creativity to ship work that engages and lasts."

---

## Information Architecture

- Single-screen sections (no internal scroll): Home, About, Work, Contact
- Full-screen overlay menu via hamburger (top-right)
- Each section = 100vh with GSAP transitions
- Dedicated project pages and a lightweight About subpage, navigated via overlay menu
- Cursor present on desktop, simplified on mobile

**Menu Items:**
- Home
- About
- Work
- Contact

---

## Visual Identity

- **Base:** pure black background (#000000), pure white text (#FFFFFF)
- **Accent:** Neon Cyan (#22D3EE) for highlights, hover, cursor halo
- **Typography:** clean, geometric sans (Inter/Soehne/Neue Montreal; pick one family and stick to 2 weights)
- **Spacing:** generous whitespace, single-column hero lines, grid for Work
- **Background:** subtle animated field with GSAP (particles/lines/shapes) responsive to cursor

---

## Animations (Exact Sharlee Feel)

### Hero Text Reveal (overlapping lines)

**Key refinements:**
- No character-level splitting
- Each line uses the same upward motion and easing
- **Tighter overlap** (0.5s, not 0.6s) for fluid cascade
- **Shorter duration** (0.7s, not 0.8s) for snappier feel

```

// Sharlee uses ~0.7s duration with ~0.5s overlap between lines
const tl = gsap.timeline({
defaults: { duration: 0.7, ease: "power2.out" }
});

tl.from(".hero-line-1", { y: 80, opacity: 0 })
.from(".hero-line-2", { y: 80, opacity: 0 }, "-=0.5")  // 0.5s overlap
.from(".hero-line-3", { y: 80, opacity: 0 }, "-=0.5")
.from(".hero-line-4", { y: 80, opacity: 0 }, "-=0.5")
.from(".bg-animated", { opacity: 0, scale: 1.1, duration: 1.2 }, "-=0.6");

```

**Key differences:**
- Duration: 0.7s (not 0.8s) — slightly snappier
- Overlap: -=0.5 (not -=0.6) — creates tighter cascade
- y: 80 (not 100) — less dramatic vertical movement
- Background animates with the last line, not after

### Section Transitions

**Critical:** No default scroll; transition on menu click

```

let currentSection = 0;
const sections = ['home', 'about', 'work', 'contact'];

const transitionToSection = (targetIndex) => {
if (targetIndex === currentSection) return;

const currentEl = document.querySelector(`#${sections[currentSection]}`);
const targetEl = document.querySelector(`#${sections[targetIndex]}`);

const tl = gsap.timeline();

// Fade out current
tl.to(currentEl, {
opacity: 0,
y: -30,           // Slight upward motion
duration: 0.4,
ease: "power2.in"
});

// Switch visibility
tl.set(currentEl, { display: 'none' });
tl.set(targetEl, { display: 'flex', opacity: 0, y: 30 });

// Fade in target
tl.to(targetEl, {
opacity: 1,
y: 0,
duration: 0.6,
ease: "power2.out"
});

currentSection = targetIndex;
};

// Menu items trigger transitions
document.querySelectorAll('.menu-item').forEach((item, i) => {
item.addEventListener('click', () => {
transitionToSection(i);
closeMenu();
});
});

```

**HTML structure:**
```

```
<section id="home" class="view active"><!-- Hero content --></section>
```

```
<section id="about" class="view"><!-- About content --></section>
```

```
<section id="work" class="view"><!-- Projects grid --></section>
```

```
<section id="contact" class="view"><!-- Contact content --></section>
```

```

**CSS:**
```

.view {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
display: none;
align-items: center;
justify-content: center;
}

.view.active {
display: flex;
}

```

### Custom Cursor (Key Sharlee Details)

**Critical additions:**
- Dual-speed tracking (outer ring lags behind inner dot)
- `mix-blend-mode: difference` for inversion effect
- Inner dot disappears on hover

```

const cursor = document.createElement('div');
cursor.className = 'cursor';

```
cursor.innerHTML = '<div class="cursor-inner"></div>'; // Inner dot
```

const inner = cursor.querySelector('.cursor-inner');

// Smoother tracking with different durations for outer/inner
document.addEventListener('mousemove', (e) => {
gsap.to(cursor, {
x: e.clientX,
y: e.clientY,
duration: 0.3,  // Outer ring slower
ease: "power3.out"
});

gsap.to(inner, {
x: e.clientX,
y: e.clientY,
duration: 0.15, // Inner dot faster (lag effect)
ease: "power3.out"
});
});

// Hover states — subtle scale + glow
document.querySelectorAll('a, button, .project-card').forEach(el => {
el.addEventListener('mouseenter', () => {
gsap.to(cursor, {
scale: 2.5,           // Larger expansion
duration: 0.3,
ease: "power2.out"
});
gsap.to(inner, {
scale: 0,             // Inner dot disappears
duration: 0.2
});
cursor.classList.add('cursor-hover'); // Add cyan glow via CSS
});

el.addEventListener('mouseleave', () => {
gsap.to(cursor, { scale: 1, duration: 0.3 });
gsap.to(inner, { scale: 1, duration: 0.2 });
cursor.classList.remove('cursor-hover');
});
});

```

**CSS for cursor:**
```

.cursor {
position: fixed;
width: 40px;
height: 40px;
border: 1px solid rgba(255,255,255,0.4);
border-radius: 50%;
pointer-events: none;
z-index: 9999;
mix-blend-mode: difference; /* Key Sharlee detail */
}

.cursor-inner {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 6px;
height: 6px;
background: \#fff;
border-radius: 50%;
}

.cursor-hover {
border-color: \#22D3EE;
box-shadow: 0 0 20px rgba(34,211,238,0.3);
}

```

### Hamburger & Overlay

**Key refinements:**
- Backdrop blur transition
- Longer stagger (0.08s, not 0.06s)
- Softer ease (power3.out)

```

const openMenu = () => {
gsap.timeline()
.set('.menu-overlay', { display: 'flex' })
.fromTo('.menu-overlay',
{ opacity: 0, backdropFilter: 'blur(0px)' },
{ opacity: 1, backdropFilter: 'blur(10px)', duration: 0.4, ease: "power2.out" }
)
.from('.menu-item', {
y: 60,
opacity: 0,
stagger: 0.08,      // Slightly longer stagger
duration: 0.5,      // Longer individual duration
ease: "power3.out"  // Softer ease
}, "-=0.2");
};

const closeMenu = () => {
gsap.timeline()
.to('.menu-item', {
y: -40,
opacity: 0,
stagger: 0.05,
duration: 0.3
})
.to('.menu-overlay', {
opacity: 0,
backdropFilter: 'blur(0px)',
duration: 0.3,
onComplete: () => gsap.set('.menu-overlay', { display: 'none' })
}, "-=0.2");
};

```

### Micro-interactions

- **Buttons:** scale 1.00 → 1.03 on hover; glow with accent
- **Links:** underline lengthening or cyan sweep
- **Project cards:** gentle tilt or parallax on cursor proximity

---

## Work (Projects) and Filtering

### Categories

```

export const projectCategories = [
{ id: "all", name: "All Projects" },
{ id: "games", name: "Game Development" },
{ id: "web", name: "Web Development" },
{ id: "mobile", name: "Mobile Apps" } // future-ready, hide if none
];

```

### Projects Data

```

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
description: "A short platformer following a young slime's rite of passage.",
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

### Filtering UX

**Key refinements:**
- Faster transitions (0.2s out, 0.3s in)
- Tighter stagger (0.04s, not 0.03s)

```

const filterProjects = (category) => {
const cards = gsap.utils.toArray('.project-card');

// Instant fade out
gsap.to(cards, {
opacity: 0,
scale: 0.95,
duration: 0.2,
ease: "power2.in",
onComplete: () => {
// Update DOM
cards.forEach(card => {
const cardCategories = card.dataset.categories.split(',');
if (category === 'all' || cardCategories.includes(category)) {
card.style.display = 'block';
} else {
card.style.display = 'none';
}
});

      // Fade in visible cards
      const visibleCards = cards.filter(c => c.style.display !== 'none');
      gsap.fromTo(visibleCards,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.04,  // Tighter stagger
          ease: "power2.out"
        }
      );
    }
    });
};

```

### Project Cards

- Cover image dominant; title and tags minimal
- Hover: slight tilt, parallax following cursor, cyan border glow
- Click → dedicated project page

---

## Dedicated Project Pages

### Template sections

- Title + concise subtitle
- Role, year, stack (badges)
- Hero media (image or looped muted video/gif)
- Problem → Approach → Result (three short blocks)
- Live demo button (primary)
- Optional: challenges, learnings (compact)
- Back/Next nav (edge swipe or arrows)

### Animation

- **Enter:** fade+scale media, text slides in with small overlap
- **Exit:** reverse quickly; keep perceived speed high

---

## Background Animation (Subtle Particles)

Keep it extremely minimal — Sharlee uses very subtle animated shapes:

```

// Create ~20 floating shapes
const createBackground = () => {
const bg = document.querySelector('.bg-animated');

for (let i = 0; i < 20; i++) {
const shape = document.createElement('div');
shape.className = 'bg-shape';
shape.style.left = `${Math.random() * 100}%`;
shape.style.top = `${Math.random() * 100}%`;
bg.appendChild(shape);

    // Slow, subtle float animation
    gsap.to(shape, {
      x: `${(Math.random() - 0.5) * 100}px`,
      y: `${(Math.random() - 0.5) * 100}px`,
      duration: 8 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 2
    });
    }
};

```

**CSS:**
```

.bg-animated {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
overflow: hidden;
}

.bg-shape {
position: absolute;
width: 3px;
height: 3px;
background: rgba(34, 211, 238, 0.15);
border-radius: 50%;
filter: blur(1px);
}

```

---

## Typography (Match Sharlee's Style)

Sharlee uses **Inter** or similar geometric sans with specific settings:

```

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600\&display=swap');

:root {
--font-primary: 'Inter', -apple-system, sans-serif;
--letter-spacing: -0.02em; /* Tight tracking */
}

body {
font-family: var(--font-primary);
letter-spacing: var(--letter-spacing);
}

.hero-line {
font-size: clamp(2rem, 6vw, 4rem);
font-weight: 400;
line-height: 1.1;
letter-spacing: -0.03em; /* Extra tight for hero */
}

.menu-item {
font-size: clamp(2rem, 5vw, 3.5rem);
font-weight: 600;
letter-spacing: -0.02em;
}

```

---

## Expertise

Two blocks (replace old Experience/Skills):

### Game Development
- Unity, Godot, 2D gameplay systems, multiplayer, shipping to Itch.io

### Web & AI Tools
- React, Next.js, full-stack, AI automation & integrations

### Badges
- Keep minimal: solid monochrome with subtle cyan hover ring
- Avoid "tool clouds"; present only what supports the narrative

---

## Mobile Optimizations

Sharlee simplifies aggressively on mobile:

```

const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (isMobile) {
// Disable cursor
document.querySelector('.cursor')?.remove();

// Reduce motion
gsap.globalTimeline.timeScale(1.5); // Speed up all animations

// Simpler hero reveal
gsap.from('.hero-line', {
y: 40,
opacity: 0,
duration: 0.5,
stagger: 0.15,
ease: "power2.out"
});
} else {
// Full desktop experience
initCursor();
initBackgroundAnimation();
}

```

---

## Accessibility & Performance

- Respect `prefers-reduced-motion` → reduce animation intensity
- Cursor disabled on touch devices
- Images lazy-loaded; prefetch next section assets
- GPU transforms only; avoid layout thrash
- Aim Lighthouse 90+ on Performance/Best Practices/SEO
- Semantic HTML and clear focus states

---

## Tech Stack & Structure

- Next.js or vanilla + Vite; both valid, choose based on your comfort
- GSAP for all motion (Timeline, ease consistency)
- Split code by feature: animations.js, cursor.js, router/transitions.js, work.js

### Suggested structure

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

**Note:** If going SPA with sections-as-views, keep one HTML and switch "views" via state + GSAP timelines.

---

## Must-Have Sharlee Details

✓ Full-screen overlay menu with large typographic items
✓ Overlapping hero line reveals (not staggered delays)
✓ Cursor that expands and changes state over interactive elements
✓ Section-per-view, no internal scroll; transitions between sections
✓ Extremely minimal UI chrome; content is the design
✓ Crisp performance; nothing feels heavy or jittery
✓ Dedicated project views with simple, elegant storytelling

---

## Implementation Order

1. Shell + Sections + Menu overlay
2. Exact hero animation timeline + background motion
3. Cursor system and interactive states
4. Work grid + filtering animations
5. Project page template + routing transitions
6. About section layout + expertise badges
7. Mobile pass: simplify motion, adjust spacing
8. Performance pass: images, GSAP timings, throttling
9. Polish: micro-interactions, hover details, focus states

---

## Content Checklist (Final)

✓ Hero: 4 lines as specified
✓ About: Short version (max 3 short paragraphs)
✓ Expertise: 2 blocks (Game Dev, Web & AI Tools)
✓ Work: 6 projects with covers, categories, demo links only
✓ Contact: Email + minimal socials
✗ No experience/skills sections; no source links
✓ Accent cyan present but restrained

---

## Key Sharlee Patterns Added

1. **Mix-blend-mode on cursor** — creates the distinctive inversion effect
2. **Dual-speed cursor tracking** — outer ring lags behind inner dot
3. **Backdrop blur on menu** — adds depth to overlay
4. **View-based sections, not scroll** — fundamental architectural difference
5. **Tighter animation timing** — Sharlee's animations are ~20% faster

---

## Deployment

- Vercel target with Next.js or static export
- Preload hero font weights and critical CSS
- Add meta titles/descriptions per route
- OG image per project page for shareability

---

## Done Criteria

✓ Hero animation feels fluid and overlapping (not staggered delays)
✓ Menu overlay is crisp, typographic, and fast
✓ Cursor states are obvious but tasteful
✓ Projects filter instantly with smooth card transitions
✓ Dedicated project pages load fast with succinct storytelling
✓ Mobile interaction is clean, with reduced motion
✓ No extraneous sections; only what matters

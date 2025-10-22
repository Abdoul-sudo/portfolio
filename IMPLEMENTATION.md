# Sharlee-Inspired Portfolio Implementation Guide

## Overview
This is a complete redesign of your portfolio following the Sharlee aesthetic from CLAUDE.md. The implementation is complete and ready to test!

## What's Been Built

### Core Components
1. **Cursor** - Custom animated cursor with hover effects
2. **Menu** - Full-screen overlay navigation with hamburger
3. **AnimatedBackground** - Particle system with mouse interaction
4. **HeroSection** - Overlapping text reveal animation
5. **AboutSection** - Expertise blocks with scroll animations
6. **WorkSection** - Filterable project grid
7. **ProjectCard** - 3D tilt effect with hover states
8. **ContactSection** - Minimal contact information

### Features Implemented
- ✅ GSAP animations throughout
- ✅ Custom cursor (desktop only)
- ✅ Hamburger menu with overlay
- ✅ Hero text overlapping reveals
- ✅ Animated particle background
- ✅ Section scroll tracking
- ✅ Project filtering with animations
- ✅ 3D card hover effects
- ✅ Mobile responsive design
- ✅ Reduced motion support
- ✅ Accessibility features

## Getting Started

### 1. Add Project Images
Place your project cover images in `public/assets/projects/`:
- `pixel-dunking.jpg`
- `onirix.jpg`
- `slime-adventure.jpg`
- `gamefeat.jpg`
- `juicy.jpg`
- `fb-clone.jpg`

**Image Requirements:**
- 16:9 aspect ratio
- At least 800x450px
- Optimized for web (< 200KB)

### 2. Update Main Entry Point
To use the new portfolio, update `index.html`:

```html
<script type="module" src="/src/mainNew.jsx"></script>
```

Or backup your old files and rename:
```bash
# Backup old files
mv src/App.jsx src/App.old.jsx
mv src/main.jsx src/main.old.jsx

# Use new files
mv src/AppNew.jsx src/App.jsx
mv src/mainNew.jsx src/main.jsx
```

### 3. Run Development Server
```bash
npm run dev
```

## File Structure

```
src/
├── components/
│   ├── Cursor.jsx              # Custom cursor
│   ├── Menu.jsx                # Navigation overlay
│   ├── AnimatedBackground.jsx  # Particle system
│   ├── HeroSection.jsx         # Hero with text reveals
│   ├── AboutSection.jsx        # About content
│   ├── WorkSection.jsx         # Projects with filtering
│   ├── ProjectCard.jsx         # Individual project cards
│   └── ContactSection.jsx      # Contact info
├── styles/
│   ├── base.css               # Theme variables & resets
│   ├── app.css                # Main app styles
│   ├── cursor.css             # Cursor styles
│   ├── menu.css               # Menu overlay styles
│   ├── hero.css               # Hero section styles
│   ├── background.css         # Background styles
│   ├── about.css              # About section styles
│   ├── work.css               # Work section styles
│   ├── projectcard.css        # Project card styles
│   └── contact.css            # Contact section styles
├── data/
│   └── projects.js            # Project data
├── AppNew.jsx                 # Main app component
└── mainNew.jsx                # Entry point
```

## Customization

### Colors
Edit `src/styles/base.css`:
```css
:root {
  --color-bg: #000000;
  --color-text: #FFFFFF;
  --color-accent: #22D3EE;  /* Change this for different accent */
}
```

### Content
1. **Hero Lines**: Edit `src/components/HeroSection.jsx`
2. **About Text**: Edit `src/components/AboutSection.jsx`
3. **Projects**: Edit `src/data/projects.js`
4. **Contact Info**: Edit `src/components/ContactSection.jsx`

### Animations
All GSAP timelines can be adjusted in their respective component files. Key values:
- `duration`: Animation length (0.3-0.8s recommended)
- `ease`: Easing function (power2.out is default)
- `stagger`: Delay between multiple elements (0.03-0.15s)

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes
- Animations respect `prefers-reduced-motion`
- Cursor disabled on touch devices
- Particle count scales with screen size
- Images use lazy loading
- GPU-accelerated transforms

## Accessibility Features
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus visible states
- Reduced motion support
- Screen reader friendly

## Known Issues & Solutions

### Issue: Cursor not appearing
**Solution**: Desktop only feature. Won't show on touch devices.

### Issue: Images not loading
**Solution**: Ensure images are in `public/assets/projects/` with correct names.

### Issue: Animations too slow/fast
**Solution**: Adjust `duration` values in component files.

### Issue: Menu not closing
**Solution**: Check z-index conflicts in custom CSS.

## Next Steps
1. Add your project images
2. Update contact information
3. Customize colors if desired
4. Test on mobile devices
5. Deploy to Vercel/Netlify

## Deployment
The project is already configured for deployment:

```bash
npm run build
```

Deploy the `dist` folder to:
- Vercel (recommended)
- Netlify
- GitHub Pages

## Questions?
Refer to CLAUDE.md for the original design specifications.

# Quick Start Guide - Sharlee Portfolio

## Test the New Portfolio NOW

### Option 1: Quick Test (Recommended)
Update [index.html](index.html) line 22 to use the new entry point:

```html
<!-- Change this line: -->
<script type="module" src="/src/main.jsx"></script>

<!-- To this: -->
<script type="module" src="/src/mainNew.jsx"></script>
```

Then run:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

### Option 2: Permanent Switch
Backup old files and rename new ones:

```bash
# Windows PowerShell
mv src/App.jsx src/App.old.jsx
mv src/main.jsx src/main.old.jsx
mv src/AppNew.jsx src/App.jsx
mv src/mainNew.jsx src/main.jsx

# Then run
npm run dev
```

## What You'll See

With placeholder images:
1. **Black background** with animated particles
2. **Custom cursor** (desktop only)
3. **Hamburger menu** (top right)
4. **Hero section** with overlapping text reveals
5. **About section** with expertise blocks
6. **Work section** with filterable projects (gradient placeholders)
7. **Contact section** with links

## Navigation

- Click **hamburger icon** (top right) to open menu
- Click **menu items** to jump to sections
- **Scroll** naturally between sections
- **Hover** over project cards for 3D tilt effect
- **Filter projects** by category (All/Games/Web)

## Next Steps

### 1. Add Real Project Images
Replace placeholder images by adding to `public/assets/projects/`:
- pixel-dunking.jpg
- onirix.jpg
- slime-adventure.jpg
- gamefeat.jpg
- juicy.jpg
- fb-clone.jpg

Then in [src/data/placeholderImages.js](src/data/placeholderImages.js), change:
```javascript
const useRealImages = false; // Change to true
```

### 2. Customize Content
- **Hero text**: [src/components/HeroSection.jsx](src/components/HeroSection.jsx)
- **About text**: [src/components/AboutSection.jsx](src/components/AboutSection.jsx)
- **Projects**: [src/data/projects.js](src/data/projects.js)
- **Contact info**: [src/components/ContactSection.jsx](src/components/ContactSection.jsx)

### 3. Customize Colors
Edit [src/styles/base.css](src/styles/base.css):
```css
:root {
  --color-accent: #22D3EE; /* Change to your color */
}
```

## Features to Test

- [ ] Custom cursor follows mouse (desktop)
- [ ] Hamburger menu opens/closes smoothly
- [ ] Hero text reveals with overlap animation
- [ ] Particles respond to mouse movement
- [ ] About section fades in on scroll
- [ ] Project filtering animates smoothly
- [ ] Project cards tilt on hover
- [ ] Contact links have underline effect
- [ ] Mobile: cursor disabled, layout responsive
- [ ] Keyboard: Tab navigation works

## Troubleshooting

**Cursor not showing?**
- Only works on desktop with mouse
- Check browser console for errors

**Animations not smooth?**
- Check if "Reduce motion" is enabled in OS settings
- Try a different browser (Chrome recommended)

**Images not loading?**
- Using SVG placeholders by default
- Add real images to public/assets/projects/

**Menu not working?**
- Check z-index conflicts
- Clear browser cache

## Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## Performance
- Optimized particle count for screen size
- Lazy loading images
- GPU-accelerated animations
- Respects reduced motion preferences

## Questions?
Check [IMPLEMENTATION.md](IMPLEMENTATION.md) for detailed docs.

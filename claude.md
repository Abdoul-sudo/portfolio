# Portfolio Project Documentation

> **Last Updated**: 2025-11-07
> **Status**: Active Development
> **Build Tool**: Vite
> **Framework**: React 18

---

## 🎨 Design System

### Visual Architecture
The portfolio uses a **minimalist, animated approach** with layered background effects and smooth section transitions.

### Color Palette

#### Metaball Colors (Sophisticated Desaturated Pastels)
- `0xDCF2FF` - Very light blue
- `0xFFE5EE` - Very light coral/pink
- `0xF0E6FF` - Very light purple/lavender
- `0xE0FFED` - Very light mint green
- `0xE0F3FF` - Very light sky blue
- `0xFFEBF4` - Very light rose

#### Cursor Glow
- **Default**: `0xCCF5FF` (light cyan)
- **Dynamic**: Blends with nearest metaball color (70% blend factor)

#### Background
- Base: `0xFAFBFC` (off-white)
- Noise overlay: Grain texture for depth

---

## 🎭 Background Effects

### 1. Noise Overlay
**File**: `src/components/NoiseBackground.jsx`

**Purpose**: Adds subtle grain texture for visual depth and sophistication

**Implementation**:
- CSS-based noise pattern using `background-image`
- Fixed position, full viewport coverage
- Layered behind all content (`z-index: -2`)
- Pointer events disabled for performance

**Styling**: `src/styles/noise.css`

### 2. Metaball System
**File**: `src/components/MetaballBackground.jsx`

**Purpose**: Dynamic, interactive blob-like shapes that respond to cursor and change per section

**Technical Details**:
- **Renderer**: Three.js WebGL with custom shaders
- **Performance**: Capped at 30 FPS, reduced pixel ratio (max 1.5)
- **Metaball Count**: 6 spheres (fixed, but positions vary per section)
- **Shader Type**: Ray marching with signed distance fields (SDF)

**Key Features**:
1. **Cursor Interaction**:
   - Dramatic reveal effect (0.08 → 1.0 opacity when cursor nearby)
   - Strong glow radius: 2.5-3.5 units
   - Reactive pulsing: Spheres grow 10% when cursor within 1.5 units
   - Color shifting: Cursor glow adopts nearest sphere's color

2. **Route-Based Positioning**:
   - **Config File**: `src/config/metaballPositions.js`
   - Each section (home, work, about, contact) has custom sphere positions
   - Smooth transitions (~0.8s) when navigating between sections
   - Interpolation smoothness: 0.15 (configurable)

3. **Shader Uniforms**:
   ```glsl
   uSpherePositions[6]  // Dynamic positions from config
   uSphereRadii[6]      // Dynamic radii from config
   uSphereScales[6]     // Reactive scaling for cursor proximity
   uSphereColors[6]     // Color palette
   uCursorGlowColor     // Dynamic cursor glow color
   uCursorGlowRadius    // Glow influence radius
   ```

4. **Mobile Optimization**:
   - Device detection for mobile/tablet
   - Reduced effects for low-power devices
   - Touch event support

**Styling**: `src/styles/metaball.css`

**Position Configuration**:
- **Home**: Corner and center positioning (frames headline)
- **Work**: Around project cards (header flanking, featured projects)
- **About**: Concentrated near profile photo and skill clusters
- **Contact**: Minimal layout filling (social/mail sections + negative space)

---

## 🗂️ Project Structure

### Active Application
**Entry Point**: `index.html` → `src/mainNew.jsx` → `src/AppNew.jsx`

### Navigation System
**Type**: Custom GSAP-based section switching (NOT React Router)

**Sections**:
- `home` - Hero/landing page
- `about` - Profile, bio, expertise
- `work` - Project portfolio
- `contact` - Email and social links

**Transition Flow**:
1. User clicks navigation (Menu or Logo)
2. GSAP timeline animates current section out (fade + slide up)
3. Target section fades in with staggered children animation
4. Metaballs smoothly transition to new positions
5. Duration: ~1 second total

---

## 📁 File Organization

### ✅ Active Files (Currently Used)

#### Core Application
- `src/mainNew.jsx` - React entry point (ACTIVE)
- `src/AppNew.jsx` - Main app component with GSAP navigation (ACTIVE)
- `index.html` - HTML entry, loads mainNew.jsx

#### Components (Active)
- `src/components/HeroSection.jsx` - Landing page section
- `src/components/AboutSection.jsx` - About/bio section
- `src/components/WorkSection.jsx` - Projects showcase
- `src/components/ContactSection.jsx` - Contact info section
- `src/components/MetaballBackground.jsx` - Interactive background blobs
- `src/components/NoiseBackground.jsx` - Grain texture overlay
- `src/components/Cursor.jsx` - Custom cursor (currently disabled, returns null)
- `src/components/Logo.jsx` - Animated logo/home button
- `src/components/Menu.jsx` - Navigation menu

#### Styles (Active)
- `src/styles/base.css` - Base styles, CSS reset
- `src/styles/app.css` - App-level layout
- `src/styles/hero.css` - Hero section styles
- `src/styles/about.css` - About section styles
- `src/styles/work.css` - Work section styles
- `src/styles/contact.css` - Contact section styles
- `src/styles/metaball.css` - Metaball background positioning
- `src/styles/noise.css` - Noise overlay styles
- `src/styles/logo.css` - Logo component styles
- `src/styles/menu.css` - Menu component styles
- `src/styles/cursor.css` - Cursor styles (currently unused)

#### Configuration
- `src/config/metaballPositions.js` - **Route-based metaball positions** (NEW)
- `vite.config.js` - Vite build configuration
- `tailwind.config.cjs` - Tailwind CSS configuration
- `postcss.config.cjs` - PostCSS configuration

#### Data
- `src/data/projects.js` - Portfolio project data
- `src/data/placeholderImages.js` - Placeholder images

---

### ❌ Unused/Legacy Files (NOT Currently Active)

#### Legacy Application (Old Version)
- `src/main.jsx` - OLD entry point (replaced by mainNew.jsx)
- `src/App.jsx` - OLD app component (replaced by AppNew.jsx)
- These used React Router but were replaced with GSAP-based navigation

#### Unused Components
- `src/components/Contact.jsx` - OLD contact component (replaced by ContactSection.jsx)
- `src/components/Contact copy.jsx` - Duplicate/backup file, not used
- `src/components/canvas/` - OLD Three.js components (replaced by MetaballBackground)
- `src/components/cursor/` - OLD cursor implementation
- `src/components/Skills/` - Unused skills components
- `src/components/index.js` - OLD component barrel export (not needed in new structure)

#### Empty Directories
- `src/context/` - EMPTY (no Context API providers in use)
- `src/hoc/` - Higher-order components (mostly unused)
- `src/utils/` - Utility functions (some may be used)
- `src/constants/` - Constants (some may be used)

#### Potentially Unused Styles
- Check if all CSS files in `src/styles/` are actually imported

---

## 🛠️ Technical Implementation Notes

### Metaball Position System

#### Current Limitation: Fixed Ball Count
**The system uses a FIXED count of 6 metaballs**. You cannot currently have different numbers of balls per section.

**Why?**
1. Shader arrays are hardcoded: `uniform vec3 uSpherePositions[6]`
2. Shader loops are fixed: `for (int i = 0; i < 6; i++)`
3. JavaScript loops assume 6 balls in multiple places

**Workaround Options**:
- **Option A** (Simple): Hide unused balls by moving them offscreen (x: 100, y: 100)
  - Add `visible: true/false` flag to config
  - No shader changes needed

- **Option B** (Advanced): Make shader truly dynamic
  - Add `uSphereCount` uniform
  - Update all loops to use variable count
  - Better performance but requires shader refactor

#### How Positions Are Used

**1. Initial Load** (line 374-384):
```javascript
const initConfig = getMetaballConfig('home');
currentPositions.current = initConfig.map(cfg => ({ x: cfg.x, y: cfg.y, z: cfg.z }));
material.uniforms.uSpherePositions.value = currentPositions.current.map(
  pos => new THREE.Vector3(pos.x, pos.y, pos.z)
);
```

**2. Section Changes** (line 483-493):
```javascript
useEffect(() => {
  const newConfig = getMetaballConfig(currentSection);
  targetPositions.current = newConfig.map(cfg => ({ x: cfg.x, y: cfg.y, z: cfg.z }));
  targetRadii.current = newConfig.map(cfg => cfg.radius);
}, [currentSection]);
```

**3. Animation Loop** (line 448-464):
```javascript
// Smooth interpolation from current → target
for (let i = 0; i < 6; i++) {
  currentPositions.current[i].x +=
    (targetPositions.current[i].x - currentPositions.current[i].x) * 0.15;
  // ... same for y, z, radius
}
```

**4. Shader Rendering** (line 149-152):
```glsl
vec3 getSpherePosition(int index, float time) {
  return uSpherePositions[index]; // Dynamic from uniform
}
```

---

## 📝 Design Decisions & Rationale

### Why GSAP Instead of React Router?
- **Smoother animations**: Full control over transition choreography
- **Section-based UX**: All sections exist in DOM simultaneously
- **Performance**: No route mounting/unmounting overhead
- **Creative freedom**: Staggered animations, complex timelines

### Why Custom Cursor (Disabled)?
- `Cursor.jsx` currently returns `null`
- Likely disabled due to:
  - Mobile compatibility issues
  - Performance concerns
  - Design preference for native cursor

### Why Two Background Layers?
1. **Noise**: Adds texture, prevents "flat" look
2. **Metaballs**: Interactive focal points, guides attention
3. **Separation of concerns**: Static vs. dynamic effects

### Why Three.js Shaders Over CSS?
- **Control**: Full mathematical control over blob shapes
- **Performance**: GPU-accelerated rendering
- **Effects**: Advanced lighting, glow, smooth merging (metaballs)
- **Interactivity**: Real-time cursor response

---

## 🚀 Future Enhancement Ideas

### Metaball System
1. **Variable ball counts**: Implement Option A or B from notes above
2. **Mobile-specific configs**: Different positions for small screens
3. **Section-specific colors**: Override ball colors per section
4. **Animation variations**: Different transition speeds per section
5. **Accessibility**: Respect `prefers-reduced-motion`

### Navigation
1. **Keyboard shortcuts**: Arrow keys, number keys
2. **Scroll-based navigation**: Detect scroll direction
3. **URL hash support**: Deep linking to sections
4. **Progress indicator**: Show current section in UI

### Performance
1. **Lazy load sections**: Only render active section
2. **Image optimization**: WebP, lazy loading
3. **Code splitting**: Per-section bundles
4. **Analytics**: Track section views, transitions

---

## 🐛 Known Issues / TODOs

### Cursor Pulsing
- Line 405 in MetaballBackground.jsx: `proximity` variable calculated but not used
- Should be: `targetSphereScales.current[i] = 1.0 + (1.0 - proximity) * 0.1`
- Currently all nearby balls scale to fixed 1.1

### Responsive Design
- Metaball positions not optimized for mobile
- Consider viewport-relative coordinates
- Test on various screen sizes

### Accessibility
- Add skip links for keyboard navigation
- Ensure all interactive elements are focusable
- Screen reader testing needed

---

## 📦 Dependencies

### Core
- `react@^18.x` - UI library
- `react-dom@^18.x` - React DOM renderer
- `vite@^4.x` - Build tool

### Animation
- `gsap@^3.13.0` - Section transitions
- `framer-motion@^9.0.7` - Component animations (may be unused)

### 3D Graphics
- `three@^0.149.0` - WebGL renderer
- `@react-three/fiber` - React Three.js renderer (may be unused in new version)
- `@react-three/drei` - Three.js helpers (may be unused)

### Styling
- Tailwind CSS - Utility-first CSS
- Sass - CSS preprocessor (check if used)

### Routing (Installed but NOT Used in AppNew)
- `react-router-dom@^6.8.1` - Installed but OLD version uses it, NEW version doesn't

---

## 🔍 How to Verify What's Used

### Check Component Imports
```bash
# Search for imports of Contact.jsx
grep -r "from.*Contact.jsx" src/

# Search for imports of Contact copy.jsx
grep -r "from.*Contact copy.jsx" src/
```

### Check CSS Imports
```bash
# Find all CSS imports
grep -r "@import\|import.*\.css" src/
```

### Check if Context is Used
```bash
# Search for useContext or Context providers
grep -r "useContext\|createContext" src/
```

### Dead Code Analysis
- Use Vite build analyzer
- Check bundle for unused exports
- ESLint rules for unused imports

---

## 💡 Tips for Developers

### Modifying Metaball Positions
1. Open `src/config/metaballPositions.js`
2. Edit coordinates for desired section
3. Coordinates are in world space: `x: -4 to 4`, `y: -3 to 3`
4. Changes are hot-reloaded automatically
5. Use browser DevTools to inspect positions

### Adding New Section
1. Create new section component in `src/components/`
2. Add section ID to `sections` array in AppNew.jsx
3. Add section to main content in AppNew.jsx
4. Create metaball config in `metaballPositions.js`
5. Add GSAP animation selectors in `transitionToSection()`
6. Create section-specific CSS file

### Debugging Metaballs
- Check browser console for shader errors
- Use Three.js DevTools browser extension
- Reduce `targetFPS` for easier debugging
- Add console.logs in animation loop (careful with spam)

### Performance Profiling
- Chrome DevTools Performance tab
- Three.js stats panel
- Monitor FPS during transitions
- Check for memory leaks in long sessions

---

## 📚 Additional Resources

### Three.js Metaballs
- [Ray Marching Tutorial](https://iquilezles.org/www/articles/raymarchingdf/raymarchingdf.htm)
- [SDF Functions](https://iquilezles.org/www/articles/distfunctions/distfunctions.htm)

### GSAP Animation
- [GSAP Timeline Docs](https://greensock.com/docs/v3/GSAP/Timeline)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer)

### React Performance
- [React Profiler](https://react.dev/reference/react/Profiler)
- [Optimizing Performance](https://react.dev/learn/render-and-commit)

---

## 🔐 Environment Variables
Currently none. Consider adding:
- `VITE_ANALYTICS_ID` - Analytics tracking
- `VITE_API_URL` - If backend is added
- `VITE_ENABLE_CURSOR` - Toggle custom cursor

---

## 📄 License
[Add license information]

---

## 👤 Contact
**Email**: ismaelabdoul7@gmail.com
**GitHub**: [Abdoul-sudo](https://github.com/Abdoul-sudo)
**LinkedIn**: [abdoul-wahhaab](https://www.linkedin.com/in/abdoul-wahhaab)

---

**Generated by Claude Code**
*This documentation should be updated as the project evolves*

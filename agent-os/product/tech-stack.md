# Tech Stack

## Framework & Runtime

### Application Framework
**React 18** - Modern UI library with concurrent features, hooks, and efficient rendering
- Chosen for component-based architecture and rich ecosystem
- Provides declarative approach to UI updates and state management
- Version 18 enables automatic batching and concurrent rendering features

### Build Tool
**Vite 4.x** - Next-generation frontend build tool with lightning-fast HMR
- ES modules-based dev server for instant hot module replacement
- Optimized production builds with Rollup bundling
- Superior developer experience compared to Webpack

### Language/Runtime
**JavaScript (ES6+)** - Modern JavaScript with async/await, modules, and class syntax
- Browser-native execution without transpilation overhead
- Leverages modern language features for cleaner code

### Package Manager
**pnpm** - Fast, disk space-efficient package manager
- Symlink-based node_modules structure saves disk space
- Faster installs than npm/yarn
- Strict dependency resolution prevents phantom dependencies

## Frontend

### JavaScript Framework
**React 18** (as noted above)
- Functional components with hooks (useState, useEffect, useRef)
- No class components - modern hooks-based architecture throughout
- Custom hooks for reusable logic (metaball interactions, section transitions)

### Animation Libraries
**GSAP 3.13.0** - Professional-grade JavaScript animation library
- Core library for section transitions and choreographed animations
- Timeline API for complex, sequenced animations
- Powers custom navigation system (replaces React Router transitions)
- Staggered animations for element reveals

**Framer Motion 9.0.7** (installed, may be unused)
- Declarative animation library for React components
- Check if actively used or can be removed to reduce bundle size

### 3D Graphics & WebGL
**Three.js 0.149.0** - JavaScript 3D library for WebGL rendering
- Core renderer for metaball background system
- Custom GLSL shaders for ray marching and signed distance fields
- WebGLRenderer with performance optimizations (pixelRatio capping)

**@react-three/fiber** (installed, potentially unused)
- React renderer for Three.js
- May be unused in current implementation - verify and remove if not needed

**@react-three/drei** (installed, potentially unused)
- Three.js helpers and abstractions
- May be unused - verify and remove if not needed

### CSS Framework & Styling
**Tailwind CSS** - Utility-first CSS framework
- Rapid UI development with utility classes
- Configured via `tailwind.config.cjs`
- PostCSS integration via `postcss.config.cjs`

**Custom CSS Modules** - Component-specific stylesheets
- Organized by component/section in `src/styles/` directory
- Dedicated files: base.css, app.css, hero.css, about.css, work.css, contact.css, metaball.css, noise.css, logo.css, menu.css, cursor.css
- Separation of concerns between layout, components, and effects

**Sass** (installed, verify usage)
- CSS preprocessor for nested rules, variables, mixins
- Check if actively used or can be removed

### UI Components
**Custom Components** - Hand-built React components
- No third-party UI library dependency
- Full control over styling and behavior
- Components: HeroSection, AboutSection, WorkSection, ContactSection, MetaballBackground, NoiseBackground, Logo, Menu, Cursor

## Navigation & Routing

### Custom GSAP-Based Navigation
**NOT using React Router** - Custom section switching implementation
- All sections exist in DOM simultaneously
- GSAP timelines orchestrate show/hide animations
- Section state managed with React hooks
- Rationale: Smoother animations, full control over transitions, no mounting/unmounting overhead

### Potential Routing Library (Unused)
**react-router-dom 6.8.1** (installed but not used in current version)
- Installed for legacy App.jsx (old version)
- Not used in AppNew.jsx (current version)
- Consider removing to reduce bundle size

## Data & State Management

### State Management
**React Hooks** - Built-in state management
- useState for component-level state
- useRef for mutable references (animation frames, Three.js objects)
- useEffect for side effects and lifecycle management
- No Redux, Context API, or external state library

### Data Storage
**Static JSON** - Project and content data stored in JavaScript files
- `src/data/projects.js` - Portfolio project data
- `src/data/placeholderImages.js` - Placeholder images
- No backend database or CMS integration currently

## Configuration & Build

### Configuration Files
- `vite.config.js` - Vite build and dev server configuration
- `tailwind.config.cjs` - Tailwind CSS customization
- `postcss.config.cjs` - PostCSS plugins and transformations
- `src/config/metaballPositions.js` - Route-based metaball position configurations

### Environment Variables
**Currently None** - No environment variables in use
- Future considerations: analytics ID, API URLs, feature flags

## Performance & Optimization

### WebGL Performance
- **Frame Rate Capping:** 30fps limit for metaball rendering
- **Pixel Ratio Limiting:** Max 1.5 devicePixelRatio to reduce render load
- **Mobile Detection:** Reduced effects for low-power devices
- **RAF (RequestAnimationFrame):** Efficient animation loop management

### Code Optimization
- **Lazy Loading:** Images and assets loaded on demand
- **Code Splitting:** Potential for per-section bundles (roadmap item)
- **Tree Shaking:** Vite automatically removes unused code

## Development Tools

### Linting & Formatting
**Status:** Not documented - verify if ESLint/Prettier configured
- Recommended: ESLint for code quality, Prettier for formatting
- Should align with standards in `agent-os/standards/global/coding-style.md`

### Version Control
**Git** - Standard version control
- Repository hosted on GitHub (user: Abdoul-sudo)
- Current branch: main
- Conventional commits recommended per conventions.md

### Documentation
**CLAUDE.md** - Comprehensive project documentation
- Design system, architecture decisions, component guide
- Located at project root
- Maintained as living documentation

## Testing & Quality

### Testing Framework
**Status:** Not currently implemented
- Recommended: Jest for unit tests, React Testing Library for component tests
- Playwright or Cypress for E2E testing
- Roadmap consideration for test coverage

## Deployment & Infrastructure

### Hosting
**Status:** Not documented in codebase
- Recommended: Vercel (optimal for Vite/React), Netlify, or GitHub Pages
- Static site hosting with CDN
- Automatic deployments from git pushes

### CI/CD
**Status:** Not currently configured
- Recommended: GitHub Actions for automated builds and deployments
- Pre-commit hooks for linting (future consideration)

### Monitoring
**Status:** Not currently implemented
- Roadmap Phase 3: Analytics (Plausible or Google Analytics)
- Roadmap Phase 3: Performance monitoring (Sentry, Datadog)

## Third-Party Services

### Email & Contact
**Status:** Direct email links only
- Current: `mailto:` links to ismaelabdoul7@gmail.com
- Roadmap Phase 2: Contact form integration (EmailJS, Formspree, or custom backend)

### Social Integration
**GitHub:** https://github.com/Abdoul-sudo
**LinkedIn:** https://www.linkedin.com/in/abdoul-wahhaab
- Direct links in contact section
- No API integration

### Authentication
**Not applicable** - No user accounts or authentication required

## Browser Support

### Target Browsers
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- WebGL 1.0 support required for metaball backgrounds
- Mobile browsers: iOS Safari, Chrome Mobile

### Compatibility Considerations
- No IE11 support (uses modern JavaScript)
- Progressive enhancement: graceful degradation without WebGL
- Responsive design for all screen sizes

## Dependencies Summary

### Core Dependencies (Production)
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "gsap": "^3.13.0",
  "three": "^0.149.0",
  "framer-motion": "^9.0.7"
}
```

### Potentially Unused (Audit Recommended)
- `react-router-dom` - Not used in current AppNew.jsx
- `@react-three/fiber` - Verify usage
- `@react-three/drei` - Verify usage
- `framer-motion` - Verify usage
- `sass` - Verify usage

### Development Dependencies
- Vite and related plugins
- Tailwind CSS and PostCSS
- ESLint/Prettier (if configured)

## Architecture Principles

### Performance-First
- 30fps cap on effects to preserve battery life
- Reduced pixel ratio for mobile devices
- Efficient shader code with ray marching optimization

### Mobile-Responsive
- Touch event support for interactions
- Device detection for capability-based rendering
- Viewport-relative positioning (needs improvement per roadmap)

### Accessibility-Conscious
- Semantic HTML structure
- Keyboard navigation (roadmap priority)
- Screen reader support (roadmap priority)
- Prefers-reduced-motion support (roadmap priority)

### Maintainability
- Component-based architecture
- Separated concerns (styles, logic, configuration)
- Comprehensive documentation (CLAUDE.md)
- Consistent naming conventions per coding-style.md standards

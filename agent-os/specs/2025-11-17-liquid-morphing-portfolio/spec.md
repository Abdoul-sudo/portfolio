# Specification: Liquid Morphing Portfolio Enhancement

## Goal
Transform the portfolio into an award-winning liquid morphing experience by perfecting the existing WebGL metaball system and implementing liquid-morphing UI elements across navigation, text, and interactions. The centerpiece is dramatic "venom blob" button morphing powered by Flubber.js, creating a cohesive liquid aesthetic that demonstrates advanced technical capabilities.

## User Stories
- As a portfolio visitor, I want to experience smooth, dramatic button morphing when hovering over navigation elements so that I feel engaged with an innovative, memorable interface
- As a user on any device, I want the metaballs to react fluidly to my interactions at 60 FPS (desktop) or 30 FPS (mobile) so that the experience feels polished and responsive regardless of my hardware
- As a user navigating between sections, I want to hear subtle audio cues synchronized with visual transitions so that the liquid morphing experience feels complete and immersive

## Specific Requirements

### PRIORITY 1: Liquid Morphing Navigation Buttons

**Context**: Primary navigation in Menu.jsx (fullscreen overlay) and Logo.jsx (home button) - these are the most visible interactive elements and user's top priority

**Implementation Approach**:
- Convert button backgrounds from CSS to inline SVG elements with defined paths
- Base state: Rounded pill/capsule SVG path (smooth, professional)
- Hover state: Organic "venom blob" SVG path (irregular, flowing edges with 4-6 control points)
- Use Flubber.js `interpolate()` function to generate smooth path interpolation between states
- Animate interpolation progress using GSAP or requestAnimationFrame over 400-600ms
- Apply elastic easing (`elastic.out(1, 0.3)`) for organic feel
- Click state: Brief compress (scale 0.95) then explode effect (scale 1.05) before navigation
- NO idle breathing or pulsing animations when at rest
- Maintain consistent click/tap target size throughout morph for accessibility

**Technical Details**:
- Install `flubber` via pnpm: `pnpm add flubber`
- Create new component: `src/components/LiquidButton.jsx`
- Define SVG viewBox: "0 0 200 60" for horizontal pill buttons
- Pill path example: rounded rect with rx/ry of 30
- Blob path: custom path with organic control points, maintain similar bounding box
- Use `maxSegmentLength: 2` option in Flubber for smoother interpolation
- Forward text content and onClick handler as props for reusability
- Apply to Menu.jsx navigation items and Logo.jsx wrapper

**Files to Create**:
- `src/components/LiquidButton.jsx` - Reusable morphing button component
- `src/hooks/useFlubber.js` - Custom hook for Flubber interpolation lifecycle
- `src/constants/svgPaths.js` - Define pill and blob SVG path strings

**Files to Modify**:
- `src/components/Menu.jsx` - Replace `.menu-item` buttons with `<LiquidButton>` components
- `src/components/Logo.jsx` - Wrap logo image with `<LiquidButton>` for consistent interaction
- `src/styles/menu.css` - Remove button background styles, add SVG positioning styles
- `package.json` - Add flubber dependency

### PRIORITY 2: Fix Cursor Pulsing Bug + 60 FPS Upgrade

**Bug Fix - Line 419-420 in MetaballBackground.jsx**:
- Current code calculates `proximity` variable but doesn't use it (line 419)
- Line 420 hardcodes scale to `1.1` regardless of distance
- Fix: Replace line 420 with `targetSphereScales.current[i] = 1.0 + (1.0 - proximity) * 0.4`
- Result: Metaballs dynamically scale from 1.0 (far) to 1.4 (near cursor) based on actual proximity
- Proximity calculated as `dist / pulseRadius` where pulseRadius is 1.5 units

**60 FPS Upgrade**:
- Current: Line 492 caps at 30 FPS with `targetFPS = 30`
- Target: 60 FPS on desktop, adaptive on mobile
- Create `src/utils/performanceMonitor.js` to track actual FPS
- Measure FPS over 1-second intervals using performance.now()
- If measured FPS drops below 50 for 3+ consecutive seconds, reduce pixel ratio or fall back to 30 FPS
- Desktop (> 1024px width): Start at 60 FPS, maintain if GPU can handle
- Tablet (768-1024px): Start at 60 FPS with reduced pixel ratio (1.25 max)
- Mobile (< 768px): Start at 30 FPS to preserve battery

**Adaptive Quality Logic**:
- High-end (sustained 60 FPS): Full quality, pixel ratio 1.5
- Mid-range (50-59 FPS): Reduce pixel ratio to 1.25
- Low-end (< 50 FPS): Fall back to 30 FPS, pixel ratio 1.0
- Update `targetFPS` variable dynamically based on performance tier
- Store quality tier in ref to prevent constant recalculation

**Files to Modify**:
- `src/components/MetaballBackground.jsx` - Line 419-420 bug fix, line 492 FPS logic, add performance monitoring integration
- `src/utils/performanceMonitor.js` (create) - FPS tracking utility with quality recommendations

### PRIORITY 3: Enhanced Color Choreography

**Section-Specific Color Palettes**:
Using existing 6-color sophisticated desaturated palette from line 43-50 in MetaballBackground.jsx:
- Home: Cool blues (emphasize `0xDCF2FF`, `0xE0F3FF`, accent with `0xF0E6FF`)
- Work: Warm coral/pink (emphasize `0xFFE5EE`, `0xFFEBF4`, accent with `0xF0E6FF`)
- About: ALL 6 colors mixed (full palette display - `0xDCF2FF`, `0xFFE5EE`, `0xF0E6FF`, `0xE0FFED`, `0xE0F3FF`, `0xFFEBF4` in order)
- Contact: Calming mint green (emphasize `0xE0FFED`, accent with `0xDCF2FF` and `0xE0F3FF`)

**Implementation Approach**:
- Extend `src/config/metaballPositions.js` with color configuration per section
- Add `colors` array to each section config (home, work, about, contact)
- Each array contains 6 color hex values mapped to metaballs [0] through [5]
- On section change, update both positions AND colors
- Use same smooth interpolation (0.15 smoothness) for color transitions as positions
- Colors transition via RGB interpolation in shader (THREE.Color.lerp())

**Technical Details**:
- Add new arrays in metaballPositions.js for each device type (mobile, tablet, desktop, 2k, 4k)
- Update MetaballBackground.jsx useEffect (line 590-600) to also update color targets
- Shader already supports `uSphereColors` uniform (line 103, 140)
- Interpolate currentColors and targetColors refs similar to positions (line 519-529)
- Update uniform on each frame with interpolated color values

**Color Assignments by Section** (all using existing palette colors):

Home - Cool Blues:
- Ball [0]: `0xDCF2FF`, Ball [1]: `0xE0F3FF`, Ball [2]: `0xDCF2FF`
- Ball [3]: `0xE0F3FF`, Ball [4]: `0xF0E6FF`, Ball [5]: `0xDCF2FF`

Work - Warm Coral/Pink:
- Ball [0]: `0xFFE5EE`, Ball [1]: `0xFFEBF4`, Ball [2]: `0xFFE5EE`
- Ball [3]: `0xFFEBF4`, Ball [4]: `0xF0E6FF`, Ball [5]: `0xFFE5EE`

About - All 6 Colors:
- Ball [0]: `0xDCF2FF`, Ball [1]: `0xFFE5EE`, Ball [2]: `0xF0E6FF`
- Ball [3]: `0xE0FFED`, Ball [4]: `0xE0F3FF`, Ball [5]: `0xFFEBF4`

Contact - Calming Mint:
- Ball [0]: `0xE0FFED`, Ball [1]: `0xE0FFED`, Ball [2]: `0xDCF2FF`
- Ball [3]: `0xE0FFED`, Ball [4]: `0xE0F3FF`, Ball [5]: `0xE0FFED`

**Files to Modify**:
- `src/config/metaballPositions.js` - Add color arrays to all section configs
- `src/components/MetaballBackground.jsx` - Add color interpolation logic in animation loop and section change effect

### PRIORITY 4: Button-Metaball Distortion

**Interaction Concept**:
When user hovers over primary navigation buttons (Menu.jsx items only, NOT secondary buttons like project cards), nearby metaballs warp/lean toward the button position creating a unified liquid aesthetic.

**Technical Approach**:
- Add new shader uniforms: `uButtonPosition` (vec3), `uButtonInfluence` (float 0-1), `uButtonRadius` (float)
- LiquidButton component emits hover position to MetaballBackground via callback or context
- On hover: LiquidButton calculates world-space position, passes to MetaballBackground
- MetaballBackground updates uniforms: position = button center, influence = 1.0, radius = 3.5 units
- On hover end: Animate influence back to 0.0 over 300ms (smooth return)
- Shader distorts ray marching: if ray is within button radius, warp ray position toward button
- Warp strength = `(1.0 - distance/radius) * influence * 0.5` for subtle but noticeable effect
- Only affects primary nav buttons to avoid overwhelming interface

**Shader Implementation** (add to fragment shader in MetaballBackground.jsx):
```glsl
// New uniforms (add after line 151)
uniform vec3 uButtonPosition;
uniform float uButtonInfluence;
uniform float uButtonRadius;

// In rayMarch function before sceneSDF call (around line 256)
if (uButtonInfluence > 0.0) {
  float buttonDist = length(p.xy - uButtonPosition.xy);
  if (buttonDist < uButtonRadius) {
    vec2 warpDir = normalize(uButtonPosition.xy - p.xy);
    float warpStrength = (1.0 - buttonDist / uButtonRadius) * uButtonInfluence;
    p.xy += warpDir * warpStrength * 0.5;
  }
}
```

**Component Communication**:
- Create context: `src/context/MetaballInteractionContext.jsx`
- Provides `setButtonHover(position | null)` function
- MetaballBackground consumes context, updates uniforms
- LiquidButton uses context on mouse enter/leave with screen-to-world coordinate conversion
- Use same `screenToWorld` helper as cursor tracking (line 376-381)

**Files to Create**:
- `src/context/MetaballInteractionContext.jsx` - Button hover state provider

**Files to Modify**:
- `src/components/MetaballBackground.jsx` - Add shader uniforms, consume context, update uniforms on button hover
- `src/components/LiquidButton.jsx` - Report hover position to context
- `src/AppNew.jsx` - Wrap app in MetaballInteractionContext.Provider

### PRIORITY 5: Morphing Text Reveals

**Scope Decision** (balancing impact vs. overwhelming):
- **H1 headings only**: Full morphing treatment (hero headline, section titles)
- **H2 subheadings**: Simple fade + slight blur (avoid animation overload)
- **Body text**: Standard fade-in (readability priority)

**H1 Morphing Effect**:
- Split heading into individual characters using split-text library
- Each character starts as blob shape (circular or organic SVG path)
- Characters morph into letter shapes with staggered timing (50-100ms per char)
- Wave pattern follows metaball positions (characters closer to metaballs animate first)
- Total duration: 1200-1500ms (matches "Hey, I'm Abdoul Wahhaab" reference timing from line 69)
- Use Flubber.js to morph SVG paths from blob to letter glyphs

**Technical Approach**:
- Create `src/components/MorphingText.jsx` component
- Convert text to SVG using font path data (use Canvas API measureText or SVG font)
- Generate blob paths for each character (circular with slight distortion)
- Use Flubber to interpolate blob → glyph path for each character
- GSAP timeline to orchestrate stagger and coordinate with section transitions
- Calculate distance from each character to nearest metaball, use for stagger order
- Closer characters animate before distant ones (wave effect)

**H2 and Body Text Fallback**:
- H2: Simple GSAP animation with blur filter `filter: blur(10px) → blur(0px)` and opacity 0 → 1
- Body: Existing stagger fade-in from AppNew.jsx (line 85-96) is sufficient

**Library Options**:
- Preferred: Custom implementation using Canvas measureText + Flubber
- Alternative: SplitType library for text splitting, then apply Flubber morphing
- Font paths: Extract from loaded web fonts or use Canvas-rendered character shapes

**Files to Create**:
- `src/components/MorphingText.jsx` - Morphing text component for H1 elements
- `src/utils/textToSVG.js` - Convert text characters to SVG paths
- `src/utils/blobGenerator.js` - Generate organic blob SVG paths for initial state

**Files to Modify**:
- `src/components/HeroSection.jsx` - Replace H1 headline with `<MorphingText>`
- `src/components/AboutSection.jsx` - Replace section title with `<MorphingText>`
- `src/components/WorkSection.jsx` - Replace section title with `<MorphingText>`
- `src/components/ContactSection.jsx` - Replace section title with `<MorphingText>`

### PRIORITY 6: Mobile Optimization

**Metaball Count Reduction**:
- Mobile (< 768px): 4 metaballs visible
- Tablet (768-1024px): 6 metaballs (same as desktop)
- Desktop (> 1024px): 6 metaballs
- Implementation: Hide balls [4] and [5] on mobile by positioning offscreen (x: 100, y: 100)
- No shader refactor needed - still render 6 but 2 are invisible
- Update positions in `src/config/metaballPositions.js` mobile configs to only show first 4 meaningfully

**Performance Targets**:
- Mobile: 30 FPS minimum, 60 FPS on flagship devices (iPhone 13+, Pixel 6+)
- Tablet: 60 FPS standard
- Desktop: 60 FPS sustained
- Reduce pixel ratio on mobile to 1.0 (from 1.5) to save GPU cycles
- Disable cursor ball shader effect on mobile (already implemented - line 228-231)

**Touch Interaction**:
- Touch events already supported (line 445-457, 552-553)
- Maintain sphere pulsing on touch (line 417-423 proximity logic)
- Enlarge touch targets for LiquidButton on mobile (min 44x44px)
- Reduce button morph duration on mobile to 350ms (from 500ms) for snappier feel
- Test button distortion effect on mobile - may disable if performance impact is severe

**Viewport Adjustments**:
- Metaball positions already responsive via device detection (metaballPositions.js line 29-58)
- Verify mobile configs have appropriate vertical spacing (portrait orientation)
- Logo and menu button sizing already responsive via CSS
- Test text morphing performance on mobile - may simplify to fade-only if FPS drops

**Files to Modify**:
- `src/config/metaballPositions.js` - Ensure mobile configs position balls [4] and [5] offscreen
- `src/components/LiquidButton.jsx` - Reduce morph duration on mobile, enlarge touch targets
- `src/components/MetaballBackground.jsx` - Pixel ratio reduction already in place, verify FPS logic

### PRIORITY 7: Sound Design

**Audio Technology**:
- Web Audio API with synthesized sounds (no audio file loading)
- Single AudioContext for app lifetime to avoid iOS limitations
- Master gain node at 0.35 (35% volume, middle of 30-50% target range)
- Default state: ON (user can mute via toggle button)
- Store mute preference in localStorage

**Sound Types and Triggers**:
- **Whoosh** (section transitions): Filtered white noise burst with volume envelope
  - Trigger: On section change in AppNew.jsx GSAP timeline
  - Duration: 600ms, volume fade in/out
  - Filter: Bandpass 200-2000Hz sweeping to 800-4000Hz
- **Pulse** (cursor-metaball interactions): Sine wave tone with frequency modulation
  - Trigger: When metaball scales (sphere proximity event)
  - Frequency: 220Hz → 330Hz quick glide (100ms)
  - Volume: Quiet (0.15 relative to master gain)
  - Only on desktop where cursor interactions are meaningful
- **Pop** (button click): Short percussive click sound
  - Trigger: LiquidButton onClick before navigation
  - Duration: 50ms, sharp attack/decay
  - Synthesized with triangle wave burst

**Implementation Approach**:
- Create `src/utils/audioManager.js` singleton class
- Initialize AudioContext on first user interaction (autoplay policy compliance)
- Methods: `playWhoosh()`, `playPulse()`, `playPop()`, `setMuted(bool)`, `getMuted()`
- Create `src/hooks/useAudio.js` hook for easy component access
- Add mute toggle button to Menu.jsx overlay (bottom right corner)
- Icon: Speaker with slash when muted, speaker waves when active
- GSAP integration: Call audio methods in timeline callbacks

**Audio Synthesis Examples**:
- Whoosh: White noise source → bandpass filter → gain envelope → destination
- Pulse: Oscillator (sine) → gain node with attack/release → destination
- Pop: Oscillator (triangle, 150Hz) → gain with sharp envelope → destination

**Files to Create**:
- `src/utils/audioManager.js` - Web Audio API wrapper singleton
- `src/hooks/useAudio.js` - React hook for audio manager access
- `src/components/SoundToggle.jsx` - Mute/unmute button component

**Files to Modify**:
- `src/AppNew.jsx` - Add sound triggers to section transition timeline
- `src/components/LiquidButton.jsx` - Call playPop() on click
- `src/components/MetaballBackground.jsx` - Call playPulse() when sphere scales (throttle to max 1 per 200ms)
- `src/components/Menu.jsx` - Add SoundToggle button to overlay
- `package.json` - No dependencies needed (Web Audio is native)

### PRIORITY 8: Cinematic Section Transitions

**Current State**: Section transitions are synchronized - content and metaballs move together (AppNew.jsx line 33-96)

**Enhancement**: Metaballs lead by 200ms to guide user's eye before content changes

**Implementation**:
- Create new ref in AppNew.jsx: `isMetaballTransitioning`
- Before GSAP timeline starts, trigger metaball position change immediately
- Delay content animation by 200ms using GSAP timeline delay
- MetaballBackground receives new prop: `targetSection` (changes 200ms before `currentSection`)
- Metaballs interpolate to new section positions while content still fading out
- After 200ms, content begins transition while metaballs are mid-animation
- Total timeline: Metaball starts at 0ms, content out at 200ms, content in at 600ms (total 1000ms)

**Timeline Visualization**:
```
0ms:     Metaballs begin moving to new positions
200ms:   Content fade out begins
400ms:   Content fully faded, section switch
600ms:   Content fade in begins
1000ms:  Transition complete (800ms existing + 200ms lead)
```

**GSAP Timeline Update** (AppNew.jsx line 46-96):
- Add `targetSection` state separate from `currentSection`
- Set `targetSection` immediately when transition called
- GSAP timeline with 200ms delay before first animation
- Pass `targetSection` to MetaballBackground while GSAP timeline runs
- Update `currentSection` only when content switch happens (line 72)

**Files to Modify**:
- `src/AppNew.jsx` - Add targetSection state, update timeline with 200ms metaball lead
- `src/components/MetaballBackground.jsx` - Accept targetSection prop for early position updates

### PRIORITY 9: Liquid Number Counting

**Target Elements**: Statistics in about/work sections (if present - verify in AboutSection.jsx and WorkSection.jsx)

**Visual Effect**: Numbers blur/distort during count-up transition, mimicking metaball fusion

**Implementation Approach**:
- Create `src/components/CountingNumber.jsx` component
- Props: `from`, `to`, `duration`, `suffix` (e.g., "+" for "5+")
- On mount or visibility: Animate from → to using GSAP or requestAnimationFrame
- During count: Apply CSS filter `blur(0px → 4px → 0px)` and `scale(1 → 1.1 → 1)`
- Blur peaks at 50% of count duration for maximum liquid effect
- Easing: `power2.inOut` for smooth acceleration/deceleration
- Duration: 2000ms (2 seconds) to make effect noticeable

**CSS Filter Animation**:
- 0%: blur(0px) scale(1)
- 50%: blur(4px) scale(1.1) - midpoint of count
- 100%: blur(0px) scale(1)
- Synchronized with number increment for cohesive liquid feel

**Trigger**: When section becomes visible (about or work section enters)

**Content Verification**: Check if about/work sections have statistics to count
- If not present, add example stats (years experience, projects completed, etc.)
- Numbers should be impressive but realistic (3+ years, 10+ projects, etc.)

**Files to Create**:
- `src/components/CountingNumber.jsx` - Animated counting component with liquid effect

**Files to Modify**:
- `src/components/AboutSection.jsx` - Add stats section with CountingNumber components if missing
- `src/components/WorkSection.jsx` - Add stats if appropriate for portfolio showcase

### PRIORITY 10: Morphing Loading Sequence

**Behavior**: Displays on every page load (not just first visit), quick 1-2 second animation

**Animation Sequence**:
1. Page loads with dark background and 6 scattered metaballs (0-500ms)
2. Metaballs animate toward center, coalescing into single large blob (500-1000ms)
3. Large blob morphs into logo shape or explodes into navigation buttons (1000-1500ms)
4. Background fades to normal, hero section content fades in (1500-2000ms)

**Technical Approach**:
- Create `src/components/LoadingSequence.jsx` with overlay covering viewport
- Initial metaball positions: Scattered offscreen (x: ±5, y: ±4)
- Use GSAP timeline for orchestration
- Animate positions toward center (0, 0) with elastic easing
- All metaballs merge due to smoothness parameter (already functional)
- Final frame: Either fade to logo or explode outward to menu positions
- Remove overlay and begin normal app render
- Loading overlay has higher z-index than app content

**Optimization**: Skip if user has `prefers-reduced-motion` enabled (accessibility)

**Files to Create**:
- `src/components/LoadingSequence.jsx` - Loading animation overlay component

**Files to Modify**:
- `src/AppNew.jsx` - Conditionally render LoadingSequence, hide content until complete
- `src/components/MetaballBackground.jsx` - Accept loading positions prop for initial state

## Existing Code to Leverage

**MetaballBackground.jsx WebGL System**
- Established shader architecture with ray marching and signed distance fields
- Existing uniform system (line 87-116) for real-time parameter updates
- Cursor interaction already functional with proximity detection (line 398-438)
- Section-based positioning via config already implemented (line 590-600)
- Leverage this for color choreography, button distortion, and 60 FPS upgrade

**GSAP Animation Framework**
- Timeline-based transitions in AppNew.jsx (line 46-96) for section changes
- Stagger animations for content reveals (line 85-96)
- Reference timing constants: 0.4s fade out, 0.5s stagger in, 0.05s stagger delay
- Use this pattern for text morphing, button animations, and cinematic transitions

**Config-Based Architecture**
- metaballPositions.js demonstrates extensible config pattern
- Device detection (line 29-58) and responsive configs per breakpoint
- Extend this pattern for color choreography without refactoring shader

**React Hooks and Refs Pattern**
- useRef for Three.js object references (line 7-23) prevents re-renders
- useEffect for section changes (line 590-600) with dependency array
- Apply this pattern to performance monitoring, audio management, and button interactions

**Screen-to-World Coordinate Conversion**
- Existing helper function (line 376-381) converts mouse position to shader space
- Reuse for button-metaball distortion position calculations
- Accounts for aspect ratio and viewport scaling

## Out of Scope

**Removed from Spec**:
- SVG morphing illustrations in about section (user prioritized buttons)
- Button idle breathing/pulsing animations (explicitly excluded by user)
- Metaball distortion for ALL buttons (limited to primary nav only for consistency)
- Complex text morphing for body text and subheadings (limited to H1 only)

**Phase 3+ Features** (Future Roadmap):
- Glassmorphism depth effects
- Multi-layer parallax scrolling
- Project showcase immersive card expansions
- Particle system integrations
- Advanced accessibility features (keyboard nav indicators, reduced motion)
- Performance monitoring dashboard
- Analytics integration
- A/B testing infrastructure

**Technical Non-Inclusions**:
- Backend integration or CMS
- User authentication or accounts
- Form submission backend (contact form remains mailto)
- Third-party analytics in this phase
- Multi-language i18n support
- Server-side rendering or static generation
- Database or state persistence beyond localStorage (sound preference only)
- SEO optimization features
- Social media meta tag management

**Design Non-Inclusions**:
- Complete visual redesign (enhancement of existing aesthetic)
- New color palette (using existing sophisticated desaturated pastels)
- Typography changes (preserve existing fonts)
- Layout restructuring (maintain current section-based navigation)
- Additional page sections or content areas
- Blog or content management features
- E-commerce or payment integration

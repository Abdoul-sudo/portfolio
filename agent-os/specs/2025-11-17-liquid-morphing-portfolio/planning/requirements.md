# Spec Requirements: Liquid Morphing Portfolio Enhancement

## Initial Description

Implement the foundation of the liquid morphing portfolio through two major phases:

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

## Requirements Discussion

### First Round Questions

**Q1:** For the button morphing (#7), should we apply this to ALL interactive buttons (project cards, contact form, social links) or just the primary navigation buttons (Menu component)?

**Answer:** "Rounded pill organic like a blob that morph when I hover, no pulse breathing, like venom liquid blob"
- Base state: Rounded pill/capsule shape
- Hover state: Morphs into organic blob (venom-like liquid effect)
- NO idle breathing/pulsing animation
- Focus on dramatic morphing on interaction only

**Q2:** For text morphing (#9), which text elements should receive this treatment? Main section headings only, or all text (headings, paragraphs, navigation)?

**Answer:** User delegated decision to spec writer

**Q3:** The sound design (#6) - what volume level would be appropriate? Should it be on by default or require user activation?

**Answer:**
- Volume: Noticeable (30-50% range)
- Default state: ON
- Sound type: Synthesized sounds (free, using Web Audio API)

**Q4:** For mobile optimization (#5), should we reduce the number of metaballs on mobile devices to maintain 60fps, or keep the same count with reduced quality?

**Answer:**
- Mobile devices (< 768px): 4 metaballs
- Tablet devices (768px-1024px): 6 metaballs (same as desktop)
- Desktop (> 1024px): 6 metaballs

**Q5:** For button-metaball distortion (#8), how strong should the distortion effect be? Should this apply to all buttons or only specific ones to avoid overwhelming the interface?

**Answer:** User indicated uncertainty ("I don't know if all buttons") but emphasized "very appealing and consistent and wow effect" with "do the button on priority"
- Effect strength: DRAMATIC warping
- Scope determined by spec writer based on consistency needs

### Follow-up Questions

**Follow-up 1:** I notice you've provided low-fidelity descriptions rather than mockups. For the button morphing, should we treat your "venom liquid blob" description as the creative direction and develop the exact shape transformations ourselves, or would you prefer to review initial prototypes?

**Answer:** User trusts implementation - develop based on "venom liquid blob" creative direction

**Follow-up 2:** For the text morphing on section headings, what speed/timing would feel right? Should it match the metaball transition timing (~800ms) or be faster/slower for impact?

**Answer:** User indicated "at 'Hey, I'm Abdoul Wahhaab' speed" - referring to the hero section headline reveal timing (approximately 1-1.5 seconds with staggered character animation)

**Follow-up 3:** You mentioned SVG morphing illustrations in the about section (#10), but emphasized buttons as priority. Should we remove this from the initial implementation scope and focus on the higher-priority liquid buttons first?

**Answer:** Yes - **SVG morphing illustrations (#10) REMOVED from scope**. Focus on liquid buttons as priority.

### Existing Code to Reference

**Similar Features Identified:**

Based on product roadmap and existing codebase analysis:

- **Metaball Background System**: `src/components/MetaballBackground.jsx`
  - Current implementation: WebGL shaders with cursor-reactive metaballs
  - Known bug at line 419 (proximity variable unused)
  - Current 30 FPS cap at line 492
  - Section-based positioning system already functional via `src/config/metaballPositions.js`

- **GSAP Animation System**: `src/AppNew.jsx`
  - Custom section transitions already implemented
  - Timeline-based choreography for staggered animations
  - Current transition timing: ~1 second total
  - Reference for timing constants and easing functions

- **Navigation Components**:
  - `src/components/Menu.jsx` - Primary navigation menu (target for liquid morphing buttons)
  - `src/components/Logo.jsx` - Animated logo/home button

- **Styling System**:
  - `src/styles/menu.css` - Current menu button styles
  - `src/styles/metaball.css` - Metaball positioning and layering
  - Color palette defined in CLAUDE.md and existing metaball config

**Backend/Logic Patterns:**
- Three.js shader uniforms system for real-time parameter updates
- useRef hooks for animation frame management and mutable state
- useEffect hooks for section change side effects
- GSAP timeline API for orchestrated animations

### Visual Assets

**Files Provided:**
No visual files found via bash check in `D:/PROJECTS/Web/portfolio/agent-os/specs/2025-11-17-liquid-morphing-portfolio/planning/visuals/`

**Visual Insights:**
- User provided verbal creative direction: "venom liquid blob" aesthetic
- Reference to existing timing: "Hey, I'm Abdoul Wahhaab" hero animation speed
- Emphasis on dramatic, noticeable effects while maintaining consistency
- Fidelity level: Conceptual direction rather than exact mockups

**Design Direction from User:**
- Buttons: Rounded pill base → organic venom blob on hover
- No idle animations (no breathing/pulsing at rest)
- Dramatic morph on interaction
- Liquid aesthetic throughout all new features

## Requirements Summary

### Functional Requirements

#### Phase 1: Perfect Metaballs (Foundation)

1. **Fix Cursor Pulsing Bug** (#1)
   - Location: `src/components/MetaballBackground.jsx` line 419
   - Issue: `proximity` variable calculated but unused
   - Fix: Implement dynamic scaling: `targetSphereScales.current[i] = 1.0 + (1.0 - proximity) * 0.4`
   - Result: Metaballs scale from 1.0 to 1.4 based on cursor proximity (not fixed 1.1)

2. **Upgrade to 60 FPS** (#2)
   - Current: 30 FPS cap at line 492
   - Target: 60 FPS on capable devices
   - Implementation: Adaptive quality detection
     - High-end devices: 60 FPS, full quality
     - Mid-range: 60 FPS, reduced pixel ratio
     - Low-end: 30 FPS, reduced quality
   - Device detection via performance monitoring

3. **Cinematic Section Transitions** (#3)
   - Metaballs lead by 200ms
   - Content follows after delay
   - Creates visual guidance effect
   - Integration with existing GSAP timeline in `AppNew.jsx`

4. **Enhanced Color Choreography** (#4)
   - Home section: Cool blues (existing palette emphasis on blues)
   - Work section: Warm coral/pink tones
   - About section: ALL 6 colors mixed/balanced (full palette display)
   - Contact section: Calming mint green tones
   - Color transitions sync with section changes
   - Update `src/config/metaballPositions.js` with color specifications

5. **Mobile Optimization** (#5)
   - Breakpoints:
     - Mobile (< 768px): 4 metaballs, 30fps
     - Tablet (768px - 1024px): 6 metaballs, 60fps
     - Desktop (> 1024px): 6 metaballs, 60fps
   - Touch event support for cursor interactions
   - Larger touch targets for mobile
   - Viewport-relative sizing adjustments

6. **Sound Design** (#6)
   - Technology: Web Audio API (synthesized sounds, no audio files)
   - Volume: 30-50% (noticeable but not overwhelming)
   - Default state: ON (with mute toggle option)
   - Sound triggers:
     - Whoosh: Section transitions
     - Pulse/tone: Metaball merging/cursor interactions
   - Ultra-minimal approach - subtle reinforcement of visual effects

#### Phase 2: Liquid Interface (Everything Morphs)

7. **Liquid Morphing Navigation Buttons** (#7) - **PRIORITY 1**
   - Technology: Flubber.js for SVG path morphing
   - Target: Primary navigation buttons in Menu component (`src/components/Menu.jsx`)
   - States:
     - Rest: Rounded pill/capsule shape
     - Hover: Morphs to organic "venom liquid blob" shape
     - Click: Compress then explode effect (brief scale animation)
   - NO idle breathing/pulsing animation
   - Timing: Smooth morph (~400-600ms) with elastic easing
   - Implementation approach:
     - SVG-based button backgrounds
     - Define base pill path and target blob path
     - Flubber interpolation between states
     - GSAP or CSS for additional animations

8. **Button-Metaball Distortion** (#8)
   - Effect: Dramatic warping of metaballs near hovered buttons
   - Scope: PRIMARY navigation buttons only (Menu component)
     - Rationale: Maintains wow factor without overwhelming interface
     - Secondary buttons (project cards, contact) don't distort metaballs
   - Interaction:
     - Hovered button position passed to MetaballBackground
     - Metaballs within range lean toward button
     - Shader distortion creates unified liquid aesthetic
   - Implementation: Additional uniform in shader for button influence point

9. **Morphing Text Reveals** (#9)
   - Scope (spec writer decision based on balance):
     - **Main headings (h1)**: Full blob morph treatment
       - Characters morph FROM liquid blob shapes
       - Staggered wave pattern reveal
       - Timing: ~1-1.5s (matches "Hey, I'm Abdoul Wahhaab" speed)
     - **Subheadings (h2)**: Simpler fade-in with slight blur
       - Avoid overwhelming user with too many morphing effects
     - **Body text**: Standard fade-in
       - Performance and readability considerations
   - Pattern: Wave follows metaball positions
   - Technology: Split-text library (SplitType or GSAP SplitText)
   - Stagger timing: ~50-100ms per character

10. **SVG Morphing Illustrations** (#10) - **REMOVED FROM SCOPE**
    - User prioritized liquid buttons
    - Can be revisited in future iteration

11. **Liquid Number Counting** (#11)
    - Target: Statistics in about/work sections (if present)
    - Effect: Numbers blur/distort during count-up transition
    - Visual: Similar to metaball fusion effect
    - Timing: Synchronized with number increment
    - Technology: Custom counter with CSS filters or canvas rendering

12. **Morphing Loading Sequence** (#12) - **LOW PRIORITY**
    - Behavior: Displays on every page load (not just first visit)
    - Duration: Quick (1-2 seconds total)
    - Animation: All 6 metaballs coalesce → separate into navigation
    - Purpose: Establishes liquid language immediately
    - Skip option: Not required (quick enough)
    - Implementation: Orchestrated GSAP timeline

### Reusability Opportunities

**Components to Reference:**
- `MetaballBackground.jsx` - Core WebGL shader system, extend with new features
- `Menu.jsx` - Primary target for liquid button morphing
- `AppNew.jsx` - GSAP timeline patterns for choreography
- `metaballPositions.js` - Configuration pattern for new color specifications

**Backend Patterns:**
- Shader uniform system for real-time parameter passing
- useRef for Three.js object references and animation state
- useEffect for section-based configuration updates
- Performance monitoring patterns (FPS tracking, device detection)

**Styling Patterns:**
- Existing metaball color palette (6 desaturated pastels)
- CSS custom properties for theming
- z-index layering system (metaballs at -1, noise at -2)
- Responsive breakpoint structure

**Animation Patterns:**
- GSAP timeline API with stagger functions
- Elastic/spring easing for organic feel
- Timing constants for consistency (800ms transitions, 100ms stagger)

### Scope Boundaries

**In Scope:**

**Phase 1 (Foundation):**
- Fix cursor pulsing bug in existing metaball code
- Upgrade metaballs to 60 FPS with adaptive quality
- Implement cinematic section transitions (metaballs lead)
- Add section-specific color choreography
- Mobile optimization with reduced metaball count
- Basic sound design using Web Audio API

**Phase 2 (Liquid Interface):**
- Liquid morphing navigation buttons (PRIMARY PRIORITY)
- Button-metaball distortion for primary nav only
- Text morphing reveals for main headings (h1)
- Simpler animations for subheadings and body text
- Liquid number counting for statistics
- Brief loading sequence (LOW PRIORITY)

**Out of Scope:**

**Removed Features:**
- SVG morphing illustrations in about section (#10) - removed per user prioritization
- Button idle breathing/pulsing animations - explicitly excluded by user
- Metaball distortion for ALL buttons - limited to primary nav only
- Complex text morphing for all text elements - limited to h1 only

**Future Enhancements (Roadmap Phase 3+):**
- Glassmorphism depth effects (Phase 3)
- Multi-layer parallax (Phase 3)
- Project showcase immersive expansions (Phase 5)
- Advanced accessibility features (Phase 8)
- Performance monitoring dashboard (Phase 7)

**Explicitly Not Included:**
- Backend integration or CMS
- User accounts or authentication
- Form submission handling (beyond existing mailto)
- Third-party analytics (not in this spec)
- A/B testing infrastructure
- Multi-language support

### Technical Considerations

**Integration Points:**
- MetaballBackground.jsx shader system - add color choreography uniforms
- AppNew.jsx GSAP timelines - extend with sound triggers and metaball lead timing
- Menu.jsx navigation - rebuild buttons as SVG morphing elements
- metaballPositions.js config - add color specifications per section

**Existing System Constraints:**
- Fixed 6 metaballs count in shader (cannot vary per section without shader refactor)
- Workaround: Hide unused balls on mobile by positioning offscreen
- WebGL 1.0 requirement for browser support
- No scroll-based interactions (section-based navigation only)

**Technology Preferences:**
- Flubber.js for SVG morphing (lightweight, no dependencies)
- Web Audio API for sound (synthesized, no audio files to load)
- GSAP for all timeline-based animations (consistency)
- Three.js for WebGL (already in use)
- No additional animation libraries (avoid Framer Motion to reduce bundle)

**Similar Code Patterns to Follow:**
- Shader uniform update pattern from existing cursor interaction
- GSAP stagger pattern from existing section transitions
- Config-based approach from metaballPositions.js
- Performance detection from existing mobile optimization
- useRef + useEffect pattern for Three.js lifecycle management

**Performance Targets:**
- Desktop: 60 FPS sustained during interactions
- Mobile: 30 FPS minimum, 60 FPS on capable devices
- Initial load: < 3 seconds on 3G
- Animation smoothness: No dropped frames during transitions
- Bundle size: Minimal increase (Flubber.js is lightweight)

**Browser Compatibility:**
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- WebGL 1.0 support required
- Web Audio API support required
- No IE11 support (existing constraint)
- Mobile browsers: iOS Safari 12+, Chrome Mobile

**Accessibility Considerations:**
- Sound mute toggle accessible via keyboard
- Button morphing maintains click/tap targets
- Text morphing preserves readability (no illegible states)
- Respect prefers-reduced-motion (future roadmap item)
- Keyboard focus indicators (future roadmap item)

**Device Detection Strategy:**
- Performance-based: Monitor actual FPS, adjust quality dynamically
- Screen size: Use breakpoints for metaball count
- Touch capability: Enable touch events on touch devices
- GPU capability: Detect via rendering performance, not user agent

## Implementation Priority Order

Based on user emphasis "do the button on priority":

### Priority 1: Liquid Morphing Navigation Buttons (#7)
- User's top priority
- Most visible wow factor
- Foundation for button-metaball interaction
- Estimated effort: 2 weeks (Large)

### Priority 2: Fix Cursor Bug + 60 FPS Upgrade (#1, #2)
- Foundation improvements
- Bug fix is quick win
- 60 FPS enhances all other features
- Estimated effort: 1 week (Medium)

### Priority 3: Color Choreography (#4)
- Enhances metaball visual impact
- Relatively straightforward config change
- Complements other metaball improvements
- Estimated effort: 1 week (Medium)

### Priority 4: Button-Metaball Distortion (#8)
- Depends on liquid buttons (#7)
- Creates unified interaction aesthetic
- Dramatic wow factor
- Estimated effort: 1 week (Medium)

### Priority 5: Text Morphing (#9)
- High visual impact for headings
- Completes "everything morphs" vision
- Estimated effort: 2 weeks (Large)

### Priority 6: Mobile Optimization (#5)
- Ensures features work across devices
- Reduced metaball count improves performance
- Estimated effort: 2 weeks (Large)

### Priority 7: Sound Design (#6)
- Polish layer on top of visual effects
- Web Audio API learning curve
- Estimated effort: 1 week (Medium)

### Priority 8: Cinematic Transitions (#3)
- Refinement of existing transitions
- Enhances section navigation
- Estimated effort: 2-3 days (Small)

### Priority 9: Number Counting (#11)
- Nice-to-have polish
- Dependent on statistics content
- Estimated effort: 2-3 days (Small)

### Priority 10: Loading Sequence (#12)
- Lowest priority per user
- Quick duration makes it less critical
- Estimated effort: 1 week (Medium)

## Technical Specifications

### Flubber.js Integration
- **Installation**: `pnpm add flubber`
- **Usage Pattern**:
  ```javascript
  import { interpolate } from 'flubber';
  const interpolator = interpolate(pillPath, blobPath, { maxSegmentLength: 2 });
  ```
- **Performance**: Client-side interpolation, minimal overhead
- **SVG Path Definition**: Define base pill and target blob paths
- **Animation**: Use requestAnimationFrame or GSAP for interpolation steps

### Web Audio API Sound Synthesis
- **Approach**: Synthesized oscillators, no audio file loading
- **Context**: Single AudioContext for app lifetime
- **Sound Types**:
  - Whoosh: Filtered noise burst with envelope
  - Pulse: Sine wave tone with frequency modulation
- **Volume Control**: Master gain node at 0.3-0.5 (30-50%)
- **Mute Toggle**: Store preference in localStorage
- **Example Pattern**:
  ```javascript
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  // Configure and play
  ```

### Mobile Breakpoints
- **Implementation**: CSS media queries + JavaScript matchMedia
- **Breakpoint Values**:
  - Mobile: `max-width: 767px` → 4 metaballs, 30fps
  - Tablet: `min-width: 768px and max-width: 1023px` → 6 metaballs, 60fps
  - Desktop: `min-width: 1024px` → 6 metaballs, 60fps
- **Metaball Reduction Strategy**:
  - Hide balls 5 and 6 by positioning offscreen (x: 100, y: 100)
  - No shader refactor needed (still renders 6, but 2 are invisible)
  - Alternative: Set radius to 0 for hidden balls

### Color Values by Section
Based on existing palette (sophisticated desaturated pastels):

**Existing Palette:**
- `0xDCF2FF` - Very light blue
- `0xFFE5EE` - Very light coral/pink
- `0xF0E6FF` - Very light purple/lavender
- `0xE0FFED` - Very light mint green
- `0xE0F3FF` - Very light sky blue
- `0xFFEBF4` - Very light rose

**Section Color Assignments:**

**Home (Cool Blues):**
- Ball 1: `0xDCF2FF` (very light blue)
- Ball 2: `0xE0F3FF` (light sky blue)
- Ball 3: `0xDCF2FF` (very light blue - repeat)
- Ball 4: `0xE0F3FF` (light sky blue - repeat)
- Ball 5: `0xF0E6FF` (light purple - accent)
- Ball 6: `0xDCF2FF` (very light blue)

**Work (Warm Coral/Pink):**
- Ball 1: `0xFFE5EE` (light coral/pink)
- Ball 2: `0xFFEBF4` (light rose)
- Ball 3: `0xFFE5EE` (light coral/pink - repeat)
- Ball 4: `0xFFEBF4` (light rose - repeat)
- Ball 5: `0xF0E6FF` (light purple - warm accent)
- Ball 6: `0xFFE5EE` (light coral/pink)

**About (All 6 Colors Mixed):**
- Ball 1: `0xDCF2FF` (very light blue)
- Ball 2: `0xFFE5EE` (very light coral/pink)
- Ball 3: `0xF0E6FF` (very light purple/lavender)
- Ball 4: `0xE0FFED` (very light mint green)
- Ball 5: `0xE0F3FF` (very light sky blue)
- Ball 6: `0xFFEBF4` (very light rose)

**Contact (Calming Mint Green):**
- Ball 1: `0xE0FFED` (very light mint green)
- Ball 2: `0xE0FFED` (very light mint green - repeat)
- Ball 3: `0xDCF2FF` (very light blue - cool accent)
- Ball 4: `0xE0FFED` (very light mint green)
- Ball 5: `0xE0F3FF` (light sky blue - cool accent)
- Ball 6: `0xE0FFED` (very light mint green)

### Performance Targets

**Frame Rate Goals:**
- Desktop (high-end): 60 FPS sustained
- Desktop (mid-range): 60 FPS with adaptive pixel ratio
- Desktop (low-end): 30 FPS fallback
- Mobile (flagship): 60 FPS
- Mobile (mid-range): 30-45 FPS
- Mobile (budget): 30 FPS

**Adaptive Quality Implementation:**
```javascript
// Measure actual FPS
let frameCount = 0;
let lastTime = performance.now();

function measureFPS() {
  frameCount++;
  const currentTime = performance.now();
  if (currentTime >= lastTime + 1000) {
    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    frameCount = 0;
    lastTime = currentTime;

    // Adjust quality based on FPS
    if (fps < 50) {
      // Reduce pixel ratio or switch to 30 FPS
    }
  }
}
```

**Load Time Targets:**
- Initial page load: < 3 seconds on 3G
- Section transition: < 1 second total
- Button morph animation: 400-600ms
- Text reveal: 1-1.5 seconds
- Loading sequence: 1-2 seconds

**Bundle Size Considerations:**
- Flubber.js: ~8KB gzipped (minimal impact)
- Web Audio API: Native, no bundle increase
- Total increase target: < 30KB gzipped

### Animation Timing Constants

**Consistency Values (for src/constants/ or inline):**
```javascript
export const TIMING = {
  // Transitions
  SECTION_TRANSITION: 800,      // ms - main section change
  METABALL_LEAD: 200,           // ms - metaballs start before content
  STAGGER_DELAY: 100,           // ms - between staggered elements

  // Button morphing
  BUTTON_MORPH: 500,            // ms - pill to blob transformation
  BUTTON_COMPRESS: 150,         // ms - click compress
  BUTTON_EXPLODE: 300,          // ms - click explode

  // Text morphing
  TEXT_REVEAL_TOTAL: 1200,      // ms - entire heading reveal
  TEXT_CHAR_STAGGER: 50,        // ms - per character

  // Other
  NUMBER_COUNT: 2000,           // ms - number counting duration
  LOADING_SEQUENCE: 1500,       // ms - total loading time

  // Easing
  SPRING_TENSION: 180,
  ELASTIC_EASE: "elastic.out(1, 0.3)",
};
```

### Shader Modifications Required

**New Uniforms for Color Choreography:**
```glsl
uniform vec3 uSphereColors[6];  // Already exists
// Add per-section color presets
uniform int uColorMode;  // 0 = home, 1 = work, 2 = about, 3 = contact
```

**New Uniforms for Button Distortion:**
```glsl
uniform vec3 uButtonPosition;   // World position of hovered button
uniform float uButtonInfluence; // Strength of distortion (0.0 - 1.0)
uniform float uButtonRadius;    // Influence radius
```

**Distortion Implementation:**
```glsl
// In ray marching loop
float buttonDist = distance(rayPos.xy, uButtonPosition.xy);
if (buttonDist < uButtonRadius && uButtonInfluence > 0.0) {
  // Warp ray position toward button
  vec2 warpDir = normalize(uButtonPosition.xy - rayPos.xy);
  float warpStrength = (1.0 - buttonDist / uButtonRadius) * uButtonInfluence;
  rayPos.xy += warpDir * warpStrength * 0.5;
}
```

### File Structure Changes

**New Files to Create:**
- `src/components/LiquidButton.jsx` - Morphing button component
- `src/components/MorphingText.jsx` - Text reveal component
- `src/utils/audioManager.js` - Web Audio API wrapper
- `src/utils/performanceMonitor.js` - FPS tracking and adaptive quality
- `src/constants/timing.js` - Animation timing constants
- `src/hooks/useFlubber.js` - Custom hook for Flubber integration
- `src/hooks/useAudio.js` - Custom hook for sound effects

**Files to Modify:**
- `src/components/MetaballBackground.jsx` - Bug fix, 60 FPS, colors, button distortion
- `src/components/Menu.jsx` - Replace buttons with LiquidButton components
- `src/AppNew.jsx` - Add sound triggers, cinematic timing
- `src/config/metaballPositions.js` - Add color configurations
- `src/styles/menu.css` - Update for SVG button styling

**Configuration Files:**
- `package.json` - Add Flubber.js dependency
- `vite.config.js` - No changes required
- `tailwind.config.cjs` - Potentially add timing constants

### Development Phases

**Phase 1a: Foundation Fixes (Week 1)**
- Fix cursor pulsing bug (#1)
- Implement 60 FPS upgrade (#2)
- Add performance monitoring
- Add color choreography (#4)

**Phase 1b: Mobile & Sound (Week 2-3)**
- Mobile optimization (#5)
- Sound design implementation (#6)
- Cinematic transitions (#3)

**Phase 2a: Liquid Buttons (Week 4-5)**
- Implement LiquidButton component (#7)
- Integrate Flubber.js
- Apply to Menu navigation
- Test and refine morphing

**Phase 2b: Advanced Interactions (Week 6-7)**
- Button-metaball distortion (#8)
- Text morphing for headings (#9)
- Number counting (#11)

**Phase 2c: Polish (Week 8)**
- Loading sequence (#12)
- Cross-browser testing
- Performance optimization
- Documentation updates

## Notes and Clarifications

**User Emphasis:**
- "Do the button on priority" - Clear directive to prioritize liquid morphing buttons
- "Very appealing and consistent and wow effect" - Aim for dramatic but cohesive design
- "Venom liquid blob" - Organic, flowing aesthetic reference
- No idle breathing - Only animate on interaction

**Design Philosophy Alignment:**
- Matches product mission: Advanced technical demonstration
- Aligns with roadmap: Liquid morphing as singular aesthetic
- Respects existing architecture: GSAP-based, no scroll effects
- Maintains performance-first approach: Adaptive quality, mobile optimization

**Risk Considerations:**
- Flubber.js learning curve - Mitigate with prototyping
- Web Audio API browser support - Fallback to no sound gracefully
- Performance on low-end mobile - Adaptive quality critical
- Shader complexity increase - Test thoroughly across devices

**Success Criteria:**
- Buttons morph smoothly at 60 FPS on desktop
- All metaball improvements maintain or improve performance
- Sound enhances experience without annoying users
- Mobile experience feels polished at 30+ FPS
- Text reveals feel dramatic but don't slow page interaction
- Loading sequence completes in 1-2 seconds
- Users describe experience as "liquid" and "flowing"

**Testing Priorities:**
1. Button morphing smoothness across browsers
2. Performance on various mobile devices
3. Sound synchronization with visual effects
4. Color transitions between sections
5. Accessibility with keyboard navigation
6. Reduced motion preferences (future)

**Documentation Updates Required:**
- Update CLAUDE.md with new liquid button system
- Document Flubber.js integration patterns
- Add sound design documentation
- Update roadmap progress tracking
- Document new timing constants
- Add performance benchmarks

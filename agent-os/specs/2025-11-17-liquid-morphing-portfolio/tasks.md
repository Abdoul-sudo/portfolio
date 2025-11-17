# Task Breakdown: Liquid Morphing Portfolio Enhancement

## Overview
Total Tasks: 10 Task Groups (78 Sub-tasks)
Execution Time: 6-8 weeks
Primary Focus: Liquid morphing buttons (Priority #1 per user request)

## Task List

### Task Group 1: Priority #1 - Liquid Morphing Navigation Buttons
**Dependencies:** None (Top Priority - "Do the button on priority")
**Estimated Effort:** 2 weeks (Large)

- [ ] 1.0 Complete liquid morphing navigation buttons
  - [ ] 1.1 Write 2-8 focused tests for LiquidButton functionality
    - Test basic render with text prop
    - Test hover state triggers morph animation
    - Test click handler execution
    - Test SVG path interpolation completion
    - Skip exhaustive edge case testing
  - [ ] 1.2 Install and configure Flubber.js
    - Run: `pnpm add flubber`
    - Verify installation in package.json
    - No additional config needed (lightweight library)
  - [ ] 1.3 Create SVG path constants
    - Create file: `src/constants/svgPaths.js`
    - Define PILL_PATH: rounded rectangle SVG path (viewBox "0 0 200 60", rx/ry 30)
    - Define BLOB_PATH: organic venom blob path with 4-6 irregular control points
    - Maintain similar bounding box dimensions for consistent button size
    - Export both paths as constants
  - [ ] 1.4 Create useFlubber custom hook
    - Create file: `src/hooks/useFlubber.js`
    - Accept fromPath, toPath, and options parameters
    - Use Flubber's `interpolate()` with `maxSegmentLength: 2` for smoothness
    - Return interpolator function and animation state
    - Handle cleanup on unmount
  - [ ] 1.5 Create LiquidButton component
    - Create file: `src/components/LiquidButton.jsx`
    - Props: text, onClick, className, isMobile
    - Render inline SVG with viewBox "0 0 200 60"
    - Use useFlubber hook for path interpolation
    - Implement states:
      - Rest: pill path (PILL_PATH)
      - Hover: morph to blob (BLOB_PATH) over 500ms with elastic.out(1, 0.3) easing
      - Click: compress (scale 0.95) for 150ms, then explode (scale 1.05) for 300ms
    - NO idle breathing or pulsing animations
    - Maintain consistent click target size throughout animation (accessibility)
    - Reduce morph duration to 350ms on mobile for snappier feel
  - [ ] 1.6 Update Menu component with LiquidButton
    - File: `src/components/Menu.jsx`
    - Replace existing button elements with `<LiquidButton>` components
    - Pass section navigation handlers to onClick prop
    - Pass menu item text (Home, Work, About, Contact) to text prop
    - Remove CSS button background styles (SVG handles background now)
    - Test navigation functionality still works
  - [ ] 1.7 Update Logo component with LiquidButton wrapper
    - File: `src/components/Logo.jsx`
    - Wrap logo image with `<LiquidButton>` for consistent interaction
    - Handle home navigation on click
    - May need custom styling for logo-specific button shape
  - [ ] 1.8 Update menu styles for SVG buttons
    - File: `src/styles/menu.css`
    - Remove button background styles (now handled by SVG)
    - Add SVG positioning and sizing styles
    - Ensure text is properly centered within SVG viewBox
    - Add responsive sizing for mobile/tablet/desktop
  - [ ] 1.9 Ensure LiquidButton tests pass
    - Run ONLY the 2-8 tests written in 1.1
    - Verify morph animation completes smoothly
    - Verify click handlers fire correctly
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 1.1 pass
- Navigation buttons morph from pill to organic blob on hover (500ms desktop, 350ms mobile)
- Click animation (compress → explode) plays before navigation
- No idle animations when at rest
- Consistent click target throughout animation
- Menu and Logo navigation still functional

---

### Task Group 2: Priority #2 - Foundation Fixes (Performance & Bug Fix)
**Dependencies:** None (Foundation improvements)
**Estimated Effort:** 1 week (Medium)

- [ ] 2.0 Complete performance foundation fixes
  - [ ] 2.1 Write 2-8 focused tests for performance monitoring
    - Test FPS measurement accuracy
    - Test quality tier detection (high/mid/low)
    - Test adaptive pixel ratio adjustment
    - Skip comprehensive performance profiling tests
  - [ ] 2.2 Fix cursor pulsing bug in MetaballBackground
    - File: `src/components/MetaballBackground.jsx`
    - Location: Line 419-420
    - Current issue: `proximity` variable calculated but not used, hardcoded scale to 1.1
    - Fix: Replace line 420 with `targetSphereScales.current[i] = 1.0 + (1.0 - proximity) * 0.4`
    - Result: Dynamic scaling from 1.0 (far) to 1.4 (near cursor) based on actual proximity
    - Verify proximity calculation: `dist / pulseRadius` where pulseRadius is 1.5 units
  - [ ] 2.3 Create performance monitoring utility
    - Create file: `src/utils/performanceMonitor.js`
    - Track FPS over 1-second intervals using performance.now()
    - Measure frameCount and calculate actual FPS
    - Provide quality recommendations based on sustained FPS:
      - High-end (sustained 60 FPS): Full quality, pixel ratio 1.5
      - Mid-range (50-59 FPS): Reduce pixel ratio to 1.25
      - Low-end (< 50 FPS): Fall back to 30 FPS, pixel ratio 1.0
    - Detect consecutive low FPS (3+ seconds) to trigger quality reduction
    - Export as singleton class or module
  - [ ] 2.4 Upgrade MetaballBackground to 60 FPS
    - File: `src/components/MetaballBackground.jsx`
    - Location: Line 492 (current targetFPS = 30)
    - Implement device-based FPS targets:
      - Desktop (> 1024px width): Start at 60 FPS
      - Tablet (768-1024px): Start at 60 FPS with reduced pixel ratio (1.25 max)
      - Mobile (< 768px): Start at 30 FPS to preserve battery
    - Integrate performanceMonitor.js for adaptive quality
    - Dynamically update targetFPS based on measured performance
    - Store quality tier in ref to prevent constant recalculation
  - [ ] 2.5 Implement adaptive quality system
    - Use performanceMonitor to track actual FPS in animation loop
    - If FPS drops below 50 for 3+ consecutive seconds:
      - Reduce pixel ratio OR
      - Fall back to 30 FPS
    - Update renderer pixel ratio dynamically: `renderer.setPixelRatio(newRatio)`
    - Add quality tier state: 'high', 'mid', 'low'
    - Prevent thrashing with cooldown period (5 seconds between adjustments)
  - [ ] 2.6 Ensure performance tests pass
    - Run ONLY the 2-8 tests written in 2.1
    - Verify cursor pulsing bug is fixed
    - Verify FPS reaches 60 on capable devices
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 2.1 pass
- Cursor pulsing bug fixed (metaballs scale dynamically 1.0-1.4)
- Desktop achieves 60 FPS on high-end devices
- Adaptive quality prevents performance degradation
- Mobile maintains 30 FPS minimum

---

### Task Group 3: Priority #3 - Enhanced Color Choreography
**Dependencies:** Task Group 2 (uses same metaball config system)
**Estimated Effort:** 1 week (Medium)

- [ ] 3.0 Complete section-specific color choreography
  - [ ] 3.1 Write 2-8 focused tests for color system
    - Test color configuration loading per section
    - Test color interpolation during transitions
    - Test color assignment to metaballs
    - Skip exhaustive color validation tests
  - [ ] 3.2 Extend metaballPositions.js with color configurations
    - File: `src/config/metaballPositions.js`
    - Add `colors` array to each section config (home, work, about, contact)
    - Each array contains 6 color hex values mapped to metaballs [0] through [5]
    - Use existing sophisticated desaturated palette from MetaballBackground.jsx (line 43-50):
      - 0xDCF2FF (very light blue)
      - 0xFFE5EE (very light coral/pink)
      - 0xF0E6FF (very light purple/lavender)
      - 0xE0FFED (very light mint green)
      - 0xE0F3FF (very light sky blue)
      - 0xFFEBF4 (very light rose)
  - [ ] 3.3 Define Home section colors (Cool Blues)
    - Ball [0]: 0xDCF2FF, Ball [1]: 0xE0F3FF, Ball [2]: 0xDCF2FF
    - Ball [3]: 0xE0F3FF, Ball [4]: 0xF0E6FF, Ball [5]: 0xDCF2FF
    - Add to home config for all device types (mobile, tablet, desktop, 2k, 4k)
  - [ ] 3.4 Define Work section colors (Warm Coral/Pink)
    - Ball [0]: 0xFFE5EE, Ball [1]: 0xFFEBF4, Ball [2]: 0xFFE5EE
    - Ball [3]: 0xFFEBF4, Ball [4]: 0xF0E6FF, Ball [5]: 0xFFE5EE
    - Add to work config for all device types
  - [ ] 3.5 Define About section colors (All 6 Colors Mixed)
    - Ball [0]: 0xDCF2FF, Ball [1]: 0xFFE5EE, Ball [2]: 0xF0E6FF
    - Ball [3]: 0xE0FFED, Ball [4]: 0xE0F3FF, Ball [5]: 0xFFEBF4
    - Add to about config for all device types
  - [ ] 3.6 Define Contact section colors (Calming Mint)
    - Ball [0]: 0xE0FFED, Ball [1]: 0xE0FFED, Ball [2]: 0xDCF2FF
    - Ball [3]: 0xE0FFED, Ball [4]: 0xE0F3FF, Ball [5]: 0xE0FFED
    - Add to contact config for all device types
  - [ ] 3.7 Update MetaballBackground color interpolation
    - File: `src/components/MetaballBackground.jsx`
    - Add currentColors and targetColors refs (similar to positions, line 519-529)
    - Update useEffect for section changes (line 590-600) to also update color targets
    - Shader already supports uSphereColors uniform (line 103, 140)
    - Interpolate colors in animation loop using THREE.Color.lerp()
    - Use same smoothness factor (0.15) as position interpolation for consistency
    - Update uSphereColors uniform on each frame with interpolated values
  - [ ] 3.8 Ensure color choreography tests pass
    - Run ONLY the 2-8 tests written in 3.1
    - Verify colors transition smoothly between sections
    - Verify each section displays correct color palette
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 3.1 pass
- Home section displays cool blue metaballs
- Work section displays warm coral/pink metaballs
- About section displays all 6 colors mixed
- Contact section displays calming mint metaballs
- Color transitions smooth (0.15 interpolation factor)

---

### Task Group 4: Priority #4 - Button-Metaball Distortion
**Dependencies:** Task Group 1 (requires LiquidButton component)
**Estimated Effort:** 1 week (Medium)

- [ ] 4.0 Complete button-metaball interaction distortion
  - [ ] 4.1 Write 2-8 focused tests for distortion system
    - Test context provider/consumer setup
    - Test button hover position updates
    - Test metaball distortion shader uniforms
    - Skip comprehensive distortion strength tests
  - [ ] 4.2 Create MetaballInteractionContext
    - Create file: `src/context/MetaballInteractionContext.jsx`
    - Export MetaballInteractionProvider component
    - Provide setButtonHover(position | null) function
    - Store current button hover position in state
    - Export useMetaballInteraction hook for consuming context
  - [ ] 4.3 Add button distortion shader uniforms
    - File: `src/components/MetaballBackground.jsx`
    - Add new uniforms after line 151 in fragment shader:
      - `uniform vec3 uButtonPosition;` (world position of hovered button)
      - `uniform float uButtonInfluence;` (strength 0-1, animates to/from 1.0)
      - `uniform float uButtonRadius;` (influence radius, default 3.5 units)
    - Initialize uniforms in JavaScript (line 103-116 area):
      - uButtonPosition: new THREE.Vector3(0, 0, 0)
      - uButtonInfluence: 0.0
      - uButtonRadius: 3.5
  - [ ] 4.4 Implement shader distortion logic
    - File: `src/components/MetaballBackground.jsx`
    - Add distortion code in fragment shader before sceneSDF call (around line 256)
    - Calculate distance from ray position to button: `buttonDist = length(p.xy - uButtonPosition.xy)`
    - If within radius: warp ray toward button
    - Warp direction: `normalize(uButtonPosition.xy - p.xy)`
    - Warp strength: `(1.0 - buttonDist / uButtonRadius) * uButtonInfluence * 0.5`
    - Apply: `p.xy += warpDir * warpStrength`
  - [ ] 4.5 Integrate context in MetaballBackground
    - File: `src/components/MetaballBackground.jsx`
    - Consume useMetaballInteraction context
    - On button hover position change: update uButtonPosition uniform
    - Animate uButtonInfluence from 0 → 1.0 over 100ms on hover start
    - Animate uButtonInfluence from 1.0 → 0 over 300ms on hover end (smooth return)
    - Use existing screenToWorld helper (line 376-381) for coordinate conversion
  - [ ] 4.6 Update LiquidButton to report hover position
    - File: `src/components/LiquidButton.jsx`
    - Use useMetaballInteraction hook
    - On mouseenter: calculate button center position, call setButtonHover(position)
    - On mouseleave: call setButtonHover(null)
    - Convert screen coordinates to world space using button bounds
  - [ ] 4.7 Wrap app in MetaballInteractionContext.Provider
    - File: `src/AppNew.jsx`
    - Import MetaballInteractionProvider
    - Wrap entire app content in provider
    - Ensure provider is outside section content to persist across transitions
  - [ ] 4.8 Ensure button distortion tests pass
    - Run ONLY the 2-8 tests written in 4.1
    - Verify button hover triggers metaball distortion
    - Verify distortion effect is dramatic but not overwhelming
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 4.1 pass
- Primary nav buttons distort nearby metaballs on hover
- Metaballs warp toward button position (radius 3.5 units)
- Distortion smoothly returns to normal on hover end (300ms)
- Only primary navigation buttons trigger distortion (not project cards)

---

### Task Group 5: Priority #5 - Morphing Text Reveals
**Dependencies:** Task Group 1 (uses Flubber.js)
**Estimated Effort:** 2 weeks (Large)

- [ ] 5.0 Complete morphing text reveal system
  - [ ] 5.1 Write 2-8 focused tests for text morphing
    - Test character splitting for H1 headings
    - Test blob-to-letter path interpolation
    - Test stagger timing based on metaball proximity
    - Skip comprehensive font path tests
  - [ ] 5.2 Create text-to-SVG conversion utility
    - Create file: `src/utils/textToSVG.js`
    - Use Canvas API measureText to get character metrics
    - Convert text characters to SVG path data
    - Options: Use Canvas-rendered shapes or extract from web fonts
    - Export function: `textToSVGPaths(text, fontFamily, fontSize)`
    - Return array of SVG path strings for each character
  - [ ] 5.3 Create blob path generator utility
    - Create file: `src/utils/blobGenerator.js`
    - Generate organic blob SVG paths for initial character state
    - Blobs should be circular with slight distortion (4-6 control points)
    - Maintain similar bounding box to character for consistent sizing
    - Export function: `generateBlobPath(width, height, seed)`
    - Use seed for consistent random variation
  - [ ] 5.4 Create MorphingText component
    - Create file: `src/components/MorphingText.jsx`
    - Props: text, className, sectionName (for metaball proximity calculation)
    - Split text into individual characters
    - For each character:
      - Generate blob path (initial state)
      - Convert character to SVG path (target state)
      - Use Flubber to interpolate blob → glyph
    - Calculate distance from each character to nearest metaball
    - Order characters by proximity (closer = animate first)
    - GSAP timeline with staggered character reveals (50-100ms per char)
    - Total duration: 1200-1500ms (matches "Hey, I'm Abdoul Wahhaab" timing)
    - Use elastic easing for organic feel
  - [ ] 5.5 Update HeroSection with MorphingText
    - File: `src/components/HeroSection.jsx`
    - Replace H1 headline with `<MorphingText>` component
    - Pass headline text and section name ('home')
    - Preserve existing className for styling
    - Test headline reveals correctly on page load
  - [ ] 5.6 Update AboutSection with MorphingText
    - File: `src/components/AboutSection.jsx`
    - Replace section title H1 with `<MorphingText>` component
    - Pass section title text and section name ('about')
    - Trigger animation when section becomes visible
  - [ ] 5.7 Update WorkSection with MorphingText
    - File: `src/components/WorkSection.jsx`
    - Replace section title H1 with `<MorphingText>` component
    - Pass section title text and section name ('work')
    - Trigger animation when section becomes visible
  - [ ] 5.8 Update ContactSection with MorphingText
    - File: `src/components/ContactSection.jsx`
    - Replace section title H1 with `<MorphingText>` component
    - Pass section title text and section name ('contact')
    - Trigger animation when section becomes visible
  - [ ] 5.9 Implement H2 and body text fallback animations
    - H2 subheadings: Simple GSAP animation
    - Blur filter transition: `filter: blur(10px) → blur(0px)`
    - Opacity: 0 → 1
    - Duration: 600ms
    - Body text: Use existing stagger fade-in from AppNew.jsx (line 85-96)
    - No morphing for H2/body to avoid overwhelming user
  - [ ] 5.10 Ensure text morphing tests pass
    - Run ONLY the 2-8 tests written in 5.1
    - Verify H1 headings morph from blobs to letters
    - Verify stagger timing creates wave effect
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 5.1 pass
- H1 headings morph from blob shapes to letters
- Characters stagger in wave pattern (50-100ms per char)
- Wave follows metaball proximity (closer chars animate first)
- Total reveal duration: 1200-1500ms
- H2 headings use simple blur fade-in
- Body text uses existing fade-in

---

### Task Group 6: Priority #6 - Mobile Optimization
**Dependencies:** Task Groups 1-5 (optimizes all features for mobile)
**Estimated Effort:** 2 weeks (Large)

- [ ] 6.0 Complete mobile optimization
  - [ ] 6.1 Write 2-8 focused tests for mobile features
    - Test metaball count reduction on mobile
    - Test touch event handling
    - Test mobile-specific button timing
    - Skip comprehensive device simulation tests
  - [ ] 6.2 Update metaball positions for mobile 4-ball layout
    - File: `src/config/metaballPositions.js`
    - Mobile breakpoint (< 768px): Update all sections
    - Position balls [0-3] in meaningful locations for portrait orientation
    - Hide balls [4-5] by positioning offscreen (x: 100, y: 100)
    - No shader refactor needed (still renders 6, but 2 invisible)
    - Ensure vertical spacing appropriate for portrait screens
    - Test each section (home, work, about, contact) on mobile viewport
  - [ ] 6.3 Optimize MetaballBackground for mobile performance
    - File: `src/components/MetaballBackground.jsx`
    - Mobile (< 768px): Start at 30 FPS, pixel ratio 1.0
    - Flagship devices (detect via performance): Allow 60 FPS upgrade
    - Disable cursor ball shader effect on mobile (already implemented line 228-231)
    - Verify touch events already supported (line 445-457, 552-553)
    - Maintain sphere pulsing on touch (proximity logic line 417-423)
  - [ ] 6.4 Optimize LiquidButton for mobile
    - File: `src/components/LiquidButton.jsx`
    - Reduce morph duration from 500ms to 350ms on mobile (snappier feel)
    - Enlarge touch targets to minimum 44x44px (accessibility)
    - Test touch events trigger hover and click correctly
    - Consider disabling button-metaball distortion if performance impact severe
    - Add touch event handlers (touchstart, touchend) alongside mouse events
  - [ ] 6.5 Optimize MorphingText for mobile
    - File: `src/components/MorphingText.jsx`
    - Test text morphing performance on mobile devices
    - If FPS drops below 30: Simplify to fade-only animation
    - Reduce character stagger delay to 30-50ms (from 50-100ms) for faster reveal
    - Consider using simpler blob shapes on mobile (fewer control points)
  - [ ] 6.6 Test responsive breakpoints across features
    - Verify breakpoints:
      - Mobile: < 768px (4 metaballs, 30fps, 350ms buttons)
      - Tablet: 768-1024px (6 metaballs, 60fps, 500ms buttons)
      - Desktop: > 1024px (6 metaballs, 60fps, 500ms buttons)
    - Test all liquid features at each breakpoint
    - Verify touch interactions work on tablet/mobile
    - Verify logo and menu button sizing responsive
  - [ ] 6.7 Ensure mobile optimization tests pass
    - Run ONLY the 2-8 tests written in 6.1
    - Verify mobile shows 4 metaballs, desktop shows 6
    - Verify touch targets meet 44x44px minimum
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 6.1 pass
- Mobile devices (< 768px) show 4 metaballs at 30 FPS minimum
- Tablet devices (768-1024px) show 6 metaballs at 60 FPS
- Desktop devices (> 1024px) show 6 metaballs at 60 FPS
- Button morph duration 350ms on mobile, 500ms on desktop
- Touch targets minimum 44x44px
- Flagship mobile devices can achieve 60 FPS

---

### Task Group 7: Priority #7 - Sound Design Implementation
**Dependencies:** Task Groups 1-3 (sounds sync with visual effects)
**Estimated Effort:** 1 week (Medium)

- [ ] 7.0 Complete sound design system
  - [ ] 7.1 Write 2-8 focused tests for audio system
    - Test AudioContext initialization
    - Test sound playback triggers
    - Test mute toggle functionality
    - Skip comprehensive sound synthesis tests
  - [ ] 7.2 Create audio manager singleton
    - Create file: `src/utils/audioManager.js`
    - Implement singleton class using Web Audio API
    - Initialize AudioContext on first user interaction (autoplay policy compliance)
    - Create master gain node at 0.35 (35% volume, middle of 30-50% target)
    - Methods:
      - `playWhoosh()` - Section transition sound
      - `playPulse()` - Cursor-metaball interaction sound
      - `playPop()` - Button click sound
      - `setMuted(bool)` - Toggle mute
      - `getMuted()` - Get current mute state
    - Store mute preference in localStorage
  - [ ] 7.3 Implement whoosh sound synthesis
    - Type: Filtered white noise burst
    - Trigger: Section transitions in AppNew.jsx GSAP timeline
    - Duration: 600ms
    - Volume envelope: Fade in/out
    - Filter: Bandpass 200-2000Hz sweeping to 800-4000Hz
    - Architecture: White noise source → bandpass filter → gain envelope → destination
  - [ ] 7.4 Implement pulse sound synthesis
    - Type: Sine wave tone with frequency modulation
    - Trigger: When metaball scales (sphere proximity event)
    - Frequency: 220Hz → 330Hz quick glide (100ms)
    - Volume: Quiet (0.15 relative to master gain)
    - Only on desktop where cursor interactions meaningful
    - Throttle: Max 1 pulse per 200ms to prevent spam
    - Architecture: Oscillator (sine) → gain with attack/release → destination
  - [ ] 7.5 Implement pop sound synthesis
    - Type: Short percussive click
    - Trigger: LiquidButton onClick before navigation
    - Duration: 50ms
    - Sharp attack/decay envelope
    - Synthesized with triangle wave burst at 150Hz
    - Architecture: Oscillator (triangle) → gain with sharp envelope → destination
  - [ ] 7.6 Create useAudio React hook
    - Create file: `src/hooks/useAudio.js`
    - Wrapper around audioManager singleton
    - Returns: { playWhoosh, playPulse, playPop, setMuted, isMuted }
    - Initializes AudioContext on mount if not already initialized
    - Provides easy component access to audio functions
  - [ ] 7.7 Create SoundToggle component
    - Create file: `src/components/SoundToggle.jsx`
    - Mute/unmute button component
    - Position: Bottom right corner of Menu overlay
    - Icons: Speaker with slash when muted, speaker waves when active
    - Use useAudio hook to toggle mute state
    - Persist preference to localStorage
  - [ ] 7.8 Integrate sound triggers in AppNew
    - File: `src/AppNew.jsx`
    - Import useAudio hook
    - Add playWhoosh() call in section transition GSAP timeline
    - Trigger at start of metaball movement (0ms in timeline)
    - Ensure sound initialized on first user interaction
  - [ ] 7.9 Integrate sound triggers in LiquidButton
    - File: `src/components/LiquidButton.jsx`
    - Import useAudio hook
    - Call playPop() on onClick before navigation handler
    - Only play if not muted
  - [ ] 7.10 Integrate sound triggers in MetaballBackground
    - File: `src/components/MetaballBackground.jsx`
    - Import useAudio hook
    - Call playPulse() when sphere scales (proximity event)
    - Throttle to max 1 per 200ms
    - Only on desktop (skip on mobile)
    - Only play if not muted
  - [ ] 7.11 Add SoundToggle to Menu overlay
    - File: `src/components/Menu.jsx`
    - Import and render SoundToggle component
    - Position in bottom right corner
    - Ensure accessible via keyboard
  - [ ] 7.12 Ensure sound design tests pass
    - Run ONLY the 2-8 tests written in 7.1
    - Verify sounds trigger on appropriate interactions
    - Verify mute toggle persists preference
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 7.1 pass
- Whoosh sound plays on section transitions
- Pulse sound plays on metaball-cursor interactions (desktop only)
- Pop sound plays on button clicks
- Sound ON by default at 35% volume
- Mute toggle works and persists to localStorage
- All sounds synthesized (no audio files loaded)

---

### Task Group 8: Priority #8 - Cinematic Section Transitions
**Dependencies:** Task Group 3 (metaball positions), Task Group 7 (sound sync)
**Estimated Effort:** 2-3 days (Small)

- [ ] 8.0 Complete cinematic section transitions
  - [ ] 8.1 Write 2-8 focused tests for transition choreography
    - Test metaball lead timing (200ms)
    - Test content fade timing
    - Test targetSection state updates
    - Skip exhaustive timeline tests
  - [ ] 8.2 Add targetSection state to AppNew
    - File: `src/AppNew.jsx`
    - Add new state: `targetSection` (separate from `currentSection`)
    - targetSection changes 200ms before currentSection
    - Used to trigger early metaball movement
  - [ ] 8.3 Update GSAP timeline with 200ms metaball lead
    - File: `src/AppNew.jsx`
    - Current timeline (line 46-96): Content out at 0ms, switch, content in
    - New timeline:
      - 0ms: Set targetSection, metaballs begin moving
      - 200ms: Content fade out begins (0.4s duration)
      - 600ms: Switch currentSection, content fully faded
      - 600ms: Content fade in begins (0.5s duration with stagger)
      - 1200ms: Transition complete
    - Add 200ms delay before first content animation
    - Use GSAP timeline delay or separate timeline for metaballs
  - [ ] 8.4 Update MetaballBackground to accept targetSection prop
    - File: `src/components/MetaballBackground.jsx`
    - Add new prop: targetSection
    - Use targetSection instead of currentSection for position updates
    - Metaballs respond to targetSection change immediately
    - Interpolation already in place (line 519-529, smoothness 0.15)
    - Content still uses currentSection for section visibility
  - [ ] 8.5 Pass targetSection to MetaballBackground
    - File: `src/AppNew.jsx`
    - Update MetaballBackground component prop from currentSection to targetSection
    - Ensure metaballs track targetSection for early movement
    - Content sections still track currentSection for visibility
  - [ ] 8.6 Verify transition choreography
    - Test timeline sequence: metaballs move → content fades out → content fades in
    - Verify 200ms lead creates eye-guiding effect
    - Ensure smooth coordination without jarring transitions
    - Total transition time should be ~1200ms
  - [ ] 8.7 Ensure cinematic transition tests pass
    - Run ONLY the 2-8 tests written in 8.1
    - Verify metaballs lead content by 200ms
    - Verify transition feels cinematic and guided
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 8.1 pass
- Metaballs begin moving immediately (0ms)
- Content fade out begins 200ms later
- Total transition duration ~1200ms
- Transition feels guided and cinematic
- Sound whoosh syncs with metaball movement start

---

### Task Group 9: Priority #9 - Liquid Number Counting
**Dependencies:** None (independent feature)
**Estimated Effort:** 2-3 days (Small)

- [ ] 9.0 Complete liquid number counting
  - [ ] 9.1 Write 2-8 focused tests for counting number component
    - Test number count-up animation
    - Test blur filter during transition
    - Test scale effect synchronization
    - Skip comprehensive easing tests
  - [ ] 9.2 Create CountingNumber component
    - Create file: `src/components/CountingNumber.jsx`
    - Props: from, to, duration, suffix (e.g., "+" for "5+")
    - Animate from → to using GSAP or requestAnimationFrame
    - Default duration: 2000ms (2 seconds) for noticeable effect
    - Apply CSS filters during count:
      - 0%: blur(0px) scale(1)
      - 50%: blur(4px) scale(1.1) - midpoint of count
      - 100%: blur(0px) scale(1)
    - Synchronize blur/scale with number increment
    - Easing: power2.inOut for smooth acceleration/deceleration
  - [ ] 9.3 Verify AboutSection has statistics content
    - File: `src/components/AboutSection.jsx`
    - Check if stats section exists
    - If missing: Add stats section with impressive but realistic numbers:
      - Years of experience: 3+ years
      - Projects completed: 10+ projects
      - Technologies mastered: 15+ technologies
      - Other relevant metrics
    - Use semantic HTML (section, heading, list/grid)
  - [ ] 9.4 Add CountingNumber components to AboutSection
    - File: `src/components/AboutSection.jsx`
    - Replace static numbers with CountingNumber components
    - Pass appropriate from (0), to (stat value), and suffix props
    - Trigger on section visibility (when about section enters)
    - Use intersection observer or section state to trigger animation
  - [ ] 9.5 Verify WorkSection stats (if applicable)
    - File: `src/components/WorkSection.jsx`
    - Check if work section would benefit from statistics
    - Consider: Featured projects count, total work displayed, etc.
    - Add CountingNumber components if appropriate
    - Skip if work section is better served by project cards only
  - [ ] 9.6 Ensure counting number tests pass
    - Run ONLY the 2-8 tests written in 9.1
    - Verify numbers count up from 0 to target value
    - Verify blur/scale effects create liquid feel
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 9.1 pass
- Numbers count up from 0 to target over 2000ms
- Blur filter peaks at 4px during midpoint (50%)
- Scale animates 1 → 1.1 → 1 synchronized with count
- Statistics displayed in AboutSection (and WorkSection if applicable)
- Animation triggers when section becomes visible

---

### Task Group 10: Priority #10 - Morphing Loading Sequence (LOW PRIORITY)
**Dependencies:** Task Groups 1-3 (uses liquid buttons, metaballs, GSAP)
**Estimated Effort:** 1 week (Medium)

- [ ] 10.0 Complete morphing loading sequence
  - [ ] 10.1 Write 2-8 focused tests for loading sequence
    - Test loading overlay render
    - Test metaball coalescence animation
    - Test transition to main app
    - Skip comprehensive timing tests
  - [ ] 10.2 Create LoadingSequence component
    - Create file: `src/components/LoadingSequence.jsx`
    - Full viewport overlay covering app content
    - Background: Dark color (matches metaball theme)
    - Higher z-index than app content (z-index: 1000)
    - Accept onComplete callback prop
    - Accept prefers-reduced-motion detection
  - [ ] 10.3 Implement loading animation timeline
    - GSAP timeline for orchestration
    - Total duration: 1500-2000ms
    - Sequence:
      - 0-500ms: Initial scattered metaballs (6 balls offscreen positions x: ±5, y: ±4)
      - 500-1000ms: Metaballs animate toward center (0, 0) with elastic easing
      - 1000-1500ms: Merge into single large blob, then morph to logo OR explode to menu
      - 1500-2000ms: Background fade to normal, hero content fade in
    - Skip animation if prefers-reduced-motion enabled (accessibility)
  - [ ] 10.4 Integrate loading metaballs with MetaballBackground
    - File: `src/components/MetaballBackground.jsx`
    - Accept loadingPositions prop for initial state
    - If provided: Use loading positions, ignore config positions initially
    - After loading complete: Transition to normal section positions
    - Reuse existing interpolation system (smoothness 0.15)
  - [ ] 10.5 Integrate LoadingSequence in AppNew
    - File: `src/AppNew.jsx`
    - Add loading state: `isLoading` (default true)
    - Conditionally render LoadingSequence overlay
    - Hide main app content while loading (opacity 0 or display none)
    - On loading complete: Set isLoading to false, remove overlay
    - Begin normal app with hero section
  - [ ] 10.6 Test loading sequence timing
    - Verify total duration 1.5-2 seconds
    - Verify metaballs coalesce smoothly
    - Verify transition to main app feels seamless
    - Verify skip option for prefers-reduced-motion
  - [ ] 10.7 Ensure loading sequence tests pass
    - Run ONLY the 2-8 tests written in 10.1
    - Verify loading completes in 1.5-2 seconds
    - Verify smooth transition to main app
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 10.1 pass
- Loading sequence displays on every page load (not just first visit)
- 6 metaballs coalesce toward center over 500ms
- Merged blob morphs to logo or explodes to menu positions
- Background fades to normal, hero content fades in
- Total duration: 1.5-2 seconds
- Skips if prefers-reduced-motion enabled

---

### Task Group 11: Test Review & Gap Analysis
**Dependencies:** Task Groups 1-10 (reviews all feature tests)
**Estimated Effort:** 3-5 days (Small)

- [ ] 11.0 Review existing tests and fill critical gaps only
  - [ ] 11.1 Review tests from Task Groups 1-10
    - Review tests from Group 1: LiquidButton (2-8 tests)
    - Review tests from Group 2: Performance monitoring (2-8 tests)
    - Review tests from Group 3: Color choreography (2-8 tests)
    - Review tests from Group 4: Button distortion (2-8 tests)
    - Review tests from Group 5: Text morphing (2-8 tests)
    - Review tests from Group 6: Mobile optimization (2-8 tests)
    - Review tests from Group 7: Sound design (2-8 tests)
    - Review tests from Group 8: Cinematic transitions (2-8 tests)
    - Review tests from Group 9: Number counting (2-8 tests)
    - Review tests from Group 10: Loading sequence (2-8 tests)
    - Total existing tests: approximately 20-80 tests
  - [ ] 11.2 Analyze test coverage gaps for THIS feature only
    - Identify critical user workflows lacking coverage
    - Focus on integration points between task groups:
      - LiquidButton + MetaballBackground interaction
      - Sound triggers + visual animations synchronization
      - Color transitions + section navigation
      - Mobile vs desktop feature parity
    - Focus ONLY on gaps related to liquid morphing features
    - Do NOT assess entire application test coverage
    - Prioritize end-to-end workflows over unit test gaps
  - [ ] 11.3 Write up to 10 additional strategic tests maximum
    - Integration test: Full section transition with metaballs + sound + content
    - Integration test: Button hover triggers distortion and morph simultaneously
    - Integration test: Text morphing coordinates with section transition timing
    - Integration test: Mobile device shows 4 metaballs with correct performance
    - Integration test: Color choreography transitions smoothly between all sections
    - Integration test: Sound mute persists across page reloads (localStorage)
    - Integration test: Loading sequence completes and transitions to hero
    - End-to-end test: Navigate through all sections with all liquid effects active
    - Performance test: Maintain 60 FPS during multi-feature interactions (desktop)
    - Performance test: Maintain 30 FPS minimum on mobile during interactions
    - Do NOT write comprehensive coverage for all scenarios
    - Skip edge cases, performance profiling, accessibility audits unless business-critical
  - [ ] 11.4 Run feature-specific tests only
    - Run ONLY tests related to liquid morphing features
    - Expected total: approximately 30-90 tests maximum (20-80 from groups + up to 10 new)
    - Do NOT run entire application test suite
    - Verify all critical liquid morphing workflows pass
    - Verify integration points between features work correctly
    - Generate coverage report for liquid morphing features only

**Acceptance Criteria:**
- All feature-specific tests pass (approximately 30-90 tests total)
- Critical user workflows for liquid morphing features covered
- No more than 10 additional tests added when filling gaps
- Testing focused exclusively on liquid morphing spec requirements
- Integration points verified (buttons + metaballs, sound + visuals, etc.)

---

## Execution Order

Recommended implementation sequence:

1. **Task Group 1: Liquid Morphing Buttons** (2 weeks)
   - User's top priority - "Do the button on priority"
   - Foundation for button-metaball interaction (Group 4)
   - Installs Flubber.js needed for text morphing (Group 5)

2. **Task Group 2: Foundation Fixes** (1 week)
   - Bug fix improves existing metaball quality
   - 60 FPS upgrade benefits all subsequent features
   - Performance monitoring critical for mobile (Group 6)

3. **Task Group 3: Color Choreography** (1 week)
   - Enhances metaball visual impact
   - Extends existing config system
   - Complements button and transition improvements

4. **Task Group 4: Button-Metaball Distortion** (1 week)
   - Depends on LiquidButton from Group 1
   - Creates unified liquid interaction aesthetic
   - Dramatic wow factor with button morphing

5. **Task Group 5: Text Morphing** (2 weeks)
   - Reuses Flubber.js from Group 1
   - High visual impact for headings
   - Completes "everything morphs" vision

6. **Task Group 6: Mobile Optimization** (2 weeks)
   - Ensures all features (1-5) work on mobile
   - Reduced metaball count improves performance
   - Critical for real-world usage

7. **Task Group 7: Sound Design** (1 week)
   - Polish layer on top of visual effects
   - Syncs with transitions from Groups 3, 8
   - Enhances immersion without blocking other work

8. **Task Group 8: Cinematic Transitions** (2-3 days)
   - Refinement of existing transitions
   - Uses metaballs from Group 3
   - Syncs with sound from Group 7

9. **Task Group 9: Number Counting** (2-3 days)
   - Independent nice-to-have polish
   - Quick implementation
   - Low dependency on other features

10. **Task Group 10: Loading Sequence** (1 week)
    - Lowest priority per spec
    - Uses metaballs, GSAP, and liquid buttons
    - Final polish before launch

11. **Task Group 11: Test Review & Gap Analysis** (3-5 days)
    - Reviews all tests from Groups 1-10
    - Fills critical integration gaps only
    - Maximum 10 additional tests

---

## Testing Strategy

### Test-Driven Approach
Each task group follows this pattern:
1. **x.1 Sub-task**: Write 2-8 focused tests for critical behaviors only
2. **x.2 - x.n Sub-tasks**: Implement feature components/logic
3. **Final Sub-task**: Run ONLY the 2-8 tests from x.1, verify they pass

### Test Scope Per Group
- **2-8 tests maximum** per task group during development
- Focus on critical behaviors: render, core interactions, key integrations
- Skip: Exhaustive edge cases, performance profiling, comprehensive validation
- **Do NOT run entire test suite** during each group - only the new 2-8 tests

### Final Test Review (Group 11)
- Review all ~20-80 tests written across Groups 1-10
- Identify critical workflow gaps (integration points, end-to-end flows)
- Add maximum **10 additional tests** for strategic coverage
- Run feature-specific test suite (30-90 tests total expected)
- Do NOT expand to full application testing

### Key Testing Principles
- **Test behavior, not implementation** (from standards)
- **Test only core user flows** (from standards)
- **Defer edge case testing** until business-critical (from standards)
- **Keep tests fast** for frequent execution during development

---

## Important Constraints

### Technical Constraints
- **Fixed 6 metaballs**: Shader arrays hardcoded, cannot vary count per section
  - Workaround: Hide unused balls by positioning offscreen (x: 100, y: 100)
- **WebGL 1.0**: Required for broad browser support
- **No scroll effects**: Section-based navigation only (GSAP, not scroll-triggered)
- **Flubber.js**: Requires SVG path strings, not CSS shapes

### Performance Targets
- **Desktop**: 60 FPS sustained during interactions
- **Mobile**: 30 FPS minimum, 60 FPS on flagship devices
- **Initial load**: < 3 seconds on 3G
- **Animation smoothness**: No dropped frames during transitions

### Design Constraints
- **No idle animations**: Buttons don't breathe/pulse at rest (per user requirement)
- **Interaction-driven only**: Morphing triggered by hover/click/section change
- **Consistent liquid aesthetic**: All morphing features should feel cohesive
- **Accessibility**: Maintain click targets, keyboard access, touch targets 44x44px

### Scope Boundaries
- **No SVG illustrations morphing** (Priority #10 original, removed from scope)
- **Primary nav buttons only** for metaball distortion (not all buttons)
- **H1 headings only** for full text morphing (H2 gets simple blur, body gets fade)
- **Sound ON by default** at 30-50% volume with mute toggle

---

## File Structure Reference

### New Files to Create (27 files)
**Components (6):**
- `src/components/LiquidButton.jsx`
- `src/components/MorphingText.jsx`
- `src/components/CountingNumber.jsx`
- `src/components/LoadingSequence.jsx`
- `src/components/SoundToggle.jsx`

**Context (1):**
- `src/context/MetaballInteractionContext.jsx`

**Hooks (2):**
- `src/hooks/useFlubber.js`
- `src/hooks/useAudio.js`

**Utils (4):**
- `src/utils/audioManager.js`
- `src/utils/performanceMonitor.js`
- `src/utils/textToSVG.js`
- `src/utils/blobGenerator.js`

**Constants (1):**
- `src/constants/svgPaths.js`

**Tests (13 test files, 2-8 tests each):**
- `__tests__/LiquidButton.test.jsx`
- `__tests__/performanceMonitor.test.js`
- `__tests__/colorChoreography.test.js`
- `__tests__/buttonDistortion.test.js`
- `__tests__/textMorphing.test.js`
- `__tests__/mobileOptimization.test.js`
- `__tests__/soundDesign.test.js`
- `__tests__/cinematicTransitions.test.js`
- `__tests__/countingNumber.test.js`
- `__tests__/loadingSequence.test.js`
- `__tests__/integration/fullTransition.test.js`
- `__tests__/integration/buttonMetaballSync.test.js`
- `__tests__/integration/mobileFeatureParity.test.js`

### Files to Modify (8 files)
- `src/components/MetaballBackground.jsx` - Bug fix, 60 FPS, colors, button distortion shader, sound triggers, performance monitoring
- `src/components/Menu.jsx` - Replace buttons with LiquidButton, add SoundToggle
- `src/components/Logo.jsx` - Wrap with LiquidButton
- `src/components/HeroSection.jsx` - Add MorphingText for H1
- `src/components/AboutSection.jsx` - Add MorphingText for H1, add CountingNumber stats
- `src/components/WorkSection.jsx` - Add MorphingText for H1
- `src/components/ContactSection.jsx` - Add MorphingText for H1
- `src/AppNew.jsx` - Add targetSection, cinematic timing, sound triggers, MetaballInteractionContext provider, loading state
- `src/config/metaballPositions.js` - Add color arrays, update mobile positions
- `src/styles/menu.css` - Update for SVG button styling
- `package.json` - Add Flubber.js dependency

---

## Success Metrics

### Feature Completeness
- [ ] All 10 priority features implemented
- [ ] LiquidButton morphing smooth and dramatic ("venom blob" aesthetic)
- [ ] Metaball-button distortion creates unified liquid feel
- [ ] Text morphing enhances H1 headings without overwhelming
- [ ] Sound design enhances experience (30-50% volume, mute toggle)
- [ ] Mobile optimization maintains performance (30+ FPS)

### Performance Benchmarks
- [ ] Desktop: 60 FPS sustained during multi-feature interactions
- [ ] Mobile flagship: 60 FPS achievable
- [ ] Mobile mid-range: 30 FPS minimum maintained
- [ ] Page load: < 3 seconds on 3G
- [ ] Section transition: < 1.2 seconds total
- [ ] Button morph: 500ms desktop, 350ms mobile

### Quality Indicators
- [ ] All feature-specific tests pass (30-90 tests)
- [ ] No console errors or warnings
- [ ] No performance degradation from baseline
- [ ] Smooth animations across Chrome, Firefox, Safari, Edge
- [ ] Touch interactions work on mobile/tablet
- [ ] Accessibility maintained (keyboard nav, touch targets)

### User Experience Goals
- [ ] Visitors describe experience as "liquid" and "flowing"
- [ ] Button morphing feels dramatic and memorable
- [ ] Sound enhances immersion without annoyance
- [ ] Transitions feel guided and cinematic
- [ ] Mobile experience feels polished (not degraded)
- [ ] Loading sequence sets liquid aesthetic tone immediately

---

## Notes

**User Emphasis:**
- "Do the button on priority" - Liquid morphing buttons are Priority #1
- "Venom liquid blob" - Organic, flowing aesthetic for button hover state
- "Very appealing and consistent and wow effect" - Aim for dramatic cohesive design
- No idle animations - Only animate on interaction

**Design Philosophy:**
- Interaction-driven morphing (no idle breathing/pulsing)
- Sound ON by default (30-50% volume, user can mute)
- Mobile: 4 metaballs (< 768px), 6 metaballs (tablets/desktop)
- Everything must feel cohesive and liquid

**Risk Mitigation:**
- Flubber.js learning curve: Prototype button morphing early (Group 1)
- Web Audio API support: Graceful fallback to no sound
- Mobile performance: Adaptive quality critical, reduce effects if needed
- Shader complexity: Test thoroughly across devices, incremental changes

**Development Tips:**
- Reference existing MetaballBackground shader (line 87-116) for uniform patterns
- Use existing GSAP timeline patterns from AppNew.jsx (line 46-96)
- Follow existing config-based approach from metaballPositions.js
- Leverage screenToWorld helper (line 376-381) for coordinate conversion
- Use refs for Three.js objects, useEffect for section changes

---

**Generated for Liquid Morphing Portfolio Enhancement**
*Spec: D:/PROJECTS/Web/portfolio/agent-os/specs/2025-11-17-liquid-morphing-portfolio*

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/metaball.css';
import { getMetaballConfig, getDeviceType, TRANSITION_CONFIG } from '../config/metaballPositions';

const MetaballBackground = ({ currentSection = 'home' }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationFrameRef = useRef(null);
  const clockRef = useRef(null);
  const cursorSphere3D = useRef(new THREE.Vector3(0, 0, 0));
  const targetMousePosition = useRef(new THREE.Vector2(0.5, 0.5));
  const mousePosition = useRef(new THREE.Vector2(0.5, 0.5));
  const sphereScales = useRef([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
  const targetSphereScales = useRef([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);

  // Position animation system for smooth transitions
  const currentPositions = useRef([]);
  const targetPositions = useRef([]);
  const currentRadii = useRef([]);
  const targetRadii = useRef([]);
  const previousDeviceType = useRef(null);

  // Enhanced device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isLowPowerDevice = isMobile || navigator.hardwareConcurrency <= 4;
  // Detect if NOT desktop (tablet or mobile)
  const isDesktop = window.innerWidth > 1024;

  // Optimized settings - professional aesthetic
  const settings = {
    sphereCount: 6,
    ambientIntensity: 0.65,
    diffuseIntensity: 0.25,
    glowIntensity: 0.6,
    rimPower: 3.5,
    backgroundColor: new THREE.Color(0xFAFBFC),
    // Sophisticated desaturated palette - varied colors
    sphereColors: [
      new THREE.Color(0xDCF2FF), // Very light blue
      new THREE.Color(0xFFE5EE), // Very light coral/pink
      new THREE.Color(0xF0E6FF), // Very light purple/lavender
      new THREE.Color(0xE0FFED), // Very light mint green
      new THREE.Color(0xE0F3FF), // Very light sky blue
      new THREE.Color(0xFFEBF4)  // Very light rose
    ],
    lightColor: new THREE.Color(0xffffff),
    smoothness: 0.4,
    animationSpeed: 0.25,
    translateSpeed: 0.18
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const clock = new THREE.Clock();
    clockRef.current = clock;

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Disabled for performance
      alpha: true,
      powerPreference: 'default',
      preserveDrawingBuffer: false
    });

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5); // Max 1.5 for performance
    renderer.setPixelRatio(pixelRatio);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    renderer.setSize(viewportWidth, viewportHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(viewportWidth, viewportHeight) },
        uActualResolution: {
          value: new THREE.Vector2(viewportWidth * pixelRatio, viewportHeight * pixelRatio)
        },
        uMousePosition: { value: new THREE.Vector2(0.5, 0.5) },
        uCursorSphere: { value: new THREE.Vector3(0, 0, 0) },
        uCursorRadius: { value: 0.08 },
        uSphereCount: { value: settings.sphereCount },
        uSmoothness: { value: settings.smoothness },
        uAmbientIntensity: { value: settings.ambientIntensity },
        uDiffuseIntensity: { value: settings.diffuseIntensity },
        uGlowIntensity: { value: settings.glowIntensity },
        uRimPower: { value: settings.rimPower },
        uBackgroundColor: { value: settings.backgroundColor },
        uSphereColors: { value: settings.sphereColors },
        uLightColor: { value: settings.lightColor },
        uAnimationSpeed: { value: settings.animationSpeed },
        uTranslateSpeed: { value: settings.translateSpeed },
        uCursorGlowIntensity: { value: 0.25 },
        uCursorGlowRadius: { value: 2.5 },
        uCursorGlowColor: { value: new THREE.Color(0xCCF5FF) },
        // uCursorGlowColor: { value: new THREE.Color(0xE0E7FF) },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 },
        uIsDesktop: { value: isDesktop ? 1.0 : 0.0 },
        uSphereScales: { value: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0] },
        uSpherePositions: { value: [] },
        uSphereRadii: { value: [] }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uActualResolution;
        uniform vec2 uMousePosition;
        uniform vec3 uCursorSphere;
        uniform float uCursorRadius;
        uniform int uSphereCount;
        uniform float uSmoothness;
        uniform float uAmbientIntensity;
        uniform float uDiffuseIntensity;
        uniform float uGlowIntensity;
        uniform float uRimPower;
        uniform vec3 uBackgroundColor;
        uniform vec3 uSphereColors[6];
        uniform vec3 uLightColor;
        uniform float uAnimationSpeed;
        uniform float uTranslateSpeed;
        uniform float uCursorGlowIntensity;
        uniform float uCursorGlowRadius;
        uniform vec3 uCursorGlowColor;
        uniform float uIsMobile;
        uniform float uIsDesktop;
        uniform float uSphereScales[6];
        uniform vec3 uSpherePositions[6];
        uniform float uSphereRadii[6];

        const float PI = 3.14159265359;
        const float EPSILON = 0.001;  // Tighter for better surface detection
        const float MAX_DIST = 100.0;

        float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * 0.25;
        }

        float sdSphere(vec3 p, float r) {
          return length(p) - r;
        }

        // Dynamic position system - positions come from uniforms
        vec3 getSpherePosition(int index, float time) {
          // Return position from uniform array (updated by section transitions)
          return uSpherePositions[index];
        }

        float getSphereRadius(int index, float time) {
          // Get base radius from uniform array (updated by section transitions)
          float baseRadius = uSphereRadii[index];

          // Apply reactive scaling based on cursor proximity
          return baseRadius * uSphereScales[index];
        }

        struct SceneResult {
          float dist;
          int closestSphere;
        };

        SceneResult sceneSDF(vec3 pos) {
          float result = MAX_DIST;
          int closestSphere = -1;
          float time = uTime * uAnimationSpeed;

          // Store positions and radii
          vec3 spherePos[6];
          float sphereRad[6];

          for (int i = 0; i < 6; i++) {
            spherePos[i] = getSpherePosition(i, time);
            sphereRad[i] = getSphereRadius(i, time);
          }

          // Create spheres with interaction and track closest
          for (int i = 0; i < 6; i++) {
            vec3 pos_i = spherePos[i];
            float rad_i = sphereRad[i];

            // Check for nearby spheres to adjust smoothness
            float minDist = 10.0;
            for (int j = 0; j < 6; j++) {
              if (i == j) continue;
              float dist = length(spherePos[j] - pos_i);
              minDist = min(minDist, dist);
            }

            // Increase smoothness when spheres are close
            float dynamicSmoothness = uSmoothness;
            if (minDist < 1.5) {
              dynamicSmoothness = mix(uSmoothness * 2.5, uSmoothness, minDist / 1.5);
            }

            float sphere = sdSphere(pos - pos_i, rad_i);

            if (sphere < result) {
              closestSphere = i;
            }

            result = smin(result, sphere, dynamicSmoothness);
          }

          // Add cursor ball that merges with other spheres (only on desktop)
          if (uIsDesktop > 0.5) {
            float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);
            result = smin(result, cursorBall, uSmoothness);
          }

          return SceneResult(result, closestSphere);
        }

        vec3 calcNormal(vec3 p) {
          float eps = 0.002;  // Reduced for better accuracy on large surfaces
          return normalize(vec3(
            sceneSDF(p + vec3(eps, 0, 0)).dist - sceneSDF(p - vec3(eps, 0, 0)).dist,
            sceneSDF(p + vec3(0, eps, 0)).dist - sceneSDF(p - vec3(0, eps, 0)).dist,
            sceneSDF(p + vec3(0, 0, eps)).dist - sceneSDF(p - vec3(0, 0, eps)).dist
          ));
        }

        struct RayResult {
          float t;
          int sphereIndex;
        };

        RayResult rayMarch(vec3 ro, vec3 rd) {
          float t = 0.0;
          int sphereIndex = -1;

          // Increased iterations and distance for large metaballs (up to radius 1.2)
          for (int i = 0; i < 48; i++) {
            vec3 p = ro + rd * t;
            SceneResult scene = sceneSDF(p);

            if (scene.dist < EPSILON) {
              return RayResult(t, scene.closestSphere);
            }
            if (t > 10.0) break;  // Extended max distance for large blobs

            t += scene.dist;
          }

          return RayResult(-1.0, -1);
        }

        vec3 lighting(vec3 p, vec3 rd, float t, int sphereIndex) {
          if (t < 0.0) return vec3(0.0);

          vec3 normal = calcNormal(p);

          // Get color based on sphere index
          vec3 baseColor = uSphereColors[0]; // Default
          if (sphereIndex >= 0 && sphereIndex < 6) {
            baseColor = uSphereColors[sphereIndex];
          }

          // Simple ambient
          vec3 ambient = baseColor * uAmbientIntensity;

          // Simple diffuse
          vec3 lightDir = normalize(vec3(1, 1, 1));
          float diff = max(dot(normal, lightDir), 0.0);
          vec3 diffuse = baseColor * diff * uDiffuseIntensity;

          // Smoother rim lighting for glow effect
          float viewDot = dot(normal, -rd);
          float rimFactor = 1.0 - max(viewDot, 0.0);
          rimFactor = smoothstep(0.0, 1.0, rimFactor);
          rimFactor = pow(rimFactor, uRimPower);
          vec3 rimGlow = baseColor * rimFactor * uGlowIntensity * 0.8;

          // Emissive glow - stronger and more uniform
          vec3 emissive = baseColor * 0.5 * uGlowIntensity;

          vec3 color = ambient + diffuse + rimGlow + emissive;
          return color;
        }

        float calculateCursorGlow(vec3 worldPos) {
          float dist = length(worldPos.xy - uCursorSphere.xy);
          float glow = 1.0 - smoothstep(0.0, uCursorGlowRadius, dist);
          glow = pow(glow, 2.0);
          return glow * uCursorGlowIntensity;
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy * 2.0 - uActualResolution.xy) / uActualResolution.xy;
          uv.x *= uResolution.x / uResolution.y;

          vec3 ro = vec3(uv * 2.0, -1.0);
          vec3 rd = vec3(0.0, 0.0, 1.0);

          RayResult result = rayMarch(ro, rd);
          vec3 p = ro + rd * result.t;
          vec3 color = lighting(p, rd, result.t, result.sphereIndex);

          // Add cursor glow
          float cursorGlow = calculateCursorGlow(ro);
          vec3 glowContribution = uCursorGlowColor * cursorGlow;

          if (result.t > 0.0) {
            // Dramatic reveal: increase opacity based on cursor proximity
            float distToCursor = length(ro.xy - uCursorSphere.xy);
            float revealFactor = 1.0 - smoothstep(0.0, uCursorGlowRadius, distToCursor);
            revealFactor = pow(revealFactor, 1.5); // Steeper curve for dramatic effect

            // Base opacity: high on mobile/tablet (always visible), low on desktop (reveal on cursor)
            float baseOpacity = uIsDesktop > 0.5 ? 0.08 : 0.65;
            float maxOpacity = 1.0; // Full opacity at cursor
            float finalOpacity = uIsDesktop > 0.5 ? mix(baseOpacity, maxOpacity, revealFactor) : baseOpacity;

            // Enhanced glow contribution near cursor
            color += glowContribution * (0.15 + revealFactor * 0.4);

            gl_FragColor = vec4(color, finalOpacity);
          } else {
            if (cursorGlow > 0.01) {
              // Stronger glow in empty space
              gl_FragColor = vec4(glowContribution, cursorGlow * 0.5);
            } else {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            }
          }
        }
      `,
      transparent: true
    });

    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initialize positions from config
    const initConfig = getMetaballConfig('home');
    currentPositions.current = initConfig.map(cfg => ({ x: cfg.x, y: cfg.y, z: cfg.z }));
    targetPositions.current = initConfig.map(cfg => ({ x: cfg.x, y: cfg.y, z: cfg.z }));
    currentRadii.current = initConfig.map(cfg => cfg.radius);
    targetRadii.current = initConfig.map(cfg => cfg.radius);

    // Initialize device type tracking
    previousDeviceType.current = getDeviceType();

    // Set initial uniform values
    material.uniforms.uSpherePositions.value = currentPositions.current.map(
      pos => new THREE.Vector3(pos.x, pos.y, pos.z)
    );
    material.uniforms.uSphereRadii.value = [...currentRadii.current];

    // Helper function to convert screen coordinates to world coordinates
    const screenToWorld = (normalizedX, normalizedY) => {
      const uv_x = normalizedX * 2.0 - 1.0;
      const uv_y = normalizedY * 2.0 - 1.0;
      const aspect = window.innerWidth / window.innerHeight;
      return new THREE.Vector3(uv_x * aspect * 2.0, uv_y * 2.0, 0.0);
    };

    // Mouse/touch move handler
    const handlePointerMove = (clientX, clientY) => {
      targetMousePosition.current.x = clientX / window.innerWidth;
      targetMousePosition.current.y = 1.0 - clientY / window.innerHeight;

      const worldPos = screenToWorld(
        targetMousePosition.current.x,
        targetMousePosition.current.y
      );
      cursorSphere3D.current.copy(worldPos);

      // Update cursor radius based on proximity to spheres (simple static radius for now)
      material.uniforms.uCursorSphere.value.copy(cursorSphere3D.current);
      material.uniforms.uCursorRadius.value = 0.08;

      // Calculate reactive pulsing for each sphere based on cursor proximity
      // Use current animated positions from refs
      const spherePositions = currentPositions.current.map(
        pos => new THREE.Vector3(pos.x, pos.y, pos.z)
      );

      let closestDist = Infinity;
      let closestIndex = -1;

      for (let i = 0; i < 6; i++) {
        const dist = worldPos.distanceTo(spherePositions[i]);
        const pulseRadius = 1.5; // Distance at which pulsing begins

        // Track closest sphere
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }

        if (dist < pulseRadius) {
          // Scale from 1.0 to 1.4 (40% growth) as cursor gets closer
          const proximity =  (dist / pulseRadius);
          targetSphereScales.current[i] = 1.1
        } else {
          targetSphereScales.current[i] = 1.0;
        }
      }

      // Update cursor glow color based on nearest sphere
      const glowRadius = 2.5;
      if (closestDist < glowRadius && closestIndex >= 0) {
        // Blend between default cyan and nearest sphere color
        const blendFactor = 1.0 - (closestDist / glowRadius);
        const defaultColor = new THREE.Color(0xCCF5FF);
        const sphereColor = settings.sphereColors[closestIndex];
        const blendedColor = defaultColor.clone().lerp(sphereColor, blendFactor * 0.7);
        material.uniforms.uCursorGlowColor.value.copy(blendedColor);
      } else {
        // Reset to default cyan when far from all spheres
        material.uniforms.uCursorGlowColor.value.set(0xCCF5FF);
      }
    };

    const onMouseMove = (event) => {
      handlePointerMove(event.clientX, event.clientY);
    };

    const onTouchStart = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    const onTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    // Window resize handler with device type detection
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentPixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(currentPixelRatio);

      material.uniforms.uResolution.value.set(width, height);
      material.uniforms.uActualResolution.value.set(
        width * currentPixelRatio,
        height * currentPixelRatio
      );

      // Check if device type changed (e.g., rotation, window resize crossing breakpoints)
      const newDeviceType = getDeviceType();
      if (previousDeviceType.current !== null && previousDeviceType.current !== newDeviceType) {
        // Device type changed - update metaball positions
        const newConfig = getMetaballConfig(currentSection);
        targetPositions.current = newConfig.map(cfg => ({ x: cfg.x, y: cfg.y, z: cfg.z }));
        targetRadii.current = newConfig.map(cfg => cfg.radius);
      }
      previousDeviceType.current = newDeviceType;

      // Update desktop detection on resize
      const newIsDesktop = width > 1024;
      material.uniforms.uIsDesktop.value = newIsDesktop ? 1.0 : 0.0;
    };

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 30; // Cap at 30fps for performance
    const frameInterval = 1000 / targetFPS;
    const mouseSmoothness = 0.1;
    const scaleSmoothness = 0.15; // Smooth pulsing animation
    const positionSmoothness = TRANSITION_CONFIG.smoothness; // Position transition smoothness

    const animate = (currentTime) => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;

      lastTime = currentTime - (deltaTime % frameInterval);

      // Smooth mouse movement
      mousePosition.current.x +=
        (targetMousePosition.current.x - mousePosition.current.x) * mouseSmoothness;
      mousePosition.current.y +=
        (targetMousePosition.current.y - mousePosition.current.y) * mouseSmoothness;

      // Smooth sphere scaling for reactive pulsing
      for (let i = 0; i < 6; i++) {
        sphereScales.current[i] +=
          (targetSphereScales.current[i] - sphereScales.current[i]) * scaleSmoothness;
      }

      // Smooth position transitions between sections
      for (let i = 0; i < 6; i++) {
        currentPositions.current[i].x +=
          (targetPositions.current[i].x - currentPositions.current[i].x) * positionSmoothness;
        currentPositions.current[i].y +=
          (targetPositions.current[i].y - currentPositions.current[i].y) * positionSmoothness;
        currentPositions.current[i].z +=
          (targetPositions.current[i].z - currentPositions.current[i].z) * positionSmoothness;

        currentRadii.current[i] +=
          (targetRadii.current[i] - currentRadii.current[i]) * positionSmoothness;
      }

      // Update shader uniforms with current animated positions
      material.uniforms.uSpherePositions.value = currentPositions.current.map(
        pos => new THREE.Vector3(pos.x, pos.y, pos.z)
      );
      material.uniforms.uSphereRadii.value = [...currentRadii.current];

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMousePosition.value = mousePosition.current;
      material.uniforms.uSphereScales.value = sphereScales.current;
      renderer.render(scene, camera);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize, { passive: true });

    // Only add cursor tracking on desktop
    if (isDesktop) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    // Keep touch events for interaction (sphere scaling) but not cursor ball
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Initialize cursor position at center
    handlePointerMove(window.innerWidth / 2, window.innerHeight / 2);

    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (isDesktop) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (materialRef.current) {
        materialRef.current.dispose();
      }

      geometry.dispose();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle section changes - update target positions for smooth transitions
  useEffect(() => {
    if (!materialRef.current) return;

    const newConfig = getMetaballConfig(currentSection);

    // Update target positions and radii
    targetPositions.current = newConfig.map(cfg => ({ x: cfg.x, y: cfg.y, z: cfg.z }));
    targetRadii.current = newConfig.map(cfg => cfg.radius);

    // The animation loop will smoothly interpolate from current to target
  }, [currentSection]);

  return <div ref={containerRef} className="metaball-background" aria-hidden="true" />;
};

export default MetaballBackground;

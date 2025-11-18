import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/metaball.css';
import { getMetaballConfig, getDeviceType, TRANSITION_CONFIG } from '../config/metaballPositions';
import { getTheme } from '../config/metaballThemes';

const MetaballBackground = ({ currentSection = 'home', theme = 'light' }) => {
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

  // Get theme settings
  const themeConfig = getTheme(theme);

  // Settings from theme configuration
  const settings = {
    sphereCount: 6,
    ambientIntensity: themeConfig.ambientIntensity,
    diffuseIntensity: themeConfig.diffuseIntensity,
    glowIntensity: themeConfig.glowIntensity,
    rimPower: themeConfig.rimPower,
    backgroundColor: themeConfig.backgroundColor,
    sphereColors: themeConfig.sphereColors,
    lightColor: themeConfig.lightColor,
    smoothness: themeConfig.smoothness,
    animationSpeed: themeConfig.animationSpeed,
    translateSpeed: 0.18,
    // Cursor settings from theme
    cursorGlowIntensity: themeConfig.cursorGlowIntensity,
    cursorGlowRadius: themeConfig.cursorGlowRadius,
    cursorGlowColor: themeConfig.cursorGlowColor,
    // Cursor size settings (from original)
    cursorRadiusMin: 0.08,
    cursorRadiusMax: 0.15,
    mouseSmoothness: 0.1, // Smooth mouse movement
    mergeDistance: 1.5 // Distance for cursor growth
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
        uSpecularIntensity: { value: themeConfig.specularIntensity || 2.5 },
        uSpecularPower: { value: themeConfig.specularPower || 3 },
        uFresnelPower: { value: themeConfig.fresnelPower || 0.8 },
        uGlowIntensity: { value: settings.glowIntensity },
        uRimPower: { value: settings.rimPower },
        uContrast: { value: themeConfig.contrast || 1.6 },
        uFogDensity: { value: themeConfig.fogDensity || 0.06 },
        uBackgroundColor: { value: settings.backgroundColor },
        uSphereColors: { value: settings.sphereColors },
        uLightColor: { value: settings.lightColor },
        uAnimationSpeed: { value: settings.animationSpeed },
        uTranslateSpeed: { value: settings.translateSpeed },
        uCursorGlowIntensity: { value: settings.cursorGlowIntensity },
        uCursorGlowRadius: { value: settings.cursorGlowRadius },
        uCursorGlowColor: { value: settings.cursorGlowColor },
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
        uniform float uSpecularIntensity;
        uniform float uSpecularPower;
        uniform float uFresnelPower;
        uniform float uGlowIntensity;
        uniform float uRimPower;
        uniform float uContrast;
        uniform float uFogDensity;
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
          vec3 viewDir = -rd;

          // Base sphere color (dark, not emissive)
          vec3 baseColor = uSphereColors[0];
          if (sphereIndex >= 0 && sphereIndex < 6) {
            baseColor = uSphereColors[sphereIndex];
          }

          // Ambient lighting (colored light)
          vec3 ambient = uLightColor * uAmbientIntensity;

          // Diffuse lighting
          vec3 lightDir = normalize(vec3(0.9, 0.9, 1.2)); // Light position from holographic preset
          float diff = max(dot(normal, lightDir), 0.0);
          vec3 diffuse = uLightColor * diff * uDiffuseIntensity;

          // Specular highlights (shiny reflections)
          vec3 reflectDir = reflect(-lightDir, normal);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularPower);
          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
          vec3 specular = uLightColor * spec * uSpecularIntensity * fresnel;

          // Fresnel rim glow
          vec3 fresnelRim = uLightColor * fresnel * 0.4;

          // Cursor highlight (when close to cursor)
          float distToCursor = length(p - uCursorSphere);
          if (distToCursor < uCursorRadius + 0.4) {
            float highlight = 1.0 - smoothstep(0.0, uCursorRadius + 0.4, distToCursor);
            specular += uLightColor * highlight * 0.2;

            float glow = exp(-distToCursor * 3.0) * 0.15;
            ambient += uLightColor * glow * 0.5;
          }

          // Combine all lighting (baseColor + lights, exact formula from original)
          vec3 color = baseColor + ambient + diffuse + specular + fresnelRim;

          // Tone mapping (exact from holographic preset)
          color = pow(color, vec3(uContrast * 0.9));
          color = color / (color + vec3(0.8));

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
            // Add fog (depth-based fade to background, like original)
            float fogAmount = 1.0 - exp(-result.t * uFogDensity);
            color = mix(color, uBackgroundColor.rgb, fogAmount * 0.3);

            // Add cursor glow contribution
            color += glowContribution * 0.3;

            // Dramatic reveal: increase opacity based on cursor proximity
            float distToCursor = length(ro.xy - uCursorSphere.xy);
            float revealFactor = 1.0 - smoothstep(0.0, uCursorGlowRadius, distToCursor);
            revealFactor = pow(revealFactor, 1.5); // Steeper curve for dramatic effect

            // Base opacity: high on mobile/tablet (always visible), low on desktop (reveal on cursor)
            float baseOpacity = uIsDesktop > 0.5 ? 0.08 : 0.65;
            float maxOpacity = 1.0; // Full opacity at cursor
            float finalOpacity = uIsDesktop > 0.5 ? mix(baseOpacity, maxOpacity, revealFactor) : baseOpacity;

            gl_FragColor = vec4(color, finalOpacity);
          } else {
            if (cursorGlow > 0.01) {
              // Glow in empty space (like original)
              gl_FragColor = vec4(glowContribution, cursorGlow * 0.8);
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

    // Mouse/touch move handler (exact logic from original)
    const handlePointerMove = (clientX, clientY) => {
      // Update target mouse position (0 to 1 range)
      targetMousePosition.current.x = clientX / window.innerWidth;
      targetMousePosition.current.y = 1.0 - clientY / window.innerHeight;

      // Convert to world coordinates
      const worldPos = screenToWorld(
        targetMousePosition.current.x,
        targetMousePosition.current.y
      );
      cursorSphere3D.current.copy(worldPos);

      // Get current sphere positions
      const spherePositions = currentPositions.current.map(
        pos => new THREE.Vector3(pos.x, pos.y, pos.z)
      );

      // Calculate cursor radius based on proximity to metaballs (from original)
      let closestDistance = 1000.0;
      let closestIndex = -1;
      let activeMerges = 0;

      for (let i = 0; i < 6; i++) {
        const dist = worldPos.distanceTo(spherePositions[i]);

        // Track closest sphere
        if (dist < closestDistance) {
          closestDistance = dist;
          closestIndex = i;
        }

        // Count merges (spheres within merge distance)
        if (dist < settings.mergeDistance) {
          activeMerges++;
        }

        // Reactive pulsing for spheres
        const pulseRadius = 1.5;
        if (dist < pulseRadius) {
          targetSphereScales.current[i] = 1.1;
        } else {
          targetSphereScales.current[i] = 1.0;
        }
      }

      // Dynamic cursor radius (exact formula from original)
      const proximityFactor = Math.max(0, 1.0 - closestDistance / settings.mergeDistance);
      const smoothFactor = proximityFactor * proximityFactor * (3.0 - 2.0 * proximityFactor); // Smoothstep
      const dynamicRadius = settings.cursorRadiusMin +
        (settings.cursorRadiusMax - settings.cursorRadiusMin) * smoothFactor;

      // Update uniforms immediately for responsive cursor
      material.uniforms.uCursorSphere.value.copy(cursorSphere3D.current);
      material.uniforms.uCursorRadius.value = dynamicRadius;

      // Update cursor glow color based on nearest sphere (blend with sphere color)
      if (closestDistance < settings.cursorGlowRadius && closestIndex >= 0) {
        const blendFactor = 1.0 - (closestDistance / settings.cursorGlowRadius);
        const sphereColor = settings.sphereColors[closestIndex];
        const blendedColor = settings.cursorGlowColor.clone().lerp(sphereColor, blendFactor * 0.7);
        material.uniforms.uCursorGlowColor.value.copy(blendedColor);
      } else {
        // Reset to theme's default cursor glow color
        material.uniforms.uCursorGlowColor.value.copy(settings.cursorGlowColor);
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
    const mouseSmoothness = settings.mouseSmoothness; // From theme settings (0.1 = smooth like original)
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

  // Handle theme changes - update shader uniforms
  useEffect(() => {
    if (!materialRef.current) return;

    const themeConfig = getTheme(theme);

    // Update all theme-related uniforms with smooth transitions
    materialRef.current.uniforms.uBackgroundColor.value.copy(themeConfig.backgroundColor);
    materialRef.current.uniforms.uAmbientIntensity.value = themeConfig.ambientIntensity;
    materialRef.current.uniforms.uDiffuseIntensity.value = themeConfig.diffuseIntensity;
    materialRef.current.uniforms.uSpecularIntensity.value = themeConfig.specularIntensity || 2.5;
    materialRef.current.uniforms.uSpecularPower.value = themeConfig.specularPower || 3;
    materialRef.current.uniforms.uFresnelPower.value = themeConfig.fresnelPower || 0.8;
    materialRef.current.uniforms.uGlowIntensity.value = themeConfig.glowIntensity;
    materialRef.current.uniforms.uRimPower.value = themeConfig.rimPower;
    materialRef.current.uniforms.uContrast.value = themeConfig.contrast || 1.6;
    materialRef.current.uniforms.uFogDensity.value = themeConfig.fogDensity || 0.06;
    materialRef.current.uniforms.uSmoothness.value = themeConfig.smoothness;
    materialRef.current.uniforms.uCursorGlowIntensity.value = themeConfig.cursorGlowIntensity;
    materialRef.current.uniforms.uCursorGlowRadius.value = themeConfig.cursorGlowRadius;

    // Update light color
    materialRef.current.uniforms.uLightColor.value.copy(themeConfig.lightColor);

    // Update sphere colors
    for (let i = 0; i < 6; i++) {
      materialRef.current.uniforms.uSphereColors.value[i].copy(themeConfig.sphereColors[i]);
    }

    // Update cursor glow color
    materialRef.current.uniforms.uCursorGlowColor.value.copy(themeConfig.cursorGlowColor);
  }, [theme]);

  return <div ref={containerRef} className="metaball-background" aria-hidden="true" />;
};

export default MetaballBackground;

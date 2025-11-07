import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/metaball.css';

const MetaballBackground = () => {
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

  // Enhanced device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isLowPowerDevice = isMobile || navigator.hardwareConcurrency <= 4;

  // Optimized settings - professional aesthetic
  const settings = {
    sphereCount: 6,
    ambientIntensity: 0.65,
    diffuseIntensity: 0.25,
    glowIntensity: 0.6,
    rimPower: 3.5,
    backgroundColor: new THREE.Color(0xFAFBFC),
    // Sophisticated desaturated palette
    sphereColors: [
      new THREE.Color(0xE0E7FF), // Very light indigo
      new THREE.Color(0xE0F2FE), // Very light cyan
      new THREE.Color(0xEEF2FF), // Pale blue
      new THREE.Color(0xE8EAF6), // Light indigo-gray
      new THREE.Color(0xE0F2FE), // Very light cyan
      new THREE.Color(0xE0E7FF)  // Very light indigo
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
        uCursorGlowIntensity: { value: 0.3 },
        uCursorGlowRadius: { value: 2.5 },
        uCursorGlowColor: { value: new THREE.Color(0xE0E7FF) },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 },
        uSphereScales: { value: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0] }
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
        uniform float uSphereScales[6];

        const float PI = 3.14159265359;
        const float EPSILON = 0.002;
        const float MAX_DIST = 100.0;

        float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * 0.25;
        }

        float sdSphere(vec3 p, float r) {
          return length(p) - r;
        }

        // Linear translation movement - contained within screen
        vec3 getSpherePosition(int index, float time) {
          // Fixed positions for static metaballs
          vec3 position;

          if (index == 0) {
            // Top left
            position.x = -2.5;
            position.y = 2.0;
          } else if (index == 1) {
            // Top right
            position.x = 2.2;
            position.y = 1.8;
          } else if (index == 2) {
            // Center - moved closer to center
            position.x = -1.0;
            position.y = 0.2;
          } else if (index == 3) {
            // Bottom right
            position.x = 2.0;
            position.y = -2.2;
          } else if (index == 4) {
            // Bottom left
            position.x = -2.5;
            position.y = -2.1;
          } else {
            // Center right, towards bottom (new ball)
            position.x = 1.3;
            position.y = -0.5;
          }

          position.z = 0.0;
          return position;
        }

        float getSphereRadius(int index, float time) {
          // Base radius - varied sizes
          float baseRadius;
          if (index == 0) {
            baseRadius = 0.85; // Large
          } else if (index == 1) {
            baseRadius = 0.7;  // Medium-large
          } else if (index == 2) {
            baseRadius = 0.65;  // Large
          } else if (index == 3) {
            baseRadius = 0.75; // Medium-large
          } else if (index == 4) {
            baseRadius = 0.85;  // Large
          } else {
            baseRadius = 0.4;  // Small (new ball)
          }

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

          // Add cursor ball that merges with other spheres
          float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);
          result = smin(result, cursorBall, uSmoothness);

          return SceneResult(result, closestSphere);
        }

        vec3 calcNormal(vec3 p) {
          float eps = 0.003;
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

          for (int i = 0; i < 24; i++) {
            vec3 p = ro + rd * t;
            SceneResult scene = sceneSDF(p);

            if (scene.dist < EPSILON) {
              return RayResult(t, scene.closestSphere);
            }
            if (t > 5.0) break;

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

            // Base opacity increased, with dramatic reveal near cursor
            float baseOpacity = 0.08;
            float maxOpacity = 1.0; // Full opacity at cursor
            float finalOpacity = mix(baseOpacity, maxOpacity, revealFactor);

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
      const spherePositions = [
        new THREE.Vector3(-2.5, 2.0, 0.0),    // Sphere 0
        new THREE.Vector3(2.2, 1.8, 0.0),     // Sphere 1
        new THREE.Vector3(-1.0, 0.2, 0.0),    // Sphere 2
        new THREE.Vector3(2.0, -2.2, 0.0),    // Sphere 3
        new THREE.Vector3(-2.5, -2.1, 0.0),   // Sphere 4
        new THREE.Vector3(1.3, -0.5, 0.0)     // Sphere 5
      ];

      for (let i = 0; i < 6; i++) {
        const dist = worldPos.distanceTo(spherePositions[i]);
        const pulseRadius = 1.5; // Distance at which pulsing begins

        if (dist < pulseRadius) {
          // Scale from 1.0 to 1.4 (40% growth) as cursor gets closer
          const proximity =  (dist / pulseRadius);
          targetSphereScales.current[i] = 1.1
        } else {
          targetSphereScales.current[i] = 1.0;
        }
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

    // Window resize handler
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
    };

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 30; // Cap at 30fps for performance
    const frameInterval = 1000 / targetFPS;
    const mouseSmoothness = 0.1;
    const scaleSmoothness = 0.15; // Smooth pulsing animation

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

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMousePosition.value = mousePosition.current;
      material.uniforms.uSphereScales.value = sphereScales.current;
      renderer.render(scene, camera);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Initialize cursor position at center
    handlePointerMove(window.innerWidth / 2, window.innerHeight / 2);

    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
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

  return <div ref={containerRef} className="metaball-background" aria-hidden="true" />;
};

export default MetaballBackground;

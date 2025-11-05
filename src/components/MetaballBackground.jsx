import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/metaball.css';

const MetaballBackground = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationFrameRef = useRef(null);
  const clockRef = useRef(null);

  // Enhanced device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isLowPowerDevice = isMobile || navigator.hardwareConcurrency <= 4;

  // Optimized settings - reduced spheres, simpler shading
  const settings = {
    sphereCount: 5,
    ambientIntensity: 0.9,
    diffuseIntensity: 0.4,
    glowIntensity: 1.2,
    rimPower: 2.5,
    backgroundColor: new THREE.Color(0xf3f2f9),
    // Uniform color for seamless blending
    sphereColors: [
      new THREE.Color(0x8B5CF6), // Purple
      new THREE.Color(0x8B5CF6), // Purple
      new THREE.Color(0x8B5CF6), // Purple
      new THREE.Color(0x8B5CF6), // Purple
      new THREE.Color(0x8B5CF6)  // Purple
    ],
    lightColor: new THREE.Color(0xffffff),
    smoothness: 0.3,
    animationSpeed: 0.4,
    translateSpeed: 0.3
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
        uIsMobile: { value: isMobile ? 1.0 : 0.0 }
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
        uniform int uSphereCount;
        uniform float uSmoothness;
        uniform float uAmbientIntensity;
        uniform float uDiffuseIntensity;
        uniform float uGlowIntensity;
        uniform float uRimPower;
        uniform vec3 uBackgroundColor;
        uniform vec3 uSphereColors[5];
        uniform vec3 uLightColor;
        uniform float uAnimationSpeed;
        uniform float uTranslateSpeed;
        uniform float uIsMobile;

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
          float fi = float(index);
          float t = time * uTranslateSpeed;

          // Different translation patterns for each sphere - staying visible
          vec3 position;

          if (index == 0) {
            // Move diagonally from top-left to bottom-right
            position.x = mod(t + fi * 1.5, 6.0) - 3.0;
            position.y = -mod(t + fi * 1.5, 6.0) + 3.0;
          } else if (index == 1) {
            // Move diagonally from bottom-left to top-right
            position.x = mod(t + fi * 2.0, 6.0) - 3.0;
            position.y = mod(t + fi * 2.0, 6.0) - 3.0;
          } else if (index == 2) {
            // Move horizontally right to left with vertical wave
            position.x = -mod(t + fi * 1.8, 6.0) + 3.0;
            position.y = sin(t * 0.3 + fi) * 1.5;
          } else if (index == 3) {
            // Move horizontally left to right with vertical wave
            position.x = mod(t + fi * 2.2, 6.0) - 3.0;
            position.y = cos(t * 0.3 + fi) * 1.5;
          } else {
            // Move in circular pattern
            position.x = cos(t + fi * 1.3) * 2.0;
            position.y = sin(t + fi * 1.3) * 1.8;
          }

          position.z = 0.0;
          return position;
        }

        float getSphereRadius(int index) {
          return 0.5 + mod(float(index), 2.0) * 0.15; // Bigger base size
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
          vec3 spherePos[5];
          float sphereRad[5];

          for (int i = 0; i < 5; i++) {
            spherePos[i] = getSpherePosition(i, time);
            sphereRad[i] = getSphereRadius(i);
          }

          // Create spheres with interaction and track closest
          for (int i = 0; i < 5; i++) {
            vec3 pos_i = spherePos[i];
            float rad_i = sphereRad[i];

            // Check for nearby spheres to adjust smoothness
            float minDist = 10.0;
            for (int j = 0; j < 5; j++) {
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
          if (sphereIndex >= 0 && sphereIndex < 5) {
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

        void main() {
          vec2 uv = (gl_FragCoord.xy * 2.0 - uActualResolution.xy) / uActualResolution.xy;
          uv.x *= uResolution.x / uResolution.y;

          vec3 ro = vec3(uv * 2.0, -1.0);
          vec3 rd = vec3(0.0, 0.0, 1.0);

          RayResult result = rayMarch(ro, rd);
          vec3 p = ro + rd * result.t;
          vec3 color = lighting(p, rd, result.t, result.sphereIndex);

          if (result.t > 0.0) {
            gl_FragColor = vec4(color, 0.2);
          } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          }
        }
      `,
      transparent: true
    });

    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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

    const animate = (currentTime) => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;

      lastTime = currentTime - (deltaTime % frameInterval);

      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

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

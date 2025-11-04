import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/metaball.css';

const MetaballBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mousePositionRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMousePositionRef = useRef(new THREE.Vector2(0.5, 0.5));
  const cursorSphere3DRef = useRef(new THREE.Vector3(0, 0, 0));
  const clockRef = useRef(null);

  // Enhanced device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isLowPowerDevice = isMobile || navigator.hardwareConcurrency <= 4;
  const devicePixelRatio = Math.min(
    window.devicePixelRatio || 1,
    isMobile ? 1.5 : 2
  );

  // Adapted settings for Sharlee-style (using your color palette)
  const settings = {
    sphereCount: isMobile ? 3 : 5,
    ambientIntensity: 0.08,
    diffuseIntensity: 0.6,
    specularIntensity: 1.3,
    specularPower: 10,
    fresnelPower: 1.8,
    backgroundColor: new THREE.Color(0xf3f2f9), // Your --color-bg
    sphereColor: new THREE.Color(0xe8e7f4), // Slightly darker than bg
    lightColor: new THREE.Color(0x0EA5E9), // Your --color-accent-primary
    lightPosition: new THREE.Vector3(1, 1, 1),
    smoothness: 0.35,
    contrast: 1.9,
    fogDensity: 0.08,
    cursorGlowIntensity: 0.4,
    cursorGlowRadius: 1.3,
    cursorGlowColor: new THREE.Color(0x0EA5E9),
    fixedTopLeftRadius: 0.7,
    fixedBottomRightRadius: 0.8,
    smallTopLeftRadius: 0.25,
    smallBottomRightRadius: 0.3,
    cursorRadiusMin: 0.08,
    cursorRadiusMax: 0.15,
    animationSpeed: 0.5,
    movementScale: 1.0,
    mouseSmoothness: 0.08,
    mergeDistance: 1.5,
    mouseProximityEffect: true,
    minMovementScale: 0.4,
    maxMovementScale: 1.0
  };

  // JavaScript version of screenToWorld for consistency
  const screenToWorldJS = (normalizedX, normalizedY) => {
    const uv_x = normalizedX * 2.0 - 1.0;
    const uv_y = normalizedY * 2.0 - 1.0;
    const aspect = window.innerWidth / window.innerHeight;
    return new THREE.Vector3(uv_x * aspect * 2.0, uv_y * 2.0, 0.0);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    const clock = new THREE.Clock();
    clockRef.current = clock;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile && !isLowPowerDevice,
      alpha: true,
      powerPreference: isMobile ? 'default' : 'high-performance',
      preserveDrawingBuffer: false,
      premultipliedAlpha: false
    });

    const pixelRatio = Math.min(devicePixelRatio, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    renderer.setSize(viewportWidth, viewportHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(viewportWidth, viewportHeight) },
        uActualResolution: {
          value: new THREE.Vector2(
            viewportWidth * pixelRatio,
            viewportHeight * pixelRatio
          )
        },
        uPixelRatio: { value: pixelRatio },
        uMousePosition: { value: new THREE.Vector2(0.5, 0.5) },
        uCursorSphere: { value: new THREE.Vector3(0, 0, 0) },
        uCursorRadius: { value: settings.cursorRadiusMin },
        uSphereCount: { value: settings.sphereCount },
        uFixedTopLeftRadius: { value: settings.fixedTopLeftRadius },
        uFixedBottomRightRadius: { value: settings.fixedBottomRightRadius },
        uSmallTopLeftRadius: { value: settings.smallTopLeftRadius },
        uSmallBottomRightRadius: { value: settings.smallBottomRightRadius },
        uMergeDistance: { value: settings.mergeDistance },
        uSmoothness: { value: settings.smoothness },
        uAmbientIntensity: { value: settings.ambientIntensity },
        uDiffuseIntensity: { value: settings.diffuseIntensity },
        uSpecularIntensity: { value: settings.specularIntensity },
        uSpecularPower: { value: settings.specularPower },
        uFresnelPower: { value: settings.fresnelPower },
        uBackgroundColor: { value: settings.backgroundColor },
        uSphereColor: { value: settings.sphereColor },
        uLightColor: { value: settings.lightColor },
        uLightPosition: { value: settings.lightPosition },
        uContrast: { value: settings.contrast },
        uFogDensity: { value: settings.fogDensity },
        uAnimationSpeed: { value: settings.animationSpeed },
        uMovementScale: { value: settings.movementScale },
        uMouseProximityEffect: { value: settings.mouseProximityEffect },
        uMinMovementScale: { value: settings.minMovementScale },
        uMaxMovementScale: { value: settings.maxMovementScale },
        uCursorGlowIntensity: { value: settings.cursorGlowIntensity },
        uCursorGlowRadius: { value: settings.cursorGlowRadius },
        uCursorGlowColor: { value: settings.cursorGlowColor },
        uIsSafari: { value: isSafari ? 1.0 : 0.0 },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 },
        uIsLowPower: { value: isLowPowerDevice ? 1.0 : 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${
          isMobile || isSafari || isLowPowerDevice
            ? 'precision mediump float;'
            : 'precision highp float;'
        }

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uActualResolution;
        uniform float uPixelRatio;
        uniform vec2 uMousePosition;
        uniform vec3 uCursorSphere;
        uniform float uCursorRadius;
        uniform int uSphereCount;
        uniform float uFixedTopLeftRadius;
        uniform float uFixedBottomRightRadius;
        uniform float uSmallTopLeftRadius;
        uniform float uSmallBottomRightRadius;
        uniform float uMergeDistance;
        uniform float uSmoothness;
        uniform float uAmbientIntensity;
        uniform float uDiffuseIntensity;
        uniform float uSpecularIntensity;
        uniform float uSpecularPower;
        uniform float uFresnelPower;
        uniform vec3 uBackgroundColor;
        uniform vec3 uSphereColor;
        uniform vec3 uLightColor;
        uniform vec3 uLightPosition;
        uniform float uContrast;
        uniform float uFogDensity;
        uniform float uAnimationSpeed;
        uniform float uMovementScale;
        uniform bool uMouseProximityEffect;
        uniform float uMinMovementScale;
        uniform float uMaxMovementScale;
        uniform float uCursorGlowIntensity;
        uniform float uCursorGlowRadius;
        uniform vec3 uCursorGlowColor;
        uniform float uIsSafari;
        uniform float uIsMobile;
        uniform float uIsLowPower;

        varying vec2 vUv;

        const float PI = 3.14159265359;
        const float EPSILON = 0.001;
        const float MAX_DIST = 100.0;

        float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * 0.25;
        }

        float sdSphere(vec3 p, float r) {
          return length(p) - r;
        }

        vec3 screenToWorld(vec2 normalizedPos) {
          vec2 uv = normalizedPos * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;
          return vec3(uv * 2.0, 0.0);
        }

        float getDistanceToCenter(vec2 pos) {
          float dist = length(pos - vec2(0.5, 0.5)) * 2.0;
          return smoothstep(0.0, 1.0, dist);
        }

        float sceneSDF(vec3 pos) {
          float result = MAX_DIST;

          vec3 topLeftPos = screenToWorld(vec2(0.08, 0.92));
          float topLeft = sdSphere(pos - topLeftPos, uFixedTopLeftRadius);

          vec3 smallTopLeftPos = screenToWorld(vec2(0.25, 0.72));
          float smallTopLeft = sdSphere(pos - smallTopLeftPos, uSmallTopLeftRadius);

          vec3 bottomRightPos = screenToWorld(vec2(0.92, 0.08));
          float bottomRight = sdSphere(pos - bottomRightPos, uFixedBottomRightRadius);

          vec3 smallBottomRightPos = screenToWorld(vec2(0.72, 0.25));
          float smallBottomRight = sdSphere(pos - smallBottomRightPos, uSmallBottomRightRadius);

          float t = uTime * uAnimationSpeed;

          float dynamicMovementScale = uMovementScale;
          if (uMouseProximityEffect) {
            float distToCenter = getDistanceToCenter(uMousePosition);
            float mixFactor = smoothstep(0.0, 1.0, distToCenter);
            dynamicMovementScale = mix(uMinMovementScale, uMaxMovementScale, mixFactor);
          }

          int maxIter = uIsMobile > 0.5 ? 3 : (uIsLowPower > 0.5 ? 4 : min(uSphereCount, 8));
          for (int i = 0; i < 8; i++) {
            if (i >= uSphereCount || i >= maxIter) break;

            float fi = float(i);
            float speed = 0.4 + fi * 0.12;
            float radius = 0.12 + mod(fi, 3.0) * 0.06;
            float orbitRadius = (0.3 + mod(fi, 3.0) * 0.15) * dynamicMovementScale;
            float phaseOffset = fi * PI * 0.35;

            float distToCursor = length(vec3(0.0) - uCursorSphere);
            float proximityScale = 1.0 + (1.0 - smoothstep(0.0, 1.0, distToCursor)) * 0.5;
            orbitRadius *= proximityScale;

            vec3 offset;
            if (i == 0) {
              offset = vec3(
                sin(t * speed) * orbitRadius * 0.7,
                sin(t * 0.5) * orbitRadius,
                cos(t * speed * 0.7) * orbitRadius * 0.5
              );
            } else if (i == 1) {
              offset = vec3(
                sin(t * speed + PI) * orbitRadius * 0.5,
                -sin(t * 0.5) * orbitRadius,
                cos(t * speed * 0.7 + PI) * orbitRadius * 0.5
              );
            } else {
              offset = vec3(
                sin(t * speed + phaseOffset) * orbitRadius * 0.8,
                cos(t * speed * 0.85 + phaseOffset * 1.3) * orbitRadius * 0.6,
                sin(t * speed * 0.5 + phaseOffset) * 0.3
              );
            }

            vec3 toCursor = uCursorSphere - offset;
            float cursorDist = length(toCursor);
            if (cursorDist < uMergeDistance && cursorDist > 0.0) {
              float attraction = (1.0 - cursorDist / uMergeDistance) * 0.3;
              offset += normalize(toCursor) * attraction;
            }

            float movingSphere = sdSphere(pos - offset, radius);

            float blend = 0.05;
            if (cursorDist < uMergeDistance) {
              float influence = 1.0 - (cursorDist / uMergeDistance);
              blend = mix(0.05, uSmoothness, influence * influence * influence);
            }

            result = smin(result, movingSphere, blend);
          }

          float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);

          float topLeftGroup = smin(topLeft, smallTopLeft, 0.4);
          float bottomRightGroup = smin(bottomRight, smallBottomRight, 0.4);

          result = smin(result, topLeftGroup, 0.3);
          result = smin(result, bottomRightGroup, 0.3);
          result = smin(result, cursorBall, uSmoothness);

          return result;
        }

        vec3 calcNormal(vec3 p) {
          float eps = uIsLowPower > 0.5 ? 0.002 : 0.001;
          return normalize(vec3(
            sceneSDF(p + vec3(eps, 0, 0)) - sceneSDF(p - vec3(eps, 0, 0)),
            sceneSDF(p + vec3(0, eps, 0)) - sceneSDF(p - vec3(0, eps, 0)),
            sceneSDF(p + vec3(0, 0, eps)) - sceneSDF(p - vec3(0, 0, eps))
          ));
        }

        float ambientOcclusion(vec3 p, vec3 n) {
          if (uIsLowPower > 0.5) {
            float h1 = sceneSDF(p + n * 0.03);
            float h2 = sceneSDF(p + n * 0.06);
            float occ = (0.03 - h1) + (0.06 - h2) * 0.5;
            return clamp(1.0 - occ * 2.0, 0.0, 1.0);
          } else {
            float occ = 0.0;
            float weight = 1.0;
            for (int i = 0; i < 5; i++) {
              float dist = 0.01 + 0.015 * float(i * i);
              float h = sceneSDF(p + n * dist);
              occ += (dist - h) * weight;
              weight *= 0.85;
            }
            return clamp(1.0 - occ, 0.0, 1.0);
          }
        }

        float softShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
          if (uIsLowPower > 0.5) {
            float result = 1.0;
            float t = mint;
            for (int i = 0; i < 3; i++) {
              t += 0.3;
              if (t >= maxt) break;
              float h = sceneSDF(ro + rd * t);
              if (h < EPSILON) return 0.0;
              result = min(result, k * h / t);
            }
            return result;
          } else {
            float result = 1.0;
            float t = mint;
            for (int i = 0; i < 15; i++) {
              if (t >= maxt) break;
              float h = sceneSDF(ro + rd * t);
              if (h < EPSILON) return 0.0;
              result = min(result, k * h / t);
              t += h;
            }
            return result;
          }
        }

        float rayMarch(vec3 ro, vec3 rd) {
          float t = 0.0;
          int maxSteps = uIsMobile > 0.5 ? 12 : (uIsSafari > 0.5 ? 16 : 32);

          for (int i = 0; i < 32; i++) {
            if (i >= maxSteps) break;

            vec3 p = ro + rd * t;
            float d = sceneSDF(p);

            if (d < EPSILON) {
              return t;
            }

            if (t > 5.0) {
              break;
            }

            t += d * (uIsLowPower > 0.5 ? 1.2 : 0.9);
          }

          return -1.0;
        }

        vec3 lighting(vec3 p, vec3 rd, float t) {
          if (t < 0.0) {
            return vec3(0.0);
          }

          vec3 normal = calcNormal(p);
          vec3 viewDir = -rd;

          vec3 baseColor = uSphereColor;

          float ao = ambientOcclusion(p, normal);

          vec3 ambient = uLightColor * uAmbientIntensity * ao;

          vec3 lightDir = normalize(uLightPosition);
          float diff = max(dot(normal, lightDir), 0.0);

          float shadow = softShadow(p, lightDir, 0.01, 10.0, 20.0);

          vec3 diffuse = uLightColor * diff * uDiffuseIntensity * shadow;

          vec3 reflectDir = reflect(-lightDir, normal);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularPower);
          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);

          vec3 specular = uLightColor * spec * uSpecularIntensity * fresnel;

          vec3 fresnelRim = uLightColor * fresnel * 0.3;

          float distToCursor = length(p - uCursorSphere);
          if (distToCursor < uCursorRadius + 0.4) {
            float highlight = 1.0 - smoothstep(0.0, uCursorRadius + 0.4, distToCursor);
            specular += uLightColor * highlight * 0.2;

            float glow = exp(-distToCursor * 3.0) * 0.15;
            ambient += uLightColor * glow * 0.5;
          }

          vec3 color = (baseColor + ambient + diffuse + specular + fresnelRim) * ao;

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

          float t = rayMarch(ro, rd);

          vec3 p = ro + rd * t;

          vec3 color = lighting(p, rd, t);

          float cursorGlow = calculateCursorGlow(ro);
          vec3 glowContribution = uCursorGlowColor * cursorGlow;

          if (t > 0.0) {
            float fogAmount = 1.0 - exp(-t * uFogDensity);
            color = mix(color, uBackgroundColor.rgb, fogAmount * 0.2);

            color += glowContribution * 0.2;

            gl_FragColor = vec4(color, 0.6);
          } else {
            if (cursorGlow > 0.01) {
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

    // Mouse movement handler
    const handleMouseMove = (event) => {
      targetMousePositionRef.current.x = event.clientX / window.innerWidth;
      targetMousePositionRef.current.y = 1.0 - event.clientY / window.innerHeight;

      const normalizedX = targetMousePositionRef.current.x;
      const normalizedY = targetMousePositionRef.current.y;
      const worldPos = screenToWorldJS(normalizedX, normalizedY);
      cursorSphere3DRef.current.copy(worldPos);

      // Calculate dynamic radius based on proximity
      const fixedPositions = [
        screenToWorldJS(0.08, 0.92),
        screenToWorldJS(0.25, 0.72),
        screenToWorldJS(0.92, 0.08),
        screenToWorldJS(0.72, 0.25)
      ];

      let closestDistance = 1000.0;
      fixedPositions.forEach((pos) => {
        const dist = cursorSphere3DRef.current.distanceTo(pos);
        closestDistance = Math.min(closestDistance, dist);
      });

      const proximityFactor = Math.max(0, 1.0 - closestDistance / settings.mergeDistance);
      const smoothFactor = proximityFactor * proximityFactor * (3.0 - 2.0 * proximityFactor);
      const dynamicRadius =
        settings.cursorRadiusMin +
        (settings.cursorRadiusMax - settings.cursorRadiusMin) * smoothFactor;

      material.uniforms.uCursorSphere.value.copy(cursorSphere3DRef.current);
      material.uniforms.uCursorRadius.value = dynamicRadius;
    };

    // Touch handlers
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY
        });
      }
    };

    // Window resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentPixelRatio = Math.min(devicePixelRatio, isMobile ? 1.5 : 2);

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(currentPixelRatio);

      material.uniforms.uResolution.value.set(width, height);
      material.uniforms.uActualResolution.value.set(
        width * currentPixelRatio,
        height * currentPixelRatio
      );
      material.uniforms.uPixelRatio.value = currentPixelRatio;
    };

    // Animation loop
    const animate = () => {
      // Smooth mouse movement
      mousePositionRef.current.x +=
        (targetMousePositionRef.current.x - mousePositionRef.current.x) * settings.mouseSmoothness;
      mousePositionRef.current.y +=
        (targetMousePositionRef.current.y - mousePositionRef.current.y) * settings.mouseSmoothness;

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMousePosition.value = mousePositionRef.current;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize cursor position
    handleMouseMove({
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    });

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
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

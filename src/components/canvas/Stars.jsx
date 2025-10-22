import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const Stars = (props) => {
  const ref = useRef();

  const [sphere, setSphere] = useState(null);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  useEffect(() => {
    // Reduced particle count for light mode subtlety
    setSphere(() => random.inSphere(new Float32Array(2500), { radius: 1.2 }));
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#F3B664"              // Warm amber gold
          size={0.0015}                // Smaller for subtlety
          opacity={0.3}                // Reduced opacity for light mode
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}  // Softer blending
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;

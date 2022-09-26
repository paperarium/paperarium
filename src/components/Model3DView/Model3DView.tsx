/*
 * Model3DView.tsx
 * author: evan kirkiles
 * created on Sun Sep 25 2022
 * 2022 the nobot space,
 */
import { Canvas } from '@react-three/fiber';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Box,
  Circle,
  CubicBezierLine,
  Html,
  OrbitControls,
  Plane,
  Preload,
  QuadraticBezierLine,
  Sphere,
  Stage,
  Stars,
  useGLTF,
  useProgress,
} from '@react-three/drei';
import s from './Model3DView.module.scss';
import { Suspense, useRef } from 'react';
import { Mesh } from 'three';

type Model3DViewProps = {
  key?: string;
};

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function RemoteModel() {
  const { scene } = useGLTF('/models/b_nobot_full.glb');
  return <primitive object={scene} />;
}

const Model3DView: React.FC<Model3DViewProps> = function ({ key }) {
  const controlsRef = useRef<any>(null);
  return (
    <div className={s.container}>
      <Canvas
        className={s.canvas}
        gl={{ preserveDrawingBuffer: true, antialias: false }}
        shadows
        camera={{ fov: 50 }}
      >
        <OrbitControls ref={controlsRef} />
        <Suspense fallback={<Loader />}>
          <Stage
            contactShadow={{
              blur: 2,
              opacity: 0.5,
              position: [0, 0, 0],
            }}
            shadows={true}
            intensity={1}
            controls={controlsRef}
          >
            {/*
            <Box
              args={[0.51, 0.51, 0.51]}
              rotation={[0, Math.PI * 0.2, 0]}
              position={[0.2, 0.2, 0.2]}
            >
              <meshPhongMaterial color="#303030" wireframe />
            </Box>
            <Box
              args={[0.5, 0.5, 0.5]}
              rotation={[0, Math.PI * 0.2, 0]}
              position={[0.2, 0.2, 0.2]}
            >
              <meshPhongMaterial
                color="#FFFFFF"
                emissive="#FFFFFF"
                emissiveIntensity={20}
              />
            </Box>
            <Box
              args={[0.21, 0.21, 0.21]}
              rotation={[0, Math.PI * 0.1, 0]}
              position={[0.2, 0.55, 0.2]}
            >
              <meshPhongMaterial color="#303030" wireframe />
            </Box>
            <Box
              args={[0.2, 0.2, 0.2]}
              rotation={[0, Math.PI * 0.1, 0]}
              position={[0.2, 0.55, 0.2]}
            >
              <meshPhongMaterial
                color="#FFFFFF"
                emissive="#FFFFFF"
                emissiveIntensity={20}
              />
            </Box>
            <Sphere args={[0.031]} position={[0.3, 0.9, 0.3]}>
              <meshPhongMaterial color="#303030" wireframe />
            </Sphere>
            <Sphere args={[0.03]} position={[0.3, 0.9, 0.3]}>
              <meshPhongMaterial
                color="#FFFFFF"
                emissive="#FFFFFF"
                emissiveIntensity={20}
              />
            </Sphere>
            <CubicBezierLine
              start={[0.2, 0.65, 0.2]} // Starting point, can be an array or a vec3
              end={[0.3, 0.9, 0.3]}
              midA={[0.2, 0.7, 0.2]} // First control point
              midB={[0.2, 0.8, 0.2]} // Second control point
              color="black" // Default
              lineWidth={2} // In pixels (default)
              dashed={false} // Default
            /> */}
            <RemoteModel />
          </Stage>
        </Suspense>
        <Stars />
      </Canvas>
    </div>
  );
};

export default Model3DView;

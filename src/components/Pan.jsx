import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Model = () => {
  const { scene } = useGLTF("/models/pan.glb");
  const modelRef = useRef();
  const floatInfluence = useRef(0);
  const direction = useRef(1);


  useFrame(() => {
    const meshes = scene.children.filter(child => child.isMesh);
    meshes.forEach(mesh => {
      if (mesh.morphTargetInfluences) {
        const floatIndex = mesh.morphTargetDictionary["float"];
        if (floatIndex !== undefined) {
          floatInfluence.current += direction.current * 0.01;
          if (floatInfluence.current >= 1 || floatInfluence.current <= 0) {
            direction.current *= -1;
          }
          mesh.morphTargetInfluences[floatIndex] = floatInfluence.current;
        }
      }
    });
  });

  return <primitive object={scene} ref={modelRef} scale={1.7} />;
};

const Pan = () => {
  return (
    
      <Canvas camera={{ position: [-2, 1.7, 5], fov: 50 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[2, 3, 4]} intensity={1.5}  />
        <Model />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
   
  );
};

export default Pan;

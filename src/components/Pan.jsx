import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
  const { scene } = useGLTF("/models/pan.glb");
  const modelRef = useRef();
  const floatInfluence = useRef(0);
  const direction = useRef(1);

  const { viewport } = useThree();


  const scaleFactor = viewport.width < 5 ? 1.4 : 2;

  useEffect(() => {
    const meshes = scene.children.filter(child => child.isMesh);
    meshes.forEach(mesh => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    scene.position.set(0, -0.2, 0); 
    scene.rotation.set(0, 0, 0);
  }, [scene]);

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

  return <primitive object={scene} ref={modelRef} scale={[scaleFactor, scaleFactor, scaleFactor]} />;
};

const Pan = () => {
  return (
    <div style={{ width: "100%", height: "100%", maxHeight: "300px" }}>
      <Canvas
        camera={{ position: [-1, 2, 6], fov: 40 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[2, 3, 4]} intensity={1.5} castShadow />
        <Model />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Pan;

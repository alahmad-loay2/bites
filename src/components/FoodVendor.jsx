import React, { useRef } from 'react'
import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';

const FoodVendor = () => {
  const { scene } = useGLTF("/models/FoodVendor.glb");
  const vendorRef = useRef();

      useFrame((state) => {
          if (vendorRef.current) {
              vendorRef.current.position.x = Math.sin(state.clock.elapsedTime * 1  ) * 0.2;
          }
      });

  return (
    <>
      <primitive position={[0, -2.1, 0]} ref={vendorRef} object={scene} 
      scale={0.01} />
    </>
  )
}

export default FoodVendor

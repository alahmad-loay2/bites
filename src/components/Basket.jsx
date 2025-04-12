import React from "react";
import { useGLTF } from "@react-three/drei";

const Basket = ({ position = [0, 0, 0], scale = 1 }) => {
  const { scene } = useGLTF("/models/basket.glb");

  return <primitive object={scene} position={position} scale={scale} />;
};

export default Basket;

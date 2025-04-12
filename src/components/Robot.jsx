import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";

const Robot = () => {
    const { scene } = useGLTF("/models/robot.glb");
    const robotRef = useRef();
    const [isSmiling, setIsSmiling] = useState(false);

    useEffect(() => {
        const eyesMesh = scene.getObjectByName("eyes");
        if (eyesMesh && eyesMesh.morphTargetDictionary && eyesMesh.morphTargetInfluences) {
            const blinkIndex = eyesMesh.morphTargetDictionary["blink"];
            if (blinkIndex !== undefined) {
                const blink = () => {
                    eyesMesh.morphTargetInfluences[blinkIndex] = 1;
                    setTimeout(() => {
                        eyesMesh.morphTargetInfluences[blinkIndex] = 0;
                    }, 200);
                };
                const interval = setInterval(blink, 3000);
                return () => clearInterval(interval);
            }
        }
    }, [scene]);

    const handleSmile = () => {
        const eyesMesh = scene.getObjectByName("eyes");
        if (eyesMesh && eyesMesh.morphTargetDictionary && eyesMesh.morphTargetInfluences) {
            const happyIndex = eyesMesh.morphTargetDictionary["happy"];
            if (happyIndex !== undefined) {
                eyesMesh.morphTargetInfluences[happyIndex] = 1;
                setIsSmiling(true);
                setTimeout(() => {
                    eyesMesh.morphTargetInfluences[happyIndex] = 0;
                    setIsSmiling(false);
                }, 2000);
            }
        }
    };

    useFrame((state) => {
        if (robotRef.current) {
            robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 2  ) * 0.2 - 2;
        }
    });

    return (
        <>
        <primitive 
        onClick={handleSmile} 
        ref={robotRef} 
        position={[-2, 0, 0]} 
        object={scene} 
        scale={1.7} />
        <mesh position={[0.6, -2.2, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 32]} />
        <meshStandardMaterial color="black" transparent opacity={0.1} />
      </mesh>
        </>
    );
};

export default Robot;
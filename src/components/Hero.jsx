import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import Robot from './Robot';
import TypingEffect from './TypingEffect';


const Hero = () => {
    return (
        <div className="hero">
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 2, 5] }}>
                    <ambientLight intensity={2} />
                    <directionalLight position={[-.5, 1, 1]} intensity={2} />
                    <OrbitControls enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                        minAzimuthAngle={-Math.PI / 3}
                        maxAzimuthAngle={Math.PI / 3} />
                    <Robot />
                </Canvas>
            </div>
            <div className='hero-text'>
                <TypingEffect text="Hello! I am your Chef Robot, ready to assist you with recipes!"/>
            </div>
        </div>
    )
}

export default Hero

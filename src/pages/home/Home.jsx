import React, { useEffect, useState } from 'react';
import './home.css';
import RippleEffect from '../../components/RippleEffect';
import CursorFollower from '../../components/CursorFollower';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import Robot from '../../components/Robot';
import TypingEffect from '../../components/TypingEffect';
import FoodVendor from '../../components/FoodVendor';
import Divider from '../../components/Divider';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [robotLoading, setRobotLoading] = useState(true);
  const [vendorLoading, setVendorLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='home'>
      {isMobile ? <RippleEffect /> : <CursorFollower />}
      <Divider />
      <div className="hero">
        <div className="canvas-container">
          {robotLoading && (
            <div className="canvas-loader">
              <div className="spinner-border text-dark" role="status"></div>
            </div>
          )}
          <Canvas
            camera={{ position: [0, 2, 5] }}
            onCreated={() => setRobotLoading(false)}
          >
            <directionalLight position={[-0.5, 1, 1]} intensity={2} />
            <Environment preset="city" />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
            />
            <Robot />
          </Canvas>
        </div>
        <div className='hero-text'>
          <TypingEffect text="Hello! I am your Chef Robot, ready to assist you with recipes!" />
        </div>
      </div>

      <Divider text="Keep Exploring Recipes!" />

      <div className="callToAction">
        <div className="canvas-container">
          {vendorLoading && (
            <div className="canvas-loader">
              <div className="spinner-border text-dark" role="status"></div>
            </div>
          )}
          <Canvas
            camera={{ position: [0, 2, 4] }}
            onCreated={() => setVendorLoading(false)}
          >
            <directionalLight position={[-1, 1, 1]} intensity={1} />
            <Environment preset="sunset" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3.5}
              maxPolarAngle={Math.PI / 2.5}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
            />
            <FoodVendor />
          </Canvas>
        </div>
        <div className='callToAction-text'>
          <p>Get your <span>vendor</span> and lets start working</p>
          <Link to='/recipes'><button className="btn btn-dark">Get Started!</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

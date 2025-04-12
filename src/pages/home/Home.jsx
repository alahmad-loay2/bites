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
import { color } from 'framer-motion';


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
    <>
    
    <div className='home'>
      {isMobile ? <RippleEffect /> : <CursorFollower />}

      <section className='hero-section'>
      <div className="hero">
        <div className="canvas-container">
          {robotLoading && (
            <div className="canvas-loader">
              <div className="spinner-border text-dark" role="status"></div>
            </div>
          )}
          <Canvas
            camera={{  position: [-2, 2.5, 5], fov : 50}}
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
          <img className='food-icon pizza' src="/images/pizza-icon.png" alt=""  />
          <img className='food-icon burger' src="/images/burger-icon.png" alt="" />
          <img className='food-icon leaf'src="/images/leaf-icon.png"alt="" />
          <img className='food-icon leaf2'src="/images/leaf-icon.png"alt="" />
          <img className='food-icon leaf3'src="/images/leaf-icon.png"alt="" />

        </div>
        <img className='food-icon sandwich' src="/images/sandwich-icon.png" alt="" />
        <img className='food-icon taco' src="/images/taco-icon.png" alt="" />
        <img className='food-icon leaf4'src="/images/leaf-icon.png"alt="" />
        <img className='food-icon leaf5'src="/images/leaf-icon.png"alt="" />
        <img className='food-icon leaf6'src="/images/leaf-icon.png"alt="" />
        <img className='food-icon hotdog' src="/images/hotdog-icon.png" alt="" />
        
        <div className='hero-text'>
        <h1 className='hero-title'>Welcome to <span style={{color: "#F97E6D"}}>World Bites</span></h1>
          <TypingEffect text={ `hello, explorer! I’m ChefBot - your personal culinary guide through the world of flavor. \n  \n Together, we’ll conquer cravings and discover deliciousness!`} />
        </div>
      </div>
      </section>

      <div className="wave-divider"></div>
        
      <section className='vendor-section'>
      <div className="bubble bubble1"></div>
    <div className="bubble bubble2"></div>
    <div className="bubble bubble3"></div>
      <div className="callToAction">
        <div className="canvas-container">
          {vendorLoading && (
            <div className="canvas-loader">
              <div className="spinner-border text-dark" role="status"></div>
            </div>
          )}
          <Canvas
            camera={{ position: [0, 2, 4],  fov:60}}
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
        <div class="callToAction-wrapper">
        <div className='callToAction-text'>
          <p>Get your <span style={{color: "#EDD551"}}>vendor</span> and lets start working</p>
          <img className='arrow' src="/images/arrow.png" alt="" />
          <Link to='/recipes'><button className="home-btn" >Get Started!</button></Link>
        </div>
        </div>
      </div>
      </section>
    </div>
    </>
  );
};

export default Home;
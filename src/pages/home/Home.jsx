import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import './home.css'
import RippleEffect from '../../components/RippleEffect';
import CursorFollower from '../../components/CursorFollower';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {  
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className='home'>
      {isMobile ? <RippleEffect /> : <CursorFollower />}
      <Hero />
      <div className="callToAction">
      <Link to='/recipes'><button className="btn btn-dark">Get Started!</button></Link>
      </div>
    </div>
  )
}

export default Home

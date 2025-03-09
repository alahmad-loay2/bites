import React, { useState, useEffect } from "react";

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(5);

  useEffect(() => {
    const moveCursor = (e) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setSize(10); 
    const handleMouseLeave = () => setSize(5); 

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("button, img, .hero-text").forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("button, img, .hero-text").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x ,
        top: position.y ,
        width: `${size}px`,
        height: `${size}px`,
        background: "var(--secondary-color)",
        borderRadius: "50%",
        pointerEvents: "none",
        boxShadow: `0 0 10px var(--text-color)`,
        mixBlendMode: "exclusion",
        transform: `scale(${size})`,
        transition: "transform 0.1s ease-in-out", 
        zIndex: 1000
      }}
    />
  );
};

export default CursorFollower;

import React, { useState, useEffect } from "react";

const RippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const createRipple = (e) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== Date.now()));
      }, 600); 
    };

    window.addEventListener("touchstart", createRipple);

    return () => {
      window.removeEventListener("touchstart", createRipple);
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none" }}>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: "50px",
            height: "50px",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "50%",
            transform: "scale(0)",
            animation: "ripple-animation 0.6s ease-out",
          }}
        />
      ))}
      <style>
        {`
          @keyframes ripple-animation {
            to {
              transform: scale(3);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RippleEffect;

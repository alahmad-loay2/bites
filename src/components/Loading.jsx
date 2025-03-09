import React, { useEffect, useState } from "react";

const Loading = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;

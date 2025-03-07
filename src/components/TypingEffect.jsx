import React from "react";
import { motion } from "framer-motion";

const TypingEffect = ({ text, fontSize = "1.4rem", color = "var(--text-color)" }) => {
  const letters = text.split(""); 

  return (
    <div style={{ fontSize, color }}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.1, 
            duration: 0.1,
            ease: "easeOut",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default TypingEffect;

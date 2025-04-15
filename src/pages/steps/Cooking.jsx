import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Robot from "../../components/Robot";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TypingEffect from "../../components/TypingEffect";
import TimerBox from "../../components/TimerBox";
import './cooking.css';
import Confetti from 'react-confetti';
import {useWindowSize} from '@react-hook/window-size';

function Cooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};
  const [width, height] = useWindowSize();
  const [currentStep, setCurrentStep] = useState(0);
  const [robotLoading, setRobotLoading] = useState(true);

  useEffect(() => {
    if (!recipe) {
      navigate("/");
    }
  }, [recipe, navigate]);

  const handleNext = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentInstruction = recipe?.steps?.[currentStep];

  const fillerMessages = [
    "Take a deep breath—you're doing fantastic! Let’s stir things up and make this recipe unforgettable! 🥄✨",
    "Cooking isn’t just a task, it’s an adventure! Trust your gut (and taste buds), and let’s keep going! 🌟🍳",
    "Everything smells delicious already! Imagine how proud you'll be serving this up—stay with me, chef! 👩‍🍳💖",
    "You’ve got the skills and the spirit! Just a few more steps and we’ll have a masterpiece on our hands. 🍲👑",
    "This is your time to shine in the kitchen spotlight! Keep your focus, and let’s make magic happen. 🔥🎬",
    "You're not just cooking—you're creating something beautiful! Let’s make this dish one to remember. 🎨🍝",
    "Feeling a little tired? Shake it off! We’re so close to tasting all your hard work. Keep going! 💥🍛",
    "Every great chef starts just like this—with focus, passion, and a sprinkle of fun. You’ve got this! 🍳🌈",
    "Picture the final plate... now let’s make it happen, step by step. I’m right here with you! 🧑‍🍳📸"
  ];

  const getFillerMessage = () => {
    return fillerMessages[Math.floor(Math.random() * fillerMessages.length)];
  };

  return (
    <div className="cooking">
      {recipe && (
        <>
          <button className="btnStyle backToRecipe" onClick={() => {navigate(-1)}}>go back</button>
          <h5 className="step-count">
            Step {currentStep + 1} of {recipe.steps.length}
          </h5>
  
          <div className="step-title">
            <h4>
              {currentStep === 0
                ? "Getting all the gathered ingredients ready"
                : "Time for the Next Cooking Step"}
            </h4>
  
            <div className="prepare-model">
              <DotLottieReact
                src={
                  currentStep === 0
                    ? "/models/Animation - 1744679170662.lottie"
                    : "/models/Animation - 1744678863862.lottie"
                }
                loop
                autoplay
              />
            </div>
            <TimerBox/>
          </div>
  
          <div className="instruction-container">
            <div className="instruction-title-wrapper">
            <h3 style={{ fontWeight: 700 }}>Step-by-Step Instruction</h3>
            <p className="step-instruction">{currentInstruction}</p>
            </div>
  
            <div className="cook-robot-wrapper">
  <div className="speech-bubble-instruction">
    <TypingEffect
      text={
        currentStep === 0
          ? "Be careful, knives are sharp! 🔪 Let's take it step by step!"
          : currentStep === recipe.steps.length -1
          ? "Congratulations, chef! You’ve done it! 🎉🍽️ Time to enjoy your masterpiece!"
          : getFillerMessage()
      }
      fontSize="1.2rem"
      speed={0.05}
    />
  </div>

  <div className="cook-robot-container">
    {robotLoading && (
      <div className="cook-canvas-loader"></div>
    )}
    <Canvas
      camera={{ position: [-1, 0, 2.5], fov: 40 }}
      onCreated={() => setRobotLoading(false)}
    >
      <directionalLight position={[0, 1, 1]} intensity={2} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <group rotation={[0, Math.PI / -3.3, 0]} scale={[0.3, 0.3, 0.3]}>
        <Robot position={[-0, -1, 0]} />
      </group>
    </Canvas>
  </div>
</div>
          </div>
  
          <div className="step-buttons">
            <button onClick={handlePrev} disabled={currentStep === 0}>
              <ArrowLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === recipe.steps.length - 1}
            >
              <ArrowRight />
            </button>
          </div>
          {currentStep === recipe.steps.length - 1 && (
         <Confetti width={width} height={height} recycle={false} />
          )}
        </>
      )}
    </div>
  );
  
}

export default Cooking;

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pan from "../../components/Pan";
import './steps.css';
import Robot from '../../components/Robot';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import TypingEffect from "../../components/TypingEffect";
import { useInView } from 'react-intersection-observer';
import Basket from '../../components/Basket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Physics } from "@react-three/cannon";


const Steps = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [robotLoading, setRobotLoading] = useState(true);
  const navigate = useNavigate();
  const { ref: ingredientsRef, inView: isIngredientsVisible } = useInView({
    threshold: 0.3,
  });
  
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setRecipe(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
  
    fetchRecipe();
  }, [id]);
  

  const handleArrowClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      navigate("/cooking");
    }, 3000);
  };
  

  return (
    <>
    
      <Breadcrumbs />
      {recipe ? (
        <>
          <div className="ingredients-container">
            <div className="title-container">
              <div className="steps-title">
                <h2>{recipe.title}</h2>
                <p>
                  Creamy, flavorful, and comforting—this Chicken Stroganoff is a
                  quick and easy twist on the classic dish. Perfectly tender
                  chicken in a rich, savory sauce, served over rice for a hearty
                  meal!
                </p>
              </div>
              <div className="pan-model">
              <Pan />
              </div> 
            </div>

            <div className="time-description">
                <div className="description-list">
                    <img className = "description-icon"src="/images/globe.png" alt=""/>
                    <div className="description-items">
                        <li>Cuisine</li>
                        <li>Russian</li>
                    </div>
                </div>
                <div className="description-list">
                    <img className = "description-icon"src="/images/time-left.png"/>
                    <div className="description-items">
                        <li>Total Time</li>
                        <li>35-40 minutes</li>
                    </div>
                </div>
                <div className="description-list">
                    <img  className = "description-icon"src="/images/serving-dish.png"/>
                    <div className="description-items">
                        <li>Servings</li>
                        <li>3-4</li>
                    </div>
                </div>
                <div className="description-list">
                    <img className = "description-icon" src="/images/meal.png"/>
                    <div className="description-items">
                        <li>Preparation Time</li>
                        <li>10-20 minutes</li>
                    </div>
                </div> 
            </div>
            <div className="section">
              <img className = "frame-background"src="/images/Frame 4.png" alt="" />
          <div className="robot-section">
          <div className="robot-container">
          {robotLoading && (
            <div className="canvas-loader">
              <div className="spinner-border text-dark" role="status"></div>
            </div>
          )}
            <Canvas
            camera={{ position: [-1, 0, 2.5], fov: 50 }}
            onCreated={() => setRobotLoading(false)}
            >
            <directionalLight position={[0, 1, 1]} intensity={2} />
            <Environment preset="city" />
            <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}/>
          <group scale={[0.3, 0.3, 0.3]}> 
            <Robot position={[0, -1, 0]}/>
          </group>
          </Canvas>
          </div>

          <div className="speech-bubble">
          <TypingEffect 
          text={
           `Yay! You chose ${recipe.title}—great choice! I’m so excited to cook this with you! ✨ I’ll guide you every step of the way. First, let’s gather our ingredients—scroll down to see the ingredients needed, and let’s get started!`}
            fontSize="0.9rem"
            speed={0.05}
          />
          
          </div>
          
        </div>
          </div>
            <h2 className="prepare-title">Preparation</h2>
            <div className="ingredient-container">
            <div className="ingredients-list-container">
              <h3 className="ingredients-title">Ingredients</h3>
              
              <ul className="ingredients-list" ref={ingredientsRef}>
              {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}><FontAwesomeIcon icon={faStar} className="ingredient-icon"/>{ingredient}
              </li>
              ))}
              </ul>

              <div className="arrow-container">
                <button
                onClick={handleArrowClick}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                aria-label="Go to cooking page"
                  >
              <img
                className="arrow-ingredients"
                src="/images/arrow.png"
                alt="Go to cooking page"
                  />
                </button>
              </div>

          </div>
          </div>

          {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">

      <Canvas
        camera={{ position: [0, 1, 4], fov: 50 }}
        style={{ width: "600px", height: "400px" }}
      >
        <ambientLight intensity={0.8} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false}/>
        <Basket position={[0, -1, 0]} scale={[0.2, 0.2, 0.2]} />
      </Canvas>
      <p>Preparing your cooking station...</p>
        </div>
      </div>
      )}
      </div>

          <div className="steps-container">
            {recipe.steps?.map((step, index) => (
              <div key={index}>{step}</div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Steps;

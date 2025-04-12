import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pan from "../../components/Pan";
import './steps.css';
import { faGlobe, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Robot from '../../components/Robot';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import TypingEffect from "../../components/TypingEffect";
import { useInView } from 'react-intersection-observer';
import Basket from '../../components/Basket'


const Steps = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [robotLoading, setRobotLoading] = useState(true);
  const navigate = useNavigate();
  const { ref: ingredientsRef, inView: isIngredientsVisible } = useInView({
    threshold: 0.3,
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const toggleCheckedbox = (index) => {
    setCheckedItems(prev => {
      const updated = prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index];
  
     
      if (recipe && updated.length === recipe.ingredients.length) {
        setShowPopup(true);
        setTimeout(() => {
          navigate("/cooking");
        }, 1000000000); 
      }
  
      return updated;
    });
  };
  
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(db, "recipes", id);
        const recipeSnap = await getDoc(recipeRef);
        if (recipeSnap.exists()) {
          setRecipe(recipeSnap.data());
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

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
              {/* <div className="pan-model">
              <Pan />
              </div> */}
            </div>

            <div className="time-description">
                <div className="description-list">
                    <FontAwesomeIcon icon={faGlobe} className="description-icon"/>
                    <div className="description-items">
                        <li>Cuisine</li>
                        <li>Russian</li>
                    </div>
                </div>
                <div className="description-list">
                    <FontAwesomeIcon icon={faClock} className="description-icon"/>
                    <div className="description-items">
                        <li>Total Time</li>
                        <li>35-40 minutes</li>
                    </div>
                </div>
                <div className="description-list">
                    <FontAwesomeIcon icon={faClock} className="description-icon"/>
                    <div className="description-items">
                        <li>Servings</li>
                        <li>3-4</li>
                    </div>
                </div>
                <div className="description-list">
                    <FontAwesomeIcon icon={faClock} className="description-icon"/>
                    <div className="description-items">
                        <li>Preparation Time</li>
                        <li>10-20 minutes</li>
                    </div>
                </div> 
            </div>
            <div className="section">
          <div className="robot-section">
            <Canvas
            camera={{ position: [-3, 1, 5], fov: 30 }}
            style={{ width: "300px", height: "600px" }} 
            >
            <Environment preset="city" />
            <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 2} 
            maxPolarAngle={Math.PI / 2} 
            minAzimuthAngle={-Math.PI / 3} 
            maxAzimuthAngle={Math.PI / 3} />
          <group scale={[0.3, 0.3, 0.3]}> 
            <Robot position={[0, -1, 0]}/>
          </group>
          </Canvas>
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
            <div className="ingredients-list-container">
              <h3 className="ingredients-title">Ingredients</h3>
              
            <ul className="ingredients-list"
            ref={ingredientsRef}>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>
                <input type="checkbox"
                checked={checkedItems.includes(index)}
                onChange={()=> toggleCheckedbox(index)} 
                />
                <span
                style={{
                  textDecoration: checkedItems.includes(index)
                    ? 'line-through'
                    : 'none',
                   }}
                   >
                  {ingredient}
               </span>
               </li>
              ))}
            </ul>
          </div>
          </div>

          {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">

      <Canvas
        camera={{ position: [0, 1, 4], fov: 10 }}
        style={{ width: "600px", height: "400px" }}
      >
        <ambientLight intensity={0.8} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
        <Basket position={[0, -1, 0]} scale={[0.2, 0.2, 0.2]} />
      </Canvas>
      <p>Preparing your cooking station...</p>
    </div>
  </div>
)}




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

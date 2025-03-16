import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({id, img, title, cuisine }) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <div className="image-container">
        <img src={img} alt={title} />
        <div className="hover-text">
          <p>Get 3D Scene</p>
        </div>
      </div>
      <div className="recipe-content">
        <h5>{title}</h5>
        <div className="get-started">
        <p>cuisine - {cuisine}</p>
        <button onClick={() => navigate(`/recipes/steps/${id}`)} className="start-btn">Get Started!</button> 
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

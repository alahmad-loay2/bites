import React from "react";

const RecipeCard = ({img, title, cuisine, description }) => {

  return (
    <div className="recipe-card">
      <div className="image-container">
        <img src={img} alt={title} />
      </div>

      <div className="recipe-content">
        <h5>{title}</h5>
        <span>{cuisine}</span>

        <p>
          {description}
        </p>
        <button className="start-btn">Get Started!</button> 

      </div>
    </div>
  );
};

export default RecipeCard;

// import React from "react";
// import { useState } from "react";

// const RecipeCard = ({img, title, cuisine, description}) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const toggleDescription = () => {
//       setIsExpanded(!isExpanded);
//     };

//   return (
//     <div className="recipe-card">

//       <div className="image-container">
//       <img src={img} alt={title} />
//       </div>

//       <div className="recipe-content">
//       <h4>{title}</h4>
//       <span>{cuisine}</span>
//       <p className={isExpanded? "expanded" : "truncate"}>{description}</p>

//       <button className="toggle-btn" onClick={toggleDescription}>{isExpanded? "show Less" : "Show More"}</button>
//       </div>

//     </div>
//   );
// }
// export default RecipeCard;

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

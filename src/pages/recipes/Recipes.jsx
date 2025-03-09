import React from 'react'
import './recipes.css'
import { useNavigate } from 'react-router-dom';
import  RecipeCard from "./RecipeCard";
import recipes from './recipesList';

const Recipes = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className="title">
    <h1>Explore all of the delicious recipes</h1>
    <div className='hr-container'>
    <hr/>
    <p>From the page to your plate, no need to wait!</p>
    <hr/>
    </div>
    <input type="text" id="recipe-search" placeholder="Search for recipes..."></input>
    </div>
    <h3>Free Recipes</h3>

    <div className='recipes-container'>
      {recipes.map((recipe)=> (
        <RecipeCard
          key = {recipe.id}
          id = {recipe.id}
          title = {recipe.title}
          cuisine={recipe.cuisine}
          description = {recipe.description}
          img = {recipe.img}
          />
      ))}
    </div>
    {/* <div className='paid-recipes'>
        <button onClick={() => navigate('/login')}>paid</button>
     </div>   */}
</>
  );
}

export default Recipes;

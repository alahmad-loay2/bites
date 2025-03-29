import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const Steps = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeRef = doc(db, "recipes", id);
                const recipeSnap = await getDoc(recipeRef);
                if (recipeSnap.exists()) {
                    setRecipe(recipeSnap.data());
                } 
            } catch (error) {
                console.error("Error");
            }
        };

        fetchRecipe();
    }, [id]);

    return (

        <>
        {recipe ? (
            <>
            <div className='ingredients-container'>
                <h2>{recipe.title} - Steps</h2>
                <ul>
                {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                </ul>
            </div>
            
            <div className='steps-container'>
                {recipe.steps?.map((step, index) => (
                    <div>
                        {step}
                    </div>
                ))}
            </div>

            </>
        ) 
        : (<p>loading ...</p>)
        }
        </>

    );
};

export default Steps;

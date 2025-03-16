import React, { useEffect, useState } from 'react'
import './recipes.css'
import { useNavigate } from 'react-router-dom';
import RecipeCard from "../../components/RecipeCard";
import Divider from '../../components/Divider';
import getUserInfo from '../../firebase/getUserInfo';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { query, where } from "firebase/firestore";

const Recipes = () => {
    const navigate = useNavigate();
    const { userInfo } = getUserInfo();

    const [freeRecipes, setFreeRecipes] = useState([]);
    const [paidRecipes, setPaidRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const freeQuery = query(collection(db, "recipes"), where("paid", "==", false));
                const freeSnapshot = await getDocs(freeQuery);
                const freeData = freeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFreeRecipes(freeData);

                if (userInfo?.paid) {
                    const paidQuery = query(collection(db, "recipes"), where("paid", "==", true));
                    const paidSnapshot = await getDocs(paidQuery);
                    const paidData = paidSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setPaidRecipes(paidData);
                }
            } catch (error) {
                console.error("Error");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [userInfo]);

    return (
        <>
            <div className="title">
                <h2>Explore all our delicious recipes</h2>
                <div className='hr-container'>
                    <hr />
                    <p>search</p>
                    <hr />
                </div>
                <input type="text" id="recipe-search" placeholder="Search for recipes..."></input>
            </div>
            {loading ? (
                <p>loading recipes...</p>
            ) : (
            <div className="all-container">
                <h3>Free Recipes</h3>
                <div className='recipes-container'>
                    {freeRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            cuisine={recipe.cuisine}
                            description={recipe.description}
                            img={recipe.img}
                        />
                    ))}
                </div>
            </div>
            )}
            <Divider />
            {userInfo ? (
                userInfo.paid ? (
                    <div className='all-container'>
                        <h3>Paid Recipes</h3>
                        <div className='recipes-container'>
                            {paidRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    id={recipe.id}
                                    title={recipe.title}
                                    cuisine={recipe.cuisine}
                                    description={recipe.description}
                                    img={recipe.img}
                                />
                            ))}
                        </div>
                    </div>) : (
                    <div className='pay-login'>
                    <button className='pay-btn btn btn-dark' onClick={() => navigate('/payment')}>pay to access more!</button>
                    </div>
                )) : (
                <div className='pay-login'>
                <button className='pay-btn btn btn-dark' onClick={() => navigate('/login')}>pay to access more!</button>
                </div>
            )}
        </>
    );
}

export default Recipes;

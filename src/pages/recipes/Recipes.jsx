import React, { useEffect, useState } from 'react';
import './recipes.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from "../../components/RecipeCard";
import Divider from '../../components/Divider';
import getUserInfo from '../../firebase/getUserInfo';
import { getDocs, collection, query, where, limit, startAfter } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { SkeletonGroup } from '../../components/RecipeCardSkeleton';


const Recipes = () => {
    const navigate = useNavigate();
    const { userInfo } = getUserInfo();
    const [freeRecipes, setFreeRecipes] = useState([]);
    const [paidRecipes, setPaidRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPaid, setLoadingPaid] = useState(false);
    const [lastVisiblePaid, setLastVisiblePaid] = useState(null);
    const [totalPaidCount, setTotalPaidCount] = useState(0);
    const [page, setPage] = useState(0);
    const recipesPerPage = 3;

    const [search, setSearch] = useState("")
    const [input, setInput] = useState("")

    const onSearch = () => {
        const trimmed = input.trim();
        setSearch(trimmed);
        if (trimmed === search) return;

         setPage(0); 
         setPaidRecipes([]); 
         setLastVisiblePaid(null);
    }

    useEffect(() => {
        const fetchFreeRecipes = async () => {
            try {
                setLoading(true);
                const freeQuery = query(collection(db, "recipes"), where("paid", "==", false));
                const freeSnapshot = await getDocs(freeQuery);
                const allFreeData = freeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                const filtered = search
                    ? allFreeData.filter(recipe =>
                        recipe.title.toLowerCase().includes(search.toLowerCase())
                    )
                    : allFreeData;
    
                setFreeRecipes(filtered);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFreeRecipes();
    }, [search]);
    
    

    useEffect(() => {
        const fetchTotalPaidCount = async () => {
            try {
                const allPaidQuery = query(collection(db, "recipes"), where("paid", "==", true));
                const allPaidSnapshot = await getDocs(allPaidQuery);
                setTotalPaidCount(allPaidSnapshot.size);

                if(search != ""){
                    const filtered = search
                    ? allPaidData.filter(recipe =>
                        recipe.title.toLowerCase().includes(search.toLowerCase())
                    )
                    : allPaidData;
    
                setTotalPaidCount(filtered.length);
                }
            } catch (error) {
                console.error("Error");
            }
        };
        if (userInfo?.paid) {
            fetchTotalPaidCount();
        }
    }, [userInfo, search]);

    useEffect(() => {
        const fetchPaidRecipes = async () => {
            if (!userInfo?.paid) return;
    
            setLoadingPaid(true);
            try {
                if (search != "") {
                    const paidQuery = query(collection(db, "recipes"), where("paid", "==", true));
                    const paidSnapshot = await getDocs(paidQuery);
                    const allPaidData = paidSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                    const filtered = allPaidData.filter(recipe =>
                        recipe.title.toLowerCase().includes(search.toLowerCase())
                    );
    
                    setPaidRecipes(filtered);
                    setTotalPaidCount(filtered.length); 
                    setLastVisiblePaid(null); 
                    return;
                }
                else {
                const paidQuery = lastVisiblePaid
                    ? query(
                        collection(db, "recipes"),
                        where("paid", "==", true),
                        startAfter(lastVisiblePaid),
                        limit(recipesPerPage)
                    )
                    : query(
                        collection(db, "recipes"),
                        where("paid", "==", true),
                        limit(recipesPerPage)
                    );
    
                const paidSnapshot = await getDocs(paidQuery);
                const paidData = paidSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                setPaidRecipes(prev => [...prev, ...paidData]);
    
                const lastDoc = paidSnapshot.docs[paidSnapshot.docs.length - 1];
                if (lastDoc) setLastVisiblePaid(lastDoc);
                }
            } catch (error) {
                console.error("Error fetching paid recipes:", error);
            } finally {
                setLoadingPaid(false);
            }
        };
    
        fetchPaidRecipes();
    }, [page, userInfo, search]);
    

    const loadMorePaidRecipes = () => {
        if (search) return;
        setPage(prev => prev + 1);
    };


    return (
        <>
            <div className="title">
                <h2>Explore all our delicious recipes</h2>
                <div className='hr-container'>
                    <hr />
                    <p>Chop, stir, and fry — we’ll help you try!</p>
                    <hr />
                </div>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" id="recipe-search" placeholder="Search for recipes..." />
                <button onClick={onSearch} className='search-btn'>search</button>
            </div>

            {loading ? (
                <>
                    <div className="all-container">
                        <h3>Free Recipes</h3>
                        <SkeletonGroup />
                    </div>
                    {userInfo?.paid && (
                        <>
                            <Divider />
                            <div className="all-container">
                                <h3>Paid Recipes</h3>
                                <SkeletonGroup />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
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

                    <div className="polka-divider"></div>

    
                    {userInfo ? (
                        userInfo.paid ? (
                            <div className="all-container">
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
                                {!search && paidRecipes.length < totalPaidCount &&(
                                        <button onClick={loadMorePaidRecipes} className="load-more-btn" disabled={loadingPaid}>
                                            {loadingPaid ? "Loading..." : "Load More"}
                                        </button>
                                )}
                            </div>
                        ) : (
                            <div className='pay-login'>
                                <button className='pay-btn btn' onClick={() => navigate('/payment')}>
                                    Pay to access more!
                                </button>
                            </div>
                        )
                    ) : (
                        <div className='pay-login'>
                            <button className='pay-btn btn' onClick={() => navigate('/login')}>
                                Pay to access more!
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Recipes;

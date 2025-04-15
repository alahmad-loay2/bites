import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import supabase from '../../supabase/supabaseClient';
import getUserInfo from "../firebase/getUserInfo";

const RecipeCard = ({id, img, title, cuisine }) => {
  const navigate = useNavigate();
  const {userInfo} = getUserInfo()
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin !== undefined) {
      setIsAdmin(userInfo.isAdmin); 
    }
  }, [userInfo]);

  const deleteRecipe = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert("Recipe not found");
        return;
      }
      const imgPath = img.split("/").pop(); 
      const {error} = await supabase.storage.from("recipe-images").remove([imgPath]);
      if(error) {
        alert(error.message)
        return
      }
      await deleteDoc(docRef);
      alert("Recipe deleted");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="recipe-card">
      <div className="image-container">
        <img src={img} alt={title} />
      </div>
      <div className="recipe-content">
        <h5>{title}</h5>
        <div className="get-started">
        <p>cuisine - {cuisine}</p>
        <button onClick={() => navigate(`/recipes/steps/${id}`)} className="start-btn">Get Started!</button>
        {isAdmin && (<button onClick={deleteRecipe} className="btn btn-dark">delete</button>)}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

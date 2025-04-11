import React, { useState, useRef } from 'react'
import './admin.css'
import { addDoc, collection } from 'firebase/firestore';
import supabase from '../../supaBase/supabaseClient';
import { db } from '../../firebase/config';
import { ChefHat, Plus, X, ArrowLeft } from 'lucide-react';
import SidebarComp from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const[steps, setSteps] = useState([''])
    const [title, setTitle] = useState("");
    const[ingredients, setIngredients] = useState([''])
    const [img, setImg] = useState(null);
    const [cuisine, setCuisine] = useState("")
    const [paid, setPaid] = useState(false)
    const fileInputRef = useRef(null);

    const navigate = useNavigate()

    const addStep = () => {
        setSteps([...steps, '']);
      };

    const removeStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
      };
    
      const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) {
          setImg(file);
        }
      };

    const uploadImg = async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage.from("recipe-images").upload(fileName, file);
        if (error) {
            console.error("Upload error:", error.message);
            return null;
        }
        return supabase.storage.from("recipe-images").getPublicUrl(fileName).data.publicUrl;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!title || !ingredients[0] || !steps[0] || !img || !cuisine){
            alert("missing")
            return
        }
        const imgUrl = await uploadImg(img);
        if (!imgUrl) return;
        try {
            const docRef = await addDoc(collection(db, "recipes"), {
                cuisine,
                paid,
                title,
                ingredients,
                steps, 
                img : imgUrl
            });
            setCuisine("");
            setTitle("");
            setPaid(false);
            setIngredients(['']);
            setSteps(['']);
            setImg(null)
            alert("recipe added")
    }
    catch(err){
        alert("error")
    }
}

return (
    <div className="dashboard">
      <SidebarComp />

      <main className="main-content">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="form-container">
          <h2 className="form-title">Add New Recipe</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Recipe Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Enter recipe name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cuisine Type</label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="form-input"
                placeholder="Enter cuisine type"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Recipe Image</label>
              <div
                className="drag-drop-area"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <ChefHat size={48} color="#9bb9a0" />
                <p>Drag and drop your image here, or click to select</p>
                <p className="text-sm">{img ? img.name : 'PNG, JPG up to 10MB'}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => {
                      const updateIngredients = [...ingredients];
                      updateIngredients[index] = e.target.value;
                      setIngredients(updateIngredients);
                    }}
                    className="form-input"
                    placeholder="Enter ingredient"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="remove-btn"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="add-btn"
              >
                <Plus size={20} />
                Add Ingredient
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Preparation Steps</label>
              {steps.map((step, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => {
                      const updateSteps = [...steps];
                      updateSteps[index] = e.target.value;
                      setSteps(updateSteps);
                    }}
                    className="form-input"
                    placeholder={`Step ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="remove-btn"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="add-btn"
              >
                <Plus size={20} />
                Add Step
              </button>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
                className="checkbox-input"
                id="paid"
              />
              <label htmlFor="paid">Premium Recipe</label>
            </div>

            <button type="submit" className="submit-btn">
              Add Recipe
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Admin;
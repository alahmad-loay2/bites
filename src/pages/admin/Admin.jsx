import React, { useState } from 'react'
import './admin.css'
import { addDoc, collection } from 'firebase/firestore';
import supabase from '../../supaBase/supabaseClient';
import { db } from '../../firebase/config';
const Admin = () => {
    const[steps, setSteps] = useState([''])
    const [title, setTitle] = useState("");
    const[ingredients, setIngredients] = useState([''])
    const [img, setImg] = useState(null);
    const [cuisine, setCuisine] = useState("")
    const [paid, setPaid] = useState(false)

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
        if(!title || !ingredients || !steps || !img || !cuisine){
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
    <div>
      <form className='add-recipe' onSubmit={handleSubmit}>
        <h3>add recipe</h3>
        <label>name</label>
        <input type="text" placeholder='name' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label>cuisine</label>
        <input type="text" placeholder='cuisine' value={cuisine} onChange={(e) => setCuisine(e.target.value)}/>
        <label>image</label>
        <input type='file' onChange={(e) => setImg(e.target.files[0])}/>
        <label>ingredients</label>
        {ingredients.map((ingredient, index) => (
            <div key={index} className="inputs">
                <input type="text" value={ingredient} onChange={(e) => {
                    const updateIngredients = [...ingredients];
                    updateIngredients[index] = e.target.value;
                    setIngredients(updateIngredients);
                }}
                />
                <button className='btn btn-danger' type="button" onClick={() => removeIngredient(index)}>X</button>
            </div>
            ))}
        <button className='btn btn-dark' type="button" onClick={addIngredient}>Add Ingredient</button>

        <label>steps</label>
        {steps.map((step, index) => (
            <div key={index} className="inputs">
                <input type="text" value={step} onChange={(e) => 
                {const updateSteps = [...steps];
                    updateSteps[index]=e.target.value;
                    setSteps(updateSteps);
                }} />
                <button className='btn btn-danger' type="button" onClick={() => removeStep(index)}>X</button>
            </div>
        ))}
         <button className='btn btn-dark' type="button" onClick={addStep}>Add Step</button>
         <div className="paid">
        <label>paid</label>
        <input type='checkbox' value={paid} onChange={(e) => setPaid(e.target.checked)}/>
        </div>
        <button className='btn btn-dark'>add recipe</button>
      </form>
    </div>
  )
}

export default Admin

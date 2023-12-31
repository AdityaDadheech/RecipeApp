import axios from "axios";
import { set } from "mongoose";
import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId.js";
import { useNavigate } from "react-router-dom";
import {Cookies, useCookies} from "react-cookie";

export const Create_recipe = () => {
    
    const userID = useGetUserId();
    const [recipe, setRecipe] = useState({
        name:"",
        ingredients:[],
        instructions:"",
        imageUrl:"",
        cookingTime:0,
        userOwner:userID,
    })
    
    const [cookie,_] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const handleChange=(event)=>{
        const {name, value} = event.target;
        setRecipe({...recipe,[name]:value});
    }

    const handleAddIngredient = () =>{
        const ingredients = [...recipe.ingredients,""];
        setRecipe({...recipe, ingredients});
    };

    const handleIngredientChange = (event, idx)=>{
        const {value} = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx] = value;
        setRecipe({...recipe,ingredients});
    }

    const onSubmit = async(event)=>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/recipes",recipe,{headers:{authorization:cookie.access_token}});
            alert("Recipe Created");
            navigate("/");
        }catch(err){
            console.error(err);
        }
    }

    return (<div className="create-recipe">
        <h2> Create Recipe</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input 
                type="text"
                id = "name"
                name="name"
                onChange={handleChange}
            />
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient,idx)=>(
                <input 
                    key={idx}
                    type = "text"
                    name="ingredients"
                    onChange={(event)=>handleIngredientChange(event,idx)}
                />
            ))}
            <button type="button" onClick={handleAddIngredient}>
                Add Ingredient
            </button>
            <label htmlFor="instructions">Instructions</label>
            <textarea 
                id="instructions"
                name="instructions"
                onChange={handleChange}
            ></textarea>
            <label htmlFor="imageUrl">Image URL</label>
            <input 
                type="text"
                id = "imageUrl"
                name="imageUrl"
                onChange={handleChange}
            />
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input 
                type="number"
                id = "cookingTime"
                name="cookingTime"
                onChange={handleChange}
            />
            <button type="submit">Create Recipe</button>

        </form>
    </div>);
};

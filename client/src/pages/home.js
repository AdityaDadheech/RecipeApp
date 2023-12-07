import axios from "axios";
import { useEffect,useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId.js";
import {Cookies, useCookies} from "react-cookie";
export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookie,_] = useCookies(["access_token"]);
    const userID = useGetUserId();

    useEffect(()=>{
        const fetchRecipe = async()=>{
            try{
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            }catch(err){
                console.error(err);
            }
        };
        const fetchSavedRecipes = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
              );
              setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
              console.log(err);
            }
        };
        fetchRecipe();
        fetchSavedRecipes();
    },[]);
    
    

    const savedRecipe = async(recipeID)=>{
        try{
            const response = await axios.put("http://localhost:3001/recipes",{recipeID, userID},{headers:{authorization:cookie.access_token}});
            console.log(response);
        }catch(err){
            console.error(err);
        }
    }
    const isRecipeSaved = (id) => savedRecipes.includes(id);
    return (<div>
        <h1> Recipes</h1>
        <ul>
            {recipes.map((recipe)=>(
                <li key={recipe._id}>
                <div>
                    <h2>{recipe.name}</h2>
                    <button onClick={()=>savedRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                    </button>
                </div><div className="instructions">
                    <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name}/>
                <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                </li>
            ))}
        </ul>
    </div>);
};
import { Link } from "react-router-dom";
export const Navbar = ()=>{
    return <div>
        <Link to="/"> Home</Link>
        <Link to="/create-recipe"> Create Recipes</Link>
        <Link to="/saved-recipe"> Saved Recipes</Link>
        <Link to="/auth"> Register/Login</Link>
    </div>
}
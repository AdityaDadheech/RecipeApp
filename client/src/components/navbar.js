import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = ()=>{
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = ()=>{
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    return <div>
        <Link to="/"> Home</Link>
        <Link to="/create-recipe"> Create Recipes</Link>
        {!cookies.access_token ? (<Link to="/auth"> Register/Login</Link>) : (<><Link to="/saved-recipe"> Saved Recipes</Link><button onClick={logout}>Logout</button></>)}
    </div>
}
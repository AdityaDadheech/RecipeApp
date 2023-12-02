import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home.js";
import {Auth} from "./pages/auth.js";
import {Create_recipe} from "./pages/createRecipe.js";
import {Saved_recipe} from "./pages/savedRecipe.js";
import { Navbar } from './components/navbar.js';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/auth" element = {<Auth/>}/>
            <Route path = "/create-recipe" element = {<Create_recipe/>}/>
            <Route path = "/saved-recipe" element = {<Saved_recipe/>}/>
          </Routes>
        </Router>      
    </div>
  );
}

export default App;

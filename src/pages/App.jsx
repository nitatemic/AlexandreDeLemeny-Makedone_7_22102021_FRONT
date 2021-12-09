import "../index.css"
import Banner from "./Banner"   //navbar
import Login from "./Login"
import React from "react";
import {BrowserRouter as Route, Router, Routes} from "react-router-dom";
import Signup from "./Signup"

export default function App() {
    return (
        <Router>
           <div className = "app">
                   <Banner />
                   <Routes>
                       <Route path = "/" exact element = {<Login />} />
                       <Route path = "/signup" exact element = {<Signup />} />
                   </Routes>

           </div>
        </Router>
    );
}

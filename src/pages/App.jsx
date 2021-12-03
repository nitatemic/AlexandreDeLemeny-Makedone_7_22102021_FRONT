import React from "react";
import "../index.css"
import Banner from "./Banner"   //navbar
import Login from "./Login"
import Signup from "./Signup"

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
    return (
       <div className = "app">
           <Router>
               <Banner />

               <route path = "/" exact component = {Login} />
               <route path = "/signup" exact component = {Signup} />
           </Router>
       </div>
    );
}

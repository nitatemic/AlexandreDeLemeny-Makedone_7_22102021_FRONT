import React from "react";
import "../index.css"
import Banner from '../components/Banner'   //navbar
import Login from "./Login"
import Signup from "./Signup"
import Flux from "./Flux"

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import darkTheme from "./global";
import {ThemeProvider} from "@emotion/react";

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Router>
           <div className = "app">
                   <Banner />
                   <Routes>
                       <Route path = "/" exact element = {<Login />} />
                       <Route path = "/signup" exact element = {<Signup />} />
                       <Route path = "/flux" exact element = {<Flux />} />
                   </Routes>

           </div>
        </Router>
        </ThemeProvider>
    );
}

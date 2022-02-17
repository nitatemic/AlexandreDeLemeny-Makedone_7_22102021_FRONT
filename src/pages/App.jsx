import React from "react";
import "../index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import Banner from "../components/Banner"; // navbar
import Login from "./Login";
import Signup from "./Signup";
import Flux from "./Flux";
import Account from "./Account";

import darkTheme from "./global";

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="app">
          <Banner />
          <Routes>
            <Route path="/account" exact element={<Account />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/" exact element={<Flux />} />
          </Routes>

        </div>
      </Router>
    </ThemeProvider>
  );
}

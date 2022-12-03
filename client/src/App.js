import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

const App = () => {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

    // <div className="container">
    //   {currentForm === "login" ? (
    //     <Login onFormSwitch={toggleForm} />
    //   ) : (
    //     <Register onFormSwitch={toggleForm} />
    //   )}
    // </div>
  );
};

export default App;

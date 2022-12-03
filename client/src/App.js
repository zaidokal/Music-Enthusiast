import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { SearchPage } from "./views/SearchPage";
import { Results } from "./views/Results";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      {/* <Route path="/Results" element={<Results />} /> */}
    </Routes>
  );
};

export default App;

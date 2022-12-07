import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { SearchPage } from "./views/SearchPage";
import { SearchResults } from "./views/SearchResults";
import { Script } from "./views/Script";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/SearchResults" element={<SearchResults />} />
      {/* <Route path="/Script" element={<Script />} /> */}
    </Routes>
  );
};

export default App;

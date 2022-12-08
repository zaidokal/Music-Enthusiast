import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { SearchPage } from "./views/SearchPage";
import { SearchResults } from "./views/SearchResults";
import { ViewSingleTrack } from "./views/ViewSingleTrack";
import { ViewSingleList } from "./views/ViewSingleList";
import { ChangePassword } from "./views/ChangePassword";
import { Policies } from "./views/Policies";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/SearchResults" element={<SearchResults />} />
      <Route path="/:id" element={<ViewSingleTrack />} />
      <Route path="/lists">
        <Route path="/lists/:name" element={<ViewSingleList />} />
      </Route>
      <Route path="/policies" element={<Policies />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
    </Routes>
  );
};

export default App;

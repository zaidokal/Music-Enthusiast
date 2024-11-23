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
import { EditPolicies } from "./views/EditPolicies";
import { CreateList } from "./views/CreateList";
import { CreateReview } from "./views/CreateReview";
import { Lists } from "./views/Lists";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/SearchResults" element={<SearchResults />} />
      <Route path="/:id" element={<ViewSingleTrack />} />
      <Route path="/Lists" element={<Lists />} />

      <Route path="/lists">
        <Route path="/lists/:name" element={<ViewSingleList />} />
      </Route>
      <Route path="/policies" element={<Policies />} />
      <Route path="/edit-policies" element={<EditPolicies />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
      <Route path="/CreateList" element={<CreateList />} />
      <Route path="/CreateReview" element={<CreateReview />} />
    </Routes>
  );
};

export default App;

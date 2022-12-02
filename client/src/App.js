import React from "react";
// import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import { Login } from "./Login";
import { Register } from "./Register";

const App = () => {
  return (
    // <Routes>
    //   <Route exact path="/" element={<HomePage />} />
    // </Routes>

    <div className="container">
      {/* <HomePage></HomePage> */}
      <Login></Login>
    </div>
  );
};

export default App;

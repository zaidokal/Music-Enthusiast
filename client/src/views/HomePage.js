import React from "react";
import { Login } from "../views/Login";
import { Register } from "../views/Register";
import { SearchPage } from "../views/SearchPage";
import GenericButton from "../components/GenericButton";
import "./HomePage.module.css";
import Header from "../components/Header";
// import { BackgroundPicture } from "../components/BackgroundPicture";

const HomePage = () => {
  return (
    <>
      <Header />

      <GenericButton
        linkTo={"/SearchPage"}
        text={"Start your listening experience"}
      />
      <label htmlFor="LegalMessage">LISTEN TO MUSIC ANYTIME. ANYWHERE.</label>
      <label htmlFor="LegalMessage">
        Copyright, Privacy, and Acceptable Use
      </label>

      {/* style={{ backgroundImage: `url(${BackgroundPicture})` }} */}
    </>
  );
};

export default HomePage;

import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { SearchPage } from "./SearchPage";
import GenericButton from "../components/GenericButton";

const HomePage = () => {
  return (
    <>
      <GenericButton linkTo={"/login"} text={"Login"} />
      <GenericButton linkTo={"/register"} text={"Register"} />
      <GenericButton linkTo={"/SearchPage"} text={"SearchPage"} />
    </>
  );
};

export default HomePage;

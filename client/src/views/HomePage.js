import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import GenericButton from "../components/GenericButton";

const HomePage = () => {
  return (
    <>
      <GenericButton linkTo={"/login"} text={"Login"} />
      <GenericButton linkTo={"/register"} text={"Register"} />
    </>
  );
};

export default HomePage;

import React from "react";
import { Login } from "../Login";
import GenericButton from "../components/GenericButton";

const HomePage = () => {
  return <GenericButton linkTo={"/login"} text={"Lets Get Started"} />;
  // return <div>Hello world!</div>;
};

export default HomePage;

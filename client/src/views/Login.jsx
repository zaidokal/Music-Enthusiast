import React, { useState } from "react";
import GenericButton from "../components/GenericButton";

export const Login = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const testSubmit = () => {
    console.log("IT WORKEDDDD LETS PLAY VAL");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input type="email" placeholder="email@example.com" />

        <label htmlFor="password">password</label>
        <input type="password" placeholder="********" />

        <GenericButton onClick={testSubmit} text={"Login"} linkTo={"/"} />
      </form>

      <GenericButton
        text={"Don't have an account? Register here."}
        linkTo={"/register"}
      />
    </>
  );
};

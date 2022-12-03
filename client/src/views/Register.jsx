import React, { useState } from "react";
import GenericButton from "../components/GenericButton";

export const Register = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          name="name"
          id="name"
          placeholder="Full Name"
          type="string"
        ></input>

        <label htmlFor="email">email</label>
        <input type="email" placeholder="email@example.com" />

        <label htmlFor="password">password</label>
        <input type="password" placeholder="********" />

        <button type="submit">Log In</button>
      </form>

      <GenericButton
        linkTo={"/login"}
        text={"Already have an account? Login here."}
      />
    </>
  );
};

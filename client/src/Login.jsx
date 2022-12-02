import React, { useState } from "react";
import GenericButton from "./components/GenericButton";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

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
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@example.com"
        />

        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
        />

        <GenericButton onClick={testSubmit} text={"Login"} linkTo={"/"} />
      </form>

      <GenericButton
        text={"Don't have an account? Register here."}
        linkTo={"/register"}
      />
    </>
  );
};

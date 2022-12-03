import React, { useState } from "react";
import GenericButton from "../components/GenericButton";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pass);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          value={name}
          name="name"
          id="name"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          type="string"
        ></input>

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

        <button type="submit">Log In</button>
      </form>

      <GenericButton
        linkTo={"/login"}
        text={"Already have an account? Login here."}
      />
    </>
  );
};

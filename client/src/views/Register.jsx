import React, { useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import BackgroundOpacity from "../components/BackgroundOpacity";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_IP, REACT_APP_PORT } from "../config";

export const Register = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/accounts`,
        userInput
      )
      .then(() => {
        navigate("/login");
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />
      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={userInput.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="username"
            value={userInput.username}
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={userInput.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <div className={styles.AccountButton}>
            <button type="submit">Register</button>
          </div>
        </form>
        <div className={styles.ChangeButton}>
          <button onClick={() => navigate("/login")}>
            Already have an account? Login here.
          </button>
        </div>
      </div>
    </>
  );
};

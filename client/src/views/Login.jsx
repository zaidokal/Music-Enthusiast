import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Login.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import axios from "axios";
import { REACT_APP_IP, REACT_APP_PORT } from "../config";
import { AuthContext } from "../utils/AuthContext";

export const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { setIsLoggedIn } = useContext(AuthContext);

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
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/login`,
        userInput
      )
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
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
            type="password"
            name="password"
            value={userInput.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <div className={styles.AccountButton}>
            <button type="submit">Login</button>
          </div>
        </form>
        <div className={styles.ChangeButton}>
          <button onClick={() => navigate("/ChangePassword")}>
            Update Password?
          </button>
        </div>
        <div className={styles.ChangeButton}>
          <button onClick={() => navigate("/register")}>
            Don't have an account? Register here.
          </button>
        </div>
      </div>
    </>
  );
};

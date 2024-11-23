import React, { useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./ChangePassword.module.css";
import BackgroundOpacity from "../components/BackgroundOpacity";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_IP, REACT_APP_PORT } from "../config";

export const ChangePassword = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
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
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/change-password`,
        userInput
      )
      .then(() => navigate("/login"))
      .catch((err) =>
        alert(err.response?.data?.message || "An error occurred")
      );
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
            name="currentPassword"
            value={userInput.currentPassword}
            placeholder="Current Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            value={userInput.newPassword}
            placeholder="New Password"
            onChange={handleChange}
          />
          <div className={styles.AccountButton}>
            <button type="submit">Change Password</button>
          </div>
        </form>
        <div className={styles.ChangeButton}>
          <button onClick={() => navigate("/login")}>
            Click here to go back to the login page.
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

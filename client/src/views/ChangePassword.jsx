import React, { useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Login.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import SearchButton from "../components/SearchButton";
import axios from "axios";

export const ChangePassword = (props) => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/auth/login", userInput)
      .then((res) => {
        alert(res.data);
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
            className={styles.EmailBox}
            type="email"
            name="email"
            value={userInput.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className={styles.PasswordBox}
            type="password"
            name="password"
            value={userInput.password}
            placeholder="Current Password"
            onChange={handleChange}
          />
          <input
            className={styles.PasswordBox}
            type="password"
            name="password"
            value={userInput.password}
            placeholder="New Password"
            onChange={handleChange}
          />
          <div className={styles.AccountButton}>
            <AccountButton
              text={"Change Password"}
              linkTo={"/SearchPage"}
              onClick={handleSubmit}
            />
          </div>
        </form>

        <ChangeButton
          text={"Click here to go back to the login page."}
          linkTo={"/login"}
        />

        <ChangeButton
          text={"Don't have an account? Register here."}
          linkTo={"/register"}
        />
      </div>
    </>
  );
};

import React, { useState } from "react";
import GenericButton from "../components/GenericButton";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Login.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";

export const Login = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const testSubmit = () => {
    console.log("IT WORKEDDDD LETS PLAY VAL");
  };

  return (
    <>
      <HeaderAccount />

      <div className={styles.WelcomeMessage}>Welcome Back!</div>

      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <input className={styles.EmailBox} type="email" placeholder="Email" />

          <input
            className={styles.PasswordBox}
            type="password"
            placeholder="Password"
          />

          <div className={styles.AccountButton}>
            <AccountButton text={"Login"} linkTo={"/SearchPage"} />
          </div>
        </form>

        <ChangeButton
          text={"Don't have an account? Register here."}
          linkTo={"/register"}
        />
      </div>
    </>
  );
};

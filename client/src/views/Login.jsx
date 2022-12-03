import React, { useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Login.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";

export const Login = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <EmailBox />
          <PasswordBox />
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

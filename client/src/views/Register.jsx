import React, { useState } from "react";
import GenericButton from "../components/GenericButton";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Register.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";
import NameBox from "../components/NameBox";

export const Register = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <NameBox />
          <EmailBox />
          <PasswordBox />

          <div className={styles.AccountButton}>
            <AccountButton text={"Register"} linkTo={"/SearchPage"} />
          </div>
        </form>

        <ChangeButton
          linkTo={"/login"}
          text={"Already have an account? Login here."}
        />
      </div>
    </>
  );
};

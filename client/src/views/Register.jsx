import React, { useState } from "react";
import GenericButton from "../components/GenericButton";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Register.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";

export const Register = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <HeaderAccount />

      <div className={styles.WelcomeMessage}>Welcome To SRZ Music!</div>

      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.NameBox}
            type="string"
            placeholder="Full Name"
          ></input>
          <input className={styles.EmailBox} type="email" placeholder="Email" />
          <input
            className={styles.PasswordBox}
            type="password"
            placeholder="Password"
          />
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

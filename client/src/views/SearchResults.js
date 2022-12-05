import React, { useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./SearchResults.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";

export const SearchResults = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <div className={styles.OuterDiv}>
          <div className={styles.Title}>Search Results</div>

          <div className={styles.InsideDiv}>
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
            <EmailBox />
          </div>
        </div>

        <div className={styles.OuterDiv}>
          <div className={styles.Title}>Some playlists you might like</div>

          <div className={styles.InsideDiv}>
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
          </div>
        </div>
      </div>
    </>
  );
};

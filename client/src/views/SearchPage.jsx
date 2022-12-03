import React, { useState } from "react";
import AccountButton from "../components/AccountButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import ChangeButton from "../components/ChangeButton";
import EmailBox from "../components/EmailBox";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import PasswordBox from "../components/PasswordBox";
import SearchInput from "../components/SearchInput";
import styles from "./SearchPage.module.css";

export const SearchPage = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <label>Find your next favourite song!</label>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Track Name"
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Artist"
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Genre"
          ></input>

          <GenericButton text={"Submit"} linkTo={"/SearchResults"} />
        </form>
      </div>
    </>
  );
};

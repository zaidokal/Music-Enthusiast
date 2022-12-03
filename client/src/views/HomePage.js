import React from "react";
import SearchButton from "../components/SearchButton";
import "./HomePage.module.css";
import Header from "../components/Header";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <Header />

      <div
        className={styles.BackgroundImage}
        style={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: 600,
          width: 600,
        }}
      >
        <div className={styles.Message}>
          <label htmlFor="Message">LISTEN TO MUSIC ANYTIME. ANYWHERE.</label>
        </div>

        <div className={styles.SearchButton}>
          <SearchButton
            linkTo={"/SearchPage"}
            text={"Start your listening experience"}
          />
        </div>

        <div className={styles.LegalMessageDiv}>
          <label className={styles.LegalMessage} htmlFor="LegalMessage">
            Copyright, Privacy, and Acceptable Use
          </label>
        </div>
      </div>
    </>
  );
};

export default HomePage;

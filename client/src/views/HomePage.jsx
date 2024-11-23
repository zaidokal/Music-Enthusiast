import React from "react";
import SearchButton from "../components/SearchButton";
import "./HomePage.module.css";
import Header from "../components/Header";
import styles from "./HomePage.module.css";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import LinkButton from "../components/LinkButton";

const HomePage = () => {
  return (
    <>
      <div className={styles.PageDiv}>
        <Header />
        <BackgroundOpacity />

        <div
          style={{
            backgroundImage: `url(/images/Image.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: `url(/images/Image.jpg)`,
            width: "100%",
            height: "100%",
          }}
        >
          <div className={styles.MainDiv}>
            <div className={styles.Message}>
              LISTEN TO MUSIC ANYTIME. <br></br> ANYWHERE.
            </div>

            <div className={styles.SearchButton}>
              <SearchButton
                linkTo={"/SearchPage"}
                text={"Start your listening experience"}
              />
            </div>
          </div>
        </div>

        {/* <div className={styles.ButtonDiv}>
          <LinkButton linkTo={"/SearchPage"} text={"Search Page"} />
          <LinkButton linkTo={"/Lists"} text={"Lists"} />{" "}
          <LinkButton linkTo={"/CreateList"} text={"CreateList"} />{" "}
          <LinkButton linkTo={"/CreateReview"} text={"CreateReview"} />
        </div> */}

        <div className={styles.LegalMessageDiv}>
          <label className={styles.LegalMessage} htmlFor="LegalMessage"></label>
          <GenericButton
            text={"Copyright, Privacy, and Acceptable Use"}
            linkTo={"/policies"}
          ></GenericButton>
        </div>
      </div>
    </>
  );
};

export default HomePage;

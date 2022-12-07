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
import axios from "axios";

import ReactDOM from "react-dom";

function trackSearch() {}

export const SearchPage = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [TrackNameInput, setTrackNameInput] = useState("");
  const [ArtistInput, setArtistInput] = useState("");
  const [GenreInput, setGenreInpute] = useState("");

  const handleClick = () => {
    console.log(TrackNameInput);
    console.log(ArtistInput);
    console.log(GenreInput);
  };

  const trackInput = TrackNameInput;

  // axios
  //   .get(`/open/tracks=${trackInput}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     let idObject = [];
  //     let i = 0;

  //     Object.keys(data).forEach((key) => {
  //       idObject[i] = data[key];
  //       i++;
  //     });

  //     for (let id of idObject) {
  //       fetch(`/tracks/${id["track_id"]}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           const rowResults = document.createElement("tr");
  //           rowResults.className = "resultsRows";
  //         })
  //         .catch((error) => {
  //           console.error("There has been a error with fetch: ", error);
  //         });
  //     }
  //   });

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
            value={TrackNameInput}
            onChange={(e) => setTrackNameInput(e.target.value)}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Artist"
            value={ArtistInput}
            onChange={(e) => setArtistInput(e.target.value)}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Genre"
            value={GenreInput}
            onChange={(e) => setGenreInpute(e.target.value)}
          ></input>

          <GenericButton
            text={"Submit"}
            // linkTo={"/SearchResults"}
            onClick={handleClick}
          />
        </form>
      </div>
    </>
  );
};

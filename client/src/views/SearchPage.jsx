import React, { useState } from "react";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./SearchPage.module.css";
import axios from "axios";

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

  axios
    .get(`http://localhost:8000/api/open/tracks?trackTitle=${trackInput}`)
    // .then((res) => res.json())
    .then((data) => {
      let idObject = [];
      let i = 0;

      console.log(data);

      Object.keys(data).forEach((key) => {
        idObject[i] = data[key];
        i++;
      });

      console.log(idObject);

      for (let id of idObject) {
        axios
          .get(`http://localhost:8000/api/open/tracks/${id["track_id"]}`)
          .then((res) => res.json())
          .then((data) => {
            const rowResults = document.createElement("tr");
            rowResults.className = "resultsRows";
          })
          .catch((error) => {
            console.error("There has been a error with axios: ", error);
          });
      }
    });

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

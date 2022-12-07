import React, { useState } from "react";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./SearchPage.module.css";

export const SearchPage = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [trackNameInput, setTrackNameInput] = useState("");
  const [artistInput, setArtistInput] = useState("");
  const [genreInput, setGenreInput] = useState("");

  const handleClick = () => {
    console.log(trackNameInput);
    console.log(artistInput);
    console.log(genreInput);
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
            value={trackNameInput}
            onChange={(e) => setTrackNameInput(e.target.value)}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Artist"
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Genre"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
          ></input>

          <GenericButton
            text={"Submit"}
            linkTo={`/SearchResults?trackTitle=${trackNameInput}&artist=${artistInput}&genreName=${genreInput}`}
            onClick={handleClick}
          />
        </form>
      </div>
    </>
  );
};

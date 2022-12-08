import React, { useState } from "react";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./CreateList.module.css";

export const CreateList = (props) => {
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
          <label>Create / Edit lists</label>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="List Name"
            value={trackNameInput}
            onChange={(e) => setTrackNameInput(e.target.value)}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Username"
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Tracks"
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

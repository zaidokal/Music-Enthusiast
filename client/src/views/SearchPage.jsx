import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./SearchPage.module.css";

const InputField = ({ label, name, placeholder, value, onChange }) => (
  <div className={styles.InputContainer}>
    <label htmlFor={name} className={styles.Label}>
      {label}
    </label>
    <input
      id={name}
      className={styles.TextBox}
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={placeholder}
    />
  </div>
);

export const SearchPage = () => {
  const [trackNameInput, setTrackNameInput] = useState("");
  const [artistInput, setArtistInput] = useState("");
  const [genreInput, setGenreInput] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(
      `/SearchResults?trackTitle=${trackNameInput}&artist=${artistInput}&genreName=${genreInput}`
    );
  };

  return (
    <>
      <Header />
      <BackgroundOpacity />
      <div className={styles.MainDiv}>
        <h1 className={styles.Title}>Find Your Next Favourite Song!</h1>
        <form className={styles.Form}>
          <InputField
            label="Track Name"
            name="trackNameInput"
            placeholder="Enter track name"
            value={trackNameInput}
            onChange={(e) => setTrackNameInput(e.target.value)}
          />
          <InputField
            label="Artist"
            name="artistInput"
            placeholder="Enter artist name"
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
          />
          <InputField
            label="Genre"
            name="genreInput"
            placeholder="Enter genre"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
          />
          <GenericButton
            text="Search"
            onClick={handleClick}
            className={styles.SubmitButton}
          />
        </form>
      </div>
    </>
  );
};

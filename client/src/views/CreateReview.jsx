import React, { useState } from "react";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./CreateList.module.css";
import axios from "axios";
import {REACT_APP_IP, REACT_APP_PORT} from "../config";

export const CreateReview = (props) => {
  const [userInput, setUserInput] = useState({
    listNameInput: "",
    userNameInput: "",
    trackInput: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://${REACT_APP_IP}:${REACT_APP_PORT}/api/secure/lists`, userInput)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Header />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <label>Create / Edit Reviews</label>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="List Name"
            name="listNameInput"
            value={userInput.listNameInput}
            onChange={handleChange}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Username"
            name="userNameInput"
            value={userInput.userNameInput}
            onChange={handleChange}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Review Name"
            name="trackInput"
            value={userInput.trackInput}
            onChange={handleChange}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Rating"
            name="trackInput"
            value={userInput.trackInput}
            onChange={handleChange}
          ></input>

          <input
            className={styles.TextBox}
            type="string"
            placeholder="Comment"
            name="trackInput"
            value={userInput.trackInput}
            onChange={handleChange}
          ></input>

          <GenericButton
            text={"Submit"}
            linkTo={`/SearchPage`}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
};

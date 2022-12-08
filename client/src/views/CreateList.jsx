import React, { useState } from "react";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./CreateList.module.css";
import axios from "axios";

export const CreateList = (props) => {

  const [userInput, setUserInput] = useState({
    listNameInput: "",
    userNameInput: "",
    trackInput: "",
  })

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(prevState => {
        return {
            ...prevState,
            [e.target.name]: e.target.value,
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/secure/lists', userInput)
    .then(res => {
      alert(res.data);
    })
    .catch(err => {
      alert(err);
    })
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
            placeholder="Tracks"
            name="trackInput"
            value={userInput.trackInput}
            onChange={handleChange}
          ></input>

          <GenericButton
            text={"Submit"}
            linkTo={`/SearchPage`}
            onClick={handleClick}
          />
        </form>
      </div>
    </>
  );
};

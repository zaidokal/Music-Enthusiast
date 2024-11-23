import React, { useState } from "react";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./CreateList.module.css";
import axios from "axios";
import { REACT_APP_IP, REACT_APP_PORT } from "../config";

const InputField = ({ label, name, placeholder, value, onChange, error }) => (
  <div className={styles.InputContainer}>
    <label htmlFor={name} className={styles.Label}>
      {label}
    </label>
    <input
      id={name}
      className={`${styles.TextBox} ${error ? styles.ErrorInput : ""}`}
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={placeholder}
    />
    {error && <p className={styles.ErrorText}>{error}</p>}
  </div>
);

export const CreateList = () => {
  const [userInput, setUserInput] = useState({
    listNameInput: "",
    userNameInput: "",
    trackInput: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validateInputs = () => {
    const newErrors = {};
    if (!userInput.listNameInput.trim())
      newErrors.listNameInput = "List name is required.";
    if (!userInput.userNameInput.trim())
      newErrors.userNameInput = "Username is required.";
    if (!userInput.trackInput.trim())
      newErrors.trackInput = "Track is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await axios.post(
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/secure/lists`,
        userInput
      );
      alert(res.data.message || "List created successfully!");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <BackgroundOpacity />
      <div className={styles.MainDiv}>
        <h1 className={styles.Title}>Create / Edit Lists</h1>
        <form onSubmit={handleSubmit} className={styles.Form}>
          <InputField
            label="List Name"
            name="listNameInput"
            placeholder="Enter list name"
            value={userInput.listNameInput}
            onChange={handleChange}
            error={errors.listNameInput}
          />
          <InputField
            label="Username"
            name="userNameInput"
            placeholder="Enter your username"
            value={userInput.userNameInput}
            onChange={handleChange}
            error={errors.userNameInput}
          />
          <InputField
            label="Track"
            name="trackInput"
            placeholder="Enter tracks"
            value={userInput.trackInput}
            onChange={handleChange}
            error={errors.trackInput}
          />

          {apiError && <p className={styles.ApiError}>{apiError}</p>}

          <GenericButton
            text="Submit"
            linkTo="/SearchPage"
            onClick={handleSubmit}
            className={styles.SubmitButton}
          />
        </form>
      </div>
    </>
  );
};

import React, { useState } from "react";
import BackgroundOpacity from "../components/BackgroundOpacity";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import styles from "./CreateReview.module.css";
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

export const CreateReview = () => {
  const [userInput, setUserInput] = useState({
    listNameInput: "",
    userNameInput: "",
    reviewNameInput: "",
    ratingInput: "",
    commentInput: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validateInputs = () => {
    const newErrors = {};
    if (!userInput.listNameInput.trim())
      newErrors.listNameInput = "List name is required.";
    if (!userInput.userNameInput.trim())
      newErrors.userNameInput = "Username is required.";
    if (!userInput.reviewNameInput.trim())
      newErrors.reviewNameInput = "Review name is required.";
    if (!userInput.ratingInput.trim())
      newErrors.ratingInput = "Rating is required.";
    if (!userInput.commentInput.trim())
      newErrors.commentInput = "Comment is required.";
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
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/secure/reviews`,
        userInput
      );
      alert(res.data.message || "Review created successfully!");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('/images/Image.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />
      <BackgroundOpacity />
      <div className={styles.MainDiv}>
        <h1 className={styles.Title}>Create / Edit Reviews</h1>
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
            label="Review Name"
            name="reviewNameInput"
            placeholder="Enter review name"
            value={userInput.reviewNameInput}
            onChange={handleChange}
            error={errors.reviewNameInput}
          />
          <InputField
            label="Rating"
            name="ratingInput"
            placeholder="Enter rating"
            value={userInput.ratingInput}
            onChange={handleChange}
            error={errors.ratingInput}
          />
          <InputField
            label="Comment"
            name="commentInput"
            placeholder="Enter comment"
            value={userInput.commentInput}
            onChange={handleChange}
            error={errors.commentInput}
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
    </div>
  );
};

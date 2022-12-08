import React, { useState } from "react";
import GenericButton from "../components/GenericButton";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Register.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import axios from "axios";

export const Register = (props) => {

  const [userInput, setUserInput] = useState({
    email: "",
    username: "",
    password: "",
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
    axios.post('http://localhost:8000/api/auth/accounts', userInput)
    .then(res => {
      alert(res.data);
    })
    .catch(err => {
      alert(err);
    })
  };

  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <form onSubmit={handleSubmit}>
          <input className={styles.EmailBox} type="email" name="email" value={userInput.email} placeholder="Email" onChange={handleChange} />
          <input className={styles.NameBox} name="username" value={userInput.username} placeholder="Username" onChange={handleChange} />
          <input className={styles.PasswordBox} type="password" name="password" value={userInput.password} placeholder="Password" onChange={handleChange} />
          
          <div className={styles.AccountButton}>
            <AccountButton text={"Register"} linkTo={"/login"} onClick={handleSubmit} />
          </div>
        </form>

        <ChangeButton
          linkTo={"/login"}
          text={"Already have an account? Login here."}
        />
      </div>
    </>
  );
};

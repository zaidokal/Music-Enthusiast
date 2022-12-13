import React, { useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./EditPolicies.module.css";
import AccountButton from "../components/AccountButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import axios from "axios";
import {REACT_APP_IP, REACT_APP_PORT} from "../config";

export const EditPolicies = () => {

    const [userInput, setUserInput] = useState({
      privacy: "",
      dmca: "",
      aup: "",
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
      axios.post(`http://${REACT_APP_IP}:${REACT_APP_PORT}/api/admin/policies`, userInput)
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
            <input className={styles.PrivacyBox} name="privacy" value={userInput.privacy} placeholder="Privacy" onChange={handleChange} />
            <input className={styles.DMCABox} name="dmca" value={userInput.dmca} placeholder="DMCA" onChange={handleChange} />
            <input className={styles.AUPBox} name="aup" value={userInput.aup} placeholder="AUP" onChange={handleChange} />
            
            <div className={styles.AccountButton}>
              <AccountButton text={"Create/Edit"} onClick={handleSubmit} />
            </div>
          </form>
  
        </div>
      </>
    );
  };

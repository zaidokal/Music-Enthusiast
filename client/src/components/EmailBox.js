import React from "react";
import styles from "./EmailBox.module.css";

const EmailBox = (props) => {
  return <input className={styles.EmailBox} type="email" placeholder="Email" />;
};

export default EmailBox;

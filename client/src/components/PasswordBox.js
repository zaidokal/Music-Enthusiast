import React from "react";
import styles from "./PasswordBox.module.css";

const PasswordBox = (props) => {
  return (
    <input
      className={styles.PasswordBox}
      type="password"
      placeholder="Password"
    />
  );
};

export default PasswordBox;

import React from "react";
import styles from "./NameBox.module.css";

const NameBox = (props) => {
  return (
    <input
      className={styles.NameBox}
      type="string"
      placeholder="Full Name"
    ></input>
  );
};

export default NameBox;

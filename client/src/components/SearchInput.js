import React from "react";
import styles from "./SearchInput.module.css";

const SearchInput = (props) => {
  return (
    <input className={styles.TextBox} type="string">
      {props.text}
    </input>
  );
};

export default SearchInput;

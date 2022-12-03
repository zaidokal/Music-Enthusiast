import React from "react";
import styles from "./SearchButton.module.css";
import { Link } from "react-router-dom";

const SearchButton = (props) => {
  return (
    <div className={styles.container}>
      <Link to={props.linkTo}>
        <button className={styles.Button} onClick={props.onClick}>
          {props.text}
        </button>
      </Link>
    </div>
  );
};

export default SearchButton;

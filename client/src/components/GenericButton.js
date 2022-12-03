import React from "react";
import styles from "./GenericButton.module.css";
import { Link } from "react-router-dom";

const GenericButton = (props) => {
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

export default GenericButton;

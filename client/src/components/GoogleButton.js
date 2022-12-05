import React from "react";
import styles from "./GoogleButton.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleButton = (props) => {
  return (
    <div className={styles.container}>
      <Link to={props.linkTo}>
        <i class={styles.GoogleIcon}></i>
        <button className={styles.googleBTN}>
          <FontAwesomeIcon
            icon={faGoogle}
            size="10x"
            className={styles.GoogleIcon}
          />
          Sign up with google
        </button>
      </Link>
    </div>
  );
};

export default GoogleButton;

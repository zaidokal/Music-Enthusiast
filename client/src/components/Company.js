import React from "react";
import styles from "./Company.module.css";
import { Link } from "react-router-dom";

const Company = (props) => {
  return (
    <div className={styles.container}>
      <Link to={props.linkTo}>
        <button className={styles.Company} onClick={props.onClick}>
          <span className={styles.SRZ}>Music Enthusiast</span>{" "}
        </button>
      </Link>
    </div>
  );
};

export default Company;

import React from "react";
import styles from "./PageTemplate.module.css";

const PageTemplate = (props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.topBar}>{props.topBarContent}</div>
      <div className={styles.leftSideContent}>{props.leftSideContent}</div>
      <div className={styles.rightSideContent}>{props.rightSideContent}</div>
    </div>
  );
};

export default PageTemplate;

import React from "react";
import AccountButton from "./AccountButton";
import { Login } from "../views/Login";
import { Register } from "../views/Register";
import styles from "./HeaderAccount.module.css";
import { Link } from "react-router-dom";
import Company from "./Company";

const HeaderAccount = (props) => {
  return (
    <>
      <div className={styles.MainDiv}>
        <div className={styles.CompanyDiv}>
          <Link>
            <div>
              <Company linkTo={"/"} text={"SRZ Music"} />
            </div>
            <label linkTo={"/"} className={styles.Company}></label>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderAccount;

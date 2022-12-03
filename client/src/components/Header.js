import React from "react";
import AccountButton from "./AccountButton";
import { Login } from "../views/Login";
import { Register } from "../views/Register";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <div className={styles.MainDiv}>
        <div className={styles.CompanyDiv}>
          <label className={styles.Company}>SRZ Music</label>
        </div>

        <div className={styles.AccountDiv}>
          <Link>
            <div>
              <AccountButton
                className={styles.Button}
                linkTo={"/login"}
                text={"Login"}
              />
              <AccountButton linkTo={"/register"} text={"Register"} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;

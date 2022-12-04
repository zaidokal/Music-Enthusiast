import React from "react";
import AccountButton from "./AccountButton";
import { Login } from "../views/Login";
import { Register } from "../views/Register";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Company from "./Company";

const Header = (props) => {
  return (
    <>
      <div className={styles.MainDiv}>
        <div className={styles.CompanyDiv}>
          <Link>
            <div>
              <Company linkTo={"/"} />
            </div>
            <label linkTo={"/"} className={styles.Company}></label>
          </Link>
        </div>

        <div className={styles.AccountDiv1}>
          <Link>
            <div>
              <AccountButton
                className={styles.Button}
                linkTo={"/login"}
                text={"LOGIN"}
              />
            </div>
          </Link>
        </div>
        <div className={styles.AccountDiv2}>
          <Link>
            <div>
              <AccountButton linkTo={"/register"} text={"REGISTER"} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;

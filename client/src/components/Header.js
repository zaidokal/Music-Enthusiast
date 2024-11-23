import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountButton from "./AccountButton";
import { AuthContext } from "../utils/AuthContext";
import styles from "./Header.module.css";
import axios from "axios";
import Company from "./Company";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // Update context state

    // axios
    //   .post(
    //     `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/auth/logout`,
    //     {},
    //     { withCredentials: true } // Ensure cookies are sent with the request
    //   )
    //   .then(() => {
    //     setIsLoggedIn(false); // Update context state
    //     navigate("/login"); // Redirect to login page
    //   })
    //   .catch((err) => {
    //     console.error("Logout failed:", err);
    //     alert("Logout failed. Please try again.");
    //   });
  };

  return (
    <>
      <div className={styles.MainDiv}>
        <div className={styles.CompanyDiv}>
          <div>
            <Company linkTo={"/"} />
          </div>
          <label linkTo={"/"} className={styles.Company}></label>
        </div>

        {isLoggedIn ? (
          <div className={styles.AccountDiv1}>
            <Link>
              <div>
                <AccountButton
                  onClick={handleLogout}
                  className={styles.Button}
                  linkTo={"/login"}
                  text={"Logout"}
                />
              </div>
            </Link>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Header;

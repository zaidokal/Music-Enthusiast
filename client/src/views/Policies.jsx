import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Policies.module.css";
import BackgroundOpacity from "../components/BackgroundOpacity";
import axios from "axios";
import {REACT_APP_IP, REACT_APP_PORT} from "../config";

export const Policies = () => {
  const [policies, setPolicies] = useState({});

  useEffect(() => {
    axios.get(`http://${REACT_APP_IP}:${REACT_APP_PORT}/api/open/policies`).then((res) => {
      setPolicies(res.data);
    });
  }, []);

  let privacy = policies[0] && policies[0]["privacy"];
  let dmca = policies[0] && policies[0]["dmca"];
  let aup = policies[0] && policies[0]["aup"];

  return (
    <>
      <HeaderAccount />
      {/* <BackgroundOpacity /> */}

      <div className={styles.PrivacyDetails}>
        <div>privacy: {privacy}</div>
        <div>dmca: {dmca}</div>
        <div>aup: {aup}</div>
      </div>
    </>
  );
};

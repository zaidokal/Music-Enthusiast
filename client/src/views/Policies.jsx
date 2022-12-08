import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./Policies.module.css";
import BackgroundOpacity from "../components/BackgroundOpacity";
import axios from "axios";

export const Policies = () => {

  const [policies, setPolicies] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/open/policies').then(res => {
        setPolicies(res.data);
    })
  }, []);

  let string = JSON.stringify(policies);
  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />

      <div>
        {string}
      </div>
    </>
  );
};

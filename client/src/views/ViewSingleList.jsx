import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./ViewSingleList.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import {REACT_APP_IP, REACT_APP_PORT} from "../config";

export const ViewSingleList = (props) => {
  const { name } = useParams();

  const [listInfo, setListInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://${REACT_APP_IP}:${REACT_APP_PORT}/api/open/lists/${name}`)
      .then((res) => {
        setListInfo(res.data);
      })
      .catch((error) => {
        console.error("There has been a error with axios: ", error);
      });
  }, []);

  let creator = listInfo[0] && listInfo[0]["creator"];

  let tracks = listInfo[0] && listInfo[0]["tracks"];

  let privateFlag = listInfo[0] && listInfo[0]["privateFlag"];

  let type = listInfo[0] && listInfo[0]["type"];

  return (
    <>
      <HeaderAccount />

      <div className={styles.ListDetails}>
        <div>Creator: {creator}</div>
        <div>Status: {privateFlag}</div>
        <div>Type: {type}</div>

        <div className={styles.TracksList}>
          {"Tracks: "}
          {listInfo[0] && listInfo[0]["tracks"] && (
            <ul>
              {tracks.map((track) => (
                <li>{track}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

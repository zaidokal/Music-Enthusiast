import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./SearchResults.module.css";
import AccountButton from "../components/AccountButton";
import ChangeButton from "../components/ChangeButton";
import BackgroundOpacity from "../components/BackgroundOpacity";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";
import axios from "axios";
import TrackCard from "../components/TrackCard";
import { useLocation } from 'react-router-dom';

export const SearchResults = (props) => {

  const search = useLocation().search;
  let trackNameInput = new URLSearchParams(search).get('trackTitle');
  let artistInput = new URLSearchParams(search).get('artist');
  let genreInput = new URLSearchParams(search).get('genreName');

  const [trackList, setTrackList] = useState([]);

  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/open/tracks?trackTitle=${trackNameInput}&artist=${artistInput}&genreName=${genreInput}`)
    .then(res => {
      for (let t of res.data){
        axios
        .get(`http://localhost:8000/api/open/tracks/${t.track_id}`)
        .then(res => {
          res.data[0].track_id = t.track_id;
          setTrackList(trackList => [...trackList, res.data]);
        })
        .catch((error) => {
          console.error("There has been a error with axios: ", error);
        });
      }

      // let idObject = [];
      // let i = 0;

      // Object.keys(data).forEach((key) => {
      //   idObject[i] = data[key];
      //   i++;
      // });

      // for (let id of idObject) {
      //   axios
      //     .get(`http://localhost:8000/api/open/tracks/${id["track_id"]}`)
      //     .then(res => {
      //       const rowResults = document.createElement("tr");
      //       rowResults.className = "resultsRows";
      //     })
      //     .catch((error) => {
      //       console.error("There has been a error with axios: ", error);
      //     });
      // }
    });
  }, []);

  const trackPropList = trackList.map(t => <TrackCard track={t[0]} key={t[0].track_id}/>)

  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <div className={styles.OuterDiv}>
          <div className={styles.Title}>Search Results</div>

          <div className={styles.InsideDiv}>
            <div>
              {trackPropList}
            </div>
          </div>
        </div>

        <div className={styles.OuterDiv}>
          <div className={styles.Title}>Some playlists you might like</div>

          <div className={styles.InsideDiv}>
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
            <PasswordBox />
          </div>
        </div>
      </div>
    </>
  );
};

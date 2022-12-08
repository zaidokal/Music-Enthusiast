import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./SearchResults.module.css";
import BackgroundOpacity from "../components/BackgroundOpacity";
import axios from "axios";
import TrackCard from "../components/TrackCard";
import { useLocation } from "react-router-dom";

export const SearchResults = (props) => {
  const search = useLocation().search;
  let trackNameInput = new URLSearchParams(search).get("trackTitle");
  let artistInput = new URLSearchParams(search).get("artist");
  let genreInput = new URLSearchParams(search).get("genreName");

  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/open/tracks?trackTitle=${trackNameInput}&artist=${artistInput}&genreName=${genreInput}`
      )
      .then((res) => {
        const tracks = res.data.map((t) =>
          axios
            .get(`http://localhost:8000/api/open/tracks/${t.track_id}`)
            .then((res) => {
              res.data[0].track_id = t.track_id;
              return res.data[0];
            })
            .catch((error) => {
              console.error("There has been a error with axios: ", error);
            })
        );

        Promise.all(tracks).then((completedTracks) =>
          setTrackList(completedTracks)
        );
      });
  }, []);

  const trackPropList = trackList.map((track) => (
    <TrackCard track={track} key={track.track_id} />
  ));

  return (
    <>
      <HeaderAccount />
      <BackgroundOpacity />

      <div className={styles.MainDiv}>
        <div className={styles.OuterDiv}>
          <div className={styles.Title}>Search Results</div>

          <div className={styles.InsideDiv}>
            <div>{trackPropList}</div>
          </div>
        </div>

        <div className={styles.OuterDiv}>
          <div className={styles.Title}>Some playlists you might like</div>

          <div className={styles.InsideDiv}></div>
        </div>
      </div>
    </>
  );
};

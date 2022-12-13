import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./SearchResults.module.css";
import BackgroundOpacity from "../components/BackgroundOpacity";
import axios from "axios";
import TrackCard from "../components/TrackCard";
import ListCard from "../components/ListCard";
import { useLocation } from "react-router-dom";
import GenericButton from "../components/GenericButton";
import {REACT_APP_IP, REACT_APP_PORT} from "../config";

export const SearchResults = (props) => {
  const search = useLocation().search;
  let trackNameInput = new URLSearchParams(search).get("trackTitle");
  let artistInput = new URLSearchParams(search).get("artist");
  let genreInput = new URLSearchParams(search).get("genreName");

  const [trackList, setTrackList] = useState([]);
  const [playlistList, setPlayList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/open/tracks?trackTitle=${trackNameInput}&artist=${artistInput}&genreName=${genreInput}`
      )
      .then((res) => {
        const tracks = res.data.map((t) =>
          axios
            .get(`http://${REACT_APP_IP}:${REACT_APP_PORT}/api/open/tracks/${t.track_id}`)
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

    axios.get(`http://${REACT_APP_IP}:${REACT_APP_PORT}/api/open/lists`).then((res) => {
      setPlayList(res.data);
    });
  }, []);

  const trackPropList = trackList.map((track) => (
    <TrackCard track={track} key={track.track_id} />
  ));

  const playListPropList = playlistList.map((pl) => (
    <ListCard playList={pl} key={pl.listName} />
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

          <div className={styles.InsideDiv}>
            <div>{playListPropList}</div>
          </div>
        </div>
      </div>

      <GenericButton text={"Create / Edit List"} linkTo={`/CreateList`} />
    </>
  );
};

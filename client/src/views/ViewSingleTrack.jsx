import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./ViewSingleTrack.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChangeButton from "../components/ChangeButton";
import GenericButton from "../components/GenericButton";
import {REACT_APP_IP, REACT_APP_PORT} from "../config";

export const ViewSingleTrack = (props) => {
  const { id } = useParams();

  const [trackInfo, setTrackInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://${REACT_APP_IP}:${REACT_APP_PORT}/api/open/tracks/${id}`)
      .then((res) => {
        setTrackInfo(res.data);
      })
      .catch((error) => {
        console.error("There has been a error with axios: ", error);
      });
  }, []);

  let album_id = trackInfo[0] && trackInfo[0]["album_id"];
  let album_title = trackInfo[0] && trackInfo[0]["album_title"];
  let artist_name = trackInfo[0] && trackInfo[0]["artist_name"];
  let track_date_recorded = trackInfo[0] && trackInfo[0]["track_date_recorded"];
  let track_duration = trackInfo[0] && trackInfo[0]["track_duration"];
  let track_title = trackInfo[0] && trackInfo[0]["track_title"];
  let youtube_query = trackInfo[0] && trackInfo[0]["youtube_query"];

  return (
    <>
      <HeaderAccount />

      <div className={styles.TrackDetails}>
        <div>Album ID: {album_id}</div>
        <div>Album Title: {album_title}</div>
        <div>Artist Name: {artist_name}</div>
        <div>Track Date Recorded: {track_date_recorded}</div>
        <div>Track Duration: {track_duration}</div>
        <div>Track Title: {track_title}</div>
        <div>
          <button>
            <a href={youtube_query}>Youtube Link</a>
          </button>
        </div>
        <GenericButton text={"Back to Search Page"} linkTo={`/SearchPage`} />
      </div>
    </>
  );
};

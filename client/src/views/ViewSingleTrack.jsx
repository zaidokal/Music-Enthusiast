import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from "./ViewSingleTrack.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import GenericButton from "../components/GenericButton";
import { REACT_APP_IP, REACT_APP_PORT } from "../config";

export const ViewSingleTrack = () => {
  const { id } = useParams();
  const [trackInfo, setTrackInfo] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/open/tracks/${id}`
      )
      .then((res) => {
        setTrackInfo(res.data);
      })
      .catch((error) => {
        console.error("There has been an error with axios: ", error);
      });
  }, [id]);

  const {
    album_id,
    album_title,
    artist_name,
    track_date_recorded,
    track_duration,
    track_title,
    youtube_query,
  } = trackInfo[0] || {};

  return (
    <>
      <Header />
      <div className={styles.TrackDetails}>
        <h2 className={styles.Title}>Track Details</h2>
        <div className={styles.DetailItem}>
          <strong>Album ID:</strong> {album_id || "N/A"}
        </div>
        <div className={styles.DetailItem}>
          <strong>Album Title:</strong> {album_title || "N/A"}
        </div>
        <div className={styles.DetailItem}>
          <strong>Artist Name:</strong> {artist_name || "N/A"}
        </div>
        <div className={styles.DetailItem}>
          <strong>Date Recorded:</strong> {track_date_recorded || "N/A"}
        </div>
        <div className={styles.DetailItem}>
          <strong>Track Duration:</strong> {track_duration || "N/A"}
        </div>
        <div className={styles.DetailItem}>
          <strong>Track Title:</strong> {track_title || "N/A"}
        </div>
        {youtube_query && (
          <a
            className={styles.YoutubeButton}
            href={youtube_query}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </a>
        )}
        <GenericButton text={"Back to Search Page"} linkTo={`/SearchPage`} />
      </div>
    </>
  );
};

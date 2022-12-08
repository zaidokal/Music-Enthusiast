import React, { useState, useEffect } from "react";
import styles from "./TrackCard.module.css";
import { Link } from "react-router-dom";

const TrackCard = (props) => {
  let track = props.track;

  return (
    <Link to={`/${track.track_id}`}>
      <button className={styles.TrackInfoButton}>
        <div className={styles.TrackTitle}>Track: {track.track_title}</div>
        <div className={styles.ArtistName}>Artist: {track.artist_name}</div>
        <div className={styles.AlbumTitle}>Album: {track.album_title}</div>
      </button>
    </Link>
  );
};

export default TrackCard;

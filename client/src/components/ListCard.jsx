import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ListCard.module.css";
import { Link } from "react-router-dom";

const ListCard = (props) => {
  const { playList } = props;
  const [trackTitles, setTrackTitles] = useState([]);

  useEffect(() => {
    if (playList.tracks && playList.tracks.length > 0) {
      Promise.all(
        playList.tracks.map((trackNumber) =>
          axios
            .get(`http://localhost:8000/api/auth/open/tracks/${trackNumber}`)
            .then((res) => {
              const actualTrackNumber = res.data[0]?.track_number; // Fetch the actual track number
              const trackTitle = res.data[0]?.track_title || "Unknown Track";
              return { actualTrackNumber, trackTitle }; // Return an object with track_number and title
            })
            .catch((error) => {
              console.error(
                `Error fetching details for track ${trackNumber}:`,
                error
              );
              return {
                actualTrackNumber: trackNumber,
                trackTitle: "Unknown Track",
              };
            })
        )
      ).then((details) => {
        // Sort tracks by actual track number before setting titles
        const sortedTitles = details
          .sort((a, b) => a.actualTrackNumber - b.actualTrackNumber)
          .map((detail) => detail.trackTitle);
        setTrackTitles(sortedTitles);
      });
    }
  }, [playList.tracks]);

  return (
    <Link to={`/lists/${playList.listName}`}>
      <button className={styles.PlaylistInfoButton}>
        <div className={styles.ListName}>
          Playlist Name: {playList.listName}
        </div>
        <div className={styles.Creator}>Creator: {playList.creator}</div>
        <div className={styles.Tracks}>
          Tracks:{" "}
          {trackTitles.length > 0
            ? trackTitles.join(", ")
            : "No tracks available."}
        </div>
        <div className={styles.Playtime}>Playtime: {playList.playtime}</div>
        <div className={styles.AverageRating}>
          Average Rating: {playList.average_rating}
        </div>
      </button>
    </Link>
  );
};

export default ListCard;

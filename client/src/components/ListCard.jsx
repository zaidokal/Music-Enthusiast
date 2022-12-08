import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ListCard.module.css";
import { Link } from "react-router-dom";

const ListCard = (props) => {
  let playList = props.playList;

  return (
    <Link to={`/lists/${playList.listName}`}>
      <button className={styles.PlaylistInfoButton}>
        <div className={styles.ListName}>
          Playlist Name: {playList.listName}
        </div>
        <div className={styles.Creator}>Creator: {playList.creator}</div>
        <div className={styles.Tracks}>Tracks: {playList.tracks}</div>
        <div className={styles.Playtime}>Playtime: {playList.playtime}</div>
        <div className={styles.AverageRating}>
          Average Rating: {playList.average_rating}
        </div>
      </button>
    </Link>
  );
};

export default ListCard;

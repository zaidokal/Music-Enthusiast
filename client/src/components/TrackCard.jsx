import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./AccountButton.module.css";
import { Link } from "react-router-dom";

const TrackCard = (props) => {

    let track = props.track;

    return(
        <Link to={`/tracks/${track.track_id}`}>
            <div>
                {track.track_title}
                {track.artist_name}
                {track.album_title}
            </div>
        </Link>
    )
}

export default TrackCard;
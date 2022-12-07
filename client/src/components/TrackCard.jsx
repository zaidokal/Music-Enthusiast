import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./AccountButton.module.css";
import { Link } from "react-router-dom";

const TrackCard = (props) => {

    let track = props.track;

    const [trackItem, setTrackItem] = useState({
        trackObj: {}
    });

    useEffect(()=>{
        axios
          .get(`http://localhost:8000/api/open/tracks/${track.track_id}`)
          .then(res => {
            setTrackItem({
                trackObj: res.data
            })
          })
          .catch((error) => {
            console.error("There has been a error with axios: ", error);
          });
    }, []);

    return(
        <Link to={`/tracks/${track.track_id}`}>
            <div>
                {trackItem.trackObj.track_title}
                {trackItem.trackObj.artist_name}
                {trackItem.trackObj.album_title}
            </div>
        </Link>
    )
}

export default TrackCard;
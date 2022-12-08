import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./AccountButton.module.css";
import { Link } from "react-router-dom";

const ListCard = (props) => {

    let playList = props.playList;

    return(
        <Link to={`/tracks/${playList.listName}`}>
            <div>
                {playList.listName}
                {playList.creator}
                {playList.tracks}
                {playList.playtime}
                {playList.average_rating}
            </div>
        </Link>
    )
}

export default ListCard;
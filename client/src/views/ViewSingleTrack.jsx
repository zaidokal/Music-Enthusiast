import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./SearchResults.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ViewSingleTrack = (props) => {

    const { id } = useParams();

    const [trackInfo, setTrackInfo] = useState({});

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/open/tracks/${id}`)
        .then((res) => {
            setTrackInfo(res.data);
        })
        .catch((error) => {
        console.error("There has been a error with axios: ", error);
        })
    }, []);
    
    let string = JSON.stringify(trackInfo[0]);
    return (
        <>
            <HeaderAccount />
            <div>
                {string}
            </div>
        </>
    );
};

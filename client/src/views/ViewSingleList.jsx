import React, { useEffect, useState } from "react";
import HeaderAccount from "../components/HeaderAccount";
import styles from "./SearchResults.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ViewSingleList = (props) => {

    const { name } = useParams();

    const [listInfo, setListInfo] = useState({});

    useEffect(() => {
        axios
        .get(`http://localhost:8000/open/lists/${name}`)
        .then((res) => {
            setListInfo(res.data);
        })
        .catch((error) => {
        console.error("There has been a error with axios: ", error);
        })
    }, []);
    
    let string = JSON.stringify(listInfo[0]);
    return (
        <>
            <HeaderAccount />
            <div>
                {string}
            </div>
        </>
    );
};
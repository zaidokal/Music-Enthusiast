import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from "./ViewSingleList.module.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import { REACT_APP_IP, REACT_APP_PORT } from "../config";

export const ViewSingleList = () => {
  const { name } = useParams();
  const [listInfo, setListInfo] = useState({});
  const [trackDetails, setTrackDetails] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/open/lists/${name}`
      )
      .then((res) => {
        setListInfo(res.data);

        const tracks = res.data[0]?.tracks || [];
        // Fetch track details for each track
        Promise.all(
          tracks.map((trackNumber) =>
            axios
              .get(
                `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/auth/open/tracks/${trackNumber}`
              )
              .then((response) => ({
                trackNumber,
                trackTitle: response.data[0]?.track_title || "Unknown Track",
              }))
              .catch((error) => {
                console.error(
                  `Error fetching details for track ${trackNumber}:`,
                  error
                );
                return { trackNumber, trackTitle: "Unknown Track" };
              })
          )
        ).then((details) => setTrackDetails(details));
      })
      .catch((error) => {
        console.error("Error fetching list details: ", error);
      });
  }, [name]);

  const { creator, privateFlag, type } = listInfo[0] || {};

  return (
    <>
      <Header />
      <div className={styles.ListDetails}>
        <h2 className={styles.Title}>{name || "Unknown"}</h2>
        <div className={styles.DetailItem}>
          <strong>Creator:</strong> {creator || "Unknown"}
        </div>
        <div className={styles.DetailItem}>
          <strong>Status:</strong> {privateFlag ? "Private" : "Public"}
        </div>
        <div className={styles.DetailItem}>
          <strong>Type:</strong> {type || "N/A"}
        </div>

        <div className={styles.TracksList}>
          <strong>Tracks:</strong>
          {trackDetails.length > 0 ? (
            <ul>
              {trackDetails.map(({ trackNumber, trackTitle }) => (
                <Link to={`/${trackNumber}`} className={styles.TrackLink}>
                  <li key={trackNumber} className={styles.TrackItem}>
                    {trackTitle}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>No tracks available.</p>
          )}
        </div>
      </div>
    </>
  );
};

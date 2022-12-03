import React, { useState } from "react";
import GenericButton from "../components/GenericButton";

export const SearchPage = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <label htmlFor="CompanyName">SRZ Music</label>

      <label htmlFor="Message">Find your next favourite song!</label>

      <label htmlFor="TrackName">Track Name</label>
      <input></input>
      <label htmlFor="Artist">Artist</label>
      <input></input>
      <label htmlFor="Genre">Genre</label>
      <input></input>

      <GenericButton text="Search" />
    </>
  );
};

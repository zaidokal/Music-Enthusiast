const csv = require("csv-parser");
const fs = require("fs");
const genres = [];
const albums = [];
const artists = [];
const tracks = [];

const parse = function () {
  fs.createReadStream("../data/genres.csv")
    .pipe(csv({}))
    .on("data", (data) => genres.push(data))
    .on("end", () => console.log("Genres"));

  fs.createReadStream("../data/raw_albums.csv")
    .pipe(csv({}))
    .on("data", (data) => albums.push(data))
    .on("end", () => console.log("Albums"));

  fs.createReadStream("../data/raw_artists.csv")
    .pipe(csv({}))
    .on("data", (data) => artists.push(data))
    .on("end", () => console.log("Artists"));

  fs.createReadStream("../data/raw_tracks.csv")
    .pipe(csv({}))
    .on("data", (data) => tracks.push(data))
    .on("end", () => console.log("Tracks"));

  let results = {
    genres: genres,
    albums: albums,
    artists: artists,
    tracks: tracks,
  };

  return results;
};

module.exports = parse;

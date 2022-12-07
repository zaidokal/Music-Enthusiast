import React from "react";

class Search extends React.Component {
  state = {
    trackButton: null,
    artistButton: null,
    albumButton: null,
    listButton: null,
  };

  componentDidMount() {
    this.setState({
      trackButton: document.getElementById("trackButton"),
      artistButton: document.getElementById("artistButton"),
      albumButton: document.getElementById("albumButton"),
      listButton: document.getElementById("listButton"),
    });

    trackButton.addEventListener("click", this.trackSearch);
    albumButton.addEventListener("click", this.trackSearch);
    artistButton.addEventListener("click", this.artistSearch);

    // listButton.addEventListener("click", getLists);

    getLists();

    listButton.addEventListener("click", () => {
      const listCreate = document.getElementById("listCreate");
      const listAdd = document.getElementById("listAdd");

      const tracksArray = listAdd.value.split(",");
      console.log(tracksArray);
      createList(
        (data = {
          list: listCreate.value,
        })
      );
      addToList(
        (data = {
          tracks: tracksArray,
        }),
        listCreate.value
      );
    });
  }

  trackSearch() {
    const trackInput = document.getElementById("trackSearch");
    const albumInput = document.getElementById("albumSearch");

    fetch(`/tracks?trackName=${trackInput.value}&albumName=${albumInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        let idObject = [];
        let i = 0;

        Object.keys(data).forEach((key) => {
          idObject[i] = data[key];
          i++;
        });

        const body = document.getElementById("body");

        var newDiv = document.createElement("div");
        newDiv.id = "newDivID";
        body.append(newDiv);

        let table = document.createElement("table");
        table.className = "tableClass";
        table.id = "ResultTableID";
        newDiv.appendChild(table);

        let resultsHeading = document.createElement("tr");
        resultsHeading.className = "resultHeading";
        resultsHeading.id = "resultHeadingID";

        table.append(resultsHeading);
        let heading1 = document.createElement("td");
        heading1.className = "heading";
        let heading2 = document.createElement("td");
        heading2.className = "heading";
        let heading3 = document.createElement("td");
        heading3.className = "heading";
        let heading4 = document.createElement("td");
        heading4.className = "heading";
        let heading5 = document.createElement("td");
        heading5.className = "heading";

        resultsHeading.append(heading1);
        resultsHeading.append(heading2);
        resultsHeading.append(heading3);
        resultsHeading.append(heading4);
        resultsHeading.append(heading5);

        let trackNumHeading = document.createTextNode("Track #");
        let titleHeading = document.createTextNode("Title");
        let artistHeading = document.createTextNode("Artist");
        let albumHeading = document.createTextNode("Album");
        let durationHeading = document.createTextNode("Duration");

        heading1.append(trackNumHeading);
        heading2.append(titleHeading);
        heading3.append(artistHeading);
        heading4.append(albumHeading);
        heading5.append(durationHeading);

        let tableResults = document.getElementsByClassName("resultsRows");

        for (let i = tableResults.length - 1; i >= 0; i--) {
          tableResults[i].parentNode.removeChild(tableResults[i]);

          const element = document.getElementById("newDivID");
          element.remove();

          const element2 = document.getElementById("newDivID");
          element2.remove();
        }

        for (let id of idObject) {
          fetch(`/tracks/${id["track_id"]}`)
            .then((res) => res.json())
            .then((data) => {
              const rowResults = document.createElement("tr");
              rowResults.className = "resultsRows";
              rowResults.id = "resultsRowsID";

              table.append(rowResults);

              let trackNum = document.createElement("td");
              trackNum.className = "resultsData";
              let title = document.createElement("td");
              title.className = "resultsData";
              let artist = document.createElement("td");
              artist.className = "resultsData";
              let album = document.createElement("td");
              album.className = "resultsData";
              let duration = document.createElement("td");
              duration.className = "resultsData";

              rowResults.append(trackNum);
              rowResults.append(title);
              rowResults.append(artist);
              rowResults.append(album);
              rowResults.append(duration);

              let trackNumData = document.createTextNode(data["track_number"]);
              let titleData = document.createTextNode(data["name"]);
              let artistData = document.createTextNode(data["artist_name"]);
              let albumData = document.createTextNode(data["album_name"]);
              let durationData = document.createTextNode(data["duration_ms"]);

              trackNum.append(trackNumData);
              title.append(titleData);
              artist.append(artistData);
              album.append(albumData);
              duration.append(durationData);
            });
        }
      });
  }

  artistSearch() {
    const artistInput = document.getElementById("artistSearch");

    fetch(`/artists?artistName=${artistInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        let idObject = [];
        let i = 0;

        Object.keys(data).forEach((key) => {
          idObject[i] = data[key];

          i++;
        });

        const body = document.getElementById("body");

        var newDiv = document.createElement("div");
        newDiv.id = "newDivID";
        body.append(newDiv);

        let table = document.createElement("table");
        table.className = "tableClass";
        table.id = "ResultTableID";
        newDiv.appendChild(table);

        let resultsHeading = document.createElement("tr");
        resultsHeading.className = "resultHeading";
        resultsHeading.id = "resultHeadingID";

        table.append(resultsHeading);
        let heading1 = document.createElement("td");
        heading1.className = "heading";
        let heading2 = document.createElement("td");
        heading2.className = "heading";

        resultsHeading.append(heading1);
        resultsHeading.append(heading2);

        let artistHeading = document.createTextNode("Artist Name");
        let artistPopularityHeading =
          document.createTextNode("Artist Popularity");

        heading1.append(artistHeading);
        heading2.append(artistPopularityHeading);

        let tableResults = document.getElementsByClassName("resultsRows");

        for (let i = tableResults.length - 1; i >= 0; i--) {
          tableResults[i].parentNode.removeChild(tableResults[i]);

          const element = document.getElementById("newDivID");
          element.remove();

          const element2 = document.getElementById("newDivID");
          element2.remove();
        }

        for (let id of idObject) {
          fetch(`/artists/${id["artist_id"]}`)
            .then((res) => res.json())
            .then((data) => {
              const rowResults = document.createElement("tr");
              rowResults.className = "resultsRows";
              rowResults.id = "resultsRowsID";

              table.append(rowResults);

              let artist = document.createElement("td");
              artist.className = "resultsData";
              let artistPopularity = document.createElement("td");
              artistPopularity.className = "resultsData";

              rowResults.append(artist);
              rowResults.append(artistPopularity);

              let artistData = document.createTextNode(data["name"]);
              let artistPopularityData = document.createTextNode(
                data["popularity"]
              );

              artist.append(artistData);
              artistPopularity.append(artistPopularityData);
            });
        }
      });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Track Name:
            <input type="text" id="trackSearch" />
          </label>
          <label>
            Album Name:
            <input type="text" id="albumSearch" />
          </label>
          <label>
            Artist Name:
            <input type="text" id="artistSearch" />
          </label>
          <button type="button" id="trackButton">
            Search Tracks
          </button>
          <button
            type="button

"
            id="artistButton"
          >
            Search Artists
          </button>
          <button type="button" id="albumButton">
            Search Albums
          </button>
          <button type="button" id="listButton">
            Create List
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

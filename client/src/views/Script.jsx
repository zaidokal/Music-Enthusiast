// let trackButton = document.getElementById("trackButton");

// let listButton = document.getElementById("listButton");

// trackButton.addEventListener("click", trackSearch);
// albumButton.addEventListener("click", trackSearch);
// artistButton.addEventListener("click", artistSearch);

// // listButton.addEventListener("click", getLists);

// getLists();

// listButton.addEventListener("click", () => {
//   const listCreate = document.getElementById("listCreate");
//   const listAdd = document.getElementById("listAdd");

//   const tracksArray = listAdd.value.split(",");
//   console.log(tracksArray);
//   createList(
//     (data = {
//       list: listCreate.value,
//     })
//   );
//   addToList(
//     (data = {
//       tracks: tracksArray,
//     }),
//     listCreate.value
//   );
// });

// function trackSearch() {
//   const trackInput = document.getElementById("trackSearch");
//   const albumInput = document.getElementById("albumSearch");

//   fetch(`/tracks?trackName=${trackInput.value}&albumName=${albumInput.value}`)
//     .then((res) => res.json())
//     .then((data) => {
//       let idObject = [];
//       let i = 0;

//       Object.keys(data).forEach((key) => {
//         idObject[i] = data[key];
//         i++;
//       });

//       for (let id of idObject) {
//         fetch(`/tracks/${id["track_id"]}`)
//           .then((res) => res.json())
//           .then((data) => {
//             const rowResults = document.createElement("tr");
//             rowResults.className = "resultsRows";

//           })
//           .catch((error) => {
//             console.error("There has been a error with fetch: ", error);
//           });
//       }
//     });
// }

// async function addToList(data, listName) {
//   await fetch(`/lists/${listName}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// }

// function getLists() {
//   fetch(`/lists`)
//     .then((res) => res.json())
//     .then((data) => {
//       let nameObject = [];
//       let i = 0;

//       Object.keys(data).forEach((key) => {
//         nameObject[i] = data[key];
//         i++;
//       });
//       console.log(nameObject);
//     });
// }

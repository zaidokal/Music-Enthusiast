const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const parser = require('./parser');

// Initialize database.
const storage = require('node-persist');
storage.init({
    dir: 'db',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
});

// Get the parsed arrays.
const parseResults = parser();

router.use( (req, res, next) => {
    console.log("Time: " + Date.now());
    next();
});

router.use('/', express.static('client'));

// Get all available genre names, IDs and parent IDs.
router.get('/genres', (req, res) => {
    res.send(parseResults.genres.map((data) => {
        return {
            'genre_id':data.genre_id,
            'parent':data.parent,
            'title':data.title,
        }
    }));
});

// Get the artist details (at least 6 key attributes) given an artist ID.
router.get('/artists/:id', (req, res) => {
    if (!isNaN(req.params.id)){
        res.send(parseResults.artists
            .filter(artist => artist.artist_id == req.params.id)
            .map((data) => {
            return {
                'artist_id':data.artist_id,
                'artist_name':data.artist_name,
                'artist_active_year_begin':data.artist_active_year_begin,
                'artist_active_year_end':data.artist_active_year_end,
                'artist_associated_labels':data.artist_associated_labels,
                'artist_contact':data.artist_contact,
                'artist_members':data.artist_members,
            }
        }));
    }
});

// Get the following details for a given track ID: album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title
router.get('/tracks/:id', (req, res) => {
    if (!isNaN(req.params.id)){
        res.send(parseResults.tracks
            .filter(track => track.track_id == req.params.id)
            .map((data) => {
            return {
                'album_id':data.album_id, 
                'album_title':data.album_title, 
                'artist_id':data.artist_id, 
                'artist_name':data.artist_name, 
                'tags':data.tags, 
                'track_date_created':data.track_date_created, 
                'track_date_recorded':data.track_date_recorded, 
                'track_duration':data.track_duration, 
                'track_genres':data.track_genres, 
                'track_number':data.track_number, 
                'track_title':data.track_title,
            }
        }));
    }
});

// Get the first n number of matching track IDs for a given search pattern matching the track title or album. If the number of matches is less than n, then return all matches. Please feel free to pick a suitable value for n.]
router.get('/tracks', (req, res) => {
    const { trackTitle, albumTitle } = req.query;

    let results = [...parseResults.tracks];
    let n = 15

    if (trackTitle){
        results = results.filter(track => track.track_title.toLowerCase().includes(trackTitle.toLowerCase()));
    }

    if (albumTitle){
        results = results.filter(track => track.album_title.toLowerCase().includes(albumTitle.toLowerCase()));
    }

    results = results.slice(0 , n);

    res.send(results.map((data) => {
        return {
            'track_id':data.track_id,
        }
    }));
});

// Get all the matching artist IDs for a given search pattern matching the artist's name.
router.get('/artists', (req, res) => {
    const { artistName } = req.query;

    let results = [...parseResults.artists];

    if (artistName){
        results = results.filter(artist => artist.artist_name.toLowerCase().includes(artistName.toLowerCase()));
    }

    res.send(results.map((data) => {
        return {
            'artist_id':data.artist_id,
        }
    }));
});

// Create a new list to save a list of tracks with a given list name. Return an error if name exists.
router.post('/lists', body('listName').not().isEmpty().trim().escape(), async (req, res) => {
    let existingList = await storage.getItem(req.body.listName);
    if (existingList){
        res.send("ERROR: existing list with this name");
    }
    else if (!existingList) {
        storage.setItem(req.body.listName, 1);
        res.send("Successfully added list!")
    }
});

// Save a list of track IDs to a given list name. Return an error if the list name does not exist. Replace existing track IDs with new values if the list exists.
router.put('/lists/:name', body('listName').not().isEmpty(), body('tracks').not().isEmpty(), async (req, res) => {
    let existingList = await storage.getItem(req.params.name);
    if (!existingList){
        res.send("ERROR: no existing list with this name");
    }
    else if (existingList) {
        storage.setItem(req.params.name, {
            tracks: req.body.tracks,
        });
        res.send("Successfully updated tracks in list!")
    }
});

// Get the list of track IDs for a given list.
router.get('/lists/:name', async (req, res) => {
    let existingList = await storage.getItem(req.params.name);
    if (!existingList){
        res.send("ERROR: no existing list with this name");
    }
    else if (existingList) {
        res.send(await storage.valuesWithKeyMatch(req.params.name));
    }
});

// Delete a list of tracks with a given name. Return an error if the given list doesn’t exist.
router.delete('/lists/:name', async (req, res) => {
    let existingList = await storage.getItem(req.params.name);
    if (!existingList){
        res.send("ERROR: no existing list with this name");
    }
    else if (existingList) {
        storage.removeItem(req.params.name);
        res.send("Successfully deleted the list!")
    }
})

// Get a list of list names, number of tracks that are saved in each list and the total play time of each list.
router.get('/lists', async (req, res) => {

    let results = [];

    try {
        await storage.forEach(async function (datum) {
            let totalPlaytime = 0;

                tracks = datum.value.tracks;
                for (trackid of tracks) {
                    let duration = parseResults.tracks.filter(trck => trck.track_id == trackid)[0];
                    if (duration) {
                        duration = duration.track_duration
                        let timeSplit = duration.split(':');
                        totalPlaytime += parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1]);
                    }
                }

                convertedPlaytime = Math.floor(totalPlaytime % 3600 / 60) + ":" + Math.floor(totalPlaytime % 3600 % 60);

                results.push({
                    listName:datum.key,
                    tracks:datum.value.tracks,
                    playtime:convertedPlaytime
                });
        });
    } catch (err) {
        console.log(err);
    }

    res.send(results);

});

// ----- Authentication ----- api/auth ?
// POST request to login
    // Some sort of request for JWT
// POST reqeust to create account
    // Verification
// PUT request to change password

// ----- Unauthorized Users ----- api/open
// GET Request for track search results
    // soft-matched
// GET Request for specific track
    // include youtube button stuff
// GET Request for 10 random public playlists
// GET Request for specific list

// ----- Authenticated Users ----- api/secure
// POST Request to create playlist
// PUT Request to edit playlist
// DELETE Request to delete playlist
// POST Request to create review
// PUT Request to edit a review
// DELETE Request to delete a review

// ----- Admin ----- api/admin
// PUT to modify site manager priveleges
// PUT to modify deactivated status
// PUT to modify review hidden status
// POST to create policies
// PUT to modify policies
module.exports = router;
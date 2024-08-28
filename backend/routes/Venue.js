import express from 'express';
import { getVenue, getVenues, createVenue, updateVenue, loginVenue, getVenuesFeed } from '../controllers/VenueOps.js';

const app = express();

app.use(express.json());

//Get all venues
app.get('/', async (req, res) => {
    res.send(await getVenues());
});

app.post('/feed/doc', async (req, res) => {
    const limit = req.body.limit;
    const usrLat = req.body.lat;
    const usrLon = req.body.lon;

    console.log("limit: " + limit + " lat: " + usrLat + " lon: " + usrLon)

     try {
        res.send(await getVenuesFeed(limit, usrLat, usrLon));
    } catch (error) {
        console.error("Error in getting venues feed", error);
        res.status(500).send({ error: 'Venue feed fetch failed' });
    }
});

//Get a venue by venueId
app.get('/:venueId', async (req, res) => {
    console.log(req.params);
    res.send(await getVenue(req.params.venueId));
});

//Create a new venue
app.post('/', async (req, res) => {
    try{
        const venue = req.body;

    res.send(await createVenue(venue));
    }
    catch (error){
        console.error("Error in create venue route:", error);
        res.status(500).send({ error: 'Create venue failed' });
    }
});

//Update a venue
app.put('/update/:venueId', async (req, res) => {
    const venue = {
        ...req.body,
        ...{venueId: req.params.venueId}
    }

    res.send(await updateVenue(venue));
});

app.post('/login', async (req, res) => {
    const venue = {
        ...req.body,
    };
     try {
        const token = await loginVenue(venue.email, venue.password);
        console.log(token);

        // Send the token as a response to the client
        res.send({ token });
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).send({ error: 'Login failed' });
    }
});

export default app;
import express from 'express';
import { createCV, getCV, getCVByClubberId, getCVByVenueId, getCVs, updateCV } from '../controllers/ClubberVenueOps.js';

const app = express();

app.use(express.json());

//Get all CV
app.get('/', async (req, res) => {
    res.send(await getCVs());
});

//Get a CV by clubberVenueId
app.get('/:clubberVenueId', async (req, res) => {
    console.log(req.params);
    res.send(await getCV(req.params.clubberVenueId));
});

//Create a new clubber venue
app.post('/', async (req, res) => {
    const clubberVenue = req.body;

    res.send(await createCV(clubberVenue));
});

//Update a clubber venue
app.post('/:clubberVenueId', async (req, res) => {
    const clubberVenue = {
        ...req.body,
        ...{clubberVenueId: req.params.clubberVenueId}
    }

    res.send(await updateCV(clubberVenue));
});

//Get clubber venue with clubberId
app.get('/clubber/:clubberId', async (req, res) => {
    res.send(await getCVByClubberId(req.params.clubberId));
});

//Get clubber venue with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getCVByVenueId(req.params.venueId));
});

export default app;
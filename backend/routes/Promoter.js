import express from 'express';
import { getPromoter, getPromoters, createPromoter, updatePromoter, getPromotersByClubberId, getPromotersByVenueId } from '../controllers/PromoterOps.js';

const app = express();

app.use(express.json());

//Get all promoters
app.get('/', async (req, res) => {
    res.send(await getPromoters());
});

//Get a promoter by promoterId
app.get('/:promoterId', async (req, res) => {
    console.log(req.params);
    res.send(await getPromoter(req.params.promoterId));
});

//Create a new promoter
app.post('/', async (req, res) => {
    const promoter = req.body;

    res.send(await createPromoter(promoter));
});

//Update a promoter
app.post('/:promoterId', async (req, res) => {
    const promoter = {
        ...req.body,
        ...{promoterId: req.params.promoterId}
    }

    res.send(await updatePromoter(promoter));
});

//Get promoter with clubberId
app.get('/clubber/:clubberId', async (req, res) => {
    res.send(await getPromotersByClubberId(req.params.clubberId));
});

//Get promoters with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getPromotersByVenueId(req.params.venueId));
});

export default app;
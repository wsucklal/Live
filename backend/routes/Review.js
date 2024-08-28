import express from 'express';
import { getReviews, getReview, createReview, updateReview, getReviewsByClubberId, getReviewsByVenueId, deleteReview } from '../controllers/ReviewOps.js';

const app = express();

app.use(express.json());

//Get all reviews
app.get('/', async (req, res) => {
    res.send(await getReviews());
});

//Get a review by reviewId
app.get('/:reviewId', async (req, res) => {
    console.log(req.params);
    res.send(await getReview(req.params.reviewId));
});

//Create a new review
app.post('/', async (req, res) => {
    const ratingData = req.body;

    res.send(await createReview(ratingData));
});

//Update a review
app.post('/:reviewId', async (req, res) => {
    const review = {
        ...req.body,
        ...{reviewId: req.params.reviewId}
    }

    res.send(await updateReview(review));
});

//Get reviews with clubberId
app.get('/clubber/:clubberId', async (req, res) => {
    res.send(await getReviewsByClubberId(req.params.clubberId));
});

//Get reviews with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getReviewsByVenueId(req.params.venueId));
});

app.delete('/:reviewId', async (req, res) => {
    res.send(await deleteReview(req.params.reviewId));
})

export default app;
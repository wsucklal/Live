import express from 'express';
import { getSubscriptions, getSubscription, createSubscription, updateSubscription, getSubscriptionsByClubberId, getSubscriptionsByVenueId } from '../controllers/SubscriptionOps.js';

const app = express();

app.use(express.json());

//Get all subscriptions
app.get('/', async (req, res) => {
    res.send(await getSubscriptions());
});

//Get a subscription by subscriptionId
app.get('/:subscriptionId', async (req, res) => {
    console.log(req.params);
    res.send(await getSubscription(req.params.subscriptionId));
});

//Create a new subscription
app.post('/', async (req, res) => {
    const subscription = req.body;

    res.send(await createSubscription(subscription));
});

//Update a subscription
app.post('/:subscriptionId', async (req, res) => {
    const subscription = {
        ...req.body,
        ...{subscriptionId: req.params.subscriptionId}
    }

    res.send(await updateSubscription(subscription));
});

//Get subscriptions with clubberId
app.get('/clubber/:clubberId', async (req, res) => {
    res.send(await getSubscriptionsByClubberId(req.params.clubberId));
});

//Get subscriptions with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getSubscriptionsByVenueId(req.params.venueId));
});

export default app;
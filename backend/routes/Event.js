import express from 'express';
import { getEvent, getEvents, createEvent, updateEvent, getEventByVenueId, registerClubberForEvent, getClubberRegisteredEvents, deregisterClubberFromEvent} from '../controllers/EventOps.js';

const app = express();

app.use(express.json());

//Get all events
app.get('/', async (req, res) => {
    res.send(await getEvents());
});

//Get a event by eventId
app.get('/:eventId', async (req, res) => {
    console.log(req.params);
    res.send(await getEvent(req.params.eventId));
});

//Create a new event
app.post('/', async (req, res) => {
    const review = req.body;

    res.send(await createEvent(review));
});

//Update a event
app.post('/:eventId', async (req, res) => {
    const event = {
        ...req.body,
        ...{eventId: req.params.eventId}
    }

    res.send(await updateEvent(event));
});

//Get events with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getEventByVenueId(req.params.venueId));
});

//Register a clubber for an event
app.put('/register/:eventId', async(req, res) => {
    res.send(await registerClubberForEvent(req.params.eventId, req.query.clubberId));
})

app.get('/clubber/:clubberId', async(req, res) => {
    res.send (await getClubberRegisteredEvents(req.params.clubberId))
})

app.put('/deregister/:eventId', async(req, res) => {
    res.send (await deregisterClubberFromEvent(req.params.eventId, req.query.clubberId))
})
export default app;
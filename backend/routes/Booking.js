import express from 'express';
import { getBooking, getBookings, createBooking, updateBooking, getBookingsByClubberId, getBookingsByVenueId } from '../controllers/BookingOps.js';

const app = express();

app.use(express.json());

//Get bookings with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getBookingsByVenueId(req.params.venueId));
});


//Get all bookings
app.get('/', async (req, res) => {
    res.send(await getBookings());
});

//Get a booking by bookingId
app.get('/:bookingId', async (req, res) => {
    console.log(req.params);
    res.send(await getBooking(req.params.bookingId));
});

//Create a new booking
app.post('/', async (req, res) => {
    const booking = req.body;

    res.send(await createBooking(booking));
});

//Update a booking
app.post('/:bookingId', async (req, res) => {
    const booking = {
        ...req.body,
        ...{bookingId: req.params.bookingId}
    }

    res.send(await updateBooking(booking));
});

//Get booking with clubberId
app.get('/clubber/:clubberId', async (req, res) => {
    res.send(await getBookingsByClubberId(req.params.clubberId));
});


export default app;
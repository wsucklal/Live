import express from 'express';
import { getClubbers, getClubber, createClubber, updateClubberWithPhoto, getClubberByToken, loginClubber, updateClubberWithoutPhoto} from '../controllers/clubberOps.js';

const app = express();

app.use(express.json());

//Get all clubbers
app.get('/', async (req, res) => {
    res.send(await getClubbers());
});

//Get a clubber by clubberId
app.get('/:clubberId', async (req, res) => {
    console.log(req.params);
    res.send(await getClubber(req.params.clubberId));
});

//Create a new clubber
app.post('/', async (req, res) => {
    const clubber = req.body;

    res.send(await createClubber(clubber));
});
//Update a clubber
app.post('/update/photo/:clubberId', async (req, res) => {
    const clubber = {
        ...req.body,
        ...{clubberId: req.params.clubberId}
    }

    res.send(await updateClubberWithPhoto(clubber));
});

app.post('/update/:clubberId', async (req, res) => {
    const clubber = {
        ...req.body,
        ...{clubberId: req.params.clubberId}
    }

    res.send(await updateClubberWithoutPhoto(clubber));
});

//Get clubber by api token
app.get('/token/:token', async (req, res) => {
    console.log(req.params);
    res.send(await getClubberByToken(req.params.token));
});

app.post('/login', async (req, res) => {
    const clubber = {
        ...req.body,
    };
     try {
        const token = await loginClubber(clubber.email, clubber.password);
        console.log(token);

        // Send the token as a response to the client
        res.send({ token });
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).send({ error: 'Login failed' });
    }
});

export default app;
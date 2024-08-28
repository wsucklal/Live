import express from 'express';
import { createConnection, getConnection, getConnections, updateConnection, getConnectionByClubberId } from '../controllers/ConnectionOps.js';

const app = express();

app.use(express.json());

//Get all connections
app.get('/', async (req, res) => {
    res.send(await getConnections());
});

//Get a connection by connectionId
app.get('/:connectionId', async (req, res) => {
    console.log(req.params);
    res.send(await getConnection(req.params.connectionId));
});

//Create a new connection
app.post('/', async (req, res) => {
    const connection = req.body;

    res.send(await createConnection(connection));
});

//Update a connection
app.post('/:connectionId', async (req, res) => {
    const connection = {
        ...req.body,
        ...{connectionId: req.params.connectionId}
    }

    res.send(await updateConnection(connection));
});

//Get connection with clubberId
app.get('/clubber/:clubberId', async (req, res) => {
    res.send(await getConnectionByClubberId(req.params.clubberId));
});

export default app;
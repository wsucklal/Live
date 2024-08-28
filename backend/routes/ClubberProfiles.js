// import { db } from '../firebase/firebase.js';
import express from 'express';
import bodyParser from 'body-parser';
import { createUser, getUser } from '../controllers/userOps.js';

const Router = express.Router();

Router.use(express.json())

Router
    .post('/CreateProfile', async(req, res) => { 
        const userData = req.body
        // console.log(`the user Data is  ${JSON.stringify(userData)}`);

        try {
            await createUser(userData);
            await 
            res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } )
    .get('/getUser/:id', async(req, res) => { 
        const activeUser = req.params.id
        // console.log(`the user Data is  ${JSON.stringify(userData)}`);

        try {
            const userData = await getUser(activeUser);
            console.log(userData)
            res.status(200).json(userData);
            
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } )
    export default Router;
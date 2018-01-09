import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => 
    res.status(400).json({error:{"message": "Invalid credentials"}}));

export default routes;
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import dotenv from 'dotenv';

import auth from './routes/auth';

dotenv.config();
mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', auth);

app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, "index.html")));

app.listen(8080, () => console.log("App listening on port 8080"));
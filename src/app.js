import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Promise from 'bluebird';

import auth from './routes/auth';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/bookworm', {useMongoClient: true});

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', auth);

app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, "index.html")));

app.listen(8080, () => console.log("App listening on port 8080"));
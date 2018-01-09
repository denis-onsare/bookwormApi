import express from 'express';
import path from 'path';

import auth from './routes/auth';

const app = express();

app.use('/api/auth', auth);

app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, "index.html")));

app.listen(8080, () => console.log("App listening on port 8080"));
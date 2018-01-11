import express from 'express';
import User from '../models/User';
import { toASCII } from 'punycode';

const router = express.Router();

router.post('/', (req, res) => {
    const {credentials} = req.body;
    console.log(credentials);
    User.findOne({email: credentials.email}).then(user => {
        if (user && user.isValidPassword(credentials.password)) {
            res.json({user: user.toAuthJSON()});
        } else {
            res.status(400).json({errors:{message: "Invalid credentials"}})
        }
    })
});

export default router;
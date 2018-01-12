import express from 'express';
import User from '../models/User';
import parseError from '../utils/parseError.js';
import { sendConfirmationEmail } from '../mailers/mailer';

const router = express.Router();

router.post('/', (req, res) => {
   const {email, password} = req.body.user;
   const user = new User({email});
   user.setPassword(password);
   user.setConfirmationToken();
   user
    .save()
    .then(user => {
        sendConfirmationEmail(user);
        res.json({ user: user.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseError(err.errors) }));
});

export default router;
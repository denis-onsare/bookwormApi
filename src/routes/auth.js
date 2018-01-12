import express from 'express';
import User from '../models/User';
import { sendResetPasswordRequestEmail } from '../mailers/mailer';

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

router.post('/confirmation', (req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
        {confirmationToken: token},
        {confirmationToken: "", confirmed: true}, 
        {new: true}
    ).then(user => 
            user ? res.json({user: user.toAuthJSON()}) : res.status(400).json({})
    );
});

router.post('/reset_password_request', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(user) {
            sendResetPasswordRequestEmail(user);
            res.json({});
        } else {
            res.status(404).json({errors:{message: "User not found!!"}});
        }
    })
});

export default router;
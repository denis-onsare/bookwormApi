import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = mongoose.Schema({
    email:{
        type: String,
        lowercase: true,
        required: true,
        index: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
        default: ''
    }
},{timestamps: true});

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
}
schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign ({
        email: this.email,
        confirmed: this.confirmed
    }, process.env.SECRET_KEY);
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
   this.confirmationToken = this.generateJWT();
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
   return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}

schema.methods.generateResetPasswordUrl = function generateResetPasswordUrl() {
   return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`;
}

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign ({
        _id: this._id
    }, 
    process.env.SECRET_KEY,
    {"expiresIn" :"1s"}
    );
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return ({
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()
    })
}

schema.plugin(uniqueValidator, {message: "This email is already in use"});

export default mongoose.model('User', schema);
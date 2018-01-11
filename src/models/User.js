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
    }
},{timestamps: true});

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign ({
        email: this.email
    }, process.env.SECRET_KEY);
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return ({
        email: this.email,
        token: this.generateJWT()
    })
}

schema.plugin(uniqueValidator);

export default mongoose.model('User', schema);
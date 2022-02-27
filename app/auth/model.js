const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const bcrypt = require('bcrypt');

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    msisdn: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: [String]
}, {timestamps:true});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = model('User', userSchema);

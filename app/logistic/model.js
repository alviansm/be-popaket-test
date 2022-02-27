const mongoose = require('mongoose');
const {Schema, model} = mongoose;

var logisticSchema = new Schema({
    logistic_name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    destination_name: {
        type: String,
        required: true
    },
    origin_name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

module.exports = model('Logistic', logisticSchema);

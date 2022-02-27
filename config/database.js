var mongoose = require('mongoose');
var {MONGO_URI} = require('../app/config');

try {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log('MongoDB connection has been successfully established'));
} catch (e) {
    console.log('Database connection could not be established');
}

const mongoose_connection = mongoose.connection;

module.exports = mongoose_connection;

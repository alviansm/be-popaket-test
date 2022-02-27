var dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY= process.env.SECRET_KEY;

module.exports = {
    MONGO_URI,
    SECRET_KEY
}

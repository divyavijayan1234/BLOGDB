const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this line is present to load .env variables

const connectdb = async () => {
    try {
        mongoose.set('strictQuery', false);
        console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
           // useNewUrlParser: true,
           // useUnifiedTopology: true,
        });
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Database connection error: ${err.message}`);
        process.exit(1); // Exit the process if unable to connect to the database
    }
};

module.exports = connectdb;

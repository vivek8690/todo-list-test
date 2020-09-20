/* eslint-disable max-len */
/* eslint-disable strict */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

// pass databse connection URI here
const DB_URL = process.env.DATABASE_URL;

mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Database connected on with ${DB_URL}`);
});


db.on('error', (err) => {
    console.error('connection error:', err);
});

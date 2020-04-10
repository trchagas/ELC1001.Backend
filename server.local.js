'use strict'

const server = require('./server')
const apiPort = process.env.API_PORT || 3000;
const mongoUrl = process.env.DATABASE_URL;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log("Trying to connect to MongoDB...");

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to MongoDB. Trying to start API server...");    

    server.listen(apiPort, () => {
        console.log("API server started on port " + apiPort);
    });
}
).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});
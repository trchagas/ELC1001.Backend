require('app-module-path').addPath(__dirname);

const bodyParser = require('body-parser');
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes/calendar.routes.js')(app);
require('./api/routes/garment.routes.js')(app);
require('./api/routes/look.routes.js')(app);
require('./api/routes/user.routes.js')(app);
require('./api/routes/wardrobe.routes.js')(app);

module.exports = app;
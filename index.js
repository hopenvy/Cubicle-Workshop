const env = process.env.NODE_ENV.trim() || 'development';

const config = require('./config/config')[env];
const express = require('express');
const routes = require('./config/routes');
const app = express();


require('./config/express')(app);


app.use(routes)

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

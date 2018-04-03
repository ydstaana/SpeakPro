const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


const app = express();

//Mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@ds121599.mlab.com:21599/speakpro')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var api = require('./server/routes/api');
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

//SET ROUTE FOR API
app.use('/api', api);




/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
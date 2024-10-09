const express = require('express');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

/**
* Express instance
* @public
*/
const app = express();

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

module.exports = app;

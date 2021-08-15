const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('@tensorflow/tfjs-node');

require('dotenv').config();

require('./auth/passport');

require('./models/user');

const middlewares = require('./middlewares');
const api = require('./routes');

const app = express();
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('@tensorflow/tfjs-node');

require('dotenv').config();

require('./auth/passport');

// Get API information
const api = require('./routes');

// Set up Express App
const app = express();
app.use(express.static('public'));

//Loads the handlebars module
var exphbs = require('express-handlebars');

// Use cookieParser
app.use(cookieParser());
app.use(morgan('dev'));

// Set up CORS
app.use(cors());
app.use(express.json());

// Use defined API
app.use('/api/v1', api);

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

// Handlebars routes
app.get('/', function (req, res) {
	res.render('map', { layout: 'main' });
});

app.get('/reviews', function (req, res) {
	res.render('reviews', { layout: 'main' });
});

app.get('/login', function (req, res) {
	res.render('login', { layout: 'main' });
});

app.get('/post', function (req, res) {
	res.render('post', { layout: 'main' });
});

app.get('/signup', function (req, res) {
	res.render('signup', { layout: 'main' });
});
module.exports = app;

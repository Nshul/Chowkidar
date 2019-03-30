var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	MONGO_URI = require('./config'),
	flash = require('connect-flash'),
	methodOverride = require('method-override');

var indexRoutes = require('./routes/index');

mongoose.Promise = global.Promise;

// mongoose.connect(MONGO_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.set('view engine', 'ejs');

app.use(
	require('express-session')({
		secret: 'I am the best',
		resave: false,
		saveUninitialized: false
	})
);

app.use(function(req, res, next) {
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(indexRoutes);

app.listen(8000, () => {
	console.log('Server has started');
});

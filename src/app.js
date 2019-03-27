const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const port = process.env.PORT || 3000;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		author: 'prem'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About section',
		author: 'kumar'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help section',
		author: 'prem kumar'
	});
});

/*app.get('/help', (req, res) => {
	res.send([{
		name: 'test'
	},
	{
		name: 'demo'
	}]);
});*/

/*app.get('/about', (req, res) => {
	res.send('<h1>About page</h1>');
});*/

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide address'
		})
	}
	geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
		if (error) {
			return res.send({
				error
			});
		} else {
			//const {longitude, latitude, location} = geocode_response;
			forecast(longitude, latitude, (error, forecast_response) => {
				if (error) {
					return res.send({
						error
					});
				} else {
					const {temp, rain, summary} = forecast_response;
					res.send({
						forecast: summary + ' It is currently ' + temp + ' degrees out. There is a ' + (rain * 100) + '% chance of rain.',
						location,
						address: req.query.address
					});
				}
			});
		}
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Please provide search term'
		})
	}
	console.log(req.query);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('custom_error', {
		error_message: 'Help article not found',
		title: 'Help error',
		author: 'prem'
	});
});

app.get('*', (req, res) => {
	res.render('custom_error', {
		error_message: 'This is 404 page!',
		title: '404 error',
		author: 'kumar'
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
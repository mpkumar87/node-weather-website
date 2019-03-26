const request = require('request');

const forecast = (long, lat, callback) => {
	const url = "https://api.darksky.net/forecast/189ae86069532e4b5d54980484b324a8/"+lat+","+long;
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(undefined, {
				temp: body.currently.temperature,
				rain: body.currently.precipProbability,
				summary: body.daily.data[0].summary
			});
		}
	});
};

module.exports = forecast;
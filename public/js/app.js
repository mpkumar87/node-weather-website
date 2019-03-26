const form = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = input.value;
	msg1.textContent = 'Loading...';
	msg2.textContent = '';
	fetch('http://localhost:3000/weather?address='+location).then((response) => {
	if (response.status == 200) {
		response.json().then((data) => {
			if (data.error) {
				msg1.textContent = data.error;
			} else {
				msg1.textContent = data.forecast;
				msg2.textContent = data.location;
			}
		});
	} else {
		console.log('failed to fetch data');
	}
});
});
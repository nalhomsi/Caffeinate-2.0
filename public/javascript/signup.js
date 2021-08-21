async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && email && password) {
		const response = await fetch('/api/v1/register', {
			method: 'post',
			body: JSON.stringify({
				username,
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		console.log(response);
		// check the response status
		if (response.ok) {
			console.log('success');
			document.location.replace('/');
		} else {
			alert(response.statusText);
		}
	}
}

// When submit button is pressed, register user
$('#btnRegister').on('click', function (event) {
	signupFormHandler(event);
});

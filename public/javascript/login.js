async function loginFormHandler(event) {
	event.preventDefault();

	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		const response = await fetch('/api/v1/login', {
			method: 'post',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		const body = await response.json();

		if (response.ok) {
			localStorage.setItem('accessToken', body.accessToken);
			document.location.replace('/');
		} else {
			alert(response.statusText);
		}
	}
}

// When submit button is pressed, register user
$('#btnLogin').on('click', function (event) {
	loginFormHandler(event);
});

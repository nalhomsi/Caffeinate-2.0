async function logout() {
	const response = await fetch('/api/users/logout', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	});

	if (response.ok) {
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('#logout').addEventListener('click', logout);

export const hideAlert = () => {
	const el = document.querySelector('.alert');
	if (el) el.parentElement.removeChild(el);
};

export const showAlerts = (type, msg, time = 7) => {
	hideAlert();
	const markup = `<div class="alert alert--${type}">${msg}</div>`;
	document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
	window.setTimeout(hideAlert, time * 1000);
};

export const isAuth = () => {
	const auth = localStorage.getItem('user');

	if (auth) {
		return JSON.parse(auth);
	}

	return false;
};

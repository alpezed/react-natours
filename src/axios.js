import axios from 'axios';
import * as actions from './store/actions';

const instance = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
});

export const axiosInterceptors = store => {
	let isRefreshing = false;
	let subscribers = [];

	function onAccessTokenFetched(access_token) {
		subscribers = subscribers.filter(callback => callback(access_token));
	}

	function addSubscriber(callback) {
		subscribers.push(callback);
	}

	instance.interceptors.response.use(
		response => response,
		error => {
			const {
				config,
				response: { status },
			} = error;

			const originalRequest = config;

			if (originalRequest.url === '/login') {
				return Promise.reject(error);
			}

			const { refreshToken } = JSON.parse(localStorage.getItem('user'));
			if (status === 401) {
				if (!isRefreshing) {
					isRefreshing = true;
					store
						.dispatch(actions.refreshToken(refreshToken))
						.then(({ data }) => {
							isRefreshing = false;
							onAccessTokenFetched(data.token);

							// Save token
							const user = JSON.parse(localStorage.getItem('user'));
							user.token = data.token;
							user.refreshToken = data.refreshToken;
							localStorage.setItem('user', JSON.stringify(user));

							subscribers = [];
						});
				}

				return new Promise(resolve => {
					addSubscriber(token => {
						originalRequest.headers.Authorization = 'Bearer ' + token;
						resolve(instance(originalRequest));
					});
				});
			}

			return Promise.reject(error);
		}
	);
};

export default instance;

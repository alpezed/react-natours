import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
});

// Add a request interceptor
// instance.interceptors.request.use(
// 	config => {
// 		const { token } = JSON.parse(localStorage.getItem('user'));
// 		if (token) {
// 			config.headers.Authorization = `Bearer '${token}`;
// 		}

// 		console.log('config', config);
// 		console.table('token', token);

// 		return config;
// 	},
// 	error => Promise.reject(error)
// );

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

// Add a response interceptor
instance.interceptors.response.use(
	response => response,
	error => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then(token => {
						originalRequest.headers['Authorization'] = 'Bearer ' + token;
						return axios(originalRequest);
					})
					.catch(err => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const { refreshToken } = JSON.parse(localStorage.getItem('user'));
			return new Promise((resolve, reject) => {
				instance
					.post('/users/refresh-token', {
						refreshToken,
					})
					.then(res => {
						if (res.status === 200) {
							const user = JSON.parse(localStorage.getItem('user'));
							user.token = res.data.token;
							user.refreshToken = res.data.refreshToken;
							localStorage.setItem('user', JSON.stringify(user));
							instance.defaults.headers.common['Authorization'] =
								'Bearer ' + user.token;
							originalRequest.headers['Authorization'] = `Bearer ${user.token}`;
							resolve(axios(originalRequest));
						}
					})
					.catch(err => {
						processQueue(err, null);
						reject(err);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}
		return Promise.reject(error);
	}
);

export default instance;

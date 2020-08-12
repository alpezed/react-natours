import { validate } from 'indicative/validator';

import axios from '../axios';

export default class AuthService {
	async signupUser(data) {
		const rules = {
			name: 'required|string',
			email: 'required|email',
			password: 'required|min:8|confirmed',
		};

		const messages = {
			required: field => `${field} is required`,
			'name.alpha': 'Username contains unallowed characters',
			'email.email': 'Please enter a valid email address',
			'password.min': 'Password is too short',
			'password.confirmed': 'The password confirmation does not match.',
		};

		try {
			await validate(data, rules, messages);

			const res = axios.post('/users/signup', {
				name: data.name,
				email: data.email,
				password: data.password,
				passwordConfirm: data.password_confirmation,
			});

			return res;
		} catch (error) {
			if (error.response.status === 401) {
				return Promise.reject(error.response);
			}
			return Promise.reject(error.response);
		}
	}
	async loginUser(data) {
		const rules = {
			email: 'required|email',
			password: 'required|min:8',
		};

		const messages = {
			required: field => `${field} is required`,
			'email.email': 'Please enter a valid email address',
			'password.min': 'Password is too short',
		};

		try {
			await validate(data, rules, messages);

			const res = await axios.post('/users/login', {
				email: data.email,
				password: data.password,
			});

			const userData = {
				user: res.data.data.user,
				token: res.data.token,
				refreshToken: res.data.refreshToken,
				expiresIn: res.data.expiresIn,
			};

			return userData;
		} catch (error) {
			if (error.response && error.response.status === 401) {
				return Promise.reject(error.response);
			}
			return Promise.reject(error.response);
		}
	}
	async logoutUser() {
		try {
			const response = await axios({
				method: 'GET',
				url: '/users/logout',
			});

			return response;
		} catch (error) {
			return Promise.reject(error.response);
		}
	}
	async updateAccount(data, token, type) {
		const url =
			type === 'password' ? '/users/update-password' : '/users/update-me';

		const response = await axios({
			method: 'PATCH',
			url: url,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response;
	}
}

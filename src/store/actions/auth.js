import * as actionTypes from './actionTypes';
import AuthService from '../../utils/auth';
import { showAlerts } from '../../utils/helper';

import axios from '../../axios';

export const userSignupStart = () => {
	return {
		type: actionTypes.USER_SIGNUP_START,
	};
};

export const userSignupSuccess = userData => {
	return {
		type: actionTypes.USER_SIGNUP_SUCCESS,
		user: userData,
	};
};

export const userSignupFail = error => {
	return {
		type: actionTypes.USER_SIGNUP_FAIL,
		error,
	};
};

export const loginStart = () => {
	return {
		type: actionTypes.USER_LOGIN_START,
	};
};

export const loginSuccess = user => {
	return {
		type: actionTypes.USER_LOGIN_SUCCESS,
		user,
	};
};

export const loginFail = error => {
	return {
		type: actionTypes.USER_LOGIN_FAIL,
		error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.USER_LOGOUT,
	};
};

export const logoutFail = error => {
	return {
		type: actionTypes.USER_LOGOUT_FAIL,
		error,
	};
};

export const updateUserStart = () => {
	return {
		type: actionTypes.USER_UPDATE_START,
	};
};

export const updateSettings = data => {
	return {
		type: actionTypes.USER_UPDATE_SETTINGS,
		data,
	};
};

export const updatePassword = () => {
	return {
		type: actionTypes.USER_UPDATE_PASSWORD,
	};
};

export const updateSettingsFail = error => {
	return {
		type: actionTypes.USER_UPDATE_FAIL,
		error,
	};
};

export const forgotPasswordStart = () => {
	return {
		type: actionTypes.FORGOT_PASSWORD_START,
	};
};

export const forgotPasswordSuccess = message => {
	return {
		type: actionTypes.FORGOT_PASSWORD_SUCCESS,
		message,
	};
};

export const forgotPasswordFailed = error => {
	return {
		type: actionTypes.FORGOT_PASSWORD_FAILED,
		error,
	};
};

export const resetPasswordStart = () => {
	return {
		type: actionTypes.RESET_PASSWORD_START,
	};
};

export const resetPasswordSuccess = () => {
	return {
		type: actionTypes.RESET_PASSWORD_SUCCESS,
	};
};

export const resetPasswordFailed = error => {
	return {
		type: actionTypes.RESET_PASSWORD_FAILED,
		error,
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path,
	};
};

export const checkAuthTimeout = expirationTime => dispatch => {
	setTimeout(() => {
		dispatch(logoutUser());
	}, expirationTime * 1000);
};

export const userSignup = values => async dispatch => {
	dispatch(userSignupStart());
	try {
		// const userData = await new AuthService().signupUser({
		// 	name: values.name,
		// 	email: values.email,
		// 	password: values.password,
		// 	passwordConfirm: values.password_confirmation,
		// });

		const userData = await axios({
			method: 'POST',
			url: '/users/signup',
			data: {
				name: values.name,
				email: values.email,
				password: values.password,
				passwordConfirm: values.password_confirmation,
			},
		});

		console.log(userData);

		dispatch(userSignupSuccess(userData));
	} catch (err) {
		console.log(err.response);
		if (err.response) {
			dispatch(userSignupFail(err.response.data.message));
		}
	}
};

export const loginUser = values => {
	return async dispatch => {
		dispatch(loginStart());
		try {
			const authService = new AuthService();
			const authData = await authService.loginUser({
				email: values.email,
				password: values.password,
			});
			localStorage.setItem('user', JSON.stringify(authData));
			showAlerts('success', 'Logged in successfully!');
			dispatch(loginSuccess(authData));
			// dispatch(checkAuthTimeout(authData.expiresIn));
		} catch (err) {
			console.log(err);
			if (err) {
				dispatch(loginFail(err.data.message));
			}
		}
	};
};

export const logoutUser = () => async dispatch => {
	try {
		const res = await new AuthService().logoutUser();
		if (res.data.status === 'success') {
			localStorage.removeItem('user');
			dispatch(logout());
		}
	} catch (err) {
		dispatch(logoutFail('Error logging out! Try again.'));
	}
};

export const authCheckState = () => dispatch => {
	const userData = JSON.parse(localStorage.getItem('user'));
	console.log(userData);
	if (!userData) {
		dispatch(logout());
	} else {
		dispatch(loginSuccess(userData));
	}
};

export const userUpdateSettings = (data, token, type) => async dispatch => {
	dispatch(updateUserStart());
	try {
		const authService = new AuthService();
		const response = await authService.updateAccount(data, token, type);

		if (type !== 'password') {
			const authUser = JSON.parse(localStorage.getItem('user'));
			authUser.user = response.data.data.user;
			localStorage.setItem('user', JSON.stringify(authUser));
			showAlerts('success', 'Account settings updated successfully!');
			dispatch(updateSettings(response.data.data));
		} else {
			dispatch(updatePassword());
		}
	} catch (err) {
		dispatch(updateSettingsFail(err.response.data.message));
	}
};

export const forgotPassword = email => async dispatch => {
	dispatch(forgotPasswordStart());
	try {
		const response = await axios({
			method: 'POST',
			url: '/users/forgot-password',
			data: {
				email,
			},
		});

		dispatch(forgotPasswordSuccess(response.data.message));
	} catch (err) {
		if (err.response) {
			dispatch(forgotPasswordFailed(err.response.data.message));
		}
	}
};

export const resetPassword = (data, token) => async dispatch => {
	dispatch(resetPasswordStart());
	try {
		await axios({
			method: 'PATCH',
			url: `/users/reset-password/${token}`,
			data,
		});

		dispatch(resetPasswordSuccess());
	} catch (err) {
		if (err.response) {
			dispatch(resetPasswordFailed(err.response.data.message));
		}
	}
};

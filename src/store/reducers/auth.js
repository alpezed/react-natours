import * as actionTypes from '../actions/actionTypes';

const initialState = {
	user: null,
	token: null,
	refreshToken: null,
	error: null,
	loading: false,
	authRedirectPath: '/',
	sendingEmail: false,
	message: null,
	passwordReset: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USER_SIGNUP_START:
			return {
				...state,
				sendingEmail: true,
				error: null,
			};

		case actionTypes.USER_SIGNUP_SUCCESS:
			return {
				...state,
				sendingEmail: false,
				user: action.user,
				error: null,
			};

		case actionTypes.USER_SIGNUP_FAIL:
			return {
				...state,
				sendingEmail: false,
				user: null,
				error: action.error,
			};

		case actionTypes.USER_LOGIN_START:
			return {
				...state,
				error: null,
				loading: true,
			};

		case actionTypes.USER_LOGIN_SUCCESS:
			return {
				...state,
				user: action.user.user,
				token: action.user.token,
				refreshToken: action.user.refreshToken,
				error: null,
				loading: false,
			};

		case actionTypes.USER_LOGIN_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case actionTypes.USER_LOGOUT:
			return {
				...state,
				user: null,
				token: null,
			};

		case actionTypes.USER_LOGOUT_FAIL:
			return {
				...state,
				error: action.error,
			};

		case actionTypes.USER_UPDATE_START:
			return {
				...state,
				error: null,
				loading: true,
			};

		case actionTypes.USER_UPDATE_SETTINGS:
			return {
				...state,
				user: action.data.user,
				error: null,
				loading: false,
			};

		case actionTypes.USER_UPDATE_PASSWORD:
			return {
				...state,
				error: null,
				loading: false,
			};

		case actionTypes.USER_UPDATE_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
			};

		case actionTypes.USER_UPDATE_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path,
			};

		case actionTypes.FORGOT_PASSWORD_START:
			return {
				...state,
				error: null,
				message: null,
				loading: true,
			};

		case actionTypes.FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				message: action.message,
			};

		case actionTypes.FORGOT_PASSWORD_FAILED:
			return {
				...state,
				loading: false,
				error: action.error,
			};

		case actionTypes.RESET_PASSWORD_START:
			return {
				...state,
				error: null,
				loading: true,
			};

		case actionTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				passwordReset: true,
				loading: false,
				error: null,
			};

		case actionTypes.RESET_PASSWORD_FAILED:
			return {
				...state,
				loading: false,
				user: null,
				error: action.error,
			};

		default:
			return state;
	}
};

export default reducer;

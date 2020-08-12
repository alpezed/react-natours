import * as actionTypes from '../actions/actionTypes';

import axios from '../../axios';

export const fetchReviewsStart = () => {
	return {
		type: actionTypes.FETCH_REVIEWS_START,
	};
};

export const fetchReviewsSuccess = reviews => {
	return {
		type: actionTypes.FETCH_REVIEWS_SUCCESS,
		reviews,
	};
};

export const fetchReviewsFail = error => {
	return {
		type: actionTypes.FETCH_REVIEWS_FAIL,
		error,
	};
};

export const fetchReviews = (userId, token) => async dispatch => {
	dispatch(fetchReviewsStart());
	try {
		const response = await axios.get(`/users/${userId}/reviews`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		dispatch(fetchReviewsSuccess(response.data.data.data));
	} catch (err) {
		if (err.response) {
			dispatch(fetchReviewsFail(err.response.data.message));
		}
	}
};

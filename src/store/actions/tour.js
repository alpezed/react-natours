import axios from '../../axios';
import * as actionTypes from '../actions/actionTypes';

export const fetchAllTourStart = () => {
	return {
		type: actionTypes.FETCH_ALL_TOUR_START,
	};
};

export const fetchAllTourSuccess = tours => {
	return {
		type: actionTypes.FETCH_ALL_TOUR_SUCCESS,
		tours,
	};
};

export const fetchAllTourFailed = error => {
	return {
		type: actionTypes.FETCH_ALL_TOUR_FAILED,
		error,
	};
};

export const fetchTourStart = () => {
	return {
		type: actionTypes.FETCH_TOUR_START,
	};
};

export const fetchTourSuccess = tour => {
	return {
		type: actionTypes.FETCH_TOUR_SUCCESS,
		tour,
	};
};

export const fetchTourFailed = error => {
	return {
		type: actionTypes.FETCH_TOUR_FAILED,
		error,
	};
};

export const fetchUserBookingTours = tourIDs => {
	return {
		type: actionTypes.FETCH_USER_BOOKING_TOURS,
		bookTours: tourIDs,
	};
};

export const fetchUserTours = tours => {
	return {
		type: actionTypes.FETCH_USER_TOURS,
		tours,
	};
};

export const fetchAllTour = (userId, token) => async dispatch => {
	dispatch(fetchAllTourStart());
	try {
		let tours;
		if (!userId) {
			tours = await axios.get('/tours');
		} else {
			tours = await axios.get(`/users/${userId}/tours`);
		}

		dispatch(fetchAllTourSuccess(tours.data.data.data));
	} catch (err) {
		if (err.response) {
			dispatch(fetchAllTourFailed(err.response.data.message));
		}
	}
};

export const fetchMyTours = (userId, bookings) => async (dispatch, getSate) => {
	dispatch(fetchAllTourStart());
	try {
		const response = await axios.get(`/users/${userId}/tours`);
		const tours = response.data.data.data;

		const myTours = tours.filter(tour => bookings.includes(tour.id));

		dispatch(fetchUserTours(myTours));
	} catch (err) {
		if (err.response) {
			dispatch(fetchAllTourFailed(err.response.data.message));
		}
	}
};

export const fetchTour = tourId => async dispatch => {
	dispatch(fetchTourStart());
	try {
		const tour = await axios.get(`/tours/${tourId}`);
		dispatch(fetchTourSuccess(tour.data.data.data));
	} catch (err) {
		if (err.response) {
			dispatch(fetchTourFailed(err.response.data.message));
		}
	}
};

export const fetchUserBookingToursInit = (userId, token) => async dispatch => {
	try {
		const { token } = JSON.parse(localStorage.getItem('user'));
		const response = await axios.get(`/users/${userId}/bookings`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Find tours with the returned IDs
		const tourIDs = response.data.data.data.map(el => el.tour.id);
		dispatch(fetchUserBookingTours(tourIDs));
	} catch (err) {
		if (err && err.response) {
			dispatch(fetchTourFailed(err.response.data.message));
		}
	}
};

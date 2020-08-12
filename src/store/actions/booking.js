import * as actionTypes from './actionTypes';
import { loadStripe } from '@stripe/stripe-js';

import axios from '../../axios';

const stripePromise = loadStripe(
	'pk_test_51H7yacExviBHU5yLJYfws7pFUHMR8ND2UjgkAzDsTbTtUrjNFmV7V8GsiT8rDjtsyppmiCkOspAD7sxVrMbSFg8200VczpRgsT'
);

export const bookTourStart = () => {
	return {
		type: actionTypes.BOOK_TOUR_START,
	};
};

export const bookTourSuccess = () => {
	return {
		type: actionTypes.BOOK_TOUR_SUCCESS,
	};
};

export const bookTourFail = error => {
	return {
		type: actionTypes.BOOK_TOUR_FAIL,
		error,
	};
};

export const bookTour = (tourId, token) => async dispatch => {
	dispatch(bookTourStart());
	try {
		// Get checkout session from API
		const session = await axios({
			method: 'GET',
			url: `/bookings/checkout-session/${tourId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const stripe = await stripePromise;

		// Create checkout form + charge credit card
		stripe.redirectToCheckout({
			sessionId: session.data.session.id,
		});

		dispatch(bookTourSuccess());
	} catch (err) {
		dispatch(bookTourFail(err));
	}
};

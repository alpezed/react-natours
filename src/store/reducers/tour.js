import * as actionTypes from '../actions/actionTypes';

const initialState = {
	tours: null,
	tour: null,
	loading: false,
	error: null,
	booking: false,
	bookTours: [],
	isBooked: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL_TOUR_START:
			return {
				...state,
				loading: true,
			};

		case actionTypes.FETCH_ALL_TOUR_SUCCESS:
			return {
				...state,
				tours: action.tours,
				loading: false,
			};

		case actionTypes.FETCH_ALL_TOUR_FAILED:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case actionTypes.FETCH_TOUR_START:
			return {
				...state,
				loading: true,
				booking: false,
				bookTours: null,
			};

		case actionTypes.FETCH_TOUR_SUCCESS:
			return {
				...state,
				tour: action.tour,
				loading: false,
				booking: true,
			};

		case actionTypes.FETCH_TOUR_FAILED:
			return {
				...state,
				error: action.error,
				loading: false,
				booking: false,
				bookTours: null,
			};

		case actionTypes.FETCH_USER_BOOKING_TOURS:
			// const tours = state.tours.filter(
			// 	tour => !action.bookTours.includes(tour.id)
			// );
			return {
				...state,
				bookTours: action.bookTours,
				isBooked: true,
				// tours,
			};

		case actionTypes.FETCH_USER_TOURS:
			const myTours = action.tours.filter(tour =>
				state.bookTours.includes(tour.id)
			);
			return {
				...state,
				tours: myTours,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;

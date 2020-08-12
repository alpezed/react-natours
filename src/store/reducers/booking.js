import * as actionTypes from '../actions/actionTypes';

const initialState = {
	error: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.BOOK_TOUR_START:
			return {
				...state,
				loading: true,
			};

		case actionTypes.BOOK_TOUR_SUCCESS:
			return {
				...state,
				loading: false,
			};

		case actionTypes.BOOK_TOUR_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};

		default:
			return state;
	}
};

export default reducer;

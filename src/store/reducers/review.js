import * as actionTypes from '../actions/actionTypes';

const initialState = {
	reviews: [],
	loading: false,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_REVIEWS_START:
			return {
				...state,
				loading: true,
			};

		case actionTypes.FETCH_REVIEWS_SUCCESS:
			return {
				...state,
				reviews: action.reviews,
				loading: false,
				error: null,
			};

		case actionTypes.FETCH_REVIEWS_FAIL:
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

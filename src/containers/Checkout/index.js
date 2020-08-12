import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner';

const Checkout = ({ tour, token, loading, onBookTour }) => {
	if (!tour || !token) {
		return <Redirect to='/' />;
	}
	return loading ? <Spinner /> : onBookTour(tour.id, token) || <Spinner />;
};

const mapStateToProps = state => ({
	tour: state.tour.tour,
	token: state.auth.token,
	loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
	onBookTour: (tourId, token) => dispatch(actions.bookTour(tourId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

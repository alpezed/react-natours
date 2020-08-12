// import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';

import axios from '../../axios';
import Card from '../../components/Card';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';
import { isAuth } from '../../utils/helper';
import NotFound from '../../components/NotFound';

class MyTours extends Component {
	async componentDidMount() {
		const { user, token } = isAuth();

		await this.props.onFetchAllTour();

		// Load all bookings
		await this.props.onFetchUserBookingToursInit(user._id, token);

		if (this.props.location.search === '?alert=booking') {
			notify.show(
				"Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up there immediately, please come back later.",
				'custom',
				5000,
				{
					background: '#20bf6b',
					text: '#FFFFFF',
				}
			);
		}
	}

	render() {
		if (this.props.loading || !this.props.tours || !this.props.bookTours) {
			return <Spinner />;
		}

		if (this.props.bookTours.length === 0) {
			return (
				<NotFound>
					You don't have any tours! <Link to='/'>Visit Tours</Link>
				</NotFound>
			);
		}

		const tours = this.props.tours.filter(tour =>
			this.props.bookTours.includes(tour.id)
		);

		return (
			<main className='main'>
				<div className='card-container'>
					{tours.map((tour, i) => (
						<Card {...tour} key={i} />
					))}
				</div>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	tours: state.tour.tours,
	loading: state.tour.loading,
	error: state.tour.error,
	user: state.auth.user,
	bookTours: state.tour.bookTours,
});

const mapDispatchToProps = dispatch => ({
	onFetchAllTour: userId => dispatch(actions.fetchAllTour(userId)),
	onFetchMyTours: (userId, bookings) =>
		dispatch(actions.fetchMyTours(userId, bookings)),
	onFetchUserBookingToursInit: (userId, token) =>
		dispatch(actions.fetchUserBookingToursInit(userId, token)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(MyTours, axios));

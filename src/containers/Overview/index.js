// import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';

import axios from '../../axios';
import Card from '../../components/Card';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';
import { isAuth } from '../../utils/helper';

class Overview extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.error !== prevProps.error) {
			notify.show(this.props.error, 'error');
		}
	}

	async componentDidMount() {
		const { user, token } = isAuth();
		await this.props.onFetchAllTour(null, token);
		if (isAuth()) {
			await this.props.onFetchUserBookingToursInit(user._id, token);
		}
	}

	render() {
		if (this.props.loading || !this.props.tours) {
			return <Spinner />;
		}

		const tours = this.props.tours.filter(
			tour => !this.props.bookTours.includes(tour.id)
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
	token: state.auth.token,
	bookTours: state.tour.bookTours,
});

const mapDispatchToProps = dispatch => ({
	onFetchAllTour: (userId, token) =>
		dispatch(actions.fetchAllTour(userId, token)),
	onFetchUserBookingToursInit: (userId, tourId, token) =>
		dispatch(actions.fetchUserBookingToursInit(userId, tourId, token)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Overview, axios));

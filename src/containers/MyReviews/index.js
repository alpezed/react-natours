import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReviewCard from '../Tour/ReviewCard';
import { isAuth } from '../../utils/helper';
import Spinner from '../../components/UI/Spinner';
import NotFound from '../../components/NotFound';
import * as actions from '../../store/actions';

class MyReviews extends Component {
	state = { reviews: [], loading: true };

	async componentDidMount() {
		const { user, token } = isAuth();
		await this.props.onFetchReviews(user._id, token);
	}

	render() {
		if (this.props.loading || !this.props.reviews) {
			return <Spinner />;
		}

		if (this.props.reviews.length === 0) {
			return <NotFound>You don't have any reviews!</NotFound>;
		}

		return (
			<div className='reviews'>
				{this.props.reviews.map((review, i) => (
					<ReviewCard {...review} key={i} />
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.review.loading,
		reviews: state.review.reviews,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchReviews: (userId, token) =>
			dispatch(actions.fetchReviews(userId, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);

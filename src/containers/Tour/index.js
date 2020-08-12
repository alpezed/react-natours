// import axios from 'axios';
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios';
import OverviewBox from './OverviewBox';
import ReviewCard from './ReviewCard';
import Spinner from '../../components/UI/Spinner';
import TourMap from './Map';
import withErrorHandler from '../../hoc/withErrorHandler';
import { showAlerts, isAuth } from '../../utils/helper';
import * as actions from '../../store/actions';

class Tour extends Component {
	async componentDidMount() {
		const { user, token } = isAuth();
		const { match, onFetchTour, onFetchUserBookingToursInit } = this.props;

		await onFetchTour(match.params.tourId);

		if (isAuth()) {
			await onFetchUserBookingToursInit(user._id, token);
		}
	}

	handleBookTour = () => {
		if (this.props.isAuthenticated) {
			this.props.onBookTour(this.props.tour.id, this.props.token);
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/login');
		}
	};

	render() {
		const {
			tour,
			loading,
			bookLoading,
			error,
			errorBooking,
			isAuthenticated,
		} = this.props;

		if (error) {
			showAlerts('error', error);
		}

		if (errorBooking) {
			showAlerts('error', errorBooking);
		}

		if (loading || !tour) {
			return <Spinner />;
		}

		return (
			<Fragment>
				<section className='section-header'>
					<div className='header__hero'>
						<div className='header__hero-overlay'>&nbsp;</div>
						<img
							className='header__hero-img'
							src={`${process.env.PUBLIC_URL}/img/tours/${tour.imageCover}`}
							alt={tour.name}
						/>
					</div>
					<div className='heading-box'>
						<h1 className='heading-primary'>
							<span>{tour.name}</span>
						</h1>
						<div className='heading-box__group'>
							<div className='heading-box__detail'>
								<svg className='heading-box__icon'>
									<use
										xlinkHref={`${process.env.PUBLIC_URL}/img/icons.svg#icon-clock`}
									></use>
								</svg>
								<span className='heading-box__text'>{`${tour.duration} days`}</span>
							</div>
							<div className='heading-box__detail'>
								<svg className='heading-box__icon'>
									<use
										xlinkHref={`${process.env.PUBLIC_URL}/img/icons.svg#icon-map-pin`}
									></use>
								</svg>
								<span className='heading-box__text'>
									{tour.startLocation.description}
								</span>
							</div>
						</div>
					</div>
				</section>

				<section className='section-description'>
					<div className='overview-box'>
						<div>
							<div className='overview-box__group'>
								<h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
								<OverviewBox
									label='Next date'
									text={new Date(tour.startDates[0]).toLocaleString('en-us', {
										month: 'long',
										year: 'numeric',
									})}
									icon='calendar'
								/>
								<OverviewBox
									label='Difficulty'
									text={tour.difficulty}
									icon='trending-up'
								/>
								<OverviewBox
									label='Participants'
									text={`${tour.maxGroupSize} people`}
									icon='user'
								/>
								<OverviewBox
									label='Rating'
									text={`${tour.ratingsAverage} / 5`}
									icon='star'
								/>
							</div>

							<div className='overview-box__group'>
								<h2 className='heading-secondary ma-bt-lg'>Your tour guides</h2>

								{tour.guides.map((guide, i) => (
									<div className='overview-box__detail' key={i}>
										<img
											src={`${process.env.PUBLIC_URL}/img/users/${guide.photo}`}
											alt={guide.name}
											className='overview-box__img'
										/>
										<span className='overview-box__label'>
											{guide.role === 'lead-guide'
												? 'Lead guide'
												: 'Tour guide'}
										</span>
										<span className='overview-box__text'>{guide.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='description-box'>
						<h2 className='heading-secondary ma-bt-lg'>
							{`About ${tour.name} tour`}
						</h2>
						{tour.description.split('\n').map((paragraph, i) => (
							<p className='description__text' key={i}>
								{paragraph}
							</p>
						))}
					</div>
				</section>

				<section className='section-pictures'>
					{tour.images.map((image, i) => (
						<div className='picture-box' key={i}>
							<img
								className={`picture-box__img picture-box__img--${i + 1}`}
								src={`${process.env.PUBLIC_URL}/img/tours/${image}`}
								alt={`The Park Camper Tour ${i + 1}`}
							/>
						</div>
					))}
				</section>

				<section className='section-map'>
					<TourMap locations={tour.locations} />
				</section>

				<section className='section-reviews'>
					<div className='reviews'>
						{tour.reviews.map((review, i) => (
							<ReviewCard {...review} key={i} />
						))}
					</div>
				</section>

				<section className='section-cta'>
					<div className='cta'>
						<div className='cta__img cta__img--logo'>
							<img
								src={`${process.env.PUBLIC_URL}/img/logo-white.png`}
								alt='Natours logo'
								className=''
							/>
						</div>
						<img
							src={`${process.env.PUBLIC_URL}/img/tours/${tour.images[1]}`}
							alt='Tour'
							className='cta__img cta__img--1'
						/>
						<img
							src={`${process.env.PUBLIC_URL}/img/tours/${tour.images[2]}`}
							alt='Tour'
							className='cta__img cta__img--2'
						/>

						<div className='cta__content'>
							<h2 className='heading-secondary'>What are you waiting for?</h2>
							<p className='cta__text'>
								{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
							</p>
							{!this.props.isBooked ? (
								<button
									className='btn btn--green span-all-rows'
									onClick={this.handleBookTour}
									disabled={bookLoading}
								>
									{isAuthenticated
										? bookLoading
											? 'Processing...'
											: 'Book tour now!'
										: 'Log in to book tour'}
								</button>
							) : null}
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	tour: state.tour.tour,
	loading: state.tour.loading,
	isAuthenticated: state.auth.token !== null,
	token: state.auth.token,
	bookLoading: state.booking.loading,
	error: state.tour.error,
	errorBooking: state.booking.error,
	isBooked: state.tour.isBooked,
});

const mapDispatchToProps = dispatch => ({
	onBookTour: (tourId, token) => dispatch(actions.bookTour(tourId, token)),
	onFetchTour: tourId => dispatch(actions.fetchTour(tourId)),
	onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
	onFetchUserBookingToursInit: (userId, token) =>
		dispatch(actions.fetchUserBookingToursInit(userId, token)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Tour, axios));

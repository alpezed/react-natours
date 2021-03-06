import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
	id,
	name,
	slug,
	imageCover,
	summary,
	difficulty,
	duration,
	startLocation,
	startDates,
	locations,
	maxGroupSize,
	price,
	ratingsAverage,
	ratingsQuantity,
}) => {
	return (
		<div className='card'>
			<div className='card__header'>
				<div className='card__picture'>
					<div className='card__picture-overlay'>&nbsp;</div>
					<img
						src={`${process.env.PUBLIC_URL}/img/tours/${imageCover}`}
						alt='Tour 1'
						className='card__picture-img'
					/>
				</div>

				<h3 className='heading-tertirary'>
					<span>{name}</span>
				</h3>
			</div>

			<div className='card__details'>
				<h4 className='card__sub-heading'>{`${difficulty} ${duration}-day tour`}</h4>
				<p className='card__text'>{summary}</p>
				<div className='card__data'>
					<svg className='card__icon'>
						<use xlinkHref='img/icons.svg#icon-map-pin'></use>
					</svg>
					<span>{startLocation.description}</span>
				</div>
				<div className='card__data'>
					<svg className='card__icon'>
						<use xlinkHref='img/icons.svg#icon-calendar'></use>
					</svg>
					<span>
						{new Date(startDates[0]).toLocaleString('en-us', {
							month: 'long',
							year: 'numeric',
						})}
					</span>
				</div>
				<div className='card__data'>
					<svg className='card__icon'>
						<use xlinkHref='img/icons.svg#icon-flag'></use>
					</svg>
					<span>{`${locations.lenght} stops`}</span>
				</div>
				<div className='card__data'>
					<svg className='card__icon'>
						<use xlinkHref='img/icons.svg#icon-user'></use>
					</svg>
					<span>{`${maxGroupSize} people`}</span>
				</div>
			</div>

			<div className='card__footer'>
				<p>
					<span className='card__footer-value'>{`$${price}`} </span>{' '}
					<span className='card__footer-text'>per person</span>
				</p>
				<p className='card__ratings'>
					<span className='card__footer-value'>{ratingsAverage}</span>{' '}
					<span className='card__footer-text'>rating ({ratingsQuantity})</span>
				</p>
				<Link to={`/tour/${id}`} className='btn btn--green btn--small'>
					Details
				</Link>
			</div>
		</div>
	);
};

export default Card;

import React from 'react';

const ReviewCard = props => {
	return (
		<div className='reviews__card'>
			<div className='reviews__avatar'>
				<img
					src={`${process.env.PUBLIC_URL}/img/users/${props?.user?.photo}`}
					alt={props.name}
					className='reviews__avatar-img'
				/>
				<h6 className='reviews__user'>{props.name}</h6>
			</div>
			<p className='reviews__text'>{props.review}</p>
			<div className='reviews__rating'>
				{[1, 2, 3, 4, 5].map((star, i) => (
					<svg
						className={`reviews__star reviews__star--${
							props.rating >= star ? 'active' : 'inactive'
						}`}
						key={i}
					>
						<use
							xlinkHref={`${process.env.PUBLIC_URL}/img/icons.svg#icon-star`}
						></use>
					</svg>
				))}
			</div>
		</div>
	);
};

export default ReviewCard;

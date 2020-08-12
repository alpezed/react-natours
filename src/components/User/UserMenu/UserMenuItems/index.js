import React from 'react';
import { Link } from 'react-router-dom';

const UserNavItems = () => {
	return (
		<ul className='side-nav'>
			<li className='side-nav--active'>
				<Link to='/my-account'>
					<svg>
						<use xlinkHref='img/icons.svg#icon-settings'></use>
					</svg>
					Settings
				</Link>
			</li>
			<li>
				<Link to='/my-tours'>
					<svg>
						<use xlinkHref='img/icons.svg#icon-briefcase'></use>
					</svg>
					My bookings
				</Link>
			</li>
			<li>
				<Link to='/my-reviews'>
					<svg>
						<use xlinkHref='img/icons.svg#icon-star'></use>
					</svg>
					My reviews
				</Link>
			</li>
			<li>
				<Link to='/my-account'>
					<svg>
						<use xlinkHref='img/icons.svg#icon-credit-card'></use>
					</svg>
					Billing
				</Link>
			</li>
		</ul>
	);
};

export default UserNavItems;

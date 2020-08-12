import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavItems = () => {
	return (
		<div className='admin-nav'>
			<h5 className='admin-nav__heading'>Admin</h5>
			<ul className='side-nav'>
				<li>
					<Link to='/my-tours'>
						<svg>
							<use xlinkHref='img/icons.svg#icon-map'></use>
						</svg>
						Manage tours
					</Link>
				</li>
				<li>
					<Link to='/my-account'>
						<svg>
							<use xlinkHref='img/icons.svg#icon-users'></use>
						</svg>
						Manage users
					</Link>
				</li>
				<li>
					<Link to='/my-account'>
						<svg>
							<use xlinkHref='img/icons.svg#icon-star'></use>
						</svg>
						Manage reviews
					</Link>
				</li>
				<li>
					<Link to='/my-account'>
						<svg>
							<use xlinkHref='img/icons.svg#icon-briefcase'></use>
						</svg>
						Manage bookings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default AdminNavItems;

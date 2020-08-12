import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = props => {
	return (
		<header className='header'>
			<nav className='nav nav--tours'>
				<Link to='/' className='nav__el'>
					All tours
				</Link>
			</nav>
			<div className='header__logo'>
				<Link to='/'>
					<img
						src={`${process.env.PUBLIC_URL}/img/logo-white.png`}
						alt='Natours logo'
					/>
				</Link>
			</div>
			<nav className='nav nav--user'>
				{props.isAuth ? (
					<Fragment>
						<Link to='/logout' className='nav__el nav__el--logout'>
							Logout
						</Link>
						<Link to='/my-account' className='nav__el'>
							<img
								src={`${
									process.env.NODE_ENV === 'development'
										? process.env.REACT_APP_API_URL_LOCAL
										: process.env.REACT_APP_API_URL
								}/img/users/${props.user.photo}`}
								alt={props.user.name}
								className='nav__user-img'
							/>
							<span>{props.user.name.split(' ')[0]}</span>
						</Link>
					</Fragment>
				) : (
					<Fragment>
						<Link to='/login' className='nav__el'>
							Log in
						</Link>
						<Link to='/signup' className='nav__el nav__el--cta'>
							Sign up
						</Link>
					</Fragment>
				)}
			</nav>
		</header>
	);
};

export default withRouter(Header);

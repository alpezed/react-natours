import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer__logo'>
				<img
					src={`${process.env.PUBLIC_URL}/img/logo-green.png`}
					alt='Natours logo'
				/>
			</div>
			<ul className='footer__nav'>
				<li>
					<Link to='/about'>About us</Link>
				</li>
				<li>
					<Link to='/download'>Download apps</Link>
				</li>
				<li>
					<Link to='/become-a-guide'>Become a guide</Link>
				</li>
				<li>
					<Link to='/carrers'>Careers</Link>
				</li>
				<li>
					<Link to='/contact'>Contact</Link>
				</li>
			</ul>
			<p className='footer__copyright'>
				&copy; by Jonas Schmedtmann. All rights reserved.
			</p>
		</div>
	);
};

export default Footer;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './Spinner.css';

export const Loading = props => (
	<div className={`fadeIn ${props.spinning ? 'fa-spin' : null}`}>
		<FontAwesomeIcon icon={faCircleNotch} size={props.size} />
	</div>
);

const Spinner = () => <div className='Loader'>Loading...</div>;

export default Spinner;

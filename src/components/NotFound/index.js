import React from 'react';

const NotFound = props => {
	return (
		<main className='main'>
			<div className='error'>
				<div className='error__title'>
					<h2 className='heading-secondary heading-secondary--error'>
						{props.children}
					</h2>
				</div>
				{props.message && <div className='error__msg'>{props.message}</div>}
			</div>
		</main>
	);
};

export default NotFound;

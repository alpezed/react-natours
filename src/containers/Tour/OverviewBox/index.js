import React from 'react';

const OverviewBox = props => {
	return (
		<div className='overview-box__detail'>
			<svg className='overview-box__icon'>
				<use
					xlinkHref={`${process.env.PUBLIC_URL}/img/icons.svg#icon-${props.icon}`}
				/>
			</svg>
			<span className='overview-box__label'>{props.label}</span>
			<span className='overview-box__text'>{props.text}</span>
		</div>
	);
};

export default OverviewBox;

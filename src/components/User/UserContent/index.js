import React from 'react';

import AccountSettings from '../AccountSettings';
import PasswordChange from '../PasswordChange';

const UserContent = props => {
	return (
		<div className='user-view__content'>
			<AccountSettings user={props.user} />
			<div className='line'>&nbsp;</div>
			<PasswordChange />
		</div>
	);
};

export default UserContent;

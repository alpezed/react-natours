import React from 'react';
import { connect } from 'react-redux';

import UserMenu from '../../../components/User/UserMenu';
import UserContent from '../../../components/User/UserContent';

import { isAuth } from '../../../utils/helper';
import { showAlerts } from '../../../utils/helper';

const UserAccount = props => {
	const { user } = isAuth();

	if (props.error) {
		showAlerts('error', props.error);
	}

	return (
		<main className='main'>
			<div className='user-view'>
				<UserMenu user={user || props.user} />
				<UserContent user={user || props.user} />
			</div>
		</main>
	);
};

const mapStateToProps = state => ({
	error: state.auth.error,
	user: state.auth.user,
});

export default connect(mapStateToProps)(UserAccount);

import React from 'react';

import UserMenuItems from './UserMenuItems';
import AdminMenuItems from './AdminMenuItems';

const UserMenu = ({ user }) => {
	return (
		<nav className='user-view__menu'>
			<UserMenuItems />
			{user.role === 'admin' && <AdminMenuItems />}
		</nav>
	);
};

export default UserMenu;

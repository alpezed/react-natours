import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';

class Logout extends Component {
	async componentDidMount() {
		await this.props.onLogout();
	}

	render() {
		return <Redirect to='/' />;
	}
}

const mapDispatchProps = dispatch => ({
	onLogout: () => dispatch(actions.logoutUser()),
});

export default connect(null, mapDispatchProps)(Logout);

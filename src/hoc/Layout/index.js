import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Layout extends Component {
	render() {
		return (
			<Fragment>
				<Notifications />
				<Header isAuth={this.props.isAuthenticated} user={this.props.user} />
				{this.props.children}
				<Footer />
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Layout);

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import Overview from './containers/Overview';
import Tour from './containers/Tour';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Account from './containers/Auth/Account';
import Logout from './containers/Auth/Logout';
import Checkout from './containers/Checkout';
import Confirm from './containers/Confirm';
import ForgotPassword from './containers/Auth/ForgotPassword';
import ResetPassword from './containers/Auth/ResetPassword';
import MyReviews from './containers/MyReviews';
import MyTours from './containers/MyTours';
import PrivateRoute from './components/PrivateRoute';
import * as actions from './store/actions';

class App extends Component {
	componentDidMount() {
		this.props.onUserLogin();
	}

	render() {
		return (
			<Layout>
				<Switch>
					<Route path='/tour/:tourId' component={Tour} />
					<PrivateRoute path='/my-account' component={Account} />
					<Route path='/forgot-password' component={ForgotPassword} />
					<Route path='/reset-password/:token' component={ResetPassword} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
					<Route path='/logout' component={Logout} />
					<Route path='/checkout' component={Checkout} />
					<Route path='/confirm/:token' component={Confirm} />
					<PrivateRoute path='/my-tours' component={MyTours} />
					<Route path='/my-reviews' component={MyReviews} />
					<Route path='/' exact component={Overview} />
				</Switch>
			</Layout>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUserLogin: () => dispatch(actions.authCheckState()),
	};
};

export default connect(null, mapDispatchToProps)(App);

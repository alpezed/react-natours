import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';

// import { showAlerts } from '../../../utils/helper';
import * as actions from '../../../store/actions';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: '',
	};

	componentDidUpdate(prevProps) {
		const { error } = this.props;

		if (error && prevProps.error !== error) {
			notify.show(error, 'error');
		}
	}

	componentDidMount() {
		if (!this.props.booking && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}

		if (this.props.passwordReset) {
			notify.show(
				'Your password was successfully changed. Please log in.',
				'custom',
				5000,
				{
					background: '#20bf6b',
					text: '#FFFFFF',
				}
			);
		}
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		await this.props.loginUser(this.state);
	};

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<main className='main'>
				<div className='login-form'>
					<h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
					<form className='form form--login' onSubmit={this.handleSubmit}>
						<div className='form__group'>
							<label className='form__label' htmlFor='email'>
								Email address
							</label>
							<input
								className='form__input'
								name='email'
								id='email'
								type='text'
								placeholder='you@example.com'
								onChange={this.handleInputChange}
							/>
						</div>
						<div className='form__group ma-bt-md'>
							<label className='form__label' htmlFor='password'>
								Password
							</label>
							<input
								className='form__input'
								name='password'
								id='password'
								type='password'
								placeholder='••••••••'
								onChange={this.handleInputChange}
							/>
						</div>
						<div className='form__group ma-bt-md'>
							<Link className='login-link' to='/forgot-password'>
								Forgot your password?
							</Link>
						</div>
						<div className='form__group'>
							<button
								className='btn btn--green'
								type='submit'
								disabled={this.props.loading}
							>
								{this.props.loading ? 'Loading...' : 'Login'}
							</button>
						</div>
					</form>
				</div>
			</main>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		booking: state.tour.booking,
		authRedirectPath: state.auth.authRedirectPath,
		passwordReset: state.auth.passwordReset,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginUser: value => dispatch(actions.loginUser(value)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

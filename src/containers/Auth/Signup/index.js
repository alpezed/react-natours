import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { notify } from 'react-notify-toast';

import * as actions from '../../../store/actions';

class Signup extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	};

	componentDidUpdate(prevProps) {
		const { user, error } = this.props;

		if (user && user.data.status === 'success' && prevProps.user !== user) {
			notify.show(user.data.message, 'custom', 5000, {
				background: '#20bf6b',
				text: '#FFFFFF',
			});

			this.form.reset();
		}

		if (!user && error && prevProps.error !== error) {
			notify.show(error, 'error');
		}
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		await this.props.onSignUser(this.state);
	};

	render() {
		const { sendingEmail, isAuthenticated } = this.props;

		if (isAuthenticated) {
			return <Redirect to='/my-account' />;
		}

		return (
			<main className='main'>
				<div className='login-form'>
					<h2 className='heading-secondary ma-bt-lg'>Create your account!</h2>
					<form
						className='form form--login'
						onSubmit={this.handleSubmit}
						ref={form => (this.form = form)}
					>
						<div className='form__group'>
							<label className='form__label' htmlFor='name'>
								Your name
							</label>
							<input
								className='form__input'
								name='name'
								id='name'
								type='text'
								onChange={this.handleInputChange}
							/>
						</div>
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
							<label className='form__label' htmlFor='password_confirmation'>
								Confirm password
							</label>
							<input
								className='form__input'
								name='password_confirmation'
								id='password_confirmation'
								type='password'
								placeholder='••••••••'
								onChange={this.handleInputChange}
							/>
						</div>
						<div className='form__group'>
							<button
								className='btn btn--green'
								type='submit'
								disabled={sendingEmail}
							>
								{sendingEmail ? 'Loading...' : 'Login'}
							</button>
						</div>
					</form>
				</div>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null,
	sendingEmail: state.auth.sendingEmail,
	user: state.auth.user,
	error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
	onSignUser: data => dispatch(actions.userSignup(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

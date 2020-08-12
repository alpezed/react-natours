import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { notify } from 'react-notify-toast';

import * as actions from '../../../store/actions';

class ForgotPassword extends Component {
	state = {
		email: '',
	};

	constructor(props) {
		super(props);

		this.form = createRef();
	}

	componentDidUpdate(prevProps) {
		const { error, message } = this.props;

		if (message && prevProps.message !== message) {
			notify.show(message, 'custom', 5000, {
				background: '#20bf6b',
				text: '#FFFFFF',
			});

			this.form.current.reset();
		}

		if (error && prevProps.error !== error) {
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
		await this.props.onForgotPassword(this.state.email);
	};

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to='/' />;
		}

		return (
			<main className='main'>
				<div className='login-form'>
					<h2 className='heading-secondary'>Reset Password</h2>
					<p className='small ma-bt-md ma-t-md'>
						To reset your password, please provide your email address.
					</p>
					<form
						className='form form--login'
						onSubmit={this.handleSubmit}
						ref={this.form}
					>
						<div className='form__group'>
							<label className='form__label' htmlFor='email'>
								Email address
							</label>
							<input
								className='form__input'
								name='email'
								id='email'
								type='email'
								required
								placeholder='you@example.com'
								onChange={this.handleInputChange}
							/>
						</div>
						<div className='form__group'>
							<button
								className='btn btn--green'
								type='submit'
								disabled={this.props.loading}
							>
								{this.props.loading ? 'Loading...' : 'Send Reset Instruction'}
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
		message: state.auth.message,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onForgotPassword: email => dispatch(actions.forgotPassword(email)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { notify } from 'react-notify-toast';

import * as actions from '../../../store/actions';

class ResetPassword extends Component {
	state = {
		password: '',
		passwordConfirm: '',
	};

	constructor(props) {
		super(props);

		this.form = createRef();
	}

	componentDidUpdate(prevProps) {
		const { error } = this.props;

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
		await this.props.onResetPassword(this.state, this.props.match.params.token);

		if (!this.props.error) {
			this.props.history.push('/login');
		}
	};

	render() {
		if (!this.props.match.params.token) {
			return <Redirect to='/' />;
		}

		return (
			<main className='main'>
				<div className='login-form'>
					<h2 className='heading-secondary ma-bt-lg'>Reset Password</h2>
					<form
						className='form form--login'
						onSubmit={this.handleSubmit}
						ref={this.form}
					>
						<div className='form__group ma-bt-md'>
							<label className='form__label' htmlFor='password'>
								New Password
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
							<label className='form__label' htmlFor='passwordConfirm'>
								Confirm New Password
							</label>
							<input
								className='form__input'
								name='passwordConfirm'
								id='passwordConfirm'
								type='password'
								placeholder='••••••••'
								onChange={this.handleInputChange}
							/>
						</div>
						<div className='form__group'>
							<button
								className='btn btn--green'
								type='submit'
								disabled={this.props.loading}
							>
								{this.props.loading ? 'Loading...' : 'Save'}
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
		isAuthenticated: state.auth.token,
		user: state.auth.user,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onResetPassword: (data, token) =>
			dispatch(actions.resetPassword(data, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

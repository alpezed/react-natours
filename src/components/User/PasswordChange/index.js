import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

class PasswordChange extends Component {
	state = {
		passwordCurrent: '',
		password: '',
		passwordConfirm: '',
	};

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();

		await this.props.updateUserAccount(
			this.state,
			this.props.token,
			'password'
		);

		this.setState({
			passwordCurrent: '',
			password: '',
			passwordConfirm: '',
		});
	};

	render() {
		return (
			<div className='user-view__form-container'>
				<h2 className='heading-secondary ma-bt-md'>Password change</h2>
				<form className='form form-user-settings' onSubmit={this.handleSubmit}>
					<div className='form__group'>
						<label className='form__label' htmlFor='password-current'>
							Current password
						</label>
						<input
							name='passwordCurrent'
							className='form__input'
							id='password-current'
							type='password'
							placeholder='••••••••'
							required='required'
							minLength='8'
							value={this.state.passwordCurrent}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className='form__group'>
						<label className='form__label' htmlFor='password'>
							New password
						</label>
						<input
							name='password'
							className='form__input'
							id='password'
							type='password'
							placeholder='••••••••'
							required='required'
							minLength='8'
							value={this.state.password}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className='form__group ma-bt-lg'>
						<label className='form__label' htmlFor='password-confirm'>
							Confirm password
						</label>
						<input
							name='passwordConfirm'
							className='form__input'
							id='password-confirm'
							type='password'
							placeholder='••••••••'
							required='required'
							minLength='8'
							value={this.state.passwordConfirm}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className='form__group right'>
						<button
							className='btn btn--small btn--green'
							type='submit'
							disabled={this.props.loading}
						>
							Save password
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.auth.loading,
	token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
	updateUserAccount: (data, token, type) =>
		dispatch(actions.userUpdateSettings(data, token, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);

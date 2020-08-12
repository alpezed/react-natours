import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

class AccountSettings extends Component {
	state = {
		name: '',
		email: '',
	};

	componentDidMount() {
		this.setState({
			name: this.props.user.name,
			email: this.props.user.email,
		});
		this.formData = new FormData();
	}

	handleInputChange = event => {
		const value =
			event.target.name === 'photo'
				? event.target.files[0]
				: event.target.value;
		this.formData.set([event.target.name], value);
		this.setState({
			[event.target.name]: value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		await this.props.onUpdateSettings(this.formData, this.props.token, 'data');
	};

	render() {
		const { user } = this.props;

		return (
			<div className='user-view__form-container'>
				<h2 className='heading-secondary ma-bt-md'>Your account settings</h2>
				<form className='form form-user-data' onSubmit={this.handleSubmit}>
					<div className='form__group'>
						<label className='form__label' htmlFor='name'>
							Name
						</label>
						<input
							className='form__input'
							id='name'
							type='text'
							value={this.state.name}
							required='required'
							name='name'
							onChange={this.handleInputChange}
						/>
					</div>
					<div className='form__group ma-bt-md'>
						<label className='form__label' htmlFor='email'>
							Email address
						</label>
						<input
							className='form__input'
							id='email'
							type='email'
							value={this.state.email}
							required='required'
							name='email'
							onChange={this.handleInputChange}
						/>
					</div>
					<div className='form__group form__photo-upload'>
						<img
							className='form__user-photo'
							src={`${
								process.env.NODE_ENV === 'development'
									? process.env.REACT_APP_API_URL_LOCAL
									: process.env.REACT_APP_API_URL
							}/img/users/${user.photo}`}
							alt={user.name}
						/>
						<input
							className='form__upload'
							type='file'
							accept='images/*'
							id='photo'
							name='photo'
							onChange={this.handleInputChange}
						/>
						<label htmlFor='photo'>Choose new photo</label>
					</div>
					<div className='form__group right'>
						<button className='btn btn--small btn--green'>Save settings</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
	onUpdateSettings: (data, token, type) =>
		dispatch(actions.userUpdateSettings(data, token, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);

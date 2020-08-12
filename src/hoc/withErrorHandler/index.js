import React, { Component } from 'react';
import { notify } from 'react-notify-toast';

// import { showAlerts } from '../../utils/helper';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentDidUpdate() {
			this.requestInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			this.responseInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error: error.response });
					console.log(error.response);
					// return Promise.reject(error);
				}
			);
		}

		componentWillUnmount() {
			// Remove handlers, so Garbage Collector will get rid of if WrappedComponent will be removed
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);
		}

		render() {
			let errorMessage = this.state.error
				? this.state.error.data.message
				: null;
			if (this.state.error && this.state.error.status === 429) {
				errorMessage = this.state.error.data;
			}
			return (
				<>
					{this.state.error && notify.show(errorMessage, 'error')}
					<WrappedComponent {...this.props} />
				</>
			);
		}
	};
};

export default withErrorHandler;

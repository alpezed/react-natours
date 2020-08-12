import React, { Component } from 'react';
import { notify } from 'react-notify-toast';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner';

class Confirm extends Component {
	state = {
		confirming: true,
	};

	componentDidMount() {
		const { token } = this.props.match.params;
		/**
		 * TODO: Implement to redux
		 */
		axios
			.post(`/users/confirmation/${token}`)
			.then(response => {
				this.setState({ confirming: false });
				if (response.data.status === 'success') {
					notify.show(response.data.data.message, 'custom', 5000, {
						background: '#20bf6b',
						text: '#FFFFFF',
					});
				}
			})
			.catch(err => {
				this.setState({ confirming: false });
				notify.show(err.response.data.message, 'error');
			});
	}

	render() {
		if (this.state.confirming) {
			return <Spinner />;
		}

		return (
			<main className='main'>
				<div className='login-form user-confirmed'>
					<svg
						version='1.1'
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'
						x='0px'
						y='0px'
						viewBox='0 0 70 70'
						style={{ enableBackground: 'new 0 0 50 50' }}
						xmlSpace='preserve'
					>
						<style
							dangerouslySetInnerHTML={{
								__html:
									'polyline{ fill:none; stroke:#FFFFFF; stroke-width:2; stroke-linecap:round; } polyline { stroke-dasharray: 37; stroke-dashoffset: 37; animation: dash .7s .3s ease-in-out forwards; transform-origin: center center; } @keyframes dash { to { stroke-dashoffset: 0; } } circle{ transform-origin: center center; animation: popup .8s ease-out forwards; } @keyframes popup { 0% { transform: scale(0); } 80% { transform: scale(1.1); } 100% { transform: scale(1); } }',
							}}
						/>
						<circle style={{ fill: '#55c57a' }} cx={35} cy={35} r={25} />
						<polyline points='48,25 32,43 22,35 ' />
					</svg>
					<h2>Welcome to natours!</h2>
				</div>
			</main>
		);
	}
}

export default withErrorHandler(Confirm, axios);

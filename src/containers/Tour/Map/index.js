import React, { Fragment } from 'react';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
	accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
	scrollZoom: false,
});

const MAP_STYLE = 'mapbox://styles/alpezed/ckcwqmvhx055y1imwgu4le2od';

const TourMap = ({ locations }) => {
	const fitBounds = locations.map(loc => loc.coordinates);
	return (
		<Map
			style={MAP_STYLE}
			containerStyle={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				width: '100%',
			}}
			fitBounds={[...new Set(fitBounds)]}
			fitBoundsOptions={{
				padding: {
					top: 200,
					bottom: 180,
					left: 100,
					right: 100,
				},
			}}
		>
			{locations.map(loc => (
				<Fragment key={loc._id}>
					<Marker
						coordinates={loc.coordinates}
						anchor='bottom'
						className='marker'
					/>
					<Popup coordinates={loc.coordinates} offset={30}>
						<p>{`Day ${loc.day}: ${loc.description}`}</p>
					</Popup>
				</Fragment>
			))}
		</Map>
	);
};

export default TourMap;

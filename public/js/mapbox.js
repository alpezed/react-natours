const mapBox = document.getElementById('map');
const displayMap = locations => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiYWxwZXplZCIsImEiOiJja2N3cGU0ZjMwZzVtMnJtbzB5d2ZpMXpoIn0.03uSSzWEsWxuIrsNbYYxgg';

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/alpezed/ckcwqmvhx055y1imwgu4le2od',
		scrollZoom: false,
		//   center: [],
		//   zoom: 10,
		//   interactive: false,
	});

	const bounds = new mapboxgl.LngLatBounds();

	locations.forEach(loc => {
		// Create marker
		const el = document.createElement('div');
		el.className = 'marker';

		// Add marker
		new mapboxgl.Marker({
			element: el,
			anchor: 'bottom',
		})
			.setLngLat(loc.coordinates)
			.addTo(map);

		// Add popup
		new mapboxgl.Popup({
			offset: 30,
		})
			.setLngLat(loc.coordinates)
			.setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
			.addTo(map);

		// Extend map bounds to include current location
		bounds.extend(loc.coordinates);
	});

	map.fitBounds(bounds, {
		padding: {
			top: 200,
			bottom: 180,
			left: 100,
			right: 100,
		},
	});
};
if (mapBox) {
	const locations = JSON.parse(mapBox.dataset.locations);
	displayMap(locations);
}

const fetchShops = async () => {
	let response = await fetch('/api/v1/shops');
	return response.json();
};

fetchShops().then((response) => {
	var coffeeShops = response;

	// Start Function Section
	// Function that adds markers to a group of markers
	function addMarkerToGroup(group, coordinate, html) {
		var coffeeIcon = new H.map.Icon(
			"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 511 511' style='enable-background:new 0 0 511 511;' xml:space='preserve'%3E%3Cg%3E%3Cpolygon style='fill:%23BD9F79;' points='389.98,433.021 383.999,503.83 127.999,503.83 122.019,433.021 '/%3E%3Cpolygon style='fill:%23BD9F79;' points='416.68,117.106 410.7,187.915 101.299,187.915 95.319,117.106 '/%3E%3C/g%3E%3Cpath style='fill:%23F9EBDB;' d='M410.7,187.915l-20.72,245.106H122.019l-20.72-245.106H410.7z M311.393,365.862 c21.079-21.079,13.366-62.965-17.223-93.565c-30.589-30.589-72.486-38.302-93.565-17.223s-13.366,62.965,17.223,93.565 C248.428,379.229,290.314,386.941,311.393,365.862z'/%3E%3Cpath style='fill:%23B75548;' d='M200.605,255.074l110.788,110.788c-21.079,21.079-62.965,13.366-93.565-17.223 C187.239,318.039,179.526,276.153,200.605,255.074z'/%3E%3Cpath style='fill:%238E4238;' d='M294.171,272.297c30.589,30.6,38.302,72.486,17.223,93.565L200.605,255.074 C221.685,233.995,263.581,241.708,294.171,272.297z'/%3E%3Cpolygon style='fill:%23E8D6BD;' points='383.999,8.17 400.34,73.532 111.659,73.532 127.999,8.17 '/%3E%3Crect x='78.978' y='73.532' style='fill:%23F9EBDB;' width='354.043' height='43.574'/%3E%3Cg%3E%3Cpath style='fill:%23700D00;' d='M280.013,385.913c14.956,0,27.797-4.93,37.134-14.255c12.182-12.207,16.797-30.115,13.046-50.49 c-3.55-19.284-14.291-38.691-30.247-54.646c-19.724-19.724-45.13-31.5-67.961-31.5c-14.968,0-27.816,4.936-37.156,14.276 c-12.152,12.153-16.776,30.076-13.023,50.47c3.55,19.284,14.292,38.691,30.247,54.646 C231.777,374.138,257.184,385.913,280.013,385.913z M201.426,267.448l21.288,21.288c1.596,1.596,3.686,2.393,5.778,2.393 c2.09,0,4.182-0.797,5.778-2.393c3.191-3.191,3.191-8.364,0-11.554l-21.294-21.294c5.336-2.978,11.775-4.525,19.01-4.525 c18.592,0,39.679,9.986,56.405,26.713c13.638,13.637,22.775,29.991,25.732,46.049c2.1,11.408,0.828,21.538-3.548,29.362 l-53.197-53.197c-3.191-3.191-8.363-3.192-11.555,0c-3.191,3.191-3.191,8.364,0,11.554l53.202,53.202 c-5.336,2.978-11.776,4.525-19.012,4.525c-18.592,0-39.679-9.986-56.405-26.713c-13.638-13.637-22.775-29.99-25.731-46.049 C195.777,285.403,197.049,275.272,201.426,267.448z'/%3E%3Cpath style='fill:%23700D00;' d='M433.021,65.362h-26.303L391.926,6.189C391.016,2.551,387.748,0,383.999,0h-256 c-3.748,0-7.017,2.551-7.926,6.189l-14.792,59.173H78.978c-4.513,0-8.17,3.658-8.17,8.17v43.574c0,4.512,3.657,8.17,8.17,8.17 h8.831l14.332,169.597c0.361,4.263,3.93,7.483,8.132,7.483c0.231,0,0.464-0.01,0.698-0.029c4.496-0.38,7.833-4.332,7.453-8.828 l-8.232-97.414h291.614l-19.333,228.766h-252.95l-8.348-98.789c-0.381-4.497-4.34-7.846-8.829-7.453 c-4.496,0.38-7.833,4.332-7.453,8.828l14.963,177.079c0.357,4.231,3.896,7.483,8.142,7.483h256c4.245,0,7.785-3.252,8.142-7.483 l32.048-379.24h8.831c4.513,0,8.17-3.658,8.17-8.17V73.532C441.191,69.02,437.534,65.362,433.021,65.362z M135.508,495.66 l-4.603-54.468h250.188l-4.603,54.468H135.508z M403.187,179.745H108.811l-4.603-54.468H407.79L403.187,179.745z M424.85,108.936 h-8.313c-0.007,0-329.389,0-329.389,0V81.702h24.341c0.115,0.002,0.235,0.002,0.353,0h255.817c4.513,0,8.17-3.658,8.17-8.17 c0-4.512-3.657-8.17-8.17-8.17H122.122l12.255-49.021H377.62l14.792,59.173c0.911,3.637,4.179,6.189,7.927,6.189h24.511V108.936z' /%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A",
			{ size: { w: 32, h: 32 } }
		);
		var marker = new H.map.Marker(coordinate, { icon: coffeeIcon });
		marker.setData(html);
		group.addObject(marker);
	}

	// Function that adds InfoBubble above the markers when clicked
	function addInfoBubble(map) {
		var group = new H.map.Group();
		map.addObject(group);

		group.addEventListener(
			'tap',
			function (evt) {
				var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
					content: evt.target.getData(),
				});

				ui.addBubble(bubble);
			},
			false
		);

		coffeeShops.forEach(function (shop) {
			addMarkerToGroup(
				group,
				{ lat: shop.latitude, lng: shop.longitude },
				'<div><a href="' +
					shop.website +
					'" target="_blank">' +
					shop.name +
					'</a></div>' +
					'<div>' +
					shop.address +
					'</div>'
			);
		});
	}

	// Function to restrict the map view to a designated area
	function restrictMap(map) {
		var bounds = new H.geo.Rect(
			30.397704598324953,
			-97.82197149621298,
			30.202843286012932,
			-97.69906076638804
		);
		map.getViewModel().addEventListener('sync', function () {
			var center = map.getCenter();

			if (!bounds.containsPoint(center)) {
				if (center.lat > bounds.getTop()) {
					center.lat = bounds.getTop();
				} else if (center.lat < bounds.getBottom()) {
					center.lat = bounds.getBottom();
				}
				if (center.lng < bounds.getLeft()) {
					center.lng = bounds.getLeft();
				} else if (center.lng > bounds.getRight()) {
					center.lng = bounds.getRight();
				}
				map.setCenter(center);
			}
		});
	}

	// Function to set the view bounds within a map region
	function setMapViewBounds(map, bool) {
		var bbox = new H.geo.Rect(
			30.397704598324953,
			-97.82197149621298,
			30.202843286012932,
			-97.69906076638804
		);
		map.getViewModel().setLookAtData(
			{
				bounds: bbox,
			},
			bool
		);
	}

	// Function to generate shop buttons for each entry in the coffeeShops array
	function createShopButtons() {
		// Sorts coffeeshops alphabetically by name
		coffeeShops.sort(function (a, b) {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});

		// Creates shop buttons as well as populates the directions drop down
		coffeeShops.forEach(function (shop) {
			$('#directionsSelect').append(
				'<option value="' +
					shop.latitude +
					',' +
					shop.longitude +
					'">' +
					shop.name +
					'</option>'
			);
			$('#shopbtnsList').append(
				'<a class="panel-block"><button class="button is-link is-fullwidth shopbtns">' +
					shop.name +
					'</button></a>'
			);
		});
	}

	// Function to find the coordinates of the corresponding coffee shop button being pressed and centers the map and zooms in on the location
	function searchCoffeeShop(shopName) {
		var index = coffeeShops.findIndex((x) => x.name === shopName);
		map.setCenter({
			lat: coffeeShops[index].latitude,
			lng: coffeeShops[index].longitude,
		});
		map.setZoom(18, true);
	}

	// Function to geocode user's entered address
	function geocode(platform) {
		var geocoder = platform.getSearchService(),
			geocodingParameters = {
				q: $('#userAddress').val(),
			};
		geocoder.geocode(geocodingParameters, onSuccess, onError);
	}

	// Checks to see if the function can be completed
	function onSuccess(result) {
		var locations = result.items;
		calculateRouteFromAtoB(platform, locations);
	}

	// Function to check for error and display modal
	function onError(error) {
		$('#addressError').addClass('is-active');
	}

	// Function to add locations to the panel
	function addLocationsToPanel(locations) {
		var nodeOL = document.createElement('ul'),
			i;

		nodeOL.style.fontSize = 'small';
		nodeOL.style.marginLeft = '5%';
		nodeOL.style.marginRight = '5%';

		for (i = 0; i < locations.length; i += 1) {
			let location = locations[i];
			var li = document.createElement('li'),
				divLabel = document.createElement('div'),
				address = location.address,
				content =
					'<strong style="font-size: large;">' +
					address.label +
					'</strong></br>';
			position = location.position;

			content +=
				'<strong>houseNumber:</strong> ' + address.houseNumber + '<br/>';
			content += '<strong>street:</strong> ' + address.street + '<br/>';
			content += '<strong>district:</strong> ' + address.district + '<br/>';
			content += '<strong>city:</strong> ' + address.city + '<br/>';
			content += '<strong>postalCode:</strong> ' + address.postalCode + '<br/>';
			content += '<strong>county:</strong> ' + address.county + '<br/>';
			content += '<strong>country:</strong> ' + address.countryName + '<br/>';
			content +=
				'<strong>position:</strong> ' +
				Math.abs(position.lat.toFixed(4)) +
				(position.lat > 0 ? 'N' : 'S') +
				' ' +
				Math.abs(position.lng.toFixed(4)) +
				(position.lng > 0 ? 'E' : 'W') +
				'<br/>';

			divLabel.innerHTML = content;
			li.appendChild(divLabel);

			nodeOL.appendChild(li);
		}

		$('#outputDirections').append(nodeOL);
	}

	// Function to calculate the route from the user's inputted address to the selected coffee shop
	function calculateRouteFromAtoB(platform, locations) {
		var router = platform.getRoutingService(null, 8),
			routeRequestParams = {
				routingMode: 'fast',
				transportMode: 'car',
				origin: locations[0].position.lat + ',' + locations[0].position.lng, // User's inputted address
				destination: $('#directionsSelect').val(), // Selected coffee shop
				return: 'polyline,turnByTurnActions,actions,instructions,travelSummary',
			};

		router.calculateRoute(routeRequestParams, routeOnSuccess, routeOnError);
	}

	// Check to see if the function can be completed
	function routeOnSuccess(result) {
		var route = result.routes[0];

		try {
			addRouteShapeToMap(route);
			addManueversToMap(route);
			addWaypointsToPanel(route);
			addManueversToPanel(route);
			addSummaryToPanel(route);
		} catch (error) {
			$('#addressError').addClass('is-active');
		}
	}

	function routeOnError(error) {
		$('#addressError').addClass('is-active');
	}

	// Function to add the lines for the directions
	function addRouteShapeToMap(route) {
		route.sections.forEach((section) => {
			// decode LineString from the flexible polyline
			let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

			// Create a polyline to display the route:
			let polyline = new H.map.Polyline(linestring, {
				style: {
					lineWidth: 4,
					strokeColor: 'rgba(0, 128, 255, 0.7)',
				},
			});

			polyline.id = 'route';
			// Add the polyline to the map
			map.addObject(polyline);
			// And zoom to its bounding rectangle
			map.getViewModel().setLookAtData(
				{
					bounds: polyline.getBoundingBox(),
				},
				true
			);
		});
	}

	// Function to add manuevers to the map
	function addManueversToMap(route) {
		var svgMarkup =
				'<svg width="18" height="18" ' +
				'xmlns="http://www.w3.org/2000/svg">' +
				'<circle cx="8" cy="8" r="8" ' +
				'fill="#1b468d" stroke="white" stroke-width="1" />' +
				'</svg>',
			dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
			group = new H.map.Group(),
			i,
			j;
		group.id = 'route';
		route.sections.forEach((section) => {
			let poly = H.geo.LineString.fromFlexiblePolyline(
				section.polyline
			).getLatLngAltArray();

			let actions = section.actions;
			// Add a marker for each maneuver
			for (i = 0; i < actions.length; i += 1) {
				let action = actions[i];
				var marker = new H.map.Marker(
					{
						lat: poly[action.offset * 3],
						lng: poly[action.offset * 3 + 1],
					},
					{ icon: dotIcon }
				);
				marker.instruction = action.instruction;
				group.addObject(marker);
			}

			group.addEventListener(
				'tap',
				function (evt) {
					map.setCenter(evt.target.getGeometry());
				},
				false
			);

			// Add the maneuvers group to the map
			map.addObject(group);
		});
	}

	// Function to add waypoints to the directions panel
	function addWaypointsToPanel(route) {
		var nodeH3 = document.createElement('h3'),
			labels = [];

		route.sections.forEach((section) => {
			labels.push(section.turnByTurnActions[0].nextRoad.name[0].value);
		});

		nodeH3.textContent = labels.join(' - ');
		$('#outputDirections').append(nodeH3);
	}

	// Function to add the summary to the directions panel
	function addSummaryToPanel(route) {
		let duration = 0,
			distance = 0;

		route.sections.forEach((section) => {
			distance += section.travelSummary.length;
			duration += section.travelSummary.duration;
		});

		var summaryDiv = document.createElement('div'),
			content =
				'<b>Total distance</b>: ' +
				distance +
				'm. <br />' +
				'<b>Travel Time</b>: ' +
				toMMSS(duration) +
				' (in current traffic)';

		summaryDiv.style.fontSize = 'small';
		summaryDiv.style.marginLeft = '5%';
		summaryDiv.style.marginRight = '5%';
		summaryDiv.innerHTML = content;
		$('#outputDirections').append(summaryDiv);
	}

	// Function to add the manuevers to the directions panel
	function addManueversToPanel(route) {
		var nodeOL = document.createElement('ol');

		nodeOL.style.fontSize = 'small';
		nodeOL.style.marginLeft = '5%';
		nodeOL.style.marginRight = '5%';
		nodeOL.className = 'directions';

		route.sections.forEach((section) => {
			section.actions.forEach((action, idx) => {
				var li = document.createElement('li'),
					spanInstruction = document.createElement('span');

				spanInstruction.innerHTML = section.actions[idx].instruction;
				li.appendChild(spanInstruction);

				nodeOL.appendChild(li);
			});
		});

		$('#outputDirections').append(nodeOL);
	}

	function toMMSS(duration) {
		return (
			Math.floor(duration / 60) + ' minutes ' + (duration % 60) + ' seconds.'
		);
	}

	// Function to find objects by their ID on the map and remove them
	function removeObjectsById(id) {
		for (object of map.getObjects()) {
			if (object.id === id) {
				map.removeObject(object);
			}
		}
	}

	function loadAddress() {
		userAddress = localStorage.getItem('userAddress');

		if (!userAddress) {
			userAddress = '';
		}

		$('#userAddress').val(userAddress);
	}

	function saveAddress() {
		userAddress = $('#userAddress').val();
		localStorage.setItem('userAddress', userAddress);
	}
	// End Function Section

	setMapViewBounds(map, false);
	restrictMap(map);
	addInfoBubble(map);
	createShopButtons();
	loadAddress();

	// When a shop button is clicked, center map and zoom in on the specified location
	$('#shop-list').on('click', '.shopbtns', function () {
		var shopSearch = $(this).text();
		var zoom = map.getZoom();
		if (zoom >= 18) {
			setMapViewBounds(map, true);
			setTimeout(function () {
				searchCoffeeShop(shopSearch);
			}, 2500);
		} else {
			searchCoffeeShop(shopSearch);
		}
	});

	// When submit button is pressed, calculate directions
	$('#directionSubmit').on('click', function () {
		$('#outputDirections').html('');
		$('#outputDirections').html('<h2>Directions</h2>');
		saveAddress();
		removeObjectsById('route');
		geocode(platform);
	});

	// When reset button is clicked, bring map back to original position
	$('#viewReset').on('click', function () {
		$('#outputDirections').html('');
		$('#outputDirections').html('<h2>Directions</h2>');
		$('#userAddress').val('');
		removeObjectsById('route');
		setMapViewBounds(map, true);
	});

	// Reset map view button
	$('#btnResetView').on('click', function () {
		removeObjectsById('route');
		setMapViewBounds(map, true);
	});

	// Checks to see if the modal is closed
	$('#addressErrorClose').on('click', function () {
		$('#addressError').removeClass('is-active');
	});
});

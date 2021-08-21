// Main
// Here API Information
var platform = new H.service.Platform({
	apikey: 'ycAxA8uZf-kPh9Jz-FGc9BttR8Zqv8M6XnO4jhwO6ko',
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Initialize a map - this map is centered over Central Texas
var map = new H.Map(
	document.getElementById('mapContainer'),
	defaultLayers.vector.normal.map,
	{
		center: { lat: 30.267104533443522, lng: -97.74321396061669 },
		zoom: 12,
		pixelRatio: window.devicePixelRatio || 1,
	}
);

// Set map tilt for aethetics
map.getViewModel().setLookAtData({
	tilt: 45,
});

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

function drawRoutes(map, markers) {
  let latlngPoint;

  const waypoints = markers.slice(1, -1).map(function(marker) {
    latlngPoint = new google.maps.LatLng(marker);
    return google.maps.DirectionsWaypoint = {location: latlngPoint};
  });

  const origin = [markers[0].lat, markers[0].lng];

  const lastIndex   = markers.length - 1
  const destination = [markers[lastIndex].lat, markers[lastIndex].lng];

  map.drawRoute({
    origin:      origin,
    destination: destination,
    waypoints:   waypoints,
    travelMode: 'driving'
  });
}

export { drawRoutes };

import GMaps from 'gmaps/gmaps.js';

const mapElement = document.getElementById('map');

if (mapElement) {
  const map     = new GMaps({ el: '#map', lat: 0, lng: 0 });
  const markers = JSON.parse(mapElement.dataset.markers);

  map.addMarkers(markers);

  if (markers.length === 0) {
    map.setZoom(2);
  } else if (markers.length === 1) {
    map.setCenter(markers[0].lat, markers[0].lng);
    map.setZoom(14);
  } else {
    map.fitLatLngBounds(markers);
  }

  const waypoints = markers.slice(1, -1).map(function(marker) {
    var latlngPoint = new google.maps.LatLng(marker);
    return google.maps.DirectionsWaypoint = {location: latlngPoint};
  });

  const origin = [markers[0].lat, markers[0].lng];

  let lastIndex = markers.length - 1
  const destination = [markers[lastIndex].lat, markers[lastIndex].lng];

  map.drawRoute({
    origin:      origin,
    destination: destination,
    waypoints:   waypoints,
    travelMode: 'driving'
  });

  window.mapObj = map;
}

import GMaps from 'gmaps/gmaps.js';
import { drawRoutes } from './drawRoutes.js';

function renderMap() {
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

    drawRoutes(map, markers);

    window.mapObj = map;
  }
}

export { renderMap };

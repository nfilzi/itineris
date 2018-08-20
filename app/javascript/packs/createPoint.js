import GMaps from 'gmaps/gmaps.js';

function listenToNewPointFormSubmission() {
  var form = document.getElementById('new_point');
  form.addEventListener('submit', createPoint)
}

function createPoint(submitEvent){
  submitEvent.preventDefault();

  var form      = submitEvent.target;
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  var submissionUrl = form.action;
  var data          = JSON.stringify({city: form.elements.point_city.value});

  data = fetch(submissionUrl, {
    method: "POST",
    body: data,
    headers: {
      "Accept":       "application/json",
      "Content-Type": "application/json",
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(function(data){
    addPointToList(data);
    enableSubmitInput(form);
    addPointToMap(data);
  });
}

function addPointToMap(data) {
  var position = { lat: data.lat, lng: data.lng }

  data.animation = google.maps.Animation.DROP;

  // mapObj added in map.js accessible through window global state
  // could not make it work without it
  var marker     = mapObj.addMarker(data);

  mapObj.setCenter(position);
}

function addPointToList(data) {
  var pointsList = document.getElementById('points');

  pointsList.insertAdjacentHTML('beforeend', data.cardMarkup.content);
}

function enableSubmitInput(form) {
  form.commit.disabled  = false;
  form.point_city.value = null;
}

listenToNewPointFormSubmission();

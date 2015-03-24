var map;

function initialize() {
  var myLatlng = new google.maps.LatLng(53.260998,-3.501757);
  var mapOptions = {
    zoom: 19,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'That Delivery Guy'
  });
  
}

google.maps.event.addDomListener(window, 'load', initialize);
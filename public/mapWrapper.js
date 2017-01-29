var MapWrapper = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addMarker: function(coords, contentWurds) {
    var infoWindow = new google.maps.InfoWindow({
      content: contentWurds
    });
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });

   // marker.addListener('click', function () {
   //   infoWindow.open(this.googleMap, marker);
   // });
  },
  centreMap: function(button, coords, zoom) {
      button.onclick = function() {
      this.googleMap.setCenter(coords);
      this.googleMap.setZoom(zoom);
      this.addMarker(coords);
    }.bind(this);
  },
  getCurrentLocation: function(button) {
    button.onclick = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleMap.setCenter(pos);
      this.googleMap.setZoom(9);
      this.addMarker(pos);
    }.bind(this));
  }.bind(this);

}
}



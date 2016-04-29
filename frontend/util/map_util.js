/* global google */

module.exports = {
  createInfoWindow: function(marker, product) {
    var self = this;
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var contentString = '<div id="marker-box">'+
      product.name +
      '</div>';

    marker.addListener('click', function() {
      infowindow.open(self.map, this);
    });

    marker.addListener('mouseout', function() {
      infowindow.close();
    });
  },

  clearMarkers: function(markers){
    if (markers) {
      markers.forEach(function(mark){
        mark.setMap(null);
      });
    }
  },

  addMarker: function(map, product) {
    var loc = new google.maps.LatLng(product.lat, product.lng);
    var desc = product.description;

    var mark = new google.maps.Marker({
      position: loc,
      title: desc
    });

    mark.setMap(map);

    return mark;
  },

  geocodeAddress: function(address, success, error) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        success(results[0].geometry.location);
      } else {
        error(status);
      }
    });
  },

  geocodePosition: function(pos, success, error) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode (
      { latLng: pos },
      function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          success(results[0].formatted_address);
        } else {
          error(status);
        }
      }
    );
  }
};

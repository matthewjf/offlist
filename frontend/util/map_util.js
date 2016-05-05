var ReactDOM = require('react-dom');
/* global google */

module.exports = {
  createInfoWindow: function(self) {
    var contentString = '<div id="marker-box">hello</div>';

    self.infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300
    });

  },

  styleInfoWindow: function() {
    var parent = $('.gm-style-iw').parent();
    var firstChild = parent.children('div:first-child');
    parent.find('div').css({maxWidth: '300px'});
    // remove close button (positioning was too hard)
    parent.children('div:last-child').css({display: 'none'});
    // hide infowindow background
    firstChild.children('div:nth-child(2)').css({display: 'none'});
    firstChild.children('div:last-child').css({display: 'none'});
    // raise carrot over shadow
    firstChild.children('div:nth-child(3)').children('div').css({zIndex: 100});
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

var React = require('react');

/* global google */

module.exports = React.createClass({
  onChange: function(){
  },

  setCoords: function(e) {
    alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
  },

  placeMarker: function(latLng, map) {
    if (this.marker) {this.marker.setMap(null);}
    this.marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  },

  componentDidMount: function(){
    var self = this;
    var mapDOMNode = self.refs.map;
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false
    };
    self.map = new google.maps.Map(mapDOMNode, mapOptions);

    self.map.addListener('click', function(e) {
      self.placeMarker(e.latLng, self.map);
      self.props.clickCB(e.latLng.lat(), e.latLng.lng());
    });
  },

  render: function () {
   return (
       <div id="map" ref='map'/>
   );
 }
});

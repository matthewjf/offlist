var React = require('react'),
    MapUtil = require('../../util/map_util');

/* global google */
/* global Materialize */

module.exports = React.createClass({
  componentWillReceiveProps: function(newProps){
    this.removeMarker();
    if (newProps.googlePos.lat) {
      this.placeMarker(newProps.googlePos, this.map);
      this.map.panTo(newProps.googlePos); // needs work
    }
  },

  setCoords: function(e) {
    alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
  },

  removeMarker: function(){
    if (this.marker) {this.marker.setMap(null);}
  },

  placeMarker: function(latLng, map) {
    var self = this;
    self.removeMarker();
    self.marker = new google.maps.Marker({
      position: latLng,
      draggable: true,
      map: map
    });

    google.maps.event.addListener(self.marker, 'dragend', function(){
      var pos = self.marker.getPosition();
      MapUtil.geocodePosition(pos, self.geoSuccess, self.geoError);
      self.props.setLatLng(pos);
    });
  },

  geoSuccess: function(result) {
    this.props.setAddress(result);
    $(document).ready(function() {
      Materialize.updateTextFields();
    });
  },

  geoError: function(status){
    this.props.setAddress('Unknown location: ' + status);
    $(document).ready(function() {
      Materialize.updateTextFields();
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
      MapUtil.geocodePosition(e.latLng, self.geoSuccess, self.geoError);
      self.props.setLatLng(e.latLng);
    });
  },

  render: function () {
   return (
       <div id="map" ref='map'/>
   );
 }
});

var React = require('react'),
    ReactDOM = require('react-dom'),
    ProductStore = require('../../stores/product_store'),
    ClientActions = require('../../actions/client_actions'),
    MapUtil = require('../../util/map_util'),
    MarkerStore = require('../../stores/marker_store');
/* global google */
module.exports = React.createClass({
  createMap: function(){
    var map = ReactDOM.findDOMNode(this.refs.map);
    var loc = new google.maps.LatLng(37.7758, -122.435);

    var mapOptions = {
      center: loc,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false,
    };
    this.map = new google.maps.Map(map, mapOptions);
  },

  setCenter: function(loc) {
    google.maps.event.trigger(this.map, 'resize');
    if (typeof loc.lat === 'number'  && typeof loc.lng === 'number') {
      this.map.panTo(loc);
    }
  },

  setMarker: function(latLng) {
    if (this.marker)
      this.marker.setMap(null);

    var marker = new google.maps.Marker({
      zoom: 10,
      position: latLng,
      draggable: false,
      clickable: false
    });

    marker.setMap(this.map);
    this.marker = marker;
  },

  componentDidMount: function(){
    this.createMap();
    var loc = {lat: this.props.lat, lng: this.props.lng};
  },

  componentWillReceiveProps: function(newProps){
    var loc = {lat: this.props.lat, lng: this.props.lng};
    this.setMarker(loc);
    this.setCenter(loc);
  },

  componentWillUnmount: function() {
    if (this.marker)
      this.marker.setMap(null);
  },

  render: function(){
    return (
      <div id="map" ref='map' />
    );
  }
});

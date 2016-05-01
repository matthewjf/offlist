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
    if (!isNaN(this.props.lat) && !isNaN(this.props.lng)) {
      var loc = new google.maps.LatLng(this.props.lat, this.props.lng);
    }
    var mapOptions = {
      center: loc || {lat: 37.7758, lng: -122.435},
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false,
    };
    this.map = new google.maps.Map(map, mapOptions);
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
  },

  componentWillReceiveProps: function(newProps){
    if (!isNaN(newProps.lat) && !isNaN(newProps.lng)) {
      var loc = new google.maps.LatLng(newProps.lat, newProps.lng);
      this.map.setCenter(loc);
      this.setMarker(loc);
    }
  },

  componentWillUnmount: function() {

  },

  render: function(){
    return (
      <div id="map" ref='map' />
    );
  }
});

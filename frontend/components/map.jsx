var React = require('react'),
    ReactDOM = require('react-dom'),
    ProductStore = require('../stores/product_store'),
    MapUtil = require('../util/map_util'),
    MarkerStore = require('../stores/marker_store'),
    SearchActions = require('../actions/search_actions'),
    SearchStore = require('../stores/search_store');

/* global google */

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },

  onChange: function(){
    var self = this;
    setTimeout(function(){
      self.setMarkers();
    },0);
  },

  setMarkers: function() {
    var self = this;
    var markers = {};
    var products = ProductStore.all();

    Object.keys(products).forEach(function(key) {
      var mark = MapUtil.addMarker(self.map, products[key]);
      markers[products[key]['id']] = mark;
    });

    MarkerStore.resetMarkers(markers);
  },

  setLatLng: function() {
    var latLngBounds = this.map.getBounds();
    this.setState({bounds: this.getBounds(latLngBounds)});

    SearchActions.setSearch(this.state);
  },

  getBounds: function(latLng) {
    var northEast = {
      lat: latLng.getNorthEast().lat(),
      lng: latLng.getNorthEast().lng()
    };

    var southWest = {
      lat: latLng.getSouthWest().lat(),
      lng: latLng.getSouthWest().lng()
    };

    var bounds = {
      northEast: northEast,
      southWest: southWest
    };

    return bounds;
  },

  componentDidMount: function(){
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7749295, lng: -122.4194155},
      zoom: 12,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.productListener = ProductStore.addListener(this.onChange);
    this.mapListener = this.map.addListener('idle',this.setLatLng);
  },

  componentWillUnmount: function() {
    google.maps.event.removeListener(this.mapListener);
    this.productListener.remove();
  },

  lookupAddress: function(address){
    if (address)
      MapUtil.geocodeAddress(address, this.lookupSuccess, this.lookupError);
    else
      this.setLatLng();
  },

  lookupError: function(status){
    /* global Materialize */
    Materialize.toast('Unknown location: ' + status, 4000, 'red-text');
  },

  lookupSuccess: function(latLng) {
    if (this.circle)
      this.circle.setMap(null);

    this.circle = new google.maps.Circle({
      center: latLng,
      radius: parseInt(this.state.distance) / 0.00062137,
      map: this.map,
      fillColor: '#F57C00',
      fillOpacity: 0.20,
      strokeColor: '#F57C00',
      strokeOpacity: 0.5,
      strokeWeight: 1
    });

    this.map.fitBounds(this.circle.getBounds());
    this.setLatLng();
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      query: newProps.state.query,
      distance: newProps.state.distance,
      address: newProps.state.address
    });

    this.lookupAddress(newProps.state.address);
  },

  render: function () {
    return (
      <div id="map" ref='map' className='index' />
    );
  }
});

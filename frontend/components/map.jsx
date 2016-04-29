var React = require('react'),
    ReactDOM = require('react-dom'),
    ProductStore = require('../stores/product_store'),
    ClientActions = require('../actions/client_actions'),
    MapUtil = require('../util/map_util'),
    MarkerStore = require('../stores/marker_store');

/* global google */

module.exports = React.createClass({
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

  getProducts: function() {
    var currLoc = this.map.getBounds();
    var northEast = {
      lat: currLoc.getNorthEast().lat(),
      lng: currLoc.getNorthEast().lng()
    };

    var southWest = {
      lat: currLoc.getSouthWest().lat(),
      lng: currLoc.getSouthWest().lng()
    };

    var bounds = {bounds: {
      northEast: northEast,
      southWest: southWest
    }};

    ClientActions.fetchProducts(bounds);
  },

  componentDidMount: function(){
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false
    };
    this.map = new google.maps.Map(map, mapOptions);
    ProductStore.addListener(this.onChange);
    this.map.addListener('idle',this.getProducts);
  },

  render: function () {
   return (
      <div id="map" ref='map' className='index' />
   );
 }
});

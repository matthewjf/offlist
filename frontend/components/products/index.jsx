var React = require('react'),
    ProductStore = require('../../stores/product_store'),
    IndexItem = require('./index_item'),
    ClientActions = require('../../actions/client_actions'),
    SearchStore = require('../../stores/search_store');

/* global google */

module.exports = React.createClass({
  getInitialState: function() {
    return { products: [] };
  },

  getProducts: function() {
    this.setState({ products: ProductStore.all() });
  },

  getSearch: function() {
    this.setState({search: SearchStore.all(), circle: SearchStore.getCircle()});
  },

  inCircle: function(product) {
    var circle = this.state.circle;
    var searchDistance = parseInt(this.state.search.distance) / 0.00062137;

    if (product && circle) {
      var latLng = new google.maps.LatLng(product.lat, product.lng);
      var distance = google.maps.geometry.spherical.computeDistanceBetween(circle.getCenter(), latLng);
      console.log(distance + ':' + searchDistance);
      if (distance < searchDistance) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },

  searchText: function() {
    var search = this.state.search;
    var resultText = '';
    if (search) {
      resultText += this.containedProducts().length;
      resultText += " listing";
      if (this.containedProducts().length !== 1)
        resultText += 's';
      if (search.query)
        resultText += " for '" + search.query + "'";
      if (search.address && search.distance) {
        resultText += " within " + search.distance + " miles";
        resultText += " of '" + search.address + "'";
      }
    }
    return resultText;
  },

  containedProducts: function() {
    var self = this;
    return this.state.products.filter(function(product) {
      if (self.inCircle(product)) {
        return true;
      } else {
        return false;
      }
    });
  },

  nearbyProducts: function() {
    var self = this;
    return this.state.products.filter(function(product) {
      if (self.inCircle(product)) {
        return false;
      } else {
        return true;
      }
    });
  },

  componentDidMount: function () {
    this.searchListener = SearchStore.addListener(this.getSearch);
    this.productListener = ProductStore.addListener(this.getProducts);
  },

  componentWillUnmount: function() {
    this.productListener.remove();
    this.searchListener.remove();
  },

  placeholder: function() {
    return <li className='placeholder-card card product-item'></li>;
  },

  productItems: function() {
    return this.itemList(this.containedProducts());
  },

  nearbyItems: function() {
    return this.itemList(this.nearbyProducts());
  },

  nearBySection: function() {
    if (this.nearbyProducts().length > 0) {
      return <div><div className='divider'/>
      <div className='results-text grey-text text-darken-1'>
        Nearby listings
      </div>
      <ul className='sidebar-list'>
        {this.nearbyItems()}
        {this.placeholder()}
        {this.placeholder()}
        {this.placeholder()}
        {this.placeholder()}
      </ul>
    </div>;
    } else {
      return <div></div>;
    }
  },

  itemList: function(items) {
    if (items) {
      return items.map(function(item) {
        return <IndexItem
          product={item}
          key={item.id}
        />;
      });
    } else {
      return <div></div>;
    }
  },

  render: function() {
    return <div id='sidebar'>
      <div className='sidebar-content'>
        <div className='results-text grey-text text-darken-1'>
          {this.searchText()}
        </div>
        <ul className='sidebar-list'>
          {this.productItems()}
          {this.placeholder()}
          {this.placeholder()}
          {this.placeholder()}
          {this.placeholder()}
        </ul>
        {this.nearBySection()}
      </div>
    </div>;
  }

});

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

  inCircle: function(product) {
    var circle = SearchStore.getCircle();
    if (product && circle) {
      var latLng = new google.maps.LatLng(product.lat, product.lng);
      if (circle.getBounds().contains(latLng)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },

  searchText: function() {
    var search = SearchStore.all();
    var resultText = '';
    if (search) {
      resultText += this.containedProducts().length;
      resultText += " listing";
      if (this.containedProducts().length !== 1)
        resultText += 's';
      if (search.query)
        resultText += " for '" + search.query + "'";
      if (search.distance)
        resultText += " within " + search.distance + " miles";
      if (search.address)
        resultText += " of '" + search.address + "'";
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
    this.productListener = ProductStore.addListener(this.getProducts);
  },

  componentWillUnmount: function() {
    this.productListener.remove();
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

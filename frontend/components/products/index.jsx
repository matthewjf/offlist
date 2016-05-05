var React = require('react'),
    ProductStore = require('../../stores/product_store'),
    IndexItem = require('./index_item'),
    ClientActions = require('../../actions/client_actions'),
    SearchStore = require('../../stores/search_store');

module.exports = React.createClass({
  getInitialState: function() {
    return { products: [] };
  },

  getProducts: function() {
    this.setState({ products: ProductStore.all() });
  },

  searchText: function() {
    var search = SearchStore.all();
    var resultText = '';
    if (search) {
      resultText += "Listings";
      if (search.query)
        resultText += " for '" + search.query + "'";
      if (search.address)
        resultText += " near '" + search.address + "'";
    }

    return resultText;
  },

  setNearbyProducts: function() {

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
    return this.itemList(this.state.products);
  },

  nearbyItems: function() {
    return (
      <ul className='sidebar-list'>
        {this.placeholder()}
        {this.placeholder()}
        {this.placeholder()}
        {this.placeholder()}
      </ul>
    );
  },

  itemList: function(items) {
    return items.map(function(item) {
      return <IndexItem
        product={item}
        key={item.id}
      />;
    });
  },

  render: function() {
    var links = this.state.products.map(function(product) {
      return <IndexItem
        product={product}
        key={product.id}
      />;
    });

    return <div id='sidebar'>
      <div className='sidebar-content'>
        <div className='results-text grey-text'>{this.searchText()}</div>
        <ul className='sidebar-list'>

          {this.productItems()}
          {this.placeholder()}
          {this.placeholder()}
          {this.placeholder()}
          {this.placeholder()}
        </ul>

      </div>
    </div>;
  }

});

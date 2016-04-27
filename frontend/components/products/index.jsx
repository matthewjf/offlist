var React = require('react'),
    ApiUtil = require('../../util/api_util.js'),
    ProductStore = require('../../stores/product_store'),
    IndexItem = require('./index_item'),
    ClientActions = require('../../actions/client_actions');

module.exports = React.createClass({
  getInitialState: function() {
    return { products: [] };
  },

  getProducts: function() {
    this.setState({ products: ProductStore.all() });
  },

  componentDidMount: function () {
    this.productListener = ProductStore.addListener(this.getProducts);
    ClientActions.fetchProducts();
  },

  componentWillUnmount: function() {
    this.productListener.remove();
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
        <ul className='sidebar-list'>
          {links}
          <li className='placeholder-card card product-item'></li>
          <li className='placeholder-card card product-item'></li>
          <li className='placeholder-card card product-item'></li>
          <li className='placeholder-card card product-item'></li>
        </ul>
      </div>
    </div>;
  }

});

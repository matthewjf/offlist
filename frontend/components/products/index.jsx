var React = require('react'),
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

  placeholder: function() {
    return <li className='placeholder-card card product-item'></li>;
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
          {this.placeholder()}
          {this.placeholder()}
          {this.placeholder()}
          {this.placeholder()}
        </ul>
      </div>
    </div>;
  }

});

var React = require('react');

var UserActions = require("../../actions/user_actions"),
    UserStore = require('../../stores/user_store'),
    ProductStore = require('../../stores/product_store'),
    hashHistory = require('react-router').hashHistory,
    ProductItem = require('./user_product_item');

module.exports = React.createClass({
  getInitialState: function(){
    return {products: []};
  },

  getProducts: function(){
    this.setState({products: ProductStore.all()});
  },

  componentDidMount: function(){
    this.productListener = ProductStore.addListener(this.getProducts);
  },

  componentWillUnmount: function() {
    this.productListener.remove();
  },

  newProduct: function() {
    hashHistory.push('products/new');
  },

  productItems: function(){
    return this.state.products.map(function(product){
      return  <ProductItem key={product.id} product={product} />;
    });
  },

  render: function() {
    var numProducts = this.state.products ? this.state.products.length : 0;
    return <div className='account-products'>
            <div className='split-row'>
              <div className='num-products grey-text'>{numProducts} products</div>
              <button
                className='btn waves-effect waves-light' onClick={this.newProduct}>
                Add Product
              </button>
            </div>
            <ul className='collection'>
              {this.productItems()}
            </ul>
          </div>;
  }
});

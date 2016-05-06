var React = require('react');

var UserActions = require("../../actions/user_actions"),
    SellerStore = require('../../stores/seller_store'),
    ProductStore = require('../../stores/product_store'),
    IndexItem = require('../products/index_item');

module.exports = React.createClass({
  getInitialState: function() {
    var sellerId = this.props.params.userId;
    var seller = SellerStore.seller() || '';
    var products = SellerStore.products() || [];
    return {
      seller: seller,
      products: products
    };
  },

  componentDidMount: function() {
    this.sellerListener = SellerStore.addListener(this.updateSeller);
		UserActions.fetchSeller(this.props.params.userId);
  },

  componentWillUnmount: function() {
		this.sellerListener.remove();
	},

  componentWillReceiveProps: function(nextProps) {
    UserActions.fetchSeller(nextProps.params.userId);
  },

  getProducts: function() {
    this.setState({ products: ProductStore.all() });
  },

  updateSeller: function(){
		this.setState({
			seller: SellerStore.seller(),
      products: SellerStore.products(),
			errors: SellerStore.errors()
		});
	},

  placeholder: function() {
    return <li className='placeholder-card card product-item'></li>;
  },

  productList: function() {
    if (this.state.products) {
      return this.state.products.map(function(product) {
        return <IndexItem
          product={product}
          key={product.id}
        />;
      });
    } else {
      return <div></div>;
    }
  },

  render: function(){
    return(
      <div className='container seller-detail'>
        <h5>{this.state.seller + "'s "}Store</h5>
        <div className='sidebar-content'>
          <ul className='sidebar-list'>
            {this.productList()}
            {this.placeholder()}
            {this.placeholder()}
            {this.placeholder()}
            {this.placeholder()}
          </ul>
        </div>
      </div>
    );
  }
});

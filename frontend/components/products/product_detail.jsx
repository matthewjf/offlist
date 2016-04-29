var React = require('react'),
    hashHistory = require('react-router').hashHistory,
    ProductStore = require('../../stores/product_store'),
    ClientActions = require('../../actions/client_actions');

var Map = require('./detail_map'),
    Seller = require('./seller'),
    Carousel = require('./carousel'),
    Offer = require('./offer'),
    Description = require('./description');

module.exports = React.createClass({
  getInitialState: function () {
    var productId = this.props.params.productId;
    var blankProduct = {
      title: '',
      description: '',
      price: '',
      img_urls: [],
      lat: '',
      lng: ''
    };

    var product = ProductStore.find(productId) || blankProduct;
    return {product: product};
  },

  componentDidMount: function() {
    this.productListener = ProductStore.addListener(this._productChanged);
    ClientActions.getProduct(this.props.params.productId);
  },

  componentWillUnmount: function () {
    this.productListener.remove();
  },

  _productChanged: function () {
    var productId = this.props.params.productId;
    var product = ProductStore.find(productId);
    this.setState({ product: product });
  },

  render: function () {
    var product = this.state.product;
    return (
      <div>
        <h1 className='center-align'>{product.title}</h1>
        <div className='row product-detail'>
          <div className='col s12 m8 detail-left'>
            <div className='card detail-content'>
              <div className='detail-image'>
                <Carousel images={product.img_urls}/>
              </div>
              <div className='detail-content'>
                <Description description={product.description}/>
              </div>
            </div>
          </div>
          <div className='col s12 m4 detail-right'>
            <Offer price={product.price}/>
            <Map lat={product.lat} lng={product.lng}/>
          </div>
        </div>
      </div>
    );
  }
});

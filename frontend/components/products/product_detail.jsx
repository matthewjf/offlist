var React = require('react'),
    hashHistory = require('react-router').hashHistory,
    ProductStore = require('../../stores/product_store'),
    ClientActions = require('../../actions/client_actions'),
    MapUtil = require('../../util/map_util');

var Map = require('./detail_map'),
    Seller = require('./seller'),
    Carousel = require('../carousel'),
    Offer = require('./offer'),
    OfferForm = require('../offers/offer_form'),
    Description = require('./description');

module.exports = React.createClass({
  getInitialState: function () {
    var productId = this.props.params.listingId;
    var product = ProductStore.find(productId) || this.blankProduct();
    return {product: product};
  },

  blankProduct: function() {
    var blank = {
      title: '',
      description: '',
      price: '',
      img_urls: [],
      lat: '',
      lng: '',
      seller: {username: ''},
      tags: []
    };
    return blank;
  },

  componentDidMount: function() {
    this.productListener = ProductStore.addListener(this._productChanged);
    ClientActions.getProduct(this.props.params.listingId);
    this.setState({address: ''});
  },

  componentWillUnmount: function () {
    this.productListener.remove();
  },

  componentWillReceiveProps: function(newProps) {
    ClientActions.getProduct(newProps.params.listingId);
  },

  _productChanged: function () {
    var productId = this.props.params.listingId;
    var product = ProductStore.find(productId);
    if (product) {
      this.setState({ product: product, _: '' });
      MapUtil.geocodePosition(
        {lat: product.lat, lng: product.lng},
        this.setAddress,
        this.addressError
      );
    }
  },

  setAddress: function(address){
    this.setState({address: address});
  },

  addressError: function(status) {
    alert('something went wrong: ' + status);
  },

  isActive: function() {
    if (this.state.product &&  this.state.product.active === false) {
      return (
        <div className='col s12'>
          <div className='card detail-inactive red'>
            <em className='white-text'>This listing has been completed</em>
          </div>
        </div>
      );
    }
  },

  tagsList: function() {
    if(this.state.product && this.state.product.tags) {
      return this.state.products.tags.map(function(tag) {
        return <div className="chip">
          {tag.name}
        </div>;
      });
    } else {
      return '';
    }
  },

  render: function () {
    var product = this.state.product || this.blankProduct();
    var seller = product.seller ? product.seller : {username: '', id: null };

    return (
      <div>
        <div className='row product-detail'>
          {this.isActive()}
          <div className='col s12 m7 l8 detail-left'>
            <div className='card detail-content'>
              <div className='detail-image'>
                <Carousel images={product.img_urls}/>
              </div>
              <div className='detail-content'>
                <Description
                  description={product.description}
                  title={product.title} created={product.created_at} />
              </div>
            </div>
          </div>
          <div className='col s12 m5 l4 detail-right'>
            <Seller seller={seller} />
            <Offer price={product.price}/>
            <OfferForm productId={this.props.params.listingId} />
            <div className='card'>
              <div className='card-image'>
                <Map lat={product.lat} lng={product.lng}/>
              </div>
              <div className='address'>
                {this.state.address}
              </div>
            </div>
            <div className='tags'>

            </div>
          </div>
        </div>
      </div>
    );
  }
});

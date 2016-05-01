var React = require('react'),
    ApiUtil = require('../../util/api_util.js'),
    hashHistory = require('react-router').hashHistory,
    NewProductMap = require('./new_product_map'),
    MapUtil = require('../../util/map_util'),
    ProductStore = require('../../stores/product_store'),
    ClientActions = require('../../actions/client_actions');


var cloudinary = require('cloudinary');

cloudinary.config({              // not too worried about this
  cloud_name: 'dn0zhjiai',
  api_key: '441363689224142',
  api_secret: 'dbpQvs_7s-55S5koBars1o2FeZw'
});

var cloudinaryWidgetOptions = {
  cloud_name: 'dn0zhjiai',
  upload_preset: 'ls86piw7',
  theme: 'minimal',
  button_class: 'waves-effect btn-flat',
  sources: ['local', 'url'],
  folder: 'splashy',
  thumbnails: '.thumbnails',
};

module.exports = React.createClass({
  blankAttrs: {
    title: '',
    price: '',
    description: '',
    lat: '',
    lng: '',
    address: '',
    img_urls: [],
    googlePos: {}
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  setTitle: function(e){
    this.setState({title: e.target.value});
  },

  setPrice: function(e){
    this.setState({price: e.target.value});
  },

  setDescription: function(e){
    this.setState({description: e.target.value});
  },

  updateAddress: function(e){
    this.setAddress(e.target.value);
  },

  setAddress: function(addr){
    this.setState({address: addr});
  },

  lookupAddress: function(e){
    MapUtil.geocodeAddress(this.state.address, this.geoSuccess, this.geoError);
  },

  lookupPosition: function() {
    var self = this;

    var success = function(result) {
      self.setState({address: result});
      $(document).ready(function() {
        Materialize.updateTextFields();
      });
    };

    var error = function(status){
      self.props.setAddress('Unknown location: ' + status);
      $(document).ready(function() {
        Materialize.updateTextFields();
      });
    };

    MapUtil.geocodePosition(this.state.googlePos, success, error);
  },

  setLatLng: function(pos) {
    this.setState({lat: pos.lat(), lng: pos.lng(), googlePos: pos});
    $(document).ready(function() {
      /* global Materialize (make linter happy) */
      Materialize.updateTextFields();
    });
  },

  geoSuccess: function(result) {
    this.setState({googlePos: result, lat: result.lat(), lng: result.lng()});
    $(document).ready(function() {
      Materialize.updateTextFields();
    });
  },

  geoError: function(status){
    if (this.state.address){
      alert("Address lookup error: " + status);
    } else {
      this.setState({lat: '', lng: ''});
    }
    $(document).ready(function() {
      Materialize.updateTextFields();
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var product = {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng,
      img_urls: this.state.img_urls
    };
    if (this.props.params.productId) {
      product.id = this.props.params.productId;
      ApiUtil.updateProduct(product, this.submitSuccess);
    } else {
      ApiUtil.createProduct(product, this.submitSuccess, 'created');
    }
  },

  submitSuccess: function(id) {
    var resultText = (this.props.params.productId ? 'updated' : 'created');
    hashHistory.push('account');
    Materialize.toast('Product ' + resultText + '!', 4000, 'green-text');
  },

  setImageUrls: function(error, result) {
    var self = this;
    for (var idx in result) {
      if (result.hasOwnProperty(idx))
        self.setState({
          img_urls: self.state.img_urls.concat([result[idx].url])
        });
    }
  },

  componentDidMount: function() {
    var self = this;
    this.productListener = ProductStore.addListener(this._productChanged);
    this.editForm(this.props);
    $('#upload_widget_opener').cloudinary_upload_widget(
      cloudinaryWidgetOptions,
      function(error, result) {self.setImageUrls(error, result);});
  },

  componentWillUnmount: function() {
    this.productListener.remove();
  },

  editForm: function(props) {
    if (props.params['productId']) {
      ClientActions.getProduct(props.params.productId);
    }
  },

  _productChanged: function () {
    var self = this;
    var productId = this.props.params.productId;
    var product = ProductStore.find(productId);
    if (product) {
      Object.keys(product).forEach(function(key) {
        self.setState(product);
      });
      /* global google */
      self.setState({
        googlePos: new google.maps.LatLng(product.lat, product.lng)
      });
      self.lookupPosition();
      Materialize.updateTextFields();
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.editForm(newProps);
  },

  render: function () {
    var submitText = (this.props.params['productId'] ? 'edit' : 'create');

    return (
      <div id='content'>
        <div id='sidebar'>
          <div className='sidebar-content'>
            <h4 className='grey-text text-darken-3 center-align'>Product Form</h4>
            <form className='col s12 m10 l8 product-form' onSubmit={this.handleSubmit}>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='title'
                    type='text'
                    value={this.state.title}
                    onChange={this.setTitle}
                  />
                  <label htmlFor='title'>Title</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='price'
                    type='text'
                    value={this.state.price}
                    onChange={this.setPrice}
                  />
                <label htmlFor='price'>Price</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <textarea
                    id='description'
                    type='text'
                    className='materialize-textarea'
                    value={this.state.description}
                    onChange={this.setDescription}
                  />
                <label htmlFor='description'>Description</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='address'
                    type='text'
                    value={this.state.address}
                    onChange={this.updateAddress}
                    onBlur={this.lookupAddress}
                  />
                <label htmlFor='address'>Address</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s6'>
                  <label htmlFor='latitude'>Latitude</label>
                  <input disabled
                    id='latitude'
                    type='text'
                    value={this.state.lat}
                  />
                </div>
                <div className='input-field col s6'>
                  <label htmlFor='longitude'>Longitude</label>
                  <input disabled
                    id='longitude'
                    type='text'
                    value={this.state.lng}
                  />
                </div>
              </div>
              <div className='button-row'>
                <div>
                  <div className='right-align'>
                    <button
                      className="waves-effect waves-light btn">
                      {submitText}
                    </button>
                    <div className='upload_widget left'>
                      <a id='upload_widget_opener' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='thumbnails'></div>
            </form>
          </div>
        </div>

        <NewProductMap
          googlePos={this.state.googlePos}
          setLatLng={this.setLatLng}
          setAddress={this.setAddress}/>
      </div>
    );
  }
});

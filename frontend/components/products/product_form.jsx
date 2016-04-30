var React = require('react'),
    ApiUtil = require('../../util/api_util.js'),
    hashHistory = require('react-router').hashHistory,
    NewProductMap = require('./new_product_map'),
    MapUtil = require('../../util/map_util');


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

  createProduct: function (event) {
    event.preventDefault();
    var product = {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng,
      address: this.state.address,
      img_urls: this.state.img_urls
    };
    ApiUtil.createProduct(product);
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
    console.log(this.props.params['productId']);

    var self = this;
    $('#upload_widget_opener').cloudinary_upload_widget(
      cloudinaryWidgetOptions,
      function(error, result) {self.setImageUrls(error, result);});
  },

  componentWillReceiveProps: function(newProps) {
    console.log(newProps.params['productId']);
  },

  render: function () {
    return (
      <div id='content'>
        <div id='sidebar'>
          <div className='sidebar-content'>
            <h3 className='center-align'>Product Form</h3>
            <form className='col s12 m10 l8 product-form' onSubmit={this.createProduct}>

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
                      Create Product
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

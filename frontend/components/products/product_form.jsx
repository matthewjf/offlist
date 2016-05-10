var React = require('react'),
    ReactDOM = require('react-dom'),
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
  button_class: 'waves-effect waves-light btn light-blue darken-1',
  sources: ['local', 'url'],
  folder: 'splashy',
  thumbnails: '.thumbnails',
  transformation: {width: 800, height: 600, gravity: 'xy_center'}
  // inline_container: '#upload_widget'
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
    tag_list: []
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
    if (!addr)
      this.setState({lat: '', lng: ''});
  },

  setTags: function(tags) {
    this.setState({tag_list: tags});
  },

  lookupAddress: function(e){
    if (this.state.address)
    MapUtil.geocodeAddress(this.state.address, this.geoSuccess, this.geoError);
  },

  googlePos: function() {
      return new google.maps.LatLng(this.state.lat, this.state.lng);
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

    MapUtil.geocodePosition(this.googlePos(), success, error);
  },

  setLatLng: function(pos) {
    this.setState({lat: pos.lat(), lng: pos.lng()});
    $(document).ready(function() {
      /* global Materialize (make linter happy) */
      Materialize.updateTextFields();
    });
  },

  geoSuccess: function(result) {
    this.setState({lat: result.lat(), lng: result.lng()});
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

    var listing = {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng,
      img_urls: this.state.img_urls,
      tag_list: this.state.tag_list
    };

    if (this.props.params.listingId) {
      listing.id = this.props.params.listingId;
      ApiUtil.updateProduct(listing, this.submitSuccess);
    } else {
      ApiUtil.createProduct(listing, this.submitSuccess);
    }
  },

  submitSuccess: function(id) {
    var resultText = (this.props.params.listingId ? 'updated' : 'created');
    hashHistory.push('account');
    Materialize.toast('Listing ' + resultText + '!', 4000, 'green-text');
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
      function(error, result) {self.setImageUrls(error, result);}
    );

    $('#tagselect').material_select();
    $('#tagselect').change(function(){
      self.setTags($('#tagselect').val());
    });
  },

  componentWillUnmount: function() {
    this.productListener.remove();
    $('#tagselect').material_select('destroy');
    $('#tagselecet').off('change');
  },

  editForm: function(props) {
    if (props.params['listingId']) {
      ClientActions.getProduct(props.params.listingId);
    }
  },

  cancelForm: function(e) {
    e.preventDefault();
    hashHistory.push('account');
  },

  _productChanged: function () {
    var self = this;

    var listingId = this.props.params.listingId;
    var listing = ProductStore.find(listingId);
    if (listing) {
      self.setState(listing);

      $('#tagselect').val(listing.tag_list).change();
      $('#tagselect').material_select();

      /* global google */
      self.setState({
        googlePos: new google.maps.LatLng(listing.lat, listing.lng)
      });
      self.lookupPosition();
      Materialize.updateTextFields();
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.editForm(newProps);
  },

  render: function () {
    var submitText = (this.props.params['listingId'] ? 'edit' : 'create');

    return (
      <div id='content'>
        <div id='sidebar'>
          <div className='sidebar-detail-content'>
            <h4 className='grey-text text-darken-3 center-align'>Listing Form</h4>
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
                <div className='input-field col s6'>
                  <input
                    id='price'
                    type='text'
                    value={this.state.price}
                    onChange={this.setPrice}
                  />
                  <label htmlFor='price'>Price</label>
                </div>

                <div className='input-field col s6'>
                  <select
                      multiple
                      id='tagselect'> // tags = ['cars', 'animals', 'tools', 'kitchen', 'gadget', 'other', 'food']
                    <option value="" disabled>none</option>
                    <option value="animals">animals</option>
                    <option value="cars">cars</option>
                    <option value="food">food</option>
                    <option value="gadget">gadget</option>
                    <option value="kitchen">kitchen</option>
                    <option value="other">other</option>
                    <option value="tools">tools</option>
                  </select>
                  <label>Categories</label>
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
              <div className='btn-row row'>
                <div className='col s12'>
                  <button
                    className="waves-effect waves-light btn right">
                    {submitText}
                  </button>
                  <button
                    onClick={this.cancelForm}
                    className="waves-effect waves-ripple btn-flat right">
                    cancel
                  </button>
                  <div id='upload_widget' className='upload_widget left'>
                    <a id='upload_widget_opener' />
                  </div>
                </div>
              </div>
              <div className='thumbnails'></div>
            </form>
          </div>
        </div>

        <NewProductMap
          googlePos={this.googlePos()}
          setLatLng={this.setLatLng}
          setAddress={this.setAddress}/>
      </div>
    );
  }

});

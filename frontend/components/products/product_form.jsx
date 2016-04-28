var React = require('react'),
    ApiUtil = require('../../util/api_util.js'),
    hashHistory = require('react-router').hashHistory,
    NewProductMap = require('./new_product_map');


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
    description: '',
    lat: '',
    lng: '',
    img_urls: []
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  setTitle: function(e){
    this.setState({title: e.target.value});
  },

  setDescription: function(e){
    this.setState({description: e.target.value});
  },


  setLatLng: function(lat, lng) {
    this.setState({lat: lat, lng: lng});
    $(document).ready(function() {
      /* global Materialize (make linter happy) */
      Materialize.updateTextFields();
    });
  },

  createProduct: function (event) {
    event.preventDefault();
    ApiUtil.createProduct(this.state);
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
    $('#upload_widget_opener').cloudinary_upload_widget(
      cloudinaryWidgetOptions,
      function(error, result) {self.setImageUrls(error, result);});
  },

  render: function () {
    return (
      <div id='content'>
        <div id='sidebar'>
          <div className='sidebar-content'>
            <h3 className='center-align'>Product Form</h3>
            <form className='col s12' onSubmit={this.createProduct}>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='title'
                    type='text'
                    className='validate'
                    value={this.state.title}
                    onChange={this.setTitle}
                  />
                  <label for='title'>Title</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <textarea
                    id='description'
                    type='text'
                    className='materialize-textarea validate'
                    value={this.state.description}
                    onChange={this.setDescription}
                  />
                  <label for='description'>Description</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s6'>
                  <label for='latitude'>Latitude</label>
                  <input disabled
                    id='latitude'
                    type='text'
                    className='validate'
                    value={this.state.lat}
                  />
                </div>
                <div className='input-field col s6'>
                  <label for='longitude'>Longitude</label>
                  <input disabled
                    id='longitude'
                    type='text'
                    className='validate'
                    value={this.state.lng}
                  />
                </div>
              </div>
              <div className='button-row'>
                <div>
                  <p className='right-align'>
                    <button
                      className="waves-effect waves-light btn">
                      Create Product
                    </button>
                    <div className='upload_widget left'>
                      <a id='upload_widget_opener' />
                    </div>
                  </p>
                </div>
              </div>
              <div className='thumbnails'></div>
            </form>
          </div>
        </div>

        <NewProductMap clickCB={this.setLatLng} />
      </div>
    );
  }
});

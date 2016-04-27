var React = require('react'),
    ApiUtil = require('../../util/api_util.js'),
    hashHistory = require('react-router').hashHistory,
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    NewBenchMap = require('./new_bench_map');


var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dn0zhjiai',
  api_key: '441363689224142',
  api_secret: 'dbpQvs_7s-55S5koBars1o2FeZw'
});

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  blankAttrs: {
    title: '',
    description: '',
    lat: '',
    lng: '',
    seating: '',
    image_urls: []
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  setLatLng: function(lat, lng) {
    this.setState({lat: lat, lng: lng});
  },

  createBench: function (event) {
    event.preventDefault();
    ApiUtil.createBench(this.state);
  },

  setImageUrls: function(error, result) {
    var self = this;
    for (var idx in result) {
      if (result.hasOwnProperty(idx))
        self.setState({image_urls: self.state.image_urls.concat([result[idx].url])});
    }
  },

  componentDidMount: function() {
    var self = this;
    $('#upload_widget_opener').cloudinary_upload_widget(
      { cloud_name: 'dn0zhjiai', upload_preset: 'ls86piw7', theme: 'minimal',
        button_class: 'waves-effect waves-brown btn-flat'},
        function(error, result) {self.setImageUrls(error, result);});
  },

  render: function () {
    return (
      <div id='content'>
        <div id='sidebar'>
          <div className='sidebar-content'>
            <h3 className='center-align'>Bench Form</h3>
            <form className='col s12' onSubmit={this.createBench}>

              <div className='row'>
                <div className='input-field col s12'>
                  <label for='title'>Title</label>
                  <input
                    id='title' type='text'
                    valueLink={this.linkState('title')} />
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <label for='description'>Description</label>
                  <textarea
                    id='description'
                    type='text' className='materialize-textarea'
                    valueLink={this.linkState('description')}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <label for='seating'>Seating</label>
                    <input
                      id='seating'
                      type='number'
                      valueLink={this.linkState('seating')}
                      min='0'
                      max='20'
                    />
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s6'>
                  <label for='latitude'>Latitude</label>
                  <input disabled
                    id='latitude'
                    type='text'
                    valueLink={this.linkState('lat')}
                  />
                </div>
                <div className='input-field col s6'>
                  <label for='longitude'>Longitude</label>
                  <input disabled
                    id='longitude'
                    type='text'
                    valueLink={this.linkState('lng')}
                  />
                </div>
              </div>
            <div className='button-row'>
              <div className='upload_widget'>
                <a id='upload_widget_opener' />
              </div>

              <div>
                <p className='right-align'>
                  <button
                    className="waves-effect waves-light btn btn-large">
                    Create Bench
                  </button>
                </p>
              </div>
              </div>
            </form>
          </div>
        </div>

        <NewBenchMap clickCB={this.setLatLng} />
      </div>
    );
  }
});

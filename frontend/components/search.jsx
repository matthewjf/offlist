var React = require('react'),
    ReactDOM = require('react-dom'),
    Map = require('./map'),
    Index = require('./products/index'),
    hashHistory = require('react-router').hashHistory;

/* global Materialize */

module.exports = React.createClass({

  getInitialState: function() {
    return {query: '', address: '', distance: ''};
  },

  blankAttrs: function(){
    return {query: '', address: '', distance: ''};
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var query = ReactDOM.findDOMNode(this.refs.query).value;
    var address = ReactDOM.findDOMNode(this.refs.address).value;
    var distance = ReactDOM.findDOMNode(this.refs.distance).value;
    this.setState({query: query, address: address, distance: distance});
  },

  componentDidMount: function() {
    $('select').material_select();
  },

  componentWillUnmount: function() {
    $('select').material_select('destroy');
  },

  render: function() {
    return <div className='content-wrapper'>
      <div className='search-wrapper'>
        <form id='search-form' onSubmit={this.handleSubmit} className='container'>
          <div className='row'>
            <label htmlFor="search">Search</label>
            <div className='input-field col m4'>
              <input
                id="search"
                type="text"
                ref='query'
              />
            </div>

            <label htmlFor='address'>Location</label>
            <div className="input-field col m4">
              <input
                id="address"
                type="text"
                ref='address'
                defaultValue='San Francisco' />
            </div>

            <label htmlFor='distance'>within</label>
            <div className="input-field col m2">
              <select ref='distance' defaultValue='5' >
                <option value="2">2 mi</option>
                <option value="5">5 mi</option>
                <option value="10">10 mi</option>
                <option value="25">25 mi</option>
              </select>
            </div>

    				<button
      				className='btn waves-effect waves-light'>
              <i className="material-icons white-text">
                search</i>
            </button>
          </div>
        </form>
      </div>
      <div id='content'>
        <Index />
        <Map state={this.state} />
      </div>
    </div>;
  }
});

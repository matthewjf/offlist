var React = require('react');
/* global Materialize */

module.exports = React.createClass({
  getInitialState: function() {
    return {search: '', address: '', searchOpen: false};
  },

  open: function() {
    this.setState({searchOpen: true});
  },

  close: function() {
    this.setState({searchOpen: false});
  },

  setSearch: function(e) {
    this.setState({search: e.target.value});
  },

  setAddress: function(e) {
    this.setState({address: e.targe.value});
  },

  handleSubmit: function() {

  },

  componentDidUpdate: function() {
    Materialize.updateTextFields();
  },

  render: function() {
    var openClass = this.state.searchOpen ? 'open' : 'closed';

    return <div className='search-wrapper'>
      <i onClick={this.open} className="material-icons first-icon">
        search</i>
      <form id='search-form' className={openClass} onSubmit={this.handleSbumit}>
        <div className="input-field">
          <input id="search" type="text" placeholder='Find'/>
          <label htmlFor="search"></label>
        </div>
        <div className="input-field">
          <i className="material-icons first-icon">
            location_on</i>
          <input id="address" type="text" placeholder='Near'/>
          <label htmlFor='address'></label>
        </div>
        <i onClick={this.close} className="material-icons first-icon">
          close</i>
      </form>
    </div>;
  }
});

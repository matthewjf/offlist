var React = require('react'),
    Map = require('./map'),
    Index = require('./products/index'),
    hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
  addProductClick: function() {
  //   hashHistory.push('/products/new');
  },

  render: function () {
    return (
      <div id='content'>
        <Index />
        <Map />
      </div>
    );
 }
});

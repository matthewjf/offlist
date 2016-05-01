var React = require('react'),
    Map = require('./map'),
    Index = require('./products/index'),
    hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({

  render: function () {
    return (
      <div id='content'>
        <Index />
        <Map />
      </div>
    );
 }
});

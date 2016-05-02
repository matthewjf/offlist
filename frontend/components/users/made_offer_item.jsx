var React = require('react');
var hashHistory = require('react-router').hashHistory,
    Dotdotdot = require('react-dotdotdot'),
    TimeAgo = require('react-timeago').default,
    ClientActions = require('../../actions/client_actions');

/* global Materialize */

module.exports = React.createClass({

  render: function() {
    var offer = this.props.offer;

    return <li className="account-product grey lighten-5 collection-item row">
              <div className='product-content col s12 m9 l10'>
              </div>
              <div className='offer-content col s12 m3 l2'>

              </div>
              <div className='offer-content col s12 m3 l2'>
                <div className='offer-content col s12 m3 l2'>

                </div>
                <div className='offer-content col s12 m3 l2'>

                </div>
              </div>
            </li>;
  }
});

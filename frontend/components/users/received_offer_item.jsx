var React = require('react');
var hashHistory = require('react-router').hashHistory,
    Dotdotdot = require('react-dotdotdot'),
    TimeAgo = require('react-timeago').default,
    ClientActions = require('../../actions/client_actions');

/* global Materialize */

module.exports = React.createClass({

  handleAccept: function() {
    ClientActions.acceptOffer(this.props.offer.id, this.acceptSuccess);
  },

  handleDecline: function() {
    ClientActions.declineOffer(this.props.offer.id, this.declineSuccess);
  },

  acceptSuccess: function() {
    Materialize.toast('Offer accepted!', 4000, 'green-text');
  },

  declineSuccess: function() {
    Materialize.toast('Offer declined', 4000, 'red-text');
  },
  componentWillReceiveProps: function(newProps) {
  },

  buttons: function() {
    if (this.props.offer.status === 'Pending') {
      return (
        <div className='btns'>
          <button
            onClick={this.handleAccept}
            className="waves-effect waves-light btn right green">
              Accept
          </button>

          <button
            onClick={this.handleDecline}
            className="waves-effect waves-light btn right red">
              Decline
          </button>

        </div>
      );
    } else {
      return <span></span>;
    }
  },

  render: function() {
    var offer = this.props.offer;

    return <li className="offer-item grey lighten-5 collection-item row">
            <div className='split-row content'>
              <div className='offer-title'>
                <Dotdotdot clamp={1}>{offer.title}</Dotdotdot>
              </div>
              <div className='offer-time'>
                <TimeAgo className='grey-text' date={offer.created_at} />
              </div>
            </div>
            <div className='split-row money'>
              <div className='offer-price'>
                <b>Ask:</b> ${offer.price}
              </div>
              <div className='offer-amount'>
                <b>Offer:</b> ${offer.amount}
              </div>
            </div>
            {this.buttons()}
          </li>;
  }
});

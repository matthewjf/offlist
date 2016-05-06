var React = require('react'),
		CurrentUserState = require("../../mixins/current_user_state");

/* global Materialize */

module.exports = React.createClass({
  mixins: [CurrentUserState],

  openOffer: function(e) {
    e.preventDefault();
		if (
				this.state.currentUser &&
				this.props.seller &&
				this.props.seller.username === this.state.currentUser.username) {
			Materialize.toast('This is your listing', 4000, 'red-text');
		} else if (this.state.currentUser) {
	    $('#offer-modal').openModal();
    } else {
      Materialize.toast('Log in or sign up to make an offer', 4000, 'red-text');
    }
	},

  componentDidUpdate: function() {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });
  },

	componentWillReceiveProps: function(newProps) {

	},

  render: function(){
    return(
      <div className='offer card'>
        <div className='detail-offer valign-wrapper'>
          <span className='valign'>
            <b>Ask price:  </b>{'$' + this.props.price}
          </span>
          <button
            onClick={this.openOffer}
            className="waves-effect waves-light btn right">
              Offer
          </button>
        </div>
      </div>
    );
  }
});

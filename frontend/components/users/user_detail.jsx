var React = require('react');

var UserActions = require("../../actions/user_actions"),
    CurrentUserState = require("../../mixins/current_user_state"),
    UserStore = require('../../stores/user_store'),
    UserProducts = require('./user_products'),
    UserOffers = require('./user_offers');
    /* global Materialize */

module.exports = React.createClass({
  mixins: [CurrentUserState],

  componentDidMount: function(){
    UserActions.fetchCurrentUserWithAssocs();
    $(document).ready(function(){
       $('ul.tabs').tabs();
     });
  },

  componentWillReceiveProps: function(){
    UserActions.fetchCurrentUserWithAssocs();
  },

  render: function(){
    var username = (this.state.currentUser ? this.state.currentUser.username : '');
    return(
      <div className='user-detail container'>
        <div className='grey lighten-5 tab-background'>
          <div className="tab-divider divider"></div>
        </div>
        <div className="row">
          <div className="col s12">
            <ul className="tabs grey lighten-5">
              <li className="tab col s3"><a href="#products">Listings</a></li>
              <li className="tab col s3"><a href="#offers">Offers</a></li>
              <li className="tab col s3"><a href='#settings'>Settings</a></li>
              <li className="tab col s3"><a href='#messages'>Messages</a></li>
            </ul>
          </div>
          <div id="products" className="col s12"><UserProducts /></div>
          <div id="offers" className="col s12"><UserOffers /></div>
          <div id="settings" className="col s12"><h5>coming soon</h5></div>
          <div id="messages" className="col s12"><h5>coming soon</h5></div>

        </div>
      </div>
    );

  }
});

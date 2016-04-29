var React = require('react');

var UserActions = require("../../actions/user_actions"),
    CurrentUserState = require("../../mixins/current_user_state"),
    UserStore = require('../../stores/user_store'),
    UserProducts = require('./user_products'),
    UserOffers = require('./user_offers');

module.exports = React.createClass({
  mixins: [CurrentUserState],

  componentDidMount: function(){
    $(document).ready(function(){
       $('ul.tabs').tabs();
     });
  },

  componentWillReceiveProps: function(){
    UserActions.fetchCurrentUser();
  },


  render: function(){
    var username = (this.state.currentUser ? this.state.currentUser.username : '');
    return(
      <div className='user-detail'>
        <div className="row">
          <div className="col s12 m10 l8">
            <ul className="tabs">
              <li className="tab col s4"><a href="#products">Products</a></li>
              <li className="tab col s4"><a href="#offers">Offers</a></li>
            </ul>
          </div>
          <div id="products" className="col s12"><UserProducts /></div>
          <div id="offers" className="col s12"></div>
        </div>
      </div>
    );

  }
});

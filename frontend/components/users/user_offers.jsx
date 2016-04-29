var React = require('react');

var UserActions = require("../../actions/user_actions"),
    CurrentUserState = require("../../mixins/current_user_state"),
    UserStore = require('../../stores/user_store');

module.exports = React.createClass({
  mixins: [CurrentUserState],
  render: function(){
    return <div></div>;
  }
});

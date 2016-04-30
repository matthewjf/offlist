var React = require('react');

var UserActions = require("../../actions/user_actions"),
    CurrentUserState = require("../../mixins/current_user_state"),
    UserStore = require('../../stores/user_store');

module.exports = React.createClass({
  mixins: [CurrentUserState],
  render: function(){
    return <ul id='staggered'>
      <li className="section">
        <h5>Section 1</h5>
        <p>Stuff</p>
      </li>
      <div className="divider"></div>
      <li className="section">
        <h5>Section 2</h5>
        <p>Stuff</p>
      </li>
      <div className="divider"></div>
      <li className="section">
        <h5>Section 3</h5>
        <p>Stuff</p>
      </li>
    </ul>;
  }
});

var React = require('react');
var UserActions = require("../../actions/user_actions");
var CurrentUserState = require("../../mixins/current_user_state");

module.exports = React.createClass({
	mixins: [CurrentUserState],

  logout: function(e){
    e.preventDefault();
    UserActions.logout();
  },

	openLogin: function() {
		$('#login-modal').openModal();
	},

  notLoggedIn: function(){
    if (this.state.currentUser) {
			return (
        <ul className="right hide-on-med-and-down">
          <li><a>{this.state.currentUser.username}</a></li>
          <li><a onClick={this.logout}>Log Out</a></li>
        </ul>
      );
		}
    return (
      <ul className="right hide-on-med-and-down">
        <li><a>Sign Up</a></li>
				<li><a onClick={this.openLogin} className="modal-trigger">Log In</a></li>
      </ul>
    );
  },

  notLoggedInMobile: function(){
    if (this.state.currentUser) {
			return (
        <ul id="nav-mobile" className="side-nav">
          <li><a>{this.state.currentUser.username}</a></li>
          <li><a onClick={this.logout}>Log Out</a></li>
        </ul>
      );
		}
    return (
      <ul id="nav-mobile" className="side-nav">
        <li><a href="#">Sign Up</a></li>
        <li><a onClick={this.openLogin} className="modal-trigger">Log In</a></li>
      </ul>
    );
  },

  render: function() {
    return (
      <header>
        <nav className="white" role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="" className="brand-logo">
              <img id='logo' src="/logo.png" />
              splashy
            </a>
            {this.notLoggedIn()}
            {this.notLoggedInMobile()}
            <a href="#" data-activates="nav-mobile" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </nav>
      </header>
    );
  }

});

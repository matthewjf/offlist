var React = require('react'),
		UserActions = require("../../actions/user_actions"),
		CurrentUserState = require("../../mixins/current_user_state"),
    hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
	mixins: [CurrentUserState],

  logout: function(e){
    e.preventDefault();
    UserActions.logout();
  },

	openLogin: function() {
		$('#login-modal').openModal();
	},

	openSignup: function() {
		$('#signup-modal').openModal();
	},

	goToAccount: function(){
		hashHistory.push('account');
	},

  notLoggedIn: function(){
    if (this.state.currentUser) {
			return (
        <ul className="right hide-on-med-and-down">
					<li><a onClick={this.goToAccount}>
						{this.state.currentUser.username}
					</a></li>
          <li><a onClick={this.logout}>Log Out</a></li>
        </ul>
      );
		}
    return (
      <ul className="right hide-on-med-and-down">
				<li>
					<a onClick={this.openSignup} className="modal-trigger">
						Sign Up
					</a>
				</li>
				<li>
					<a onClick={this.openLogin} className="modal-trigger">
						Log In
					</a>
				</li>
      </ul>
    );
  },

  notLoggedInMobile: function(){
    if (this.state.currentUser) {
			return (
        <ul id="nav-mobile" className="side-nav">
          <li><a onClick={this.goToAccount}>
						{this.state.currentUser.username}
					</a></li>
          <li><a onClick={this.logout}>Log Out</a></li>
        </ul>
      );
		}
    return (
      <ul id="nav-mobile" className="side-nav">
				<li>
					<a onClick={this.openSignup} className="modal-trigger">
						Sign Up
					</a>
				</li>
				<li>
					<a onClick={this.openLogin} className="modal-trigger">
						Log In
					</a>
				</li>
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


$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

var React = require("react");
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");
var UserStore = require('../stores/user_store');

/* global Materialize */

var LoginForm = React.createClass({
	mixins: [CurrentUserState],

	getInitialState: function(){
		return {username: '', password: ''};
	},

	setUsername: function(e){
		this.setState({username: e.target.value});
	},

	setPassword: function(e){
		this.setState({password: e.target.value});
	},

	toggleForm: function(e){
		e.preventDefault();
		this.closeModal(e);

		setTimeout(function(){
			$('#signup-modal').openModal();
		}, 300);
	},

	closeModal: function(e){
		e.preventDefault();
		$('#login-modal').closeModal();
		this.resetState();
		UserActions.resetErrors([]);
	},


	handleSubmit: function(e){
		if (e)
			e.preventDefault();
		UserActions['login']({
			username: this.state.username,
			password: this.state.password
		}, this.loginSuccess);
		this.resetState();
	},

	loginSuccess: function(username){
	  Materialize.toast('Welcome back, ' + username + '!', 2000);
	},

	demoSubmit: function(event) {
		event.preventDefault();
		this.setState({username: '', password: ''});
		var usernameArr = 'demo'.split('');
		var passwordArr = 'password'.split('');
		$('#userlabel').addClass("active");
		document.getElementById("username").focus();
		this.disableButtons(true);
		this.demoLogin(usernameArr, passwordArr);
	},

	demoLogin: function(usernameArr, passwordArr) {
		var self = this;
		if (usernameArr.length === 0 && passwordArr.length === 0) {
			self.handleSubmit();
			self.disableButtons(false);
		} else {
			if (usernameArr.length === 0) {
				$('#password-label').addClass("active");
				document.getElementById("password").focus();
				self.setState({password: self.state.password + passwordArr.shift()});
			} else {
				self.setState({username: self.state.username + usernameArr.shift()});
			}
			setTimeout(function(){
				self.demoLogin(usernameArr, passwordArr);
			}, 150);
		}
	},

	disableButtons: function(val) {
    $('.btn').prop("disabled", val);
		$('.btn-flat').prop("disabled", val);
	},

	logout: function(e){
		e.preventDefault();
		UserActions.logout();
	},

	resetState: function() {
		this.setState({username: '', password: ''});
	},

	errors: function(){
		if (!this.state.userErrors){
			return;
		}
		var self = this;
		return (<ul className='user-errors'>
		{
			Object.keys(this.state.userErrors).map(function(key, i){
				return (<li className='red-text' key={i}>
					{self.state.userErrors[key]}
				</li>);
			})
		}
		</ul>);
	},

	form: function(){
		if (this.state.currentUser) {
			return;
		}
		return(
				<form onSubmit={this.handleSubmit}>
					<section>
						<div className='row'>
							<div className='input-field col s12'>
								<input
									type="text"
									value={this.state.username}
									onChange={this.setUsername}
									id='username' />
								<label id='username-label' htmlFor='username'>Username</label>
							</div>
						</div>

						<div className='row'>
							<div className='input-field col s12'>
								<input
									id='password'
									type="password"
									value={this.state.password}
									onChange={this.setPassword} />
								<label id='password-label' htmlFor='password'>Password</label>
							</div>
						</div>
					</section>
					<div className='btn-row row'>
						<div className='input-field col s12'>
							<button
								type="submit"
								name='action'
								value="submit"
								className='waves-effect waves-light btn right'>Log In
							</button>
							<button
								className='waves-effect waves-ripple btn-flat right'
								onClick={this.closeModal}>cancel
							</button>
							<button
								id='demo'
								className='waves-effect waves-light btn grey darken-1 left'
								onClick={this.demoSubmit}>demo
							</button>
							<div className='left'>
								New?
								<a onClick={this.toggleForm} className='clickable'> Sign up </a>
							</div>

						</div>
					</div>
				</form>
		);
	},

	openLogin: function() {
		$('#login-modal').openModal();
		$('input').siblings('label, i').addClass('active');
	},

	render: function(){

		return (
			<div id="login-form">
				<div id="login-modal" className="modal">
			     <div className="modal-content">
			       <h4>Log In</h4>
						 	{this.errors()}
							{this.form()}
			     </div>
			   </div>
			</div>
		);
	}
});

$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

module.exports = LoginForm;

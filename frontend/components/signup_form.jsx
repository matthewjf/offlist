var React = require("react");
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");
var UserStore = require('../stores/user_store');
/* global Materialize */

var SignupForm = React.createClass({
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
			$('#login-modal').openModal();
		}, 300);

	},

	closeModal: function(e){
		e.preventDefault();
		$('#signup-modal').closeModal();
		this.resetState();
		UserActions.resetErrors([]);
	},

	handleSubmit: function(e){
		e.preventDefault();
		UserActions['signup']({
			username: this.state.username,
			password: this.state.password
		}, this.signupSuccess);
		this.resetState();
	},

	signupSuccess: function(username){
		Materialize.toast('Welcome, ' + username + '!', 2000);
	},

	resetState: function() {
		this.setState({username: '', password: ''});
	},

	activateInput: function(){
		$('.input').siblings().addClass('activate');
	},

	demoLogin: function(e) {
		e.preventDefault();
		this.toggleForm(e);
		setTimeout($('#demo').trigger('click'), 300);
	},

	errors: function(){
		if (!this.state.userErrors){
			return;
		}
		var self = this;
		return (<ul>
		{
			Object.keys(this.state.userErrors).map(function(key, i){
				return (<li className='red-text' key={i}>{self.state.userErrors[key]}</li>);
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
								<label htmlFor='username'>
									Username
								</label>
							</div>
						</div>

						<div className='row'>
							<div className='input-field col s12'>
								<input
									id='password'
									type="password"
									value={this.state.password}
									onChange={this.setPassword} />
								<label htmlFor='password'>
									Password
								</label>
							</div>
						</div>
					</section>
					<div className='btn-row row'>
						<div className='input-field col s12'>
							<button
								type="submit"
								name='action'
								value="submit"
								className='waves-effect waves-light btn right'>
								Sign Up
							</button>

							<button
								className='waves-effect waves-light btn-flat right'
								onClick={this.closeModal}>
								cancel
							</button>

							<button
								onClick={this.demoLogin}
								className='waves-effect waves-light btn grey darken-1 left'>demo
							</button>
							<div className='left'>
								Have an account?
								<a onClick={this.toggleForm} className='clickable'> Log in </a>
							</div>
						</div>
					</div>
				</form>
		);
	},

	openSignup: function() {
		$('#signup-modal').openModal();
		$('input').siblings('label, i').addClass('active');
	},

	render: function(){
		return (
			<div id="signup-form">
				<div id="signup-modal" className="modal">
			     <div className="modal-content">
			       <h4>Sign Up</h4>
						 	{this.errors()}
							{this.form()}
			     </div>
			   </div>
			</div>
		);
	}
});

module.exports = SignupForm;

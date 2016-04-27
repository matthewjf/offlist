var React = require("react");
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");

var LoginForm = React.createClass({
	mixins: [CurrentUserState],

	getInitialState: function(){
		return {form: "login", username: '', password: ''};
	},

	setUsername: function(e){
		this.setState({username: e.target.value});
	},

	setPassword: function(e){
		this.setState({password: e.target.value});
	},

	toggleForm: function(e){
		var self = this;
		e.preventDefault();

		$('#login-modal').closeModal();

		setTimeout(function(){
			if (self.state.form === 'login')
				self.setState({form: 'signup'});
			else
				self.setState({form: 'login'});

			$('#login-modal').openModal();
		}, 300);

	},

	cancelForm: function(e){
		e.preventDefault();
		$('#login-modal').closeModal();
		this.resetState();
	},


	handleSubmit: function(e){
		e.preventDefault();
		UserActions[this.state.form]({
			username: this.state.username,
			password: this.state.password
		});
		this.resetState();
	},

	logout: function(e){
		e.preventDefault();
		UserActions.logout();
	},

	resetState: function() {
		this.setState({username: '', password: ''});
	},

	greeting: function(){
		if (!this.state.currentUser) {
			return;
		}
		return (
			<div>
				<h2>Hi, {this.state.currentUser.username}!</h2>
					<button
						type="Submit"
						name='action'
						value="Submit"
						className='waves-effect waves-light btn'
						onClick={this.logout}>logout
					</button>
			</div>
		);
	},

	errors: function(){
		if (!this.state.userErrors){
			return;
		}
		var self = this;
		return (<ul>
		{
			Object.keys(this.state.userErrors).map(function(key, i){
				return (<li key={i}>{self.state.userErrors[key]}</li>);
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
									id='username'/>
								<label for='username'>Username</label>
							</div>
						</div>

						<div className='row'>
							<div className='input-field col s12'>
								<input
									id='password'
									type="password"
									value={this.state.password}
									onChange={this.setPassword}/>
								<label for='password'>Password</label>
							</div>
						</div>
					</section>
					<button
						className='waves-effect waves-light btn-flat left'
						onClick={this.toggleForm} >{this.altText()}
					</button>
					<p className='right-align'>
						<button
							className='waves-effect waves-light btn-flat'
							onClick={this.cancelForm}>cancel
						</button>
						<button
							type="Submit"
							name='action'
							value="Submit"
							className='waves-effect waves-light btn'>{this.formText()}
						</button>
					</p>
				</form>
		);
	},

	formText: function(){
		return (this.state.form === 'login' ? 'Log In' : 'Sign Up');
	},

	altText: function(){
		return (this.state.form === 'login' ? 'Sign Up' : 'Log In');
	},

	openLogin: function() {
		$('#login-modal').openModal();
	},

	render: function(){

		return (
			<div id="login-form">
				<div id="login-modal" className="modal">
			     <div className="modal-content">
			       <h4>{this.formText()}</h4>
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

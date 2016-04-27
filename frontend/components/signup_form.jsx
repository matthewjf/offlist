var React = require("react");
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");

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
		this.cancelForm(e);

		$('#signup-modal').closeModal();

		setTimeout(function(){
			$('#login-modal').openModal();
		}, 300);

	},

	cancelForm: function(e){
		e.preventDefault();
		$('#signup-modal').closeModal();
		this.resetState();
	},


	handleSubmit: function(e){
		e.preventDefault();
		UserActions['signup']({
			username: this.state.username,
			password: this.state.password
		});
		this.resetState();
	},

	resetState: function() {
		this.setState({username: '', password: ''});
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
					<p className='right-align'>
						<button
							type="submit"
							name='action'
							value="submit"
							className='waves-effect waves-grey btn right'>Log In
						</button>
						<button
							className='waves-effect waves-light btn-flat'
							onClick={this.cancelForm}>cancel
						</button>
						<button
							className='waves-effect waves-grey btn-flat left'
							onClick={this.toggleForm} >Sign Up
						</button>
					</p>
				</form>
		);
	},

	openSignup: function() {
		$('#signup-modal').openModal();
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

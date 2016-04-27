var React = require("react");
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");

var LoginForm = React.createClass({
	mixins: [CurrentUserState],

	getInitialState: function(){
		return {form: "login"};
	},

	setUsername: function(e){
		this.setState({username: e.currentTarget.value});
	},

	setPassword: function(e){
		this.setState({password: e.currentTarget.value});
	},

	setForm: function(e){
		this.setState({form: e.currentTarget.value});
	},

	handleSubmit: function(e){
		e.preventDefault();
		UserActions[this.state.form]({
			username: this.state.username,
			password: this.state.password
		});
	},

	logout: function(e){
		e.preventDefault();
		UserActions.logout();
	},

	greeting: function(){
		if (!this.state.currentUser) {
			return;
		}
		return (
			<div>
				<h2>Hi, {this.state.currentUser.username}!</h2>
				<input type="submit" value="logout" onClick={this.logout}/>
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
						<label> Username:
							<input type="text" value={this.state.username} onChange={this.setUsername}/>
						</label>

						<label> Password:
							<input type="password" value={this.state.password} onChange={this.setPassword}/>
						</label>
					</section>

					<section>
						<label> Login
							<input type="radio" name="action" value="login" onClick={this.setForm}/>
						</label>

						<label> Sign Up
							<input type="radio" name="action" value="signup" onClick={this.setForm}/>
						</label>
					</section>

					<input type="Submit" value="Submit"/>
				</form>
		);
	},
	render: function(){
		return (
			<div id="login-form">
				{this.greeting()}
				{this.errors()}
				{this.form()}
			</div>
		);
	}
});

module.exports = LoginForm;

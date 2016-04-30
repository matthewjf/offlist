var UserConstants = require('../constants/user_constants'),
		UserApiUtil = require('../util/user_api_util'),
		UserStore = require('../stores/user_store'),
		AppDispatcher = require('../dispatcher/dispatcher'),
		ServerActions = require('./server_actions');

var UserActions = {
	fetchCurrentUser: function(){
		UserApiUtil.fetchCurrentUser(
			UserActions.receiveCurrentUser,
			UserActions.handleError
		);
	},

	fetchCurrentUserWithProducts: function(){
		UserApiUtil.fetchCurrentUser(
			UserActions.receiveCurrentUserWithProducts,
			UserActions.handleError,
			{includeProducts: true}
		);
	},

	signup: function(user){
		UserApiUtil.post({
			url: "/api/user",
			user: user,
			success: UserActions.receiveCurrentUser,
			error: UserActions.handleError
		});
	},

	login: function(user){
		UserApiUtil.post({
			url: "/api/session",
			user: user,
			success: UserActions.receiveCurrentUser,
			error: UserActions.handleError
		});
	},

	guestLogin: function(){
		UserActions.login({username: "guest", password: "password"});
	},

	receiveCurrentUser: function(data){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: {username: data.username}
		});
		$('#signup-modal').closeModal();
		$('#login-modal').closeModal();
	},

	receiveCurrentUserWithProducts: function(data){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: {username: data.username}
		});
		$('#signup-modal').closeModal();
		$('#login-modal').closeModal();

		// do other stuff with products
		ServerActions.receiveAll(data.products);
	},


	handleError: function(error) {
		AppDispatcher.dispatch({
			actionType: UserConstants.ERROR,
			errors: error.responseJSON.errors
		});
	},

	removeCurrentUser: function(){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGOUT,
		});
	},
	logout: function(){
		UserApiUtil.logout(UserActions.removeCurrentUser, UserActions.handleError);
	},

	resetErrors: function(errors) {
		AppDispatcher.dispatch({
			actionType: UserConstants.ERROR,
			errors: errors
		});
	}
};

module.exports = UserActions;

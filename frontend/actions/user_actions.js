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

	fetchCurrentUserWithAssocs: function(){
		UserApiUtil.fetchCurrentUser(
			UserActions.receiveCurrentUserWithAssocs,
			UserActions.handleError,
			{includeAssocs: true}
		);
	},

	fetchSeller: function(id) {
		UserApiUtil.fetchSeller(
			id,
			UserActions.receiveSeller,
			UserActions.handleError
		);
	},

	signup: function(user, successCB){
		UserApiUtil.post({
			url: "/api/user",
			user: user,
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
				successCB(data.username);
			}),
			error: UserActions.handleError
		});
	},

	login: function(user, successCB){
		UserApiUtil.post({
			url: "/api/session",
			user: user,
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
				successCB(data.username);
			}),
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

	receiveCurrentUserWithAssocs: function(data){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: {username: data.username}
		});
		ServerActions.receiveOffers(data.offers);
		ServerActions.receiveAll(data.products);
	},

	receiveSeller: function(data) {
		AppDispatcher.dispatch({
			actionType: UserConstants.SELLER_RECEIVED,
			seller: data.username,
			products: data.products
		});
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

var AppDispatcher = require('../dispatcher/dispatcher');

var UserApiUtil = {
	post: function(options){
		$.ajax({
			url: options.url,
			type: "post",
			data: {user: options.user},
			success: options.success,
			error: options.error
		});
	},
	logout: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success: success,
			error: error
		});
	},
	fetchCurrentUser: function(success, error, opts){
		var data = opts || {};
		$.ajax({
			url: '/api/session',
			method: 'get',
			data: data,
			success: success,
			error: error
		});
	},
	fetchSeller: function(id, success, error){
		$.ajax({
			url: '/api/users/' + id,
			method: 'get',
			success: success,
			error: error
		});
	}
};

module.exports = UserApiUtil;

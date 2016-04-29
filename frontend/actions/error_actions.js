var Dispatcher = require('../dispatcher/dispatcher');
var ProductConstants = require('../constants/product_constants');

module.exports = {
  receiveErrors: function(errors){
    Dispatcher.dispatch({
      actionType: "RECEIVE_ERRORS",
      errors: errors
    });
  }
};

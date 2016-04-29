var Dispatcher = require('../dispatcher/dispatcher');
var ProductConstants = require('../constants/product_constants');

var ServerActions = {
  receiveAll: function(products){
    Dispatcher.dispatch({
      actionType: ProductConstants.PRODUCTS_RECEIVED,
      products: products
    });
  },
  receiveProduct: function(product){
    Dispatcher.dispatch({
      actionType: ProductConstants.CREATE_PRODUCT,
      product: product
    });
  }
};

module.exports = ServerActions;

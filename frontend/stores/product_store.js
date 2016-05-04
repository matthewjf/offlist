var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ProductConstants = require('../constants/product_constants');

var _products = {};

var resetProducts = function (products) {
  _products = {};

  products.forEach(function (product) {
    _products[product.id] = product;
  });
};

var setProduct = function (product) {
  _products[product.id] = product;
};

var removeProduct = function (product) {
  delete _products[product.id];
};

var ProductStore = new Store(Dispatcher);

ProductStore.compare = function(p1,p2) {
  if (!p1.score)
    return 1;
  else if (!p2.score)
    return -1;
  else
    return p2.score - p1.score;
};

ProductStore.all = function () {
  return Object.keys(_products).map(function (productId) {
    return _products[productId];
  }).sort(this.compare);
};

ProductStore.find = function(id) {
  return _products[id];
};

ProductStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ProductConstants.PRODUCTS_RECEIVED:
      resetProducts(payload.products);
      break;
    case ProductConstants.CREATE_PRODUCT:
      setProduct(payload.product);
      break;
    case ProductConstants.PRODUCT_REMOVED:
      removeProduct(payload.product);
      break;
  }
  this.__emitChange();
};

module.exports = ProductStore;

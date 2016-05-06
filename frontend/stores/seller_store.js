var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var SellerStore = new Store(AppDispatcher);

var _seller, _products, _errors;

var setSeller = function(seller) {
  _seller = seller;
};

var setProducts = function(products) {
  _products = products;
};

SellerStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "SELLER_RECEIVED":
      setSeller(payload.seller);
      setProducts(payload.products);
      break;
    case "ERROR":
      SellerStore.setErrors(payload.errors);
      break;
  }
  SellerStore.__emitChange();
};

SellerStore.setErrors = function(errors){
  _errors = errors;
};

SellerStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
};

SellerStore.seller = function() {
  if (_seller)
    return _seller;
};

SellerStore.products = function() {
  if (_products)
    return _products.slice();
};

module.exports = SellerStore;

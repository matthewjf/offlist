var ApiUtil = require('../util/api_util.js');

module.exports = {
  fetchProducts: function (opts) {
    ApiUtil.fetchProducts(opts);
  },

  getProduct: function (id) {
    ApiUtil.getProduct(id);
  },

  createProduct: function (data, successCB) {
    ApiUtil.createProduct(data, successCB);
  },

  editProduct: function (data, successCB) {
    ApiUtil.updateProduct(data, successCB);
  },

  deleteProduct: function (id, successCB) {
    ApiUtil.deleteProduct(id, successCB);
  },

  fetchOffers: function () {
    ApiUtil.fetchOffers();
  },

  createOffer: function (data, successCB) {
    ApiUtil.createOffer(data, successCB);
  },

  acceptOffer: function (id, successCB) {
    ApiUtil.acceptOffer(id, successCB);
  },

  declineOffer: function(id, successCB) {
    ApiUtil.declineOffer(id, successCB);
  }

};

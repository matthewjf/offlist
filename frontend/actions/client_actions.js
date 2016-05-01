var ApiUtil = require('../util/api_util.js');

module.exports = {
  fetchProducts: function (bounds) {
    ApiUtil.fetchProducts(bounds);
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
  }
};

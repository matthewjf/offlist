var ApiUtil = require('../util/api_util.js');

module.exports = {
  fetchProducts: function (bounds) {
    ApiUtil.fetchProducts(bounds);
  },

  getProduct: function (id) {
    ApiUtil.getProduct(id);
  },

  createProduct: function (data) {
    ApiUtil.createProduct(data);
  },

  editProduct: function (data) {
    ApiUtil.updateProduct(data);
  },

  deleteProduct: function (id) {
    ApiUtil.deleteProduct(id);
  }
};

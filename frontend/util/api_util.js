var ServerActions = require('../actions/server_actions.js');

module.exports = {
  fetchProducts: function (bounds) {
    $.ajax({
      url: "api/products",
      data: bounds,
      success: function (products) {
        ServerActions.receiveAll(products);
      }
    });
  },

  getProduct: function (id) {
    $.ajax({
      url: "api/products/" + id.toString(),
      success: function (product) {
        ServerActions.receiveProduct(product);
      }
    });
  },

  createProduct: function (data) {
    $.ajax({
      url: "api/products",
      type: "POST",
      data: { product: data },
      success: function (product) {
        ServerActions.receiveProduct(product);
      }
    });
  },

  updateProduct: function (data) {
    $.ajax({
      url: "api/products/" + data.id,
      type: "PATCH",
      data: { product: { title: data.title, body: data.body } },
      success: function (product) {
        ServerActions.receiveProduct(product);
      }
    });
  },

  deleteProduct: function (id) {
    $.ajax({
      url: "api/products/" + id,
      type: "DELETE",
      success: function (product) {
        ServerActions.removeProduct(product);
      }
    });
  }
};

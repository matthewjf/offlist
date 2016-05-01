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

  createProduct: function (data, successCB) {
    $.ajax({
      url: "api/products",
      type: "POST",
      data: { product: data },
      success: function (product) {
        ServerActions.receiveProduct(product);
        if (successCB)
          successCB(product.id);
      }
    });
  },

  updateProduct: function (data, successCB) {
    $.ajax({
      url: "api/products/" + data.id,
      type: "PATCH",
      data: {product: data },
      success: function (product) {
        ServerActions.receiveProduct(product);
        if (successCB)
          successCB(product.id);
      }
    });
  },

  deleteProduct: function (id, successCB) {
    $.ajax({
      url: "api/products/" + id,
      type: "DELETE",
      success: function (product) {
        ServerActions.removeProduct(product);
        if (successCB)
          successCB(product.id);
      }
    });
  },

};

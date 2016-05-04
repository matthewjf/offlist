var ServerActions = require('../actions/server_actions.js');

module.exports = {
  fetchProducts: function (opts) {
    $.ajax({
      url: "api/products",
      data: {opts: opts},
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

  fetchOffers: function () {
    $.ajax({
      url: "api/offers",
      success: function (offers) {
        ServerActions.receiveOffers(offers);
      }
    });
  },

  createOffer: function (data, successCB) {
    $.ajax({
      url: "api/offers",
      type: "POST",
      data: { offer: data },
      success: function (offer) {
        ServerActions.receiveMadeOffer(offer);
        if (successCB)
          successCB(offer.id);
      }
    });
  },

  acceptOffer: function (id, successCB) {
    $.ajax({
      url: "api/offers/" + id,
      type: "PATCH",
      data: {offer: {status: 'Accepted'} },
      success: function (offer) {
        ServerActions.receiveUpdatedOffer(offer);
        if (successCB)
          successCB(offer.id);
      }
    });
  },

  declineOffer: function (id, successCB) {
    $.ajax({
      url: "api/offers/" + id,
      type: "PATCH",
      data: {offer: {status: 'Declined'} },
      success: function (offer) {
        ServerActions.receiveUpdatedOffer(offer);
        if (successCB)
          successCB(offer.id);
      }
    });
  }

};

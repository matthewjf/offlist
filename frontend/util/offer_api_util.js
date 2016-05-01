var ServerActions = require('../actions/server_actions.js');

module.exports = {
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
        ServerActions.receiveProduct(offer);
        if (successCB)
          successCB(offer.id);
      }
    });
  },

  // acceptOffer: function (data, successCB) {
  //   $.ajax({
  //     url: "api/products/" + data.id,
  //     type: "PATCH",
  //     data: {product: data },
  //     success: function (product) {
  //       ServerActions.receiveProduct(product);
  //       if (successCB)
  //         successCB(product.id);
  //     }
  //   });
  // },
  //
  // rejectOffer: function (id, successCB) {
  //   $.ajax({
  //     url: "api/products/" + id,
  //     type: "DELETE",
  //     success: function (product) {
  //       ServerActions.removeProduct(product);
  //       if (successCB)
  //         successCB(product.id);
  //     }
  //   });
  // }

};

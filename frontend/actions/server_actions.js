var Dispatcher = require('../dispatcher/dispatcher');
var ProductConstants = require('../constants/product_constants');
var OfferConstants = require('../constants/offer_constants');

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
  },
  removeProduct: function(product) {
    Dispatcher.dispatch({
      actionType: ProductConstants.PRODUCT_REMOVED,
      product: product
    });
  },
  receiveOffers: function(offers) {
    Dispatcher.dispatch({
      actionType: OfferConstants.OFFERS_RECEIVED,
      offers: offers
    });
  },
  receiveMadeOffer: function(offer) {
    Dispatcher.dispatch({
      actionType: OfferConstants.OFFER_CREATED,
      offer: offer
    });
  },
  receiveUpdatedOffer: function(offer) {
    Dispatcher.dispatch({
      actionType: OfferConstants.OFFER_UPDATED,
      offer: offer
    });
  },
};

module.exports = ServerActions;

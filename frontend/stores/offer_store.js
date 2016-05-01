var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    OfferConstants = require('../constants/offer_constants');

var _madeOffers = {};
var _receivedOffers = {};

var resetOffers = function (offers) {
  _madeOffers = {};
  _receivedOffers = {};

  setMadeOffers(offers.made_offers);
  setReceivedOffers(offers.received_offers);
};

var setMadeOffers = function(madeOffers) {
  madeOffers.forEach(function (offer) {
    _madeOffers[offer.id] = offer;
  });
};

var setReceivedOffers = function(receivedOffers) {
  receivedOffers.forEach(function (offer) {
    _receivedOffers[offer.id] = offer;
  });
};

var setOfferMade = function (offer) {
  _madeOffers[offer.id] = offer;
};

var OfferStore = new Store(Dispatcher);

OfferStore.receivedOffers = function () {
  return Object.keys(_receivedOffers).map(function (offerId) {
    return _receivedOffers[offerId];
  });
};

OfferStore.madeOffers = function () {
  return Object.keys(_madeOffers).map(function (offerId) {
    return _madeOffers[offerId];
  });
};

OfferStore.find = function(id) {
  // return _offers[id];
};

OfferStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case OfferConstants.OFFERS_RECEIVED:
      resetOffers(payload.offers);
      break;
    case OfferConstants.OFFER_CREATED:
      setOfferMade(payload.offer);
      break;
  }
  this.__emitChange();
};

module.exports = OfferStore;

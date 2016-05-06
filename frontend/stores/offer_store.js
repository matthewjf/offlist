var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    OfferConstants = require('../constants/offer_constants');

var _madeOffers = {};
var _receivedOffers = {};
var _errors;

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

var setErrors = function(errors) {
  _errors = errors;
};

var setOfferMade = function (offer) {
  _madeOffers[offer.id] = offer;
};

var setOfferReceived = function (offer) {
  _receivedOffers[offer.id] = offer;
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

OfferStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
};

OfferStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case OfferConstants.OFFERS_RECEIVED:
      resetOffers(payload.offers);
      break;
    case OfferConstants.OFFER_CREATED:
      setOfferMade(payload.offer);
      break;
    case OfferConstants.OFFER_UPDATED:
      setOfferReceived(payload.offer);
      break;
    case "ERROR":
      setErrors(payload.errors);
      break;
  }
  this.__emitChange();
};

module.exports = OfferStore;

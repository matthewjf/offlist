var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    SearchConstants = require('../constants/search_constants'),
    ClientActions = require('../actions/client_actions');

var SearchStore = new Store(AppDispatcher);

var _search;
var _circle;

var resetSearch = function(searchArgs) {
  _search = searchArgs;
  fetchProducts();
};

var setBounds = function(bounds) {
  _search['bounds'] = bounds;
  fetchProducts();
};

var setCircle = function(circle) {
  _circle = circle;
};

var fetchProducts = function() {
  ClientActions.fetchProducts(SearchStore.all());  // =(
};

SearchStore.all = function() {
  return _search;
};

SearchStore.getCircle = function() {
  return _circle;
};

SearchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.SEARCH_RECEIVED:
    	resetSearch(payload.search);
      break;
    case SearchConstants.BOUNDS_RECEIVED:
    	setBounds(payload.bounds);
      break;
    case SearchConstants.CIRCLE_SET:
      setCircle(payload.circle);
      break;
  }
  SearchStore.__emitChange();
};

module.exports = SearchStore;

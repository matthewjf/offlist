var AppDispatcher = require('../dispatcher/dispatcher.js'),
    SearchConstants = require('../constants/search_constants'),
    SearchStore = require('../stores/search_store');

module.exports = {
  setSearch: function(search){
    AppDispatcher.dispatch({
      actionType: SearchConstants.SEARCH_RECEIVED,
      search: search
    });
  },
  setBounds: function(bounds){
    AppDispatcher.dispatch({
      actionType: SearchConstants.BOUNDS_RECEIVED,
      bounds: bounds
    });
  }
};

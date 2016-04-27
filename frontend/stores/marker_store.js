var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    MarkerConstants = require('../constants/marker_constants');

var _markers = {};

var resetMarkers = function(markers) {
  _markers = markers;
  return _markers;
};

var MarkerStore = new Store(Dispatcher);

MarkerStore.all = function () {
  return Object.assign({}, _markers);
};

MarkerStore.resetMarkers = function(markers) {
  for (var prop in _markers) {
    if(_markers.hasOwnProperty( prop )) {
      _markers[prop].setMap(null);
    }
  }

  _markers = markers;
  return _markers;
};

MarkerStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case MarkerConstants.SET_MARKERS:
      var result = resetMarkers(payload.markers);
        MarkerStore.__emitChange();
        break;
  }
};

module.exports = MarkerStore;

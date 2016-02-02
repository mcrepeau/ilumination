var IlumiBulb = require('./ilumi');

var Bulb = function() {
};

Bulb.discoverAll = function(onDiscover) {
  IlumiBulb.discoverAll(onDiscover);
};

Bulb.stopDiscoverAll = function(onDiscover) {
  IlumiBulb.stopDiscoverAll(onDiscover);
};

Bulb.discover = function(callback) {
  var onDiscover = function(bulb) {
    Bulb.stopDiscoverAll(onDiscover);

    callback(bulb);
  };

  Bulb.discoverAll(onDiscover);
};

Bulb.discoverByAddress = function(address, callback) {
  address = address.toLowerCase();

  var onDiscoverByAddress = function(bulb) {
    if (bulb._peripheral.address === address) {
      Bulb.stopDiscoverAll(onDiscoverByAddress);

      callback(bulb);
    }
  };

  Bulb.discoverAll(onDiscoverByAddress);
};

Bulb.discoverById = function(id, callback) {
  var onDiscoverById = function(bulb) {
    if (bulb.id === id) {
      Bulb.stopDiscoverAll(onDiscoverById);

      callback(bulb);
    }
  };

  Bulb.discoverAll(onDiscoverById);
};

// deprecated
Bulb.discoverByUuid = function(uuid, callback) {
  var onDiscoverByUuid = function(bulb) {
    if (sensorTag.uuid === uuid) {
      Bulb.stopDiscoverAll(onDiscoverByUuid);

      callback(bulb);
    }
  };

  Bulb.discoverAll(onDiscoverByUuid);
};

Bulb.Ilumi = IlumiBulb;

module.exports = Bulb;

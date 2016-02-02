
var NobleDevice = require('noble-device');

//Declare global variables for UUIDs here
var ILUMI_UUID = 'f000f0c004514000b000000000000000';
var ILUMI_BULB_SETTINGS_UUID = 'f000f1c004514000b000000000000000';

var NETWORK_KEY = '3090763432';

var IlumiBulb = function(peripheral) {
  NobleDevice.call(this, peripheral);

  this.type = 'ilumi_bulb';

  this.red = 0x00;
  this.green = 0x00;
  this.blue = 0x00;
  this.brightness = 0x00;

  this.onBulbSettingsChangeBinded = this.onBulbSettingsChange.bind(this);
}

IlumiBulb.is = function(peripheral) {
   return (peripheral.advertisement.localName === 'NrdicFB41EA');
}

NobleDevice.Util.inherits(IlumiBulb, NobleDevice);
NobleDevice.Util.mixin(IlumiBulb, NobleDevice.DeviceInformationService);

IlumiBulb.prototype.notifyBulbSettings = function(callback) {
  this.notifyCharacteristic(ILUMI_UUID, ILUMI_BULB_SETTINGS_UUID, true, this.onBulbSettingsChangeBinded, callback);
};

IlumiBulb.prototype.setColor = function(red, green, blue, callback) {
  this.writeIlumiCharacteristic(ILUMI_UUID, ILUMI_BULB_SETTINGS_UUID, red, green, blue, this.brightness, callback);
};

IlumiBulb.prototype.setBrightness = function(brightness, callback) {
  this.writeIlumiCharacteristic(ILUMI_UUID, ILUMI_BULB_SETTINGS_UUID, this.red, this.green, this.blue, brightness, callback);
};

IlumiBulb.prototype.onBulbSettingsChange = function(data) {
  this.convertBulbSettingsData(data, function(red, green, blue, brightness) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.brightness = brightness;
    this.emit('IlumiBulbSettingsChange', red, green, blue, brightness);
  }.bind(this)); 
}; 

IlumiBulb.prototype.convertBulbSettingsData = function(data, callback) {

  var red = data.readInt8(0);
  var green = data.readInt8(1);
  var blue = data.readInt8(2);

  var brightness = data.readInt8(3);

  callback(red, green, blue, brightness);
};

module.exports = IlumiBulb;

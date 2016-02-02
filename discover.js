
var Bulb = require('./index');

function onDiscover(bulb) {
  console.log('discovered: ' + bulb.id + ', type= ' + bulb.type);
}

Bulb.discover(onDiscover);

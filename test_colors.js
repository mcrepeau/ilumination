var Bulb = require('./index');
var async = require('async');

var test_interval;

function onDiscover(bulb) {
  console.log('discovered:' + bulb.id + ' type=' + bulb.type);
  console.log('connection...');

  //connection
  connect(bulb);

  //notification on disconnects
  bulb.on('disconnect', function() {
    console.log('we got disconnected! :( ');
    setTimeout(connect(bulb), 10000);
  });

}

function connect(bulb) {

  bulb.connectAndSetUp(function(error) {
    console.log('we are connected!');
    test_interval = setInterval(testingColors, 3000);

    function testingColors() {
      console.log('testing colors');

      async.series([
        function(callback) {
    	  console.log('testing red');
          bulb.send(new Buffer([0xA8, 0x4E, 0x39, 0xB8, Math.floor((Math.random() * 255) + 1), 0x00, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00]), function(error) {
            if (error == null) console.log('success!');
            else console.log(error);
          });
          callback();
        },
        function(callback) {
          setTimeout(callback, 1000);
        },
        function(callback) {
          console.log('testing green');
          bulb.send(new Buffer([0xA8, 0x4E, 0x39, 0xB8, Math.floor((Math.random() * 255) + 1), 0x00, 0x00, 0xFF, 0x00, 0x00, 0xFF, 0x00, 0x00]), function(error) {
            if (error == null) console.log('success!');
            else console.log(error);
          });
          callback();
        },
        function(callback) {
          setTimeout(callback, 1000);
        },
        function(callback) {
          console.log('testing blue');
          bulb.send(new Buffer([0xA8, 0x4E, 0x39, 0xB8, Math.floor((Math.random() * 255) + 1), 0x00, 0x00, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0x00]), function(error) {
            if (error == null) console.log('success!');
            else console.log(error);
          });
          callback();
        },
        function(callback) {
          setTimeout(callback, 1000);
        }
      ]);
    }
  });
}

Bulb.discover(onDiscover);

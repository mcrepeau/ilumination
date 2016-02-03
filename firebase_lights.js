var Bulb = require('./index');
var Firebase = require('firebase');

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
  var myFirebaseRef = new Firebase("https://smartlights.firebaseio.com");

  bulb.connectAndSetUp(function(error) {
    console.log('we are connected!');
    myFirebaseRef.child("office").on("value", function(snapshot) {
      bulb.send(new Buffer([0xA8, 0x4E, 0x39, 0xB8, Math.floor((Math.random() * 255) + 1), 0x00, snapshot.val().red, snapshot.val().green, snapshot.val().blue, 0x00, snapshot.val().brightness, 0x00, 0x00]), function(error) {
        if (error == null) console.log('success!');
        else console.log(error);
      }); 
    });
  });
}

Bulb.discover(onDiscover);

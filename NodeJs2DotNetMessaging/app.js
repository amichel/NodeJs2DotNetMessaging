'use strict';
//var enc = require('text-encoding');
var zmq = require("zeromq"), frontend = zmq.socket("dealer");
//, backend = zmq.socket('router');

var bfx = require("./bitfinex");

frontend.on('message', function () {
    // Note that separate message parts come as function arguments.
    var args = Array.apply(null, arguments);

});

//backend.on('message', function () {
//    var args = Array.apply(null, arguments);
//    console.log(new enc.TextDecoder("utf-8").decode(args[1]));
//    //frontend.send(args);
//});

//backend.bindSync('tcp://127.0.0.1:5560');

frontend.connect('tcp://127.0.0.1:5560');


//setInterval(function () {
//    frontend.send('sss');
//}, 1000);


var priceUpdateCallback = function (quote) {
    var json = JSON.stringify(quote);
    console.log(json);
    frontend.send(json);
};

bfx.adaptor(["BTCUSD", "ETHBTC", "ETHUSD"], priceUpdateCallback).Start();

console.log('Running');

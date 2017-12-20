"use strict";
const contracts = require("./contracts");
const events = require("events");

module.exports = {
    adaptor: function (symbols, onPriceUpdateCallback) {
        const exchangeName = "BFX";

        const apiKey = "";
        const apiSecret = "";

        const opts = {
            version: 2,
            transform: true
        };

        const Bfx = require('bitfinex-api-node');
        var eventEmitter = new events.EventEmitter();

        var bws = new Bfx(apiKey, apiSecret, opts).ws;

        var symbolMapProviderToSystem = { tBTCUSD: "BTCUSD", tETHBTC: "ETHBTC", tETHUSD: "ETHUSD" };

        var subscribeToEvent = function () {
            eventEmitter.addListener("priceUpdate", onPriceUpdateCallback);
        }

        var mapToSystemSymbol = function (symbol) {
            var mapped = symbolMapProviderToSystem[symbol];
            return mapped === undefined ? symbol : mapped;
        }

        var start = function () {
            subscribeToEvent();

            bws.on('auth',
                () => {
                    console.log('authenticated');
                });

            bws.on('open', () => {
                for (var i = 0; i < symbols.length; i++) {
                    bws.subscribeTicker(symbols[i]);
                }
            });

            bws.on('orderbook', (pair, book) => {
                console.log('Order book:', book);
            });

            bws.on('trade', (pair, trade) => {
                console.log('Trade:', trade);
            });

            bws.on('ticker', (pair, ticker) => {
                //console.log('Ticker:', ticker);
                eventEmitter.emit("priceUpdate", new contracts.Quote(exchangeName, mapToSystemSymbol(pair), ticker.BID, ticker.ASK));
            });

            bws.on('error', console.error);
        }

        var stop = function () {
            //TODO: stop ws
        };

        return {
            Start: start,
            Stop: stop
        };
    }
};
"use strict";

class Quote {
    constructor(exchange, symbol, bid, ask, time = Date.now()) {
        this.Exchange = exchange;
        this.Symbol = symbol;
        this.Bid = bid;
        this.Ask = ask;
        this.Time = time;
    }
}


module.exports = { Quote};
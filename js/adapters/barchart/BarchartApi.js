"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT: "https://marketdata.websol.barchart.com/getHistory.jsonp"
};

var BarchartApi = {
  getRequestUrl: function getRequestUrl(option) {
    var value = option.value,
        _option$fromDate = option.fromDate,
        fromDate = _option$fromDate === undefined ? '20160627000000' : _option$fromDate,
        apiKey = option.apiKey;


    return C.ROOT + "?key=" + apiKey + "&symbol=" + value + "&type=daily&startDate=" + fromDate + "&dividends=0&splits=0";
  },
  checkResponse: function checkResponse(json) {
    return true;
  }
};

exports.default = BarchartApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\barchart\BarchartApi.js.map
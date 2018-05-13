'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT: "https://marketdata.websol.barchart.com/getHistory.jsonp",
  DF_FROM_DATE: '20160627000000',

  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Dataset Empty'
};

var BarchartApi = {
  getRequestUrl: function getRequestUrl(option) {
    var value = option.value,
        _option$fromDate = option.fromDate,
        fromDate = _option$fromDate === undefined ? C.DF_FROM_DATE : _option$fromDate,
        apiKey = option.apiKey;


    return C.ROOT + '?key=' + apiKey + '&symbol=' + value + '&type=daily&startDate=' + fromDate + '&dividends=0&splits=0';
  },
  checkResponse: function checkResponse(json) {
    if (!(json && Array.isArray(json.results))) {
      throw {
        errCaption: C.REQUEST_ERROR,
        message: C.RESPONSE_EMPTY
      };
    }
    return true;
  }
};

exports.default = BarchartApi;
//# sourceMappingURL=BarchartApi.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  URL: 'https://api.worldtradingdata.com/api/v1/history',
  LIMIT_REMAINING: 'X-DailyLimit-Remaining'
};

var _addItemId = function _addItemId(option, value) {
  option._itemId = value;
};

var WtdApi = {
  getRequestUrl: function getRequestUrl(option) {
    var fromDate = option.fromDate,
        toDate = option.toDate,
        value = option.value,
        apiKey = option.apiKey;

    _addItemId(option, value);
    return C.URL + '?symbol=' + value + '&date_from=' + fromDate + '&date_to=' + toDate + '&sort=oldest&api_token=' + apiKey;
  },


  getLimitRemaiming: function getLimitRemaiming(headers) {
    return headers.get(C.LIMIT_REMAINING);
  },

  checkResponse: function checkResponse(json, option) {
    if (json && json.history) {
      return true;
    }
    return false;
  }
};

exports.default = WtdApi;
//# sourceMappingURL=WtdApi.js.map
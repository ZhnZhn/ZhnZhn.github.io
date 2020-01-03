"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL_H: 'https://api.worldtradingdata.com/api/v1/history',
  URL_INT: 'https://intraday.worldtradingdata.com/api/v1/intraday',
  LIMIT_REMAINING: 'X-DailyLimit-Remaining',
  LM_INTRADAY: 'X-DailyIntradayLimit-Remaining'
};

var _addItemId = function _addItemId(option, value) {
  option._itemId = value;
};

var _crUrlHistory = function _crUrlHistory(option) {
  var key = option.key,
      fromDate = option.fromDate,
      toDate = option.toDate,
      value = option.value,
      apiKey = option.apiKey;

  _addItemId(option, key);

  return C.URL_H + "?symbol=" + value + "&date_from=" + fromDate + "&date_to=" + toDate + "&sort=oldest&api_token=" + apiKey;
};

var _crUlrIntraday = function _crUlrIntraday(option) {
  var key = option.key,
      value = option.value,
      two = option.two,
      apiKey = option.apiKey;

  _addItemId(option, key);

  option.interval = two;
  return C.URL_INT + "?symbol=" + value + "&interval=" + two + "&range=2&sort=desc&api_token=" + apiKey + "&output=json";
};

var _rCrUrl = {
  DF: _crUrlHistory,
  intraday: _crUlrIntraday
};
var _rCheckResponse = {
  DF: function DF(json) {
    return json && json.history;
  },
  intraday: function intraday(json) {
    return json && json.intraday;
  }
};
var WtdApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfType = option.dfType,
        _crUrl = _rCrUrl[dfType] || _rCrUrl.DF;

    return _crUrl(option);
  },
  getLimitRemaiming: function getLimitRemaiming(headers) {
    return headers.get(C.LIMIT_REMAINING);
  },
  checkResponse: function checkResponse(json, option) {
    var dfType = option.dfType,
        _checkResponse = _rCheckResponse[dfType] || _rCheckResponse.DF;

    return !!_checkResponse(json);
  }
};
var _default = WtdApi;
exports["default"] = _default;
//# sourceMappingURL=WtdApi.js.map
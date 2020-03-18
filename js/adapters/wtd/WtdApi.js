"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL_H: 'https://api.worldtradingdata.com/api/v1/history',
  URL_INT: 'https://intraday.worldtradingdata.com/api/v1/intraday',
  LIMIT_REMAINING: 'X-DailyLimit-Remaining',
  LM_INTRADAY: 'X-DailyIntradayLimit-Remaining'
};

var _addItemIdTo = function _addItemIdTo(option, value) {
  option._itemId = value;
};

var _addApiKey = function _addApiKey(url, apiKey) {
  return url + "&api_token=" + apiKey;
};

var _crUrlHistory = function _crUrlHistory(option) {
  var fromDate = option.fromDate,
      toDate = option.toDate,
      value = option.value,
      symbol = option.symbol,
      _symbol = value || symbol;

  return C.URL_H + "?symbol=" + _symbol + "&date_from=" + fromDate + "&date_to=" + toDate + "&sort=oldest";
};

var _crUlrIntraday = function _crUlrIntraday(option) {
  var value = option.value,
      two = option.two;
  option.interval = two;
  return C.URL_INT + "?symbol=" + value + "&interval=" + two + "&range=2&sort=desc&output=json";
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

var _crUrl = function _crUrl(option) {
  var dfType = option.dfType;
  return (_rCrUrl[dfType] || _rCrUrl.DF)(option);
};

var WtdApi = {
  getRequestUrl: function getRequestUrl(option) {
    var key = option.key,
        apiKey = option.apiKey;

    _addItemIdTo(option, key);

    return _addApiKey(_crUrl(option), apiKey);
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
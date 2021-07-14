"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("../../utils/isEmpty"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crError = _fnAdapter["default"].crError,
    getValue = _fnAdapter["default"].getValue,
    getCaption = _fnAdapter["default"].getCaption,
    joinBy = _fnAdapter["default"].joinBy;
var C = {
  ROOT: 'https://www.alphavantage.co/query',
  DF_TICKET: 'MSFT',
  DF_SIZE: 'compact',
  DF_PERIOD: '50',
  ERR_PROP: 'Error Message',
  REQ_ERROR: 'Request Error'
};
var _assign = Object.assign,
    _isArr = Array.isArray;

var _getOneTwo = function _getOneTwo(_ref) {
  var value = _ref.value,
      outputsize = _ref.outputsize,
      items = _ref.items;
  return _isArr(items) ? [getValue(items[0]), getValue(items[1])] //Stocks by Sectors case
  : [value || C.DF_TICKET, outputsize || C.DF_SIZE];
};

var _crSectorQuery = function _crSectorQuery() {};

var _crIntradayQuery = function _crIntradayQuery(option) {
  var _getOneTwo2 = _getOneTwo(option),
      ticket = _getOneTwo2[0],
      interval = _getOneTwo2[1],
      title = ticket + " (" + interval + ")";

  _assign(option, {
    ticket: ticket,
    interval: interval,
    title: title,
    itemCaption: title
  });

  return "interval=" + interval + "&symbol=" + ticket;
};

var _crDailyQuery = function _crDailyQuery(option) {
  var _getOneTwo3 = _getOneTwo(option),
      ticket = _getOneTwo3[0],
      outputsize = _getOneTwo3[1],
      title = ticket + " (Daily)";

  _assign(option, {
    ticket: ticket,
    outputsize: outputsize,
    interval: "Daily",
    title: title,
    itemCaption: title
  });

  return "outputsize=" + outputsize + "&symbol=" + ticket;
};

var _crIncomeQuery = function _crIncomeQuery(option) {
  var items = option.items,
      itemCaption = option.itemCaption,
      _symbol = getValue(items[0]);

  _assign(option, {
    itemCaption: itemCaption.replace(getCaption(items[0]), _symbol),
    dfItem: getValue(items[1]),
    dfPeriod: getValue(items[2])
  });

  return "symbol=" + _symbol;
};

var _crEarningQuery = function _crEarningQuery(option) {
  var items = option.items,
      _symbol = getValue(items[0]);

  _assign(option, {
    itemCaption: _symbol,
    dfPeriod: getValue(items[1])
  });

  return "symbol=" + _symbol;
};

var _crDfQuery = function _crDfQuery(_ref2) {
  var _ref2$ticket = _ref2.ticket,
      ticket = _ref2$ticket === void 0 ? C.DF_TICKET : _ref2$ticket,
      _ref2$period = _ref2.period,
      period = _ref2$period === void 0 ? C.DF_PERIOD : _ref2$period;
  return "symbol=" + ticket + "&interval=daily&time_period=" + period + "&series_type=close";
};

var _routerQuery = {
  DF: _crDfQuery,
  SECTOR: _crSectorQuery,
  TIME_SERIES_INTRADAY: _crIntradayQuery,
  TIME_SERIES_DAILY: _crDailyQuery,
  TIME_SERIES_DAILY_ADJUSTED: _crDailyQuery,
  INCOME_STATEMENT: _crIncomeQuery,
  BALANCE_SHEET: _crIncomeQuery,
  CASH_FLOW: _crIncomeQuery,
  EARNINGS: _crEarningQuery
};
var AlphaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$indicator = option.indicator,
        indicator = _option$indicator === void 0 ? 'SMA' : _option$indicator,
        _option$dfFn = option.dfFn,
        dfFn = _option$dfFn === void 0 ? indicator : _option$dfFn,
        apiKey = option.apiKey,
        _crQuery = _routerQuery[dfFn] || _routerQuery.DF,
        _queryParam = joinBy('&', "function=" + dfFn, _crQuery(option), "apikey=" + apiKey);

    return C.ROOT + "?" + _queryParam;
  },
  checkResponse: function checkResponse(json) {
    if ((0, _isEmpty["default"])(json)) {
      throw crError();
    }

    if (json[C.ERR_PROP]) {
      throw crError(C.REQ_ERROR, json[C.ERR_PROP]);
    }

    return true;
  }
};
var _default = AlphaApi;
exports["default"] = _default;
//# sourceMappingURL=Api.js.map
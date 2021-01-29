"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("../../utils/isEmpty"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue,
    getCaption = _fnAdapter["default"].getCaption,
    joinBy = _fnAdapter["default"].joinBy;
var C = {
  ROOT: 'https://www.alphavantage.co/query',
  ERR_PROP: 'Error Message',
  REQ_ERROR: 'Request Error',
  RES_EMPTY: 'Response Empty',
  MSG_EMPTY: 'Empty response from data provider'
};
var _assign = Object.assign;

var _crError = function _crError(errCaption, message) {
  return {
    errCaption: errCaption,
    message: message
  };
};

var _getOneTwo = function _getOneTwo(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items;
  return [getValue(items[0]), getValue(items[1])];
};

var _crQuery = function _crQuery(dfFn, option) {
  var _option$ticket = option.ticket,
      ticket = _option$ticket === void 0 ? 'MSFT' : _option$ticket,
      _option$period = option.period,
      period = _option$period === void 0 ? '50' : _option$period;

  switch (dfFn) {
    case 'SECTOR':
      return '';

    case 'TIME_SERIES_INTRADAY':
      {
        var _getOneTwo2 = _getOneTwo(option),
            _ticket = _getOneTwo2[0],
            interval = _getOneTwo2[1],
            title = _ticket + " (" + interval + ")";

        _assign(option, {
          ticket: _ticket,
          interval: interval,
          title: title,
          itemCaption: title
        });

        return "interval=" + interval + "&symbol=" + _ticket;
      }

    case 'TIME_SERIES_DAILY':
    case 'TIME_SERIES_DAILY_ADJUSTED':
      {
        var _getOneTwo3 = _getOneTwo(option),
            _ticket2 = _getOneTwo3[0],
            outputsize = _getOneTwo3[1],
            _title = _ticket2 + " (Daily)";

        _assign(option, {
          ticket: _ticket2,
          outputsize: outputsize,
          interval: "Daily",
          title: _title,
          itemCaption: _title
        });

        return "outputsize=" + outputsize + "&symbol=" + _ticket2;
      }

    case 'INCOME_STATEMENT':
    case 'BALANCE_SHEET':
    case 'CASH_FLOW':
      {
        var items = option.items,
            itemCaption = option.itemCaption,
            _symbol = getValue(items[0]);

        _assign(option, {
          itemCaption: itemCaption.replace(getCaption(items[0]), _symbol),
          dfItem: getValue(items[1]),
          dfPeriod: getValue(items[2])
        });

        return "symbol=" + _symbol;
      }

    case 'EARNINGS':
      {
        var _items = option.items,
            _symbol2 = getValue(_items[0]);

        _assign(option, {
          itemCaption: _symbol2,
          dfPeriod: getValue(_items[1])
        });

        return "symbol=" + _symbol2;
      }

    default:
      return "symbol=" + ticket + "&interval=daily&time_period=" + period + "&series_type=close";
  }
};

var AlphaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$indicator = option.indicator,
        indicator = _option$indicator === void 0 ? 'SMA' : _option$indicator,
        _option$dfFn = option.dfFn,
        dfFn = _option$dfFn === void 0 ? indicator : _option$dfFn,
        apiKey = option.apiKey,
        _queryParam = joinBy('&', "function=" + dfFn, _crQuery(dfFn, option), "apikey=" + apiKey);

    return C.ROOT + "?" + _queryParam;
  },
  checkResponse: function checkResponse(json) {
    if ((0, _isEmpty["default"])(json)) {
      throw _crError(C.RES_EMPTY, C.MSG_EMPTY);
    }

    if (!json[C.ERR_PROP]) {
      return true;
    } else {
      throw _crError(C.REQ_ERROR, json[C.ERR_PROP]);
    }
  }
};
var _default = AlphaApi;
exports["default"] = _default;
//# sourceMappingURL=Api.js.map
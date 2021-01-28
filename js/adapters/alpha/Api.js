"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("../../utils/isEmpty"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue,
    getCaption = _fnAdapter["default"].getCaption;
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

var AlphaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$indicator = option.indicator,
        indicator = _option$indicator === void 0 ? 'SMA' : _option$indicator,
        _option$ticket = option.ticket,
        ticket = _option$ticket === void 0 ? 'MSFT' : _option$ticket,
        _option$period = option.period,
        period = _option$period === void 0 ? '50' : _option$period,
        apiKey = option.apiKey,
        dfFn = option.dfFn,
        _fn = dfFn || indicator;

    switch (_fn) {
      case 'SECTOR':
        return C.ROOT + "?function=" + _fn + "&apikey=" + apiKey;

      case 'TIME_SERIES_INTRADAY':
        {
          var _option$items = option.items,
              items = _option$items === void 0 ? [] : _option$items,
              _ticket = getValue(items[0]),
              interval = getValue(items[1]),
              title = _ticket + " (" + interval + ")";

          _assign(option, {
            ticket: _ticket,
            interval: interval,
            title: title,
            itemCaption: title
          });

          return C.ROOT + "?function=" + _fn + "&interval=" + interval + "&symbol=" + _ticket + "&apikey=" + apiKey;
        }

      case 'TIME_SERIES_DAILY':
        {
          var _option$items2 = option.items,
              _items = _option$items2 === void 0 ? [] : _option$items2,
              _ticket2 = getValue(_items[0]),
              outputsize = getValue(_items[1]),
              _title = _ticket2 + " (Daily)";

          _assign(option, {
            ticket: _ticket2,
            outputsize: outputsize,
            interval: "Daily",
            title: _title,
            itemCaption: _title
          });

          return C.ROOT + "?function=" + _fn + "&outputsize=" + outputsize + "&symbol=" + _ticket2 + "&apikey=" + apiKey;
        }

      case 'TIME_SERIES_DAILY_ADJUSTED':
        {
          var _outputsize = option.outputsize;
          return C.ROOT + "?function=" + _fn + "&outputsize=" + _outputsize + "&symbol=" + ticket + "&apikey=" + apiKey;
        }

      case 'INCOME_STATEMENT':
      case 'BALANCE_SHEET':
      case 'CASH_FLOW':
        {
          var _items2 = option.items,
              itemCaption = option.itemCaption,
              _symbol = getValue(_items2[0]);

          _assign(option, {
            itemCaption: itemCaption.replace(getCaption(_items2[0]), _symbol),
            dfItem: getValue(_items2[1]),
            dfPeriod: getValue(_items2[2])
          });

          return C.ROOT + "?function=" + _fn + "&symbol=" + _symbol + "&apikey=" + apiKey;
        }

      case 'EARNINGS':
        {
          var _items3 = option.items,
              _symbol2 = getValue(_items3[0]);

          _assign(option, {
            itemCaption: _symbol2,
            dfPeriod: getValue(_items3[1])
          });

          return C.ROOT + "?function=" + _fn + "&symbol=" + _symbol2 + "&apikey=" + apiKey;
        }

      default:
        return C.ROOT + "?function=" + indicator + "&symbol=" + ticket + "&interval=daily&time_period=" + period + "&series_type=close&apikey=" + apiKey;
    }
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
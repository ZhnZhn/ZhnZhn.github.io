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
          var interval = option.interval;
          return C.ROOT + "?function=" + _fn + "&interval=" + interval + "&symbol=" + ticket + "&apikey=" + apiKey;
        }

      case 'TIME_SERIES_DAILY':
        {
          var _option$outputsize = option.outputsize,
              outputsize = _option$outputsize === void 0 ? 'compact' : _option$outputsize;
          return C.ROOT + "?function=" + _fn + "&outputsize=" + outputsize + "&symbol=" + ticket + "&apikey=" + apiKey;
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
          var items = option.items,
              itemCaption = option.itemCaption,
              _symbol = getValue(items[0]);

          _assign(option, {
            itemCaption: itemCaption.replace(getCaption(items[0]), _symbol),
            dfItem: getValue(items[1]),
            dfPeriod: getValue(items[2])
          });

          return C.ROOT + "?function=" + _fn + "&symbol=" + _symbol + "&apikey=" + apiKey;
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
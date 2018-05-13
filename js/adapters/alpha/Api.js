'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('../../utils/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  ROOT: 'https://www.alphavantage.co/query',

  ERR_PROP: 'Error Message',
  REQ_ERROR: 'Request Error',
  RES_EMPTY: 'Response Empty',
  MSG_EMPTY: 'Empty response from data provider'
};

var _crError = function _crError(errCaption, message) {
  return {
    errCaption: errCaption, message: message
  };
};

var AlphaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$indicator = option.indicator,
        indicator = _option$indicator === undefined ? 'SMA' : _option$indicator,
        _option$ticket = option.ticket,
        ticket = _option$ticket === undefined ? 'MSFT' : _option$ticket,
        _option$period = option.period,
        period = _option$period === undefined ? '50' : _option$period,
        _option$apiKey = option.apiKey,
        apiKey = _option$apiKey === undefined ? 'demo' : _option$apiKey;

    switch (indicator) {
      case 'SECTOR':
        return C.ROOT + '?function=' + indicator + '&apikey=' + apiKey;
      case 'TIME_SERIES_INTRADAY':
        {
          var interval = option.interval;

          return C.ROOT + '?function=' + indicator + '&interval=' + interval + '&symbol=' + ticket + '&apikey=' + apiKey;
        }
      default:
        return C.ROOT + '?function=' + indicator + '&symbol=' + ticket + '&interval=daily&time_period=' + period + '&series_type=close&apikey=' + apiKey;
    }
  },
  checkResponse: function checkResponse(json) {
    if ((0, _isEmpty2.default)(json)) {
      throw _crError(C.RES_EMPTY, C.MSG_EMPTY);
    }
    if (!json[C.ERR_PROP]) {
      return true;
    } else {
      throw _crError(C.REQ_ERROR, json[C.ERR_PROP]);
    }
  }
};

exports.default = AlphaApi;
//# sourceMappingURL=Api.js.map
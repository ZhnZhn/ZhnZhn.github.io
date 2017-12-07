'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT: 'https://www.alphavantage.co/query',
  REQUEST_ERROR: 'Request Error'
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
    if (!json['Error Message']) return true;else {
      throw {
        errCaption: C.REQUEST_ERROR,
        message: json['Error Message']
      };
    }
  }
};

exports.default = AlphaApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\alpha\Api.js.map
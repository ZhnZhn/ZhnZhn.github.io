'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT: 'https://www.alphavantage.co/query'
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

    if (indicator === 'SECTOR') {
      return C.ROOT + '?function=' + indicator + '&apikey=' + apiKey;
    }
    return C.ROOT + '?function=' + indicator + '&symbol=' + ticket + '&interval=daily&time_period=' + period + '&series_type=close&apikey=' + apiKey;
  },
  checkResponse: function checkResponse(json) {
    return true;
  }
};

exports.default = AlphaApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\AlphaApi.js.map
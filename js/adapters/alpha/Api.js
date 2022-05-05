"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("../../utils/isEmpty"));

var _fnAdapter = require("./fnAdapter");

const ROOT = 'https://www.alphavantage.co/query',
      DF_TICKET = 'MSFT',
      DF_SIZE = 'compact',
      DF_PERIOD = '50',
      ERR_PROP = 'Error Message',
      REQ_ERROR = 'Request Error',
      _assign = Object.assign,
      _isArr = Array.isArray;

const _getOneTwo = _ref => {
  let {
    value,
    outputsize,
    items
  } = _ref;
  return _isArr(items) ? [(0, _fnAdapter.getValue)(items[0]), (0, _fnAdapter.getValue)(items[1])] //Stocks by Sectors case
  : [value || DF_TICKET, outputsize || DF_SIZE];
};

const _crSectorQuery = () => {};

const _crIntradayQuery = option => {
  const [ticket, interval] = _getOneTwo(option),
        title = ticket + " (" + interval + ")";

  _assign(option, {
    ticket,
    interval,
    title,
    itemCaption: title
  });

  return "interval=" + interval + "&symbol=" + ticket;
};

const _crDailyQuery = option => {
  const [ticket, outputsize] = _getOneTwo(option),
        title = ticket + " (Daily)";

  _assign(option, {
    ticket,
    outputsize,
    interval: "Daily",
    title,
    itemCaption: title
  });

  return "outputsize=" + outputsize + "&symbol=" + ticket;
};

const _crIncomeQuery = option => {
  const {
    items,
    itemCaption
  } = option,
        _symbol = (0, _fnAdapter.getValue)(items[0]);

  _assign(option, {
    itemCaption: itemCaption.replace((0, _fnAdapter.getCaption)(items[0]), _symbol),
    dfItem: (0, _fnAdapter.getValue)(items[1]),
    dfPeriod: (0, _fnAdapter.getValue)(items[2])
  });

  return "symbol=" + _symbol;
};

const _crEarningQuery = option => {
  const {
    items
  } = option,
        _symbol = (0, _fnAdapter.getValue)(items[0]);

  _assign(option, {
    itemCaption: _symbol,
    dfPeriod: (0, _fnAdapter.getValue)(items[1])
  });

  return "symbol=" + _symbol;
};

const _crDfQuery = _ref2 => {
  let {
    ticket = DF_TICKET,
    period = DF_PERIOD
  } = _ref2;
  return "symbol=" + ticket + "&interval=daily&time_period=" + period + "&series_type=close";
};

const _routerQuery = {
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
const AlphaApi = {
  getRequestUrl(option) {
    const {
      indicator = 'SMA',
      dfFn = indicator,
      apiKey
    } = option,
          _crQuery = _routerQuery[dfFn] || _routerQuery.DF,
          _queryParam = (0, _fnAdapter.joinBy)('&', "function=" + dfFn, _crQuery(option), "apikey=" + apiKey);

    return ROOT + "?" + _queryParam;
  },

  checkResponse(json) {
    if ((0, _isEmpty.default)(json)) {
      throw (0, _fnAdapter.crError)();
    }

    if (json[ERR_PROP]) {
      throw (0, _fnAdapter.crError)(REQ_ERROR, json[ERR_PROP]);
    }

    return true;
  }

};
var _default = AlphaApi;
exports.default = _default;
//# sourceMappingURL=Api.js.map
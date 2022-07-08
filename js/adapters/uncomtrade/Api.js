"use strict";

exports.__esModule = true;
exports.default = void 0;

var _crFn = require("../crFn");

var _fnAdapter = require("./fnAdapter");

const PERIOD = 5,
      ALL = 'all',
      DF_AGG_PERIOD = '2021' //rg=2 Export
//H4
//fmt=JSON&head=M
,
      API_URL = 'https://comtrade.un.org/api/get',
      DF_RG = 2,
      DF_MEASURE = 'NetWeight',
      DF_TRADE_PARTNER = '0',
      _isArr = Array.isArray,
      _assign = Object.assign;

const _crQuery = freq => "type=C&freq=" + freq + "&px=HS";

const _crQueryTail = (one, tp, rg, two) => "r=" + one + "&p=" + tp + "&rg=" + rg + "&cc=" + two;

const _crMax = (one, tp) => one !== ALL && tp === DF_TRADE_PARTNER ? 'max=502&' : '';

const _crPeriod = (toYear, period) => {
  const arr = [];

  for (let i = 1; i <= period; i++) {
    arr.push(toYear - i);
  }

  return arr.reverse().join(',');
};

const _isAllPeriod = (one, tp) => one !== ALL & tp !== ALL;

let _shortTimePeriod;

const _crTimePeriod = (one, tp, two, period) => two === 'AG2' || (0, _fnAdapter.isTotalByAll)({
  tp,
  two
}) ? period || DF_AGG_PERIOD : _isAllPeriod(one, tp) ? 'ALL,all,All' : _shortTimePeriod || (_shortTimePeriod = _crPeriod(new Date().getUTCFullYear(), PERIOD));

const _checkReq = option => {
  if (option._isTs) {
    throw new Error('ERR_10');
  }
};

const UnComtradeApi = {
  getRequestUrl(option) {
    _checkReq(option);

    const {
      one = ALL,
      two,
      rg = 2,
      tp,
      freq,
      period
    } = option,
          _query = _crQuery(freq),
          _tp = tp || DF_TRADE_PARTNER,
          _ps = _crTimePeriod(one, _tp, two, period),
          _queryTail = _crQueryTail(one, _tp, rg, two),
          _max = _crMax(one, _tp);

    return API_URL + "?" + _max + _query + "&ps=" + _ps + "&" + _queryTail;
  },

  checkResponse(json) {
    if (json && _isArr(json.dataset)) {
      return true;
    }

    throw (0, _crFn.crError)();
  },

  addPropsTo(option) {
    const {
      one,
      v,
      rg = DF_RG,
      measure = DF_MEASURE
    } = option;

    if (!one) {
      const arr = v.substring(3).split('_');

      _assign(option, {
        one: arr[0],
        two: arr[1]
      });
    }

    _assign(option, {
      rg,
      measure
    });
  }

};
var _default = UnComtradeApi;
exports.default = _default;
//# sourceMappingURL=Api.js.map
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _conf = require("./conf");
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://comtradeapi.un.org/public/v1/preview/C',
  DF_RG = 'X',
  DF_MEASURE = 'primaryValue';
const _checkReq = option => {
  if (option._isTs) {
    throw new Error('ERR_10');
  }
};
const _crReporterCodeQuery = reporterCode => reporterCode === _conf.WORLD_CODE ? '' : `&reporterCode=${reporterCode}`;
const _crCategoryByPartnerUrl = (proxy, reporterCode, cmdCode, flowCode, time) => `${proxy}${API_URL}/A/HS/?motCode=0&customsCode=C00&cmdCode=${cmdCode}&flowCode=${flowCode}&period=${time}${_crReporterCodeQuery(reporterCode)}`;
const _crAggregateOrWorldPatnerQuery = (option, one) => (0, _fnAdapter.isAggregateByHs)(option) || one === _conf.WORLD_CODE ? '&partnerCode=0&partner2Code=0' : '';
const UnComtradeApi = {
  getRequestUrl(option) {
    _checkReq(option);
    const {
      one = _conf.WORLD_CODE,
      rg = DF_RG
    } = option;
    return _crCategoryByPartnerUrl(option.proxy, one, option.two, rg, option.time) + _crAggregateOrWorldPatnerQuery(option, one);
  },
  checkResponse(json) {
    if (json && (0, _AdapterFn.isArr)(json.data)) {
      return json;
    }
    const {
      error,
      message,
      statusCode
    } = json || {};
    if ((0, _AdapterFn.isStr)(error)) {
      throw (0, _AdapterFn.crError)('', error);
    }
    if ((0, _AdapterFn.isStr)(message)) {
      throw (0, _AdapterFn.crError)('', statusCode === 429 ? `${statusCode}: ${message.replace('in 1 seconds', 'in 1 minutes')}` : message);
    }
    throw (0, _AdapterFn.crError)();
  },
  addPropsTo(option) {
    const {
      one = _conf.WORLD_CODE,
      v,
      rg = DF_RG,
      measure = DF_MEASURE
    } = option;
    if (!one) {
      const arr = v.slice(3).split('_');
      (0, _AdapterFn.assign)(option, {
        one: arr[0],
        two: arr[1]
      });
    }
    (0, _AdapterFn.assign)(option, {
      rg,
      measure
    });
  }
};
var _default = exports.default = UnComtradeApi;
//# sourceMappingURL=Api.js.map
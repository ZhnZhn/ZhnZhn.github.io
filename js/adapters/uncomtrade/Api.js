"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://comtradeapi.un.org/public/v1/preview/C',
  ALL = 'all',
  DF_RG = 'X',
  DF_MEASURE = 'primaryValue',
  DF_MOT_AND_CUSTOMS_CODE = 'motCode=0&customsCode=C00';
const _checkReq = option => {
  if (option._isTs) {
    throw new Error('ERR_10');
  }
};
const DF_SHORT_PERIOD = 'period=2023,2022,2021',
  DF_LONG_QUERY_TAIL = DF_SHORT_PERIOD + ",2020,2019,2018,2017,2016";
const _crPeriodQuery = tp => tp === ALL ? DF_SHORT_PERIOD : DF_LONG_QUERY_TAIL;
const _crReporterToTradePartnerQuery = tp => {
  const _tpCode = tp === ALL ? '' : tp || '0';
  return _tpCode ? "&partnerCode=" + _tpCode + "&partner2Code=" + _tpCode : '';
};
const _crAggrTotalUrl = (proxy, reporterCode, cmdCode, flowCode, period, tfType) => {
  const _url = "" + proxy + API_URL + "/A/HS?" + DF_MOT_AND_CUSTOMS_CODE + "&cmdCode=" + cmdCode + "&flowCode=" + flowCode + "&period=" + period + "&partner2Code=0";
  // t1: trade flow calculated cases and reporter World case
  return (0, _fnAdapter.isAggrCalculatedCase)(reporterCode, tfType) ? _url + "&partnerCode=" + reporterCode : _url + "&reporterCode=" + reporterCode;
};
const _crCmdFlowUrl = (proxy, freq, cmdCode, flowCode) => "" + proxy + API_URL + "/" + freq + "/HS?" + DF_MOT_AND_CUSTOMS_CODE + "&cmdCode=" + cmdCode + "&flowCode=" + flowCode;
const UnComtradeApi = {
  getRequestUrl(option) {
    _checkReq(option);
    const {
      one = ALL,
      two,
      rg = DF_RG,
      tfType,
      tp,
      freq,
      period,
      proxy
    } = option;
    if ((0, _fnAdapter.isAggrByTotalWorld)(option)) {
      return _crAggrTotalUrl(proxy, one, two, rg, period, tfType);
    }
    if ((0, _fnAdapter.isAggr)(two)) {
      return _crAggrTotalUrl(proxy, one, two, rg, period, tfType) + ((0, _fnAdapter.isAggrCalculatedCase)(one, tfType) ? '' : "&partnerCode=" + (tp || 0));
    }

    // All Reporter to TradePartner (Default TradePartner: World)
    if (one === ALL) {
      const _tpCode = tp === ALL ? '0' : tp || '0',
        _periodQuery = (0, _fnAdapter.isCategorySet)(option) ? "period=" + option.time : DF_SHORT_PERIOD;
      return _crCmdFlowUrl(proxy, freq, two, rg) + "&partnerCode=" + _tpCode + "&partner2Code=" + _tpCode + "&" + _periodQuery;
    }

    // Reporter to TradePartner (Default TradePartner: All)
    const _reporterQuery = "reporterCode=" + one + _crReporterToTradePartnerQuery(tp),
      _periodQuery = _crPeriodQuery(tp);
    return _crCmdFlowUrl(proxy, freq, two, rg) + "&" + _reporterQuery + "&" + _periodQuery;
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
      throw (0, _AdapterFn.crError)('', statusCode === 429 ? statusCode + ": " + message.replace('in 1 seconds', 'in 1 minutes') : message);
    }
    throw (0, _AdapterFn.crError)();
  },
  addPropsTo(option) {
    const {
      one,
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
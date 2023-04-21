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
const DF_QUERY_TAIL = '&period=2022,2021,2020,2019,2018&partner2Code=0';
const _crReporterToTradePartnerQueryTail = tp => {
  const _tpCode = tp === ALL ? '' : tp || '0',
    _partnerCode = _tpCode ? "&partnerCode=" + _tpCode + "&partner2Code=0" : '';
  return _partnerCode || DF_QUERY_TAIL;
};
const _crAggrTotalUrl = (proxy, reporterCode, cmdCode, flowCode, period) => "" + proxy + API_URL + "/A/HS?" + DF_MOT_AND_CUSTOMS_CODE + "&reporterCode=" + reporterCode + "&cmdCode=" + cmdCode + "&flowCode=" + flowCode + "&period=" + period + "&partner2Code=0";
const UnComtradeApi = {
  getRequestUrl(option) {
    _checkReq(option);
    const {
      one = ALL,
      two,
      rg = DF_RG,
      tp,
      freq,
      period,
      proxy
    } = option;
    if ((0, _fnAdapter.isAggrByTotalWorld)(option)) {
      return _crAggrTotalUrl(proxy, one, two, rg, period);
    }
    if ((0, _fnAdapter.isAggr)(two)) {
      return _crAggrTotalUrl(proxy, one, two, rg, period) + ("&partnerCode=" + (tp || 0));
    }

    // All Reporter to TradePartner (Default TradePartner: World)
    if (one === ALL) {
      const _tpCode = tp === ALL ? '0' : tp || '0';
      return "" + proxy + API_URL + "/" + freq + "/HS?" + DF_MOT_AND_CUSTOMS_CODE + "&cmdCode=" + two + "&flowCode=" + rg + "&partnerCode=" + _tpCode + "&partner2Code=" + _tpCode;
    }

    // Reporter to TradePartner (Default TradePartner: All)
    const _queryTail = _crReporterToTradePartnerQueryTail(tp);
    return "" + proxy + API_URL + "/" + freq + "/HS?" + DF_MOT_AND_CUSTOMS_CODE + "&cmdCode=" + two + "&reporterCode=" + one + "&flowCode=" + rg + _queryTail;
  },
  checkResponse(json) {
    if (json && (0, _AdapterFn.isArr)(json.data)) {
      return true;
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
      const arr = v.substring(3).split('_');
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
var _default = UnComtradeApi;
exports.default = _default;
//# sourceMappingURL=Api.js.map
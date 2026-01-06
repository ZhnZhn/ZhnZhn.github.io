"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _itemFn = require("../../utils/itemFn");
var _AdapterFn = require("../AdapterFn");
const API_URL = 'https://api.beta.ons.gov.uk/v1/datasets/',
  EDT = '/editions/time-series/versions/',
  OBS = '/observations?',
  QUERY_TIME = '&time=*',
  QUERY_TAIL = '&time=*&geography=K02000001';
const _crUrl = function (item, vers) {
  if (vers === void 0) {
    vers = 1;
  }
  return API_URL + item + EDT + vers + OBS;
};
const _crTradeUrl = _ref => {
  let {
    items
  } = _ref;
  const v1 = (0, _itemFn.getValue)(items[0]),
    v2 = (0, _itemFn.getValue)(items[1]),
    v3 = (0, _itemFn.getValue)(items[2]);
  return `${_crUrl('trade')}countriesandterritories=${v1}&standardindustrialtradeclassification=${v2}&direction=${v3}${QUERY_TAIL}`;
};
const _crCpiUrl = _ref2 => {
  let {
    items
  } = _ref2;
  const v1 = (0, _itemFn.getValue)(items[0]);
  return `${_crUrl('cpih01')}aggregate=${v1}${QUERY_TAIL}`;
};
const _crPhriUrl = _ref3 => {
  let {
    items
  } = _ref3;
  const v1 = (0, _itemFn.getValue)(items[0]),
    v2 = (0, _itemFn.getValue)(items[1]);
  return `${_crUrl('index-private-housing-rental-prices')}geography=${v1}&indexandyearchange=${v2}${QUERY_TIME}`;
};
const _crGdpUrl = _ref4 => {
  let {
    items
  } = _ref4;
  const v1 = (0, _itemFn.getValue)(items[0]),
    v2 = (0, _itemFn.getValue)(items[1]),
    v3 = (0, _itemFn.getValue)(items[2]);
  return `${_crUrl('regional-gdp-by-quarter')}geography=${v1}&unofficialstandardindustrialclassification=${v2}&growthrate=${v3}&prices=cvm${QUERY_TIME}`;
};
const _rCrUrl = {
  '21': _crTradeUrl,
  '34': _crCpiUrl,
  '20': _crPhriUrl,
  '5': _crGdpUrl
};
const OnsApi = {
  getRequestUrl(option) {
    return _rCrUrl[option.dfV]?.(option);
  },
  checkResponse(json) {
    if (!(json && (0, _isTypeFn.isArr)(json.observations))) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = OnsApi;
//# sourceMappingURL=OnsApi.js.map
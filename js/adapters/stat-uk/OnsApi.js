"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue,
    crError = _fnAdapter["default"].crError;
var C = {
  ROOT: 'https://api.beta.ons.gov.uk/v1/datasets/',
  EDT: '/editions/time-series/versions/',
  OBS: '/observations?',
  QUERY_TIME: '&time=*',
  QUERY_TAIL: '&time=*&geography=K02000001',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
};
var _isArr = Array.isArray;

var _crErr = crError.bind(null, C.ERR_CAPTION, C.MSG_EMPTY);

var _crUrl = function _crUrl(item, vers) {
  if (vers === void 0) {
    vers = 1;
  }

  return C.ROOT + item + C.EDT + vers + C.OBS;
};

var _crTradeUrl = function _crTradeUrl(_ref) {
  var items = _ref.items;
  var v1 = getValue(items[0]),
      v2 = getValue(items[1]),
      v3 = getValue(items[2]);
  return _crUrl('trade') + "countriesandterritories=" + v1 + "&standardindustrialtradeclassification=" + v2 + "&direction=" + v3 + C.QUERY_TAIL;
};

var _crCpiUrl = function _crCpiUrl(_ref2) {
  var items = _ref2.items;
  var v1 = getValue(items[0]);
  return _crUrl('cpih01') + "aggregate=" + v1 + C.QUERY_TAIL;
};

var _crPhriUrl = function _crPhriUrl(_ref3) {
  var items = _ref3.items;
  var v1 = getValue(items[0]),
      v2 = getValue(items[1]);
  return _crUrl('index-private-housing-rental-prices') + "geography=" + v1 + "&indexandyearchange=" + v2 + C.QUERY_TIME;
};

var _crGdpUrl = function _crGdpUrl(_ref4) {
  var items = _ref4.items;
  var v1 = getValue(items[0]),
      v2 = getValue(items[1]),
      v3 = getValue(items[2]);
  return _crUrl('regional-gdp-by-quarter') + "geography=" + v1 + "&unofficialstandardindustrialclassification=" + v2 + "&growthrate=" + v3 + "&prices=cvm" + C.QUERY_TIME;
};

var _rCrUrl = {
  '21': _crTradeUrl,
  '34': _crCpiUrl,
  '20': _crPhriUrl,
  '5': _crGdpUrl
};
var OnsApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _rCrUrl$option$dfV;

    return (_rCrUrl$option$dfV = _rCrUrl[option.dfV]) == null ? void 0 : _rCrUrl$option$dfV.call(_rCrUrl, option);
  },
  checkResponse: function checkResponse(json) {
    if (!(json && _isArr(json.observations))) {
      throw _crErr();
    }

    return true;
  }
};
var _default = OnsApi;
exports["default"] = _default;
//# sourceMappingURL=OnsApi.js.map
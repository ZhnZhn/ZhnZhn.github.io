"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var C = {
  URL: "https://api.eia.gov/category/",
  S_URL: "https://api.eia.gov/series/"
};
var MSG = {
  ERR: 'invalid series_id.',
  NOT_EXIST: 'Data for enetered parameters is not existed.'
};
var crError = _AdapterFn["default"].crError;

var _getValue = function _getValue(obj) {
  return obj && obj.value ? obj.value : '';
};

var _crSeriaDf = function _crSeriaDf(option) {
  var sufix = option.sufix,
      _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]),
      _three = _getValue(items[2]),
      _sufix = _three || sufix || '';

  return "" + _two + _one + _sufix;
};

var _crSeriaPI2 = function _crSeriaPI2(option) {
  var prefix = option.prefix,
      _option$items2 = option.items,
      items = _option$items2 === void 0 ? [] : _option$items2,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]);

  return "" + prefix + _one + _two;
};

var _crSeriaPI321S = function _crSeriaPI321S(option) {
  var prefix = option.prefix,
      _option$items3 = option.items,
      items = _option$items3 === void 0 ? [] : _option$items3,
      sufix = option.sufix,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]),
      _three = _getValue(items[2]);

  return "" + prefix + _three + "-" + _two + "-" + _one + sufix;
};

var _rSeriaId = {
  DF: _crSeriaDf,
  pi2: _crSeriaPI2,
  pi231s: _crSeriaPI321S
};

var _crSeriaId = function _crSeriaId(option) {
  var dfSeriaType = option.dfSeriaType,
      fn = _rSeriaId[dfSeriaType] || _rSeriaId.DF;
  return fn(option);
};

var EiaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var apiKey = option.apiKey,
        _seria_id = _crSeriaId(option);

    return C.S_URL + "?api_key=" + apiKey + "&series_id=" + _seria_id;
  },
  checkResponse: function checkResponse(json) {
    if (!json) {
      throw crError();
    }

    var data = json.data,
        _ref = data || {},
        msgErr = _ref.error;

    if (msgErr) {
      var _msgErr = msgErr.indexOf(MSG.ERR) !== -1 ? MSG.NOT_EXIST : msgErr;

      throw crError('', _msgErr);
    }

    if (!json.series || !json.series[0]) {
      throw crError();
    }

    return true;
  }
};
var _default = EiaApi;
exports["default"] = _default;
//# sourceMappingURL=EiaApi.js.map
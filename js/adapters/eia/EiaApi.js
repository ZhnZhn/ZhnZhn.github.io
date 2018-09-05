"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  URL: "https://api.eia.gov/category/",
  S_URL: "https://api.eia.gov/series/"
};
var CAPTION = 'EIA';
var MSG = {
  ERR: 'invalid series_id.',
  NOT_EXIST: 'Data for enetered parameters is not existed.',
  EMPTY: 'Response is empty.',
  DATA_EMPTY: 'Data is empty.'
};

var _crErr = function _crErr(caption, message) {
  return {
    errCaption: caption,
    message: message
  };
};

var _getValue = function _getValue(obj) {
  return obj && obj.value ? obj.value : '';
};

var _crSeriaDf = function _crSeriaDf(option) {
  var sufix = option.sufix,
      _option$items = option.items,
      items = _option$items === undefined ? [] : _option$items,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]),
      _three = _getValue(items[2]),
      _sufix = _three || sufix || '';

  return "" + _two + _one + _sufix;
};
var _crSeriaPI2 = function _crSeriaPI2(option) {
  var prefix = option.prefix,
      _option$items2 = option.items,
      items = _option$items2 === undefined ? [] : _option$items2,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]);

  return "" + prefix + _one + _two;
};

var _rSeriaId = {
  DF: _crSeriaDf,
  pi2: _crSeriaPI2
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
      throw _crErr(CAPTION, MSG.EMPTY);
    }
    var _json$data = json.data,
        data = _json$data === undefined ? {} : _json$data,
        msgErr = data.error;

    if (msgErr) {
      if (msgErr.indexOf(MSG.ERR) !== -1) {
        throw _crErr(CAPTION, MSG.NOT_EXIST);
      }
      throw _crErr(CAPTION, msgErr);
    }
    if (!json.series || !json.series[0]) {
      throw _crErr(CAPTION, MSG.DATA_EMPTY);
    }
    return true;
  }
};

exports.default = EiaApi;
//# sourceMappingURL=EiaApi.js.map
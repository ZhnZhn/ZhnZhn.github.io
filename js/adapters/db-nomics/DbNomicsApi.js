'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  URL: 'https://api.db.nomics.world/v22/series',
  TAIL: 'observations=1&format=json',
  DF_ID: 'ECB/EXR/A.USD.EUR.SP00.A',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
};

var _crErr = function _crErr(message) {
  return {
    errCaption: C.ERR_CAPTION,
    message: message || ''
  };
};
var _getValue = function _getValue(obj) {
  return obj && obj.value ? obj.value : '';
};

var _crUrlImpl = function _crUrlImpl(dfProvider, dfCode, seriaId) {
  if (!dfProvider || !dfCode || !seriaId) {
    return C.URL + '?series_ids=' + C.DF_ID + C.TAIL;
  }
  return C.URL + '?series_ids=' + dfProvider + '/' + dfCode + '/' + seriaId + '&' + C.TAIL;
};

var _crUrl = function _crUrl(seriaId, option) {
  var dfProvider = option.dfProvider,
      dfCode = option.dfCode;

  option.seriaId = seriaId;
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

var _dfFnUrl = function _dfFnUrl(option) {
  return _crUrl(option.value, option);
};

var _crIdUrl = function _crIdUrl(option, dfProvider, dfCode, seriaId) {
  Object.assign(option, {
    seriaId: option.value,
    dfProvider: dfProvider, dfCode: dfCode
  });
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};
var _idFnUrl = function _idFnUrl(option) {
  var _ref = option || '',
      value = _ref.value,
      arr = value.split('/');

  return _crIdUrl(option, arr[0], arr[1], arr[2]);
};

var _s21FnUrl = function _s21FnUrl(option) {
  var dfSufix = option.dfSufix,
      items = option.items,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]),
      _seriaId = dfSufix ? _two + '.' + _one + '.' + dfSufix : _two + '.' + _one;

  return _crUrl(_seriaId, option);
};
var _s12FnUrl = function _s12FnUrl(option) {
  var dfSufix = option.dfSufix,
      items = option.items,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]),
      _seriaId = dfSufix ? _one + '.' + _two + '.' + dfSufix : _one + '.' + _two;

  return _crUrl(_seriaId, option);
};
var _s123AFnUrl = function _s123AFnUrl(option) {
  var items = option.items,
      _option$df3Prefix = option.df3Prefix,
      df3Prefix = _option$df3Prefix === undefined ? '' : _option$df3Prefix,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]),
      _three = _getValue(items[2]),
      _seriaId = _one + '.' + _two + '.' + df3Prefix + '.' + _three;

  return _crUrl(_seriaId, option);
};

var _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl,
  s123A: _s123AFnUrl
};

var DbNomicsApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfFnUrl = option.dfFnUrl,
        _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json) {
    if (json && Array.isArray(json.errors)) {
      throw _crErr(json.errors[0].message);
    }
    var docs = json && json.series && json.series.docs;
    if (!Array.isArray(docs) || !docs[0] || !Array.isArray(docs[0].period) || !Array.isArray(docs[0].value)) {
      throw _crErr(C.MSG_EMPTY);
    }
    return true;
  }
};

exports.default = DbNomicsApi;
//# sourceMappingURL=DbNomicsApi.js.map
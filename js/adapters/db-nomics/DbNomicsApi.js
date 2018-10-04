'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  URL: 'https://api.db.nomics.world/v21/series',
  TAIL: 'format=json&orientation=column',

  MSG_EMPTY: 'Dataset is empty',

  DF_PROVIDER: 'ECB',
  DF_CODE: 'EXR',
  DF_SERIA_ID: 'A.USD.EUR.SP00.A'
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

var _crUrl = function _crUrl(seriaId, option) {
  var dfProvider = option.dfProvider,
      dfCode = option.dfCode;

  option.seriaId = seriaId;
  return C.URL + '?provider_code=' + dfProvider + '&dataset_code=' + dfCode + '&series_code=' + seriaId + '&' + C.TAIL;
};

var _dfFnUrl = function _dfFnUrl(option) {
  var value = option.value,
      _seriaId = value;

  return _crUrl(_seriaId, option);
};

var _crIdUrl = function _crIdUrl(option, dfProvider, dfCode, seriaId) {
  Object.assign(option, {
    seriaId: option.value,
    dfProvider: dfProvider, dfCode: dfCode
  });
  return C.URL + '?provider_code=' + dfProvider + '&dataset_code=' + dfCode + '&series_code=' + seriaId + '&' + C.TAIL;
};
var _idFnUrl = function _idFnUrl(option) {
  var value = option.value,
      arr = value.split('/');

  if (arr.length !== 3) {
    return _crIdUrl(option, C.DF_PROVIDER, C.DF_CODE, C.DF_SERIA_ID);
  }
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

var _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl
};

var DbNomicsApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfFnUrl = option.dfFnUrl,
        _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json) {
    if (!json || !json.series || !Array.isArray(json.series.period) || !Array.isArray(json.series.value)) {
      throw _crErr('', C.MSG_EMPTY);
    }
    return true;
  }
};

exports.default = DbNomicsApi;
//# sourceMappingURL=DbNomicsApi.js.map
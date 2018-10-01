'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  URL: 'https://api.db.nomics.world/v21/series',
  TAIL: 'format=json&orientation=column',

  MSG_EMPTY: 'Dataset is empty'
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

var _s21FnUrl = function _s21FnUrl(option) {
  var dfSufix = option.dfSufix,
      items = option.items,
      _one = _getValue(items[0]),
      _two = _getValue(items[1]),
      _seriaId = _two + '.' + _one + '.' + dfSufix;

  return _crUrl(_seriaId, option);
};

var _rFnUrl = {
  DF: _dfFnUrl,
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
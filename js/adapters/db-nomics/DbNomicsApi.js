"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crError = _fnAdapter["default"].crError,
    getValue = _fnAdapter["default"].getValue;
var C = {
  URL: 'https://api.db.nomics.world/v22/series',
  TAIL: 'observations=1&format=json&metadata=false',
  DF_ID: 'ECB/EXR/A.USD.EUR.SP00.A',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
};

var _isArr = Array.isArray,
    _assign = Object.assign,
    _crErr = crError.bind(null, C.ERR_CAPTION);

var _crUrlImpl = function _crUrlImpl(dfProvider, dfCode, seriaId) {
  if (!dfProvider || !dfCode || !seriaId) {
    return C.URL + "?series_ids=" + C.DF_ID + "&" + C.TAIL;
  }

  return C.URL + "?series_ids=" + dfProvider + "/" + dfCode + "/" + seriaId + "&" + C.TAIL;
};

var _crUrl = function _crUrl(seriaId, option) {
  var dfProvider = option.dfProvider,
      dfCode = option.dfCode;
  option.seriaId = seriaId;
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

var _dfFnUrl = function _dfFnUrl(option) {
  return _isArr(option.items) ? _crUrl(getValue(option.items[0]), option) : _crUrl('', option);
};

var _crIdUrl = function _crIdUrl(option, dfProvider, dfCode, seriaId) {
  Object.assign(option, {
    seriaId: option.value,
    dfProvider: dfProvider,
    dfCode: dfCode
  });
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

var _trimStr = function _trimStr(str) {
  if (str === void 0) {
    str = '';
  }

  return str.trim();
};

var _idFnUrl = function _idFnUrl(option) {
  var _ref = option || '',
      value = _ref.value,
      arr = value.split('/');

  return _crIdUrl(option, _trimStr(arr[0]), _trimStr(arr[1]), _trimStr(arr[2]));
};

var _crSeriaId = function _crSeriaId(_ref2) {
  var dfPrefix = _ref2.dfPrefix,
      dfSufix = _ref2.dfSufix;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [dfPrefix].concat(args, [dfSufix]).filter(Boolean).join('.');
};

var _s1FnUrl = function _s1FnUrl(option) {
  var items = option.items,
      _seriaId = _crSeriaId(option, getValue(items[0]));

  return _crUrl(_seriaId, option);
};

var _s21FnUrl = function _s21FnUrl(option) {
  var items = option.items,
      df1Prefix = option.df1Prefix,
      df2Prefix = option.df2Prefix,
      _seriaId = _crSeriaId(option, df1Prefix, getValue(items[1]), df2Prefix, getValue(items[0]));

  return _crUrl(_seriaId, option);
};

var _s12FnUrl = function _s12FnUrl(option) {
  var items = option.items,
      df1Prefix = option.df1Prefix,
      df2Prefix = option.df2Prefix,
      _seriaId = _crSeriaId(option, df1Prefix, getValue(items[0]), df2Prefix, getValue(items[1]));

  return _crUrl(_seriaId, option);
};

var _s123BFnUrl = function _s123BFnUrl(option) {
  var items = option.items,
      df2Prefix = option.df2Prefix,
      _seriaId = _crSeriaId(option, getValue(items[0]), df2Prefix, getValue(items[1]), getValue(items[2]));

  return _crUrl(_seriaId, option);
};

var _s123FnUrl = function _s123FnUrl(option) {
  var items = option.items,
      _seriaId = _crSeriaId(option, getValue(items[0]), getValue(items[1]), getValue(items[2]));

  return _crUrl(_seriaId, option);
};

var _s3S12FnUrl = function _s3S12FnUrl(option) {
  var items = option.items,
      dfCode = option.dfCode,
      subtitle = option.subtitle,
      _seriaId = _crSeriaId(option, getValue(items[0]), getValue(items[1]));

  _assign(option, {
    dfCode: dfCode + ":" + getValue(items[2]),
    subtitle: (subtitle || []).split(':')[0] || ''
  });

  return _crUrl(_seriaId, option);
};

var _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s1: _s1FnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl,
  s123B: _s123BFnUrl,
  s123: _s123FnUrl,
  s3S12: _s3S12FnUrl
};
var DbNomicsApi = {
  getRequestUrl: function getRequestUrl(option) {
    if (option.url) {
      return option.url;
    }

    var dfFnUrl = option.dfFnUrl,
        _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;

    return option.url = _crUrl(option);
  },
  checkResponse: function checkResponse(json) {
    if (json && _isArr(json.errors)) {
      throw _crErr(json.errors[0].message);
    }

    var docs = json && json.series && json.series.docs;

    if (!_isArr(docs) || !docs[0] || !_isArr(docs[0].period) || !_isArr(docs[0].value)) {
      throw _crErr(C.MSG_EMPTY);
    }

    return true;
  }
};
var _default = DbNomicsApi;
exports["default"] = _default;
//# sourceMappingURL=DbNomicsApi.js.map
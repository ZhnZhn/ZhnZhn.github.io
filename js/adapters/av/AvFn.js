"use strict";

exports.__esModule = true;
exports.fCrData = exports.fAvApi = exports.crFunctionQuery = exports.REQ_ERROR = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _mathFn = require("../../math/mathFn");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
const API_URL = 'https://www.alphavantage.co/query';
const crFunctionQuery = value => `function=${value}`;
exports.crFunctionQuery = crFunctionQuery;
const fGetRequestUrl = getCrQuery => option => {
  const {
      apiKey
    } = option,
    _crQuery = getCrQuery(option),
    _queryParam = _crQuery(option);
  option.apiKey = void 0;
  return `${API_URL}?${_queryParam}&apikey=${apiKey}`;
};
const ERR_PROP = 'Error Message',
  INFO_PROP = 'Information';
const REQ_ERROR = exports.REQ_ERROR = 'Request Error';
const checkResponse = json => {
  if ((0, _isTypeFn.isEmpty)(json)) {
    throw (0, _AdapterFn.crError)();
  }
  const _msg = json[ERR_PROP] || json[INFO_PROP];
  if (_msg) {
    throw (0, _AdapterFn.crError)(REQ_ERROR, _msg);
  }
};
const fAvApi = getCrQuery => ({
  getRequestUrl: fGetRequestUrl(getCrQuery),
  checkResponse
});
exports.fAvApi = fAvApi;
const fCrData = (paramNameY, paramNameX, yConfig) => data => {
  const _crY = yConfig === '10' ? _isTypeFn.parseIntBy10 : yConfig === 'round' ? _mathFn.roundBy : parseFloat;
  return (data || []).reduce(function (arr, item) {
    if (item === void 0) {
      item = {};
    }
    const _y = _crY(item[paramNameY]);
    if ((0, _isTypeFn.isNumber)(_y)) {
      arr.push([(0, _AdapterFn.ymdToUTC)(item[paramNameX]), _y]);
    }
    return arr;
  }, []).sort(_compareByFn.compareByDate);
};
exports.fCrData = fCrData;
//# sourceMappingURL=AvFn.js.map
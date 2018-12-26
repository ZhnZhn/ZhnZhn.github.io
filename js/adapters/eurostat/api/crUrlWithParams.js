'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiFn = require('./apiFn');

var _apiFn2 = _interopRequireDefault(_apiFn);

var _mapFn = require('./mapFn');

var _mapFn2 = _interopRequireDefault(_mapFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = _apiFn2.default.URL,
    DF_TAIL = _apiFn2.default.DF_TAIL,
    isCategory = _apiFn2.default.isCategory;
var toQuery = _mapFn2.default.toQuery,
    toMapSlice = _mapFn2.default.toMapSlice;


var crUrlWithParams = function crUrlWithParams(option) {
  var seriaType = option.seriaType,
      dfTable = option.dfTable,
      time = option.time;


  if (!isCategory(seriaType)) {
    var _q = toQuery(option);
    return '' + URL + dfTable + '?' + _q + '&' + DF_TAIL;
  }

  var _toMapSlice = toMapSlice(DF_TAIL, option),
      query = _toMapSlice.query,
      zhMapSlice = _toMapSlice.zhMapSlice,
      _url = '' + URL + dfTable + '?' + query;

  if (seriaType === 'MAP') {
    option.zhMapSlice = zhMapSlice;
    return _url;
  } else {
    return _url + '&time=' + time;
  }
};

exports.default = crUrlWithParams;
//# sourceMappingURL=crUrlWithParams.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _apiFn = require('./apiFn');

var _apiFn2 = _interopRequireDefault(_apiFn);

var _mapFn = require('./mapFn');

var _mapFn2 = _interopRequireDefault(_mapFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = _apiFn2.default.URL,
    QUERY_TAIL = _apiFn2.default.QUERY_TAIL,
    isCategory = _apiFn2.default.isCategory;
var createMapValue = _mapFn2.default.createMapValue,
    createMapSlice = _mapFn2.default.createMapSlice;


var crUrl = function crUrl(option) {
  var seriaType = option.seriaType,
      metric = option.metric,
      geo = option.geo,
      itemMap = option.itemMap,
      time = option.time;


  if (!isCategory(seriaType)) {
    var _geo = 'geo=' + geo,
        _metric = metric.indexOf('?') === -1 ? metric + '?' : metric;

    return '' + URL + _metric + '&' + _geo + QUERY_TAIL;
  }

  var mapValue = itemMap.mapValue,
      mapSlice = itemMap.mapSlice,
      _mapValue = mapValue || createMapValue(option, itemMap);

  if (seriaType === 'MAP') {
    option.zhMapSlice = mapSlice ? (0, _extends3.default)({}, mapSlice, { time: time }) : (0, _extends3.default)({}, createMapSlice(option, itemMap), { time: time });
    return '' + URL + _mapValue;
  } else {
    return '' + URL + _mapValue + '&time=' + time;
  }
};

exports.default = crUrl;
//# sourceMappingURL=crUrl.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _fnArr = require('../../utils/fnArr');

var _fnArr2 = _interopRequireDefault(_fnArr);

var _mapFn = require('./mapFn');

var _mapFn2 = _interopRequireDefault(_mapFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInArrStr = _fnArr2.default.isInArrStr;
var toQuery = _mapFn2.default.toQuery,
    toMapSlice = _mapFn2.default.toMapSlice,
    createMapValue = _mapFn2.default.createMapValue,
    createMapSlice = _mapFn2.default.createMapSlice;


var URL = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
    QUERY_TAIL = "&precision=1&sinceTimePeriod=1996M01",
    DF_TAIL = "precision=1";

var REQUEST_ERROR = 'Request Error',
    MESSAGE_HEADER = '400: Bad Request\n';

var _crDetailMsg = function _crDetailMsg(label, option) {
  var _option$alertGeo = option.alertGeo,
      alertGeo = _option$alertGeo === undefined ? '' : _option$alertGeo,
      _option$alertMetric = option.alertMetric,
      alertMetric = _option$alertMetric === undefined ? '' : _option$alertMetric;

  return MESSAGE_HEADER + label + ('\n\nIt seems country-dataset doesn\'t exsist.\n' + alertGeo + ':' + alertMetric + '\n\nIf you use For Date input field in Dialog\ntry to use more late date.');
};

var _crErr = function _crErr(errCaption, message) {
  return {
    errCaption: errCaption, message: message
  };
};

var CATEGORY_TYPES = ['MAP', 'COLUMN', 'BAR'];
var _isCategory = isInArrStr(CATEGORY_TYPES);

var _crUrlWithParams = function _crUrlWithParams(option) {
  var seriaType = option.seriaType,
      dfTable = option.dfTable,
      time = option.time;


  if (!_isCategory(seriaType)) {
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

var _crUrl = function _crUrl(option) {
  var seriaType = option.seriaType,
      metric = option.metric,
      geo = option.geo,
      itemMap = option.itemMap,
      time = option.time;


  if (!_isCategory(seriaType)) {
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

var EuroStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfParams = option.dfParams;

    return dfParams ? _crUrlWithParams(option) : _crUrl(option);
  },
  checkResponse: function checkResponse(json, option) {
    var error = json.error;

    if (error) {
      var label = error.label;

      if (label) {
        throw _crErr(REQUEST_ERROR, _crDetailMsg(label, option));
      } else {
        throw _crErr(REQUEST_ERROR, '');
      }
    }
    return true;
  }
};

exports.default = EuroStatApi;
//# sourceMappingURL=EuroStatApi.js.map
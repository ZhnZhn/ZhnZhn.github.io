"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fnArr = require("../../utils/fnArr");

var _fnArr2 = _interopRequireDefault(_fnArr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isStrInArr = _fnArr2.default.isStrInArr;


var rootUrl = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
    queryTail = "&precision=1&sinceTimePeriod=1996M01";

var REQUEST_ERROR = 'Request Error',
    MESSAGE_HEADER = '400 : Bad Request\n';

var _crDetailMsg = function _crDetailMsg(option) {
  var _option$alertGeo = option.alertGeo,
      alertGeo = _option$alertGeo === undefined ? '' : _option$alertGeo,
      _option$alertMetric = option.alertMetric,
      alertMetric = _option$alertMetric === undefined ? '' : _option$alertMetric;

  return "\n\nIt seems country-dataset doesn't exsist.\n" + alertGeo + ":" + alertMetric + "\n\nIf you use For Date input field in Dialog\ntry to use more late date.";
};

var _categoryTypes = ['MAP', 'COLUMN', 'BAR'];

var _addParamTo = function _addParamTo(q, p) {
  return q ? q + '&' + p : p;
};

var _toQuery = function _toQuery(params, items) {
  var _q = '',
      i = 0;
  for (; i < params.length; i++) {
    _q = _addParamTo(_q, params[i] + "=" + items[i].value);
  }
  return _q;
};

var _toMapSlice = function _toMapSlice(params, items, time) {
  var zhMapSlice = { time: time },
      _max = params.length;
  var queryMap = '',
      i = void 0;
  for (i = 1; i < _max; i++) {
    queryMap = _addParamTo(queryMap, params[i] + "=" + items[i].value);
    zhMapSlice[params[i]] = items[i].value;
  }
  return {
    queryMap: queryMap, zhMapSlice: zhMapSlice
  };
};

var _crUrlWithParams = function _crUrlWithParams(option) {
  var seriaType = option.seriaType,
      dfParams = option.dfParams,
      dfTable = option.dfTable,
      dfTail = option.dfTail,
      items = option.items,
      time = option.time;


  if (!isStrInArr(seriaType)(_categoryTypes)) {
    var _query = _toQuery(dfParams, items),
        _tail = dfTail ? '&' + dfTail : '';
    return "" + rootUrl + dfTable + "?" + _query + _tail;
  } else {
    var _toMapSlice2 = _toMapSlice(dfParams, items, time),
        queryMap = _toMapSlice2.queryMap,
        zhMapSlice = _toMapSlice2.zhMapSlice;

    option.zhMapSlice = zhMapSlice;
    return "" + rootUrl + dfTable + "?" + queryMap + "&time=" + time;
  }
};

var EuroStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    var group = option.group,
        metric = option.metric,
        geo = option.geo,
        mapValue = option.mapValue,
        time = option.time,
        seriaType = option.seriaType,
        dfParams = option.dfParams;


    if (dfParams) {
      return _crUrlWithParams(option);
    }

    if (!isStrInArr(seriaType)(_categoryTypes)) {
      var _param = "geo=" + geo,
          _group = void 0;
      if (group) {
        _group = group + "?";
        if (metric) {
          _param = _param + "&indic=" + metric;
        }
      } else {
        _group = metric.indexOf('?') === -1 ? metric + "?" : metric;
        _param = "&" + _param;
      }

      return "" + rootUrl + _group + _param + queryTail;
    } else if (seriaType === 'COLUMN') {
      return "" + rootUrl + mapValue + "&sinceTimePeriod=" + time;
    } else if (seriaType === 'MAP') {
      return "" + rootUrl + mapValue;
    } else {
      return "" + rootUrl + mapValue + "&time=" + time;
    }
  },
  checkResponse: function checkResponse(json, option) {
    var error = json.error;

    if (error) {
      if (error.label) {
        throw {
          errCaption: REQUEST_ERROR,
          message: MESSAGE_HEADER + error.label + _crDetailMsg(option)
        };
      } else {
        throw {
          errCaption: REQUEST_ERROR,
          message: ''
        };
      }
    }
    return true;
  }
};

exports.default = EuroStatApi;
//# sourceMappingURL=EuroStatApi.js.map
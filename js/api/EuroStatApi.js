"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ArrayUtil = require("../utils/ArrayUtil");

var _ArrayUtil2 = _interopRequireDefault(_ArrayUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var EuroStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    var group = option.group,
        metric = option.metric,
        geo = option.geo,
        mapValue = option.mapValue,
        time = option.time,
        seriaType = option.seriaType;


    if (!_ArrayUtil2.default.isStrInArr(seriaType)(_categoryTypes)) {
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
      //return `${rootUrl}ei_lmhr_m?precision=1&lastTimePeriod=1&s_adj=NSA&time=2016M08`;
      return "" + rootUrl + mapValue + "&time=" + time;
      //return `${rootUrl}${mapValue}&sinceTimePeriod=${time}`;
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
        throw { errCaption: REQUEST_ERROR, message: '' };
      }
    }
    return true;
  }
};

exports.default = EuroStatApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\EuroStatApi.js.map
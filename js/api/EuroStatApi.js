"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var rootUrl = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
    queryTail = "&precision=1&sinceTimePeriod=1996M01";

var REQUEST_ERROR = 'Request Error',
    MESSAGE_HEADER = '400 : Bad Request\n';

var _crDetailMsg = function _crDetailMsg(option) {
  var _option$alertGeo = option.alertGeo;
  var alertGeo = _option$alertGeo === undefined ? '' : _option$alertGeo;
  var _option$alertMetric = option.alertMetric;
  var alertMetric = _option$alertMetric === undefined ? '' : _option$alertMetric;

  return "\n\nIt seems country-dataset doesn't exsist.\n" + alertGeo + ":" + alertMetric;
};

var EuroStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    var group = option.group;
    var metric = option.metric;
    var geo = option.geo;


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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var rootUrl = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
    queryTail = "&precision=1&sinceTimePeriod=1996M01";

var REQUEST_ERROR = 'Request Error',
    MESSAGE_HEADER = '400 : Bad Request\n';

var EuroStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    var group = option.group;
    var metric = option.metric;
    var geo = option.geo;

    return "" + rootUrl + group + "?geo=" + geo + "&indic=" + metric + queryTail;
  },
  checkResponse: function checkResponse(json) {
    var error = json.error;

    if (error) {
      if (error.label) {
        throw { errCaption: REQUEST_ERROR, message: MESSAGE_HEADER + error.label };
      } else {
        throw { errCaption: REQUEST_ERROR, message: '' };
      }
    }
    return true;
  }
};

exports.default = EuroStatApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\EuroStatApi.js.map
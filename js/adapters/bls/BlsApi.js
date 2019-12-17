"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: 'https://api.bls.gov/publicAPI/v1/timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};

var _addNativeLinkTo = function _addNativeLinkTo(option) {
  var value = option.value;
  Object.assign(option, {
    linkItem: {
      caption: 'BSL Data Link',
      href: C.NATIVE_URL + "/" + value
    }
  });
};

var BlsApi = {
  /*
  crOptionFetch(option){
    const { value='' } = option
    return {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seriesid: [ value ],
        startyear: "2010",
        endyear: "2018"
      })
      };
  },
  */
  getRequestUrl: function getRequestUrl(option) {
    var _option$proxy = option.proxy,
        proxy = _option$proxy === void 0 ? '' : _option$proxy,
        _option$value = option.value,
        value = _option$value === void 0 ? '' : _option$value;

    _addNativeLinkTo(option);

    return "" + proxy + C.URL + "/" + value;
  },
  checkResponse: function checkResponse(json) {
    var _ref = json || {},
        _ref$Results = _ref.Results,
        Results = _ref$Results === void 0 ? {} : _ref$Results,
        _Results$series = Results.series,
        series = _Results$series === void 0 ? [] : _Results$series;

    return series[0] && Array.isArray(series[0].data);
  }
};
var _default = BlsApi;
exports["default"] = _default;
//# sourceMappingURL=BlsApi.js.map
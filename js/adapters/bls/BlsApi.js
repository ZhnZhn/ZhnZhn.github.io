'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  URL: 'https://api.bls.gov/publicAPI/v1/timeseries/data'
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
        proxy = _option$proxy === undefined ? '' : _option$proxy,
        _option$value = option.value,
        value = _option$value === undefined ? '' : _option$value;

    return '' + proxy + C.URL + '/' + value;
  },
  checkResponse: function checkResponse(json) {
    var _ref = json || {},
        _ref$Results = _ref.Results,
        Results = _ref$Results === undefined ? {} : _ref$Results,
        _Results$series = Results.series,
        series = _Results$series === undefined ? [] : _Results$series;

    return series[0] && Array.isArray(series[0].data);
  }
};

exports.default = BlsApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\bls\BlsApi.js.map
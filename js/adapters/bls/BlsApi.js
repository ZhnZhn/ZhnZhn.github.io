"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var C = {
  URL: 'https://api.bls.gov/publicAPI/v1/timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};
var _isArr = Array.isArray,
    _assign = Object.assign,
    crTitle = _fnAdapter["default"].crTitle;

var _addNativeLinkTo = function _addNativeLinkTo(option) {
  var _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value;

  _assign(option, {
    linkItem: {
      caption: 'BSL Data Link',
      href: C.NATIVE_URL + "/" + value
    }
  });
};

var _setCaptionTo = function _setCaptionTo(option) {
  var title = option.title;

  _assign(option, {
    itemCaption: title,
    title: crTitle(option),
    subtitle: title
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
    var _option$value2 = option.value,
        value = _option$value2 === void 0 ? '' : _option$value2;

    _addNativeLinkTo(option);

    _setCaptionTo(option);

    return C.URL + "/" + value;
  },
  checkResponse: function checkResponse(json) {
    var _ref = json || {},
        _ref$Results = _ref.Results,
        Results = _ref$Results === void 0 ? {} : _ref$Results,
        _Results$series = Results.series,
        series = _Results$series === void 0 ? [] : _Results$series;

    return series[0] && _isArr(series[0].data);
  }
};
var _default = BlsApi;
exports["default"] = _default;
//# sourceMappingURL=BlsApi.js.map
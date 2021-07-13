"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var C = {
  URL: 'https://api.bls.gov/publicAPI/v2/timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};
var _isArr = Array.isArray,
    _assign = Object.assign,
    crTitle = _fnAdapter["default"].crTitle;

var _getValue = function _getValue(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items;
  return items[0].v;
};

var _addNativeLinkTo = function _addNativeLinkTo(option) {
  var value = _getValue(option);

  _assign(option, {
    linkItem: {
      caption: 'BLS Data Link',
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
  getRequestUrl: function getRequestUrl(option) {
    var value = _getValue(option);

    _addNativeLinkTo(option);

    _setCaptionTo(option);

    return C.URL + "/" + value;
  },
  checkResponse: function checkResponse(json) {
    var _ref2 = json || {},
        Results = _ref2.Results,
        _ref3 = Results || {},
        _ref3$series = _ref3.series,
        series = _ref3$series === void 0 ? [] : _ref3$series;

    return series[0] && _isArr(series[0].data);
  }
};
var _default = BlsApi;
exports["default"] = _default;
//# sourceMappingURL=BlsApi.js.map
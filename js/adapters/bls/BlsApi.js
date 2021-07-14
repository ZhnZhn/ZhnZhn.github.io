"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var C = {
  URL: 'https://api.bls.gov/publicAPI',
  TS_DATA: 'timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};
var _isArr = Array.isArray,
    _assign = Object.assign,
    crError = _fnAdapter["default"].crError,
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

var _crQuery = function _crQuery(_ref2) {
  var apiKey = _ref2.apiKey;
  return apiKey ? "?registrationkey=" + apiKey : '';
};

var BlsApi = {
  getRequestUrl: function getRequestUrl(option) {
    var value = _getValue(option),
        _query = _crQuery(option),
        _v = _query ? 'v2' : 'v1';

    _addNativeLinkTo(option);

    _setCaptionTo(option);

    return C.URL + "/" + _v + "/" + C.TS_DATA + "/" + value + _query;
  },
  checkResponse: function checkResponse(json) {
    var _ref3 = json || {},
        Results = _ref3.Results,
        _ref3$message = _ref3.message,
        message = _ref3$message === void 0 ? [] : _ref3$message,
        _ref4 = Results || {},
        series = _ref4.series,
        _s = (series || [])[0];

    if (_s && _isArr(_s.data)) {
      return true;
    }

    throw crError('', message[0]);
  }
};
var _default = BlsApi;
exports["default"] = _default;
//# sourceMappingURL=BlsApi.js.map
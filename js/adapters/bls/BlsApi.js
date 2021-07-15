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
    crTitle = _fnAdapter["default"].crTitle,
    getYear = _fnAdapter["default"].getYear,
    getCurrentYear = _fnAdapter["default"].getCurrentYear,
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _getValue = function _getValue(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items;
  return items[0].v;
};

var _addNativeLinkTo = function _addNativeLinkTo(option) {
  var value = _getValue(option);

  _assign(option, {
    linkItem: {
      caption: 'U.S. BLS Data Link',
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

var _crQueryKey = function _crQueryKey(_ref2) {
  var apiKey = _ref2.apiKey;
  return apiKey ? "?registrationkey=" + apiKey : '';
};

var _crQueryPeriod = function _crQueryPeriod(queryKey, _ref3) {
  var fromDate = _ref3.fromDate;

  if (!queryKey) {
    return '';
  }

  var _startyear = parseInt(getYear(fromDate), 10),
      _endyear = parseInt(getCurrentYear(), 10);

  if (_isNumber(_startyear) && _isNumber(_endyear) && _endyear - _startyear < 21) {
    return "&startyear=" + _startyear + "&endyear=" + _endyear;
  }

  return '';
};

var BlsApi = {
  getRequestUrl: function getRequestUrl(option) {
    var value = _getValue(option),
        _queryKey = _crQueryKey(option),
        _v = _queryKey ? 'v2' : 'v1',
        _queryPeriod = _crQueryPeriod(_queryKey, option);

    _addNativeLinkTo(option);

    _setCaptionTo(option);

    return C.URL + "/" + _v + "/" + C.TS_DATA + "/" + value + _queryKey + _queryPeriod;
  },
  checkResponse: function checkResponse(json) {
    var _ref4 = json || {},
        Results = _ref4.Results,
        _ref4$message = _ref4.message,
        message = _ref4$message === void 0 ? [] : _ref4$message,
        _ref5 = Results || {},
        series = _ref5.series,
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
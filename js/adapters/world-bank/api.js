"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crError = _fnAdapter["default"].crError,
    getCi = _fnAdapter["default"].getCi;
var C = {
  URL: 'https://api.worldbank.org/v2',
  NATIVE_URL: 'https://data.worldbank.org/indicator'
};
var _assign = Object.assign,
    _isArr = Array.isArray;

var _addNativeLinkTo = function _addNativeLinkTo(option) {
  var _getCi = getCi(option),
      country = _getCi.country,
      indicator = _getCi.indicator;

  _assign(option, {
    linkItem: {
      caption: 'World Bank',
      href: C.NATIVE_URL + "/" + indicator + "?locations=" + country
    }
  });
};

var api = {
  getRequestUrl: function getRequestUrl(option) {
    var _getCi2 = getCi(option),
        country = _getCi2.country,
        indicator = _getCi2.indicator;

    _addNativeLinkTo(option);

    return C.URL + "/countries/" + country + "/indicators/" + indicator + "?date=1990:2020&format=json";
  },
  checkResponse: function checkResponse(json) {
    if (_isArr(json)) {
      return true;
    }

    throw crError();
  }
};
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=api.js.map
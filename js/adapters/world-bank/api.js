"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: 'https://api.worldbank.org/v2',
  NATIVE_URL: 'https://data.worldbank.org/indicator'
};

var _addNativeLinkTo = function _addNativeLinkTo(option) {
  var one = option.one,
      two = option.two;
  Object.assign(option, {
    linkItem: {
      caption: 'World Bank',
      href: C.NATIVE_URL + "/" + two + "?locations=" + one
    }
  });
};

var api = {
  getRequestUrl: function getRequestUrl(option) {
    var one = option.one,
        two = option.two;

    _addNativeLinkTo(option);

    return C.URL + "/countries/" + one + "/indicators/" + two + "?date=1990:2018&format=json";
  },
  checkResponse: function checkResponse(json) {
    return Array.isArray(json);
  }
};
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=api.js.map
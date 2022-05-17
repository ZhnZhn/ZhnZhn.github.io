"use strict";

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

const URL = 'https://api.worldbank.org/v2',
      NATIVE_URL = 'https://data.worldbank.org/indicator';
const _assign = Object.assign,
      _isArr = Array.isArray;

const _addNativeLinkTo = option => {
  const {
    country,
    indicator
  } = (0, _fnAdapter.getCi)(option);

  _assign(option, {
    linkItem: {
      caption: 'World Bank',
      href: NATIVE_URL + "/" + indicator + "?locations=" + country
    }
  });
};

const api = {
  getRequestUrl(option) {
    const {
      country,
      indicator
    } = (0, _fnAdapter.getCi)(option);

    _addNativeLinkTo(option);

    return URL + "/countries/" + country + "/indicators/" + indicator + "?date=1990:2020&format=json";
  },

  checkResponse(json) {
    if (_isArr(json)) {
      return true;
    }

    throw (0, _fnAdapter.crError)();
  }

};
var _default = api;
exports.default = _default;
//# sourceMappingURL=api.js.map
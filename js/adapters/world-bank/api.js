"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const URL = 'https://api.worldbank.org/v2',
  NATIVE_URL = 'https://data.worldbank.org/indicator';
const api = {
  getRequestUrl(option) {
    const [country, indicator] = (0, _fnAdapter.getCi)(option);
    (0, _AdapterFn.assign)(option, {
      linkItem: {
        caption: 'World Bank',
        href: NATIVE_URL + "/" + indicator + "?locations=" + country
      }
    });
    return URL + "/countries/" + country + "/indicators/" + indicator + "?date=1990:2023&format=json";
  },
  checkResponse(json) {
    if (!(0, _AdapterFn.isArr)(json)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = api;
//# sourceMappingURL=api.js.map
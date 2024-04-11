"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _fnAdapter = require("./fnAdapter");
const URL = 'https://api.worldbank.org/v2',
  NATIVE_URL = 'https://data.worldbank.org/indicator',
  _crCountryIndicatorToken = (country, indicator) => "countries/" + country + "/indicators/" + indicator;
const api = {
  getRequestUrl(option) {
    const [country, indicator] = (0, _fnAdapter.getCi)(option),
      _isCategory = (0, _CategoryFn.isCategory)(option.seriaType),
      _locations = _isCategory ? "1W" : country;
    (0, _AdapterFn.assign)(option, {
      linkItem: {
        caption: 'World Bank',
        href: NATIVE_URL + "/" + indicator + "?locations=" + _locations
      }
    });
    return _isCategory ? URL + "/" + _crCountryIndicatorToken("all", indicator) + "?date=" + option.time + "&format=json&per_page=305" : URL + "/" + _crCountryIndicatorToken(country, indicator) + "?date=1990:2023&format=json";
  },
  checkResponse(json) {
    if (!(0, _AdapterFn.isArr)(json)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = api;
//# sourceMappingURL=api.js.map
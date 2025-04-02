"use strict";

exports.__esModule = true;
exports.getCountryById = exports.getAsyncHmIdCountry = void 0;
var _fnFetch = require("../../utils/fnFetch");
var _fGetLazyValue = require("../../utils/fGetLazyValue");
const URL_ID_COUNTRY = './data/eurostat/id-country.json';
const _fetchHmIdCountry = () => (0, _fnFetch.fetchJsonHm)(URL_ID_COUNTRY);
const getAsyncHmIdCountry = exports.getAsyncHmIdCountry = (0, _fGetLazyValue.fGetLazyValue)(_fetchHmIdCountry, true);
const getCountryById = id => (getAsyncHmIdCountry(true) || {})[id] || id;
exports.getCountryById = getCountryById;
//# sourceMappingURL=fetchHmIdCountry.js.map
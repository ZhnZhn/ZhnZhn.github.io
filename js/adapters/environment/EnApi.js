"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const DATA_URL = './data/environment';
const _crLineUrl = option => `${DATA_URL}/${(0, _AdapterFn.getValues)(option)[0]}.json`;
const getRequestUrl = option => _crLineUrl(option),
  EnApi = (0, _ApiFn.crProviderApi)(getRequestUrl);
var _default = exports.default = EnApi;
//# sourceMappingURL=EnApi.js.map
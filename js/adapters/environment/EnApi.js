"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const DATA_URL = './data/environment';
const _crLineUrl = option => `${DATA_URL}/${(0, _AdapterFn.getValues)(option)[0]}.json`;
const EnApi = {
  getRequestUrl(option) {
    return _crLineUrl(option);
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)()
};
var _default = exports.default = EnApi;
//# sourceMappingURL=EnApi.js.map
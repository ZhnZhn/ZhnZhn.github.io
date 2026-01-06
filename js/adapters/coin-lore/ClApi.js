"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
const API_URL = 'https://api.coinlore.net/api';
const ClApi = {
  getRequestUrl(option) {
    const {
        items = []
      } = option,
      {
        v: id
      } = items[0];
    return `${API_URL}/exchange/?id=${id}`;
  },
  checkResponse(json, option) {
    const {
      pairs
    } = json || {};
    if (!(0, _isTypeFn.isArr)(pairs)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = ClApi;
//# sourceMappingURL=ClApi.js.map
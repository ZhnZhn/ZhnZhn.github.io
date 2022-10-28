"use strict";

exports.__esModule = true;
exports.default = void 0;

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
    return API_URL + "/exchange/?id=" + id;
  },

  checkResponse(json, option) {
    const {
      pairs
    } = json || {};

    if ((0, _AdapterFn.isArr)(pairs)) {
      return true;
    }

    throw (0, _AdapterFn.crError)();
  }

};
var _default = ClApi;
exports.default = _default;
//# sourceMappingURL=ClApi.js.map
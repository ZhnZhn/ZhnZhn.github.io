"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = 'https://api.wto.org/timeseries/v1/data';
const WtApi = {
  getRequestUrl(option) {
    const {
        proxy,
        items,
        dfInd,
        apiKey
      } = option,
      _r = (0, _AdapterFn.getValue)(items[0]),
      _pc = (0, _AdapterFn.getValue)(items[1]) || "TO";
    return "" + proxy + API_URL + "?i=" + dfInd + "&r=" + _r + "&p=000&pc=" + _pc + "&ps=2005-2024&subscription-key=" + apiKey;
  },
  checkResponse(json, option) {
    const {
      Dataset
    } = json || {};
    if (!(0, _AdapterFn.isArr)(Dataset)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = WtApi;
//# sourceMappingURL=WtApi.js.map
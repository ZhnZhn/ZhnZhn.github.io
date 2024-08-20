"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = `https://data-api.${_fnAdapter.ECB_EUROPA_EU}/service/data`;
const EcbApi = {
  getRequestUrl(option) {
    return `${option.proxy}${API_URL}/${option.dfR}/${(0, _fnAdapter.crItemId)(option)}?format=jsondata&detail=dataonly&startPeriod=${option.fromDate}`;
  },
  checkResponse(json) {
    if (!(0, _AdapterFn.isObj)((0, _fnAdapter.getSeriesObservertions)(json))) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = EcbApi;
//# sourceMappingURL=EcbApi.js.map
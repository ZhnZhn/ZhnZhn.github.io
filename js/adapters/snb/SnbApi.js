"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = "https://data.snb.ch/api/cube";
const _crDimSel = options => options.items.map(item => item.v).join(',');
const SnbApi = {
  getRequestUrl(options) {
    return `${options.proxy}${API_URL}/${options.dfId}/data/json/en?dimSel=${_crDimSel(options)}&fromDate=${options.fromDate}`;
  },
  checkResponse(json, option) {
    if (!(0, _AdapterFn.isArr)((0, _fnAdapter.getTimeSeriesValues)(json))) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = SnbApi;
//# sourceMappingURL=SnbApi.js.map
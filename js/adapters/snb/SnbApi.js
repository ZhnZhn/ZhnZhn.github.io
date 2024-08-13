"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = `${_fnAdapter.DATA_SNB_URL}/api/cube`;
const _isDimensionId = id => id === "D0" || id === "D1",
  _crItem = _ref => {
    let {
      id,
      v
    } = _ref;
    return _isDimensionId(id) ? `${id}(${v})` : v;
  };
const _crDimSel = options => options.items.map(_crItem).sort().join(',');
const SnbApi = {
  getRequestUrl(options) {
    return `${options.proxy}${API_URL}/${options.dfId}/data/json/en?dimSel=${_crDimSel(options)}&fromDate=${options.fromDate}`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(_fnAdapter.getTimeSeriesValues)
};
var _default = exports.default = SnbApi;
//# sourceMappingURL=SnbApi.js.map
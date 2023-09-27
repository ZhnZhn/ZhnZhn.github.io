"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const DATA_URL = './data/ei';
const _crApiUrl = option => {
  const {
      items
    } = option,
    metric = items[1].v;
  return DATA_URL + "/" + metric;
};
const _crLineUrl = option => {
  const {
      items
    } = option,
    geo = items[0].v;
  return _crApiUrl(option) + "/" + geo + ".json";
};
const IrenaApi = {
  getRequestUrl(option) {
    return _crLineUrl(option);
  },
  checkResponse(json) {
    const {
      data
    } = json || {};
    return (0, _AdapterFn.isArr)(data);
  }
};
var _default = exports.default = IrenaApi;
//# sourceMappingURL=EiApi.js.map
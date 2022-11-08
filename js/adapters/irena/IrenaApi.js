"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

const DATA_URL = './data/irena';
const IrenaApi = {
  getRequestUrl(option) {
    const {
      items
    } = option,
          metric = items[1].v,
          source = items[2].v,
          geo = items[0].v;
    return DATA_URL + "/" + metric + "/" + source + "/" + geo + ".json";
  },

  checkResponse(json) {
    const {
      data
    } = json || {};
    return (0, _AdapterFn.isArr)(data);
  }

};
var _default = IrenaApi;
exports.default = _default;
//# sourceMappingURL=IrenaApi.js.map
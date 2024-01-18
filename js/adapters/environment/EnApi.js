"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const DATA_URL = './data/environment';
const _crLineUrl = option => {
  const {
      items
    } = option,
    id = (0, _AdapterFn.getValue)(items[0]);
  return `${DATA_URL}/${id}.json`;
};
const EnApi = {
  getRequestUrl(option) {
    return _crLineUrl(option);
  },
  checkResponse(json) {
    const {
      data
    } = json || {};
    if (!(0, _AdapterFn.isArr)(data)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = EnApi;
//# sourceMappingURL=EnApi.js.map
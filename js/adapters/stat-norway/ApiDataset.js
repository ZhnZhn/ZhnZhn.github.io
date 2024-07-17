"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://data.ssb.no/api/v0/dataset";
const DatasetApi = {
  getRequestUrl(option) {
    const {
      dfId
    } = option;
    return `${API_URL}/${dfId}.json?lang=en`;
  },
  checkResponse(json) {
    const {
      error
    } = json || {};
    if (error) {
      throw (0, _AdapterFn.crErrorByMessage)(error);
    }
  }
};
var _default = exports.default = DatasetApi;
//# sourceMappingURL=ApiDataset.js.map
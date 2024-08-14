"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://www.bankofcanada.ca/valet/observations';
const BocApi = {
  getRequestUrl(options) {
    return `${API_URL}/${(0, _fnAdapter.getSeriesId)(options)}/json?start_date=${options.fromDate}`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(_fnAdapter.getObservationsData)
};
var _default = exports.default = BocApi;
//# sourceMappingURL=BocApi.js.map
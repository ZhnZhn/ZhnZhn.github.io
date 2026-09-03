"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://www.bankofcanada.ca/valet/observations';
const getRequestUrl = options => `${API_URL}/${(0, _fnAdapter.getSeriesId)(options)}/json?start_date=${options.fromDate}`,
  checkResponse = (0, _AdapterFn.fCheckResponse)(_fnAdapter.getObservationsData),
  BocApi = (0, _ApiFn.crProviderApi)(getRequestUrl, checkResponse);
var _default = exports.default = BocApi;
//# sourceMappingURL=BocApi.js.map
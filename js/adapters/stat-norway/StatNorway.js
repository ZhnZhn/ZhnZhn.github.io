"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.StatNorway2 = exports.StatNorway = void 0;
var _ApiDataset = _interopRequireDefault(require("./ApiDataset"));
var _StatJsonAdapter = _interopRequireDefault(require("../stat-json/StatJsonAdapter"));
var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));
const DATA_URL = 'https://data.ssb.no/api/v0/en/table';
const StatNorway = exports.StatNorway = {
  api: _ApiDataset.default,
  adapter: _StatJsonAdapter.default
};
const StatNorway2 = exports.StatNorway2 = (0, _fStatJsonAdapter.default)(DATA_URL);
//# sourceMappingURL=StatNorway.js.map
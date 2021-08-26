"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ApiDataset = _interopRequireDefault(require("./ApiDataset"));

var _StatJsonAdapter = _interopRequireDefault(require("../stat-json/StatJsonAdapter"));

var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));

const DATA_URL = 'https://data.ssb.no/api/v0/en/table';
const StatNorway = {
  StatNorway: {
    api: _ApiDataset.default,
    adapter: _StatJsonAdapter.default
  },
  StatNorway2: (0, _fStatJsonAdapter.default)(DATA_URL)
};
var _default = StatNorway;
exports.default = _default;
//# sourceMappingURL=StatNorway.js.map
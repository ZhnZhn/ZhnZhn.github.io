"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ApiDataset = _interopRequireDefault(require("./ApiDataset"));

var _ApiTable = _interopRequireDefault(require("./ApiTable"));

var _StatJsonAdapter = _interopRequireDefault(require("../stat-json/StatJsonAdapter"));

const StatNorway = {
  StatNorway: {
    api: _ApiDataset.default,
    adapter: _StatJsonAdapter.default
  },
  StatNorway2: {
    api: _ApiTable.default,
    optionFetch: _ApiTable.default.crOptionFetch,
    adapter: _StatJsonAdapter.default
  }
};
var _default = StatNorway;
exports.default = _default;
//# sourceMappingURL=StatNorway.js.map
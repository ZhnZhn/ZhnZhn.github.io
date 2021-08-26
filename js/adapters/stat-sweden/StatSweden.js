"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ApiTable = _interopRequireDefault(require("./ApiTable"));

var _StatJsonAdapter = _interopRequireDefault(require("../stat-json/StatJsonAdapter"));

const StatSweden = {
  api: _ApiTable.default,
  optionFetch: _ApiTable.default.crOptionFetch,
  adapter: _StatJsonAdapter.default
};
var _default = StatSweden;
exports.default = _default;
//# sourceMappingURL=StatSweden.js.map
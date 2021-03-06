"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ApiTable = _interopRequireDefault(require("./ApiTable"));

var _StatNorwayAdapter = _interopRequireDefault(require("../stat-norway/StatNorwayAdapter"));

var StatFinland = {
  api: _ApiTable["default"],
  optionFetch: _ApiTable["default"].crOptionFetch,
  adapter: _StatNorwayAdapter["default"]
};
var _default = StatFinland;
exports["default"] = _default;
//# sourceMappingURL=StatFinland.js.map
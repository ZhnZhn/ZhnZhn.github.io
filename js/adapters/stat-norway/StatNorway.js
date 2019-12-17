"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ApiDataset = _interopRequireDefault(require("./ApiDataset"));

var _ApiTable = _interopRequireDefault(require("./ApiTable"));

var _StatNorwayAdapter = _interopRequireDefault(require("./StatNorwayAdapter"));

var StatNorway = {
  Dataset: {
    api: _ApiDataset["default"],
    adapter: _StatNorwayAdapter["default"]
  },
  Table: {
    api: _ApiTable["default"],
    optionFetch: _ApiTable["default"].crOptionFetch,
    adapter: _StatNorwayAdapter["default"]
  }
};
var _default = StatNorway;
exports["default"] = _default;
//# sourceMappingURL=StatNorway.js.map
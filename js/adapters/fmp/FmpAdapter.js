"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapter = _interopRequireDefault(require("../crAdapter"));

var _RouterAdapter = _interopRequireDefault(require("./RouterAdapter"));

var FmpAdapter = (0, _crAdapter["default"])(_RouterAdapter["default"].getAdapter);
var _default = FmpAdapter;
exports["default"] = _default;
//# sourceMappingURL=FmpAdapter.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

const diff = (y1, y2) => parseFloat((0, _big.default)(y1).minus(y2).toString());

var _default = diff;
exports.default = _default;
//# sourceMappingURL=diff.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

const rate = (y1, y2) => parseFloat((0, _big.default)(y1).div(y2).toFixed(2));

var _default = rate;
exports.default = _default;
//# sourceMappingURL=rate.js.map
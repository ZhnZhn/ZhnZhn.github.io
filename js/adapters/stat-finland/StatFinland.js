"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));

const DATA_URL = 'https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin';
const StatFinland = (0, _fStatJsonAdapter.default)(DATA_URL);
var _default = StatFinland;
exports.default = _default;
//# sourceMappingURL=StatFinland.js.map
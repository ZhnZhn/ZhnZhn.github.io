"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fTableApi = _interopRequireDefault(require("../stat-json/fTableApi"));

var ROOT_URL = 'https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin';
var TableApi = (0, _fTableApi["default"])(ROOT_URL);
var _default = TableApi;
exports["default"] = _default;
//# sourceMappingURL=ApiTable.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));

const DATA_URL = 'https://api.statbank.dk/v1/data';
const StatDenmark = (0, _fStatJsonAdapter.default)(DATA_URL);
var _default = StatDenmark;
exports.default = _default;
//# sourceMappingURL=StatDenmark.js.map
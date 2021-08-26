"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));

const DATA_URL = 'https://api.scb.se/OV0104/v1/doris/en/ssd';
const StatSweden = (0, _fStatJsonAdapter.default)(DATA_URL);
var _default = StatSweden;
exports.default = _default;
//# sourceMappingURL=StatSweden.js.map
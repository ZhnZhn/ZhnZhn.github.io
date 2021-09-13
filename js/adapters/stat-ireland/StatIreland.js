"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));

const DATA_URL = 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en';
const StatIreland = (0, _fStatJsonAdapter.default)(DATA_URL);
var _default = StatIreland;
exports.default = _default;
//# sourceMappingURL=StatIreland.js.map
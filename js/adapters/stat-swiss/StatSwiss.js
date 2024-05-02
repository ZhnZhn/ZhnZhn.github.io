"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));
const DATA_URL = 'https://www.pxweb.bfs.admin.ch/api/v1/en';
const crUrlPath = _ref => {
  let {
    dfId
  } = _ref;
  return "/" + dfId + "/" + dfId + ".px";
};
const StatSwiss = (0, _fStatJsonAdapter.default)(DATA_URL, crUrlPath);
var _default = exports.default = StatSwiss;
//# sourceMappingURL=StatSwiss.js.map
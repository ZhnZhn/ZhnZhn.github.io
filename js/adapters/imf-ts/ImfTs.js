"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ImfTsApi = _interopRequireDefault(require("./ImfTsApi"));
var _toTsLineAdapter = require("../toTsLineAdapter");
const ImfTs = {
  api: _ImfTsApi.default,
  adapter: _toTsLineAdapter.toRouteTsLineAdapter
};
var _default = exports.default = ImfTs;
//# sourceMappingURL=ImfTs.js.map
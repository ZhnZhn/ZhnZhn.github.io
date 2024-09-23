"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fnFetch = require("../../utils/fnFetch");
var _BisApi = _interopRequireDefault(require("./BisApi"));
var _BisAdapter = _interopRequireDefault(require("./BisAdapter"));
const Bis = {
  fnFetch: _fnFetch.fetchTxt,
  api: _BisApi.default,
  adapter: _BisAdapter.default
};
var _default = exports.default = Bis;
//# sourceMappingURL=Bis.js.map
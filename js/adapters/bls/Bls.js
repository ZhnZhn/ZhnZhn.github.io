"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _BlsAdapter = _interopRequireDefault(require("./BlsAdapter"));

var _BlsApi = _interopRequireDefault(require("./BlsApi"));

var Bls = {
  adapter: _BlsAdapter["default"],
  api: _BlsApi["default"]
};
var _default = Bls;
exports["default"] = _default;
//# sourceMappingURL=Bls.js.map
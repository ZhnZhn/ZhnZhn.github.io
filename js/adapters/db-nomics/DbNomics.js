"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DbNomicsApi = _interopRequireDefault(require("./DbNomicsApi"));

var _DbNomicsAdapter = _interopRequireDefault(require("./DbNomicsAdapter"));

var DbNomics = {
  api: _DbNomicsApi["default"],
  adapter: _DbNomicsAdapter["default"]
};
var _default = DbNomics;
exports["default"] = _default;
//# sourceMappingURL=DbNomics.js.map
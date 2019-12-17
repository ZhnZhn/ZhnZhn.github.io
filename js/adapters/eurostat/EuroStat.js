"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _EuroStatApi = _interopRequireDefault(require("./EuroStatApi"));

var _EuroStatAdapter = _interopRequireDefault(require("./EuroStatAdapter"));

var EuroStat = {
  api: _EuroStatApi["default"],
  adapter: _EuroStatAdapter["default"]
};
var _default = EuroStat;
exports["default"] = _default;
//# sourceMappingURL=EuroStat.js.map
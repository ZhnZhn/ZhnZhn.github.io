"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _FaoStatApi = _interopRequireDefault(require("./FaoStatApi"));

var _FaoStatAdapter = _interopRequireDefault(require("./FaoStatAdapter"));

var FaoStat = {
  api: _FaoStatApi["default"],
  adapter: _FaoStatAdapter["default"]
};
var _default = FaoStat;
exports["default"] = _default;
//# sourceMappingURL=FaoStat.js.map
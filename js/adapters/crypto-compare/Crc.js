"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _CrcAdapter = _interopRequireDefault(require("./CrcAdapter"));

var _CrcApi = _interopRequireDefault(require("./CrcApi"));

var Crc = {
  api: _CrcApi["default"],
  adapter: _CrcAdapter["default"]
};
var _default = Crc;
exports["default"] = _default;
//# sourceMappingURL=Crc.js.map
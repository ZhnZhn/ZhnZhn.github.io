"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toHdConfig = _interopRequireDefault(require("./toHdConfig"));
const CrcAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  rAdapter: {
    DF: _toHdConfig.default
  }
});
var _default = exports.default = CrcAdapter;
//# sourceMappingURL=CrcAdapter.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _UnComtrade = _interopRequireDefault(require("../../adapters/uncomtrade/UnComtrade"));
var _UnDialog = _interopRequireDefault(require("./UnDialog5"));
var _UnDialogAgg = _interopRequireDefault(require("./UnDialogAgg"));
const Dialogs = {
  _a: _UnComtrade.default,
  UnDialog5: _UnDialog.default,
  UnDialogAgg: _UnDialogAgg.default
};
var _default = exports.default = Dialogs;
//# sourceMappingURL=UnDialogs.js.map
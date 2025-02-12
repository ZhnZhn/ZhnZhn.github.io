"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CustomizeExportDialog = _interopRequireDefault(require("./CustomizeExportDialog"));
var _StocksBySectorDialog = _interopRequireDefault(require("./StocksBySectorDialog"));
var _StyleDotSeriesDialog = _interopRequireDefault(require("./StyleDotSeriesDialog"));
const ModalDialogs = {
  CeDialog: _CustomizeExportDialog.default,
  SbsDialog: _StocksBySectorDialog.default,
  CrDialog: _StyleDotSeriesDialog.default
};
var _default = exports.default = ModalDialogs;
//# sourceMappingURL=ModalDialogs.js.map
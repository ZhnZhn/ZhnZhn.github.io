"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CustomizeExportDialog = _interopRequireDefault(require("./CustomizeExportDialog"));
var _StocksBySectorDialog = _interopRequireDefault(require("./StocksBySectorDialog"));
var _ColumnRangeDialog = _interopRequireDefault(require("./ColumnRangeDialog"));
const ModalDialogs = {
  CeDialog: _CustomizeExportDialog.default,
  SbsDialog: _StocksBySectorDialog.default,
  CrDialog: _ColumnRangeDialog.default
};
var _default = exports.default = ModalDialogs;
//# sourceMappingURL=ModalDialogs.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ComponentActions = exports.CAT_CLOSE_CHART_CONTAINER = void 0;
var _refluxCore = _interopRequireDefault(require("reflux-core"));
var _storeApi = require("../storeApi");
var _compStore = require("../stores/compStore");
var _ModalDialogType = require("../../constants/ModalDialogType");
const CAT_CLOSE_CHART_CONTAINER = exports.CAT_CLOSE_CHART_CONTAINER = 'closeChartContainer';
const CA = _refluxCore.default.createActions({
  [CAT_CLOSE_CHART_CONTAINER]: {}
});
Object.assign(CA, {
  showDescription: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_DESCRIPTION),
  showSettings: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_SETTINGS),
  showPasteTo: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_PASTE_TO),
  zoom: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ZOOM),
  showReload: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_RELOAD),
  showAlert: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ALERT),
  showAsk: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ASK),
  showCustomizeExport: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_CUSTOMIZE_EXPORT),
  showAddToWatch: (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ADD_TO_WATCH)
});
CA.showConfigChart = (0, _storeApi.bindTo)(_compStore.showOptionDialog, 'ChartConfigDialog');
const ComponentActions = exports.ComponentActions = CA;
//# sourceMappingURL=ComponentActions.js.map
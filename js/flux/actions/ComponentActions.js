"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ComponentActions = exports.CAT_SHOW_OPTION_DIALOG = exports.CAT_SHOW_DIALOG = exports.CAT_SET_ACTIVE_CONTAINER = exports.CAT_SET_ACTIVE_CHECKBOX = exports.CAT_CLOSE_DIALOG = exports.CAT_CLOSE_CHART_CONTAINER_2 = exports.CAT_CLOSE_CHART_CONTAINER = void 0;
var _refluxCore = _interopRequireDefault(require("reflux-core"));
var _storeApi = require("../storeApi");
var _compStore = require("../stores/compStore");
var _ModalDialogType = require("../../constants/ModalDialogType");
const CAT_SHOW_DIALOG = exports.CAT_SHOW_DIALOG = 'showDialog';
const CAT_CLOSE_DIALOG = exports.CAT_CLOSE_DIALOG = 'closeDialog';
const CAT_SHOW_OPTION_DIALOG = exports.CAT_SHOW_OPTION_DIALOG = 'showOptionDialog';
const CAT_CLOSE_CHART_CONTAINER = exports.CAT_CLOSE_CHART_CONTAINER = 'closeChartContainer';
const CAT_CLOSE_CHART_CONTAINER_2 = exports.CAT_CLOSE_CHART_CONTAINER_2 = 'closeChartContainer2';
const CAT_SET_ACTIVE_CONTAINER = exports.CAT_SET_ACTIVE_CONTAINER = 'setActiveContainer';
const CAT_SET_ACTIVE_CHECKBOX = exports.CAT_SET_ACTIVE_CHECKBOX = 'setActiveCheckbox';
const CA = _refluxCore.default.createActions({
  [CAT_SHOW_DIALOG]: {},
  [CAT_CLOSE_DIALOG]: {},
  [CAT_SHOW_OPTION_DIALOG]: {},
  [CAT_CLOSE_CHART_CONTAINER]: {},
  [CAT_CLOSE_CHART_CONTAINER_2]: {},
  [CAT_SET_ACTIVE_CONTAINER]: {},
  [CAT_SET_ACTIVE_CHECKBOX]: {}
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
const _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog');
const ComponentActions = exports.ComponentActions = CA;
//# sourceMappingURL=ComponentActions.js.map
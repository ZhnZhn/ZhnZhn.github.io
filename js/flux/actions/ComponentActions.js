"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.ComponentActionTypes = void 0;

var _refluxCore = _interopRequireDefault(require("reflux-core"));

var _ModalDialogType = require("../../constants/ModalDialogType");

const ComponentActionTypes = {
  SHOW_ABOUT: 'showAbout',
  SHOW_DIALOG: 'showDialog',
  CLOSE_DIALOG: 'closeDialog',
  SHOW_OPTION_DIALOG: 'showOptionDialog',
  CLOSE_CHART_CONTAINER: 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2: 'closeChartContainer2',
  SET_ACTIVE_CONTAINER: 'setActiveContainer',
  SET_ACTIVE_CHECKBOX: 'setActiveCheckbox',
  SHOW_MODAL_DIALOG: 'showModalDialog',
  CHANGE_THEME: 'changeTheme'
};
exports.ComponentActionTypes = ComponentActionTypes;
const A = ComponentActionTypes;

const CA = _refluxCore.default.createActions({
  [A.SHOW_ABOUT]: {},
  [A.SHOW_DIALOG]: {},
  [A.CLOSE_DIALOG]: {},
  [A.SHOW_OPTION_DIALOG]: {},
  [A.CLOSE_CHART_CONTAINER]: {},
  [A.CLOSE_CHART_CONTAINER_2]: {},
  [A.SET_ACTIVE_CONTAINER]: {},
  [A.SET_ACTIVE_CHECKBOX]: {},
  [A.SHOW_MODAL_DIALOG]: {},
  [A.CHANGE_THEME]: {}
});

const _showMd = CA.showModalDialog;
CA.showDescription = _showMd.bind(null, _ModalDialogType.MDT_DESCRIPTION);
CA.showSettings = _showMd.bind(null, _ModalDialogType.MDT_SETTINGS);
CA.showPasteTo = _showMd.bind(null, _ModalDialogType.MDT_PASTE_TO);
CA.zoom = _showMd.bind(null, _ModalDialogType.MDT_ZOOM);
CA.showReload = _showMd.bind(null, _ModalDialogType.MDT_RELOAD);
CA.showAlert = _showMd.bind(null, _ModalDialogType.MDT_ALERT);
CA.showAsk = _showMd.bind(null, _ModalDialogType.MDT_ASK);
CA.showCustomizeExport = _showMd.bind(null, _ModalDialogType.MDT_CUSTOMIZE_EXPORT);
CA.showAddToWatch = _showMd.bind(null, _ModalDialogType.MDT_ADD_TO_WATCH);
const _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog');
var _default = CA;
exports.default = _default;
//# sourceMappingURL=ComponentActions.js.map
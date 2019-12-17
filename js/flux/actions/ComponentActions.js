"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.ComponentActionTypes = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _Type = require("../../constants/Type");

var _Reflux$createActions;

var ComponentActionTypes = {
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
var A = ComponentActionTypes;

var CA = _reflux["default"].createActions((_Reflux$createActions = {}, _Reflux$createActions[A.SHOW_ABOUT] = {}, _Reflux$createActions[A.SHOW_DIALOG] = {}, _Reflux$createActions[A.CLOSE_DIALOG] = {}, _Reflux$createActions[A.SHOW_OPTION_DIALOG] = {}, _Reflux$createActions[A.CLOSE_CHART_CONTAINER] = {}, _Reflux$createActions[A.CLOSE_CHART_CONTAINER_2] = {}, _Reflux$createActions[A.SET_ACTIVE_CONTAINER] = {}, _Reflux$createActions[A.SET_ACTIVE_CHECKBOX] = {}, _Reflux$createActions[A.SHOW_MODAL_DIALOG] = {}, _Reflux$createActions[A.CHANGE_THEME] = {}, _Reflux$createActions));

var _showMd = CA.showModalDialog;
CA.showDescription = _showMd.bind(null, _Type.ModalDialog.DESCRIPTION);
CA.showSettings = _showMd.bind(null, _Type.ModalDialog.SETTINGS);
CA.showPasteTo = _showMd.bind(null, _Type.ModalDialog.PASTE_TO);
CA.zoom = _showMd.bind(null, _Type.ModalDialog.ZOOM);
CA.showReload = _showMd.bind(null, _Type.ModalDialog.RELOAD);
CA.showAlert = _showMd.bind(null, _Type.ModalDialog.ALERT);
CA.showAsk = _showMd.bind(null, _Type.ModalDialog.ASK);
CA.showCustomizeExport = _showMd.bind(null, _Type.ModalDialog.CUSTOMIZE_EXPORT);
CA.showAddToWatch = _showMd.bind(null, _Type.ModalDialog.ADD_TO_WATCH);
var _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog');
var _default = CA;
exports["default"] = _default;
//# sourceMappingURL=ComponentActions.js.map
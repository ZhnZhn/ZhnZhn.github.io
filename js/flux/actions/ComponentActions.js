"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ComponentActions = exports.CAT_SHOW_OPTION_DIALOG = exports.CAT_SHOW_MODAL_DIALOG = exports.CAT_SHOW_DIALOG = exports.CAT_SHOW_ABOUT = exports.CAT_SET_ACTIVE_CONTAINER = exports.CAT_SET_ACTIVE_CHECKBOX = exports.CAT_CLOSE_DIALOG = exports.CAT_CLOSE_CHART_CONTAINER_2 = exports.CAT_CLOSE_CHART_CONTAINER = exports.CAT_CHANGE_THEME = void 0;

var _refluxCore = _interopRequireDefault(require("reflux-core"));

var _ModalDialogType = require("../../constants/ModalDialogType");

const CAT_SHOW_ABOUT = 'showAbout';
exports.CAT_SHOW_ABOUT = CAT_SHOW_ABOUT;
const CAT_SHOW_DIALOG = 'showDialog';
exports.CAT_SHOW_DIALOG = CAT_SHOW_DIALOG;
const CAT_CLOSE_DIALOG = 'closeDialog';
exports.CAT_CLOSE_DIALOG = CAT_CLOSE_DIALOG;
const CAT_SHOW_OPTION_DIALOG = 'showOptionDialog';
exports.CAT_SHOW_OPTION_DIALOG = CAT_SHOW_OPTION_DIALOG;
const CAT_CLOSE_CHART_CONTAINER = 'closeChartContainer';
exports.CAT_CLOSE_CHART_CONTAINER = CAT_CLOSE_CHART_CONTAINER;
const CAT_CLOSE_CHART_CONTAINER_2 = 'closeChartContainer2';
exports.CAT_CLOSE_CHART_CONTAINER_2 = CAT_CLOSE_CHART_CONTAINER_2;
const CAT_SET_ACTIVE_CONTAINER = 'setActiveContainer';
exports.CAT_SET_ACTIVE_CONTAINER = CAT_SET_ACTIVE_CONTAINER;
const CAT_SET_ACTIVE_CHECKBOX = 'setActiveCheckbox';
exports.CAT_SET_ACTIVE_CHECKBOX = CAT_SET_ACTIVE_CHECKBOX;
const CAT_SHOW_MODAL_DIALOG = 'showModalDialog';
exports.CAT_SHOW_MODAL_DIALOG = CAT_SHOW_MODAL_DIALOG;
const CAT_CHANGE_THEME = 'changeTheme';
exports.CAT_CHANGE_THEME = CAT_CHANGE_THEME;

const CA = _refluxCore.default.createActions({
  [CAT_SHOW_ABOUT]: {},
  [CAT_SHOW_DIALOG]: {},
  [CAT_CLOSE_DIALOG]: {},
  [CAT_SHOW_OPTION_DIALOG]: {},
  [CAT_CLOSE_CHART_CONTAINER]: {},
  [CAT_CLOSE_CHART_CONTAINER_2]: {},
  [CAT_SET_ACTIVE_CONTAINER]: {},
  [CAT_SET_ACTIVE_CHECKBOX]: {},
  [CAT_SHOW_MODAL_DIALOG]: {},
  [CAT_CHANGE_THEME]: {}
});

const _showMd = CA.showModalDialog;
Object.assign(CA, {
  showDescription: _showMd.bind(null, _ModalDialogType.MDT_DESCRIPTION),
  showSettings: _showMd.bind(null, _ModalDialogType.MDT_SETTINGS),
  showPasteTo: _showMd.bind(null, _ModalDialogType.MDT_PASTE_TO),
  zoom: _showMd.bind(null, _ModalDialogType.MDT_ZOOM),
  showReload: _showMd.bind(null, _ModalDialogType.MDT_RELOAD),
  showAlert: _showMd.bind(null, _ModalDialogType.MDT_ALERT),
  showAsk: _showMd.bind(null, _ModalDialogType.MDT_ASK),
  showCustomizeExport: _showMd.bind(null, _ModalDialogType.MDT_CUSTOMIZE_EXPORT),
  showAddToWatch: _showMd.bind(null, _ModalDialogType.MDT_ADD_TO_WATCH)
});
const _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog');
const ComponentActions = CA;
exports.ComponentActions = ComponentActions;
//# sourceMappingURL=ComponentActions.js.map
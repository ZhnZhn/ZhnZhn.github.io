'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentActionTypes = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentActionTypes = exports.ComponentActionTypes = {
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
var A = ComponentActionTypes;

var CA = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_ABOUT, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_OPTION_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_CHART_CONTAINER, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_CHART_CONTAINER_2, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SET_ACTIVE_CONTAINER, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SET_ACTIVE_CHECKBOX, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_MODAL_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CHANGE_THEME, {}), _Reflux$createActions));

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

exports.default = CA;
//# sourceMappingURL=ComponentActions.js.map
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

var ComponentActions = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_ABOUT, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_OPTION_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_CHART_CONTAINER, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_CHART_CONTAINER_2, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SET_ACTIVE_CONTAINER, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SET_ACTIVE_CHECKBOX, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_MODAL_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CHANGE_THEME, {}), _Reflux$createActions));

ComponentActions.showDescription = ComponentActions.showModalDialog.bind(null, _Type.ModalDialog.DESCRIPTION);
ComponentActions.showSettings = ComponentActions.showModalDialog.bind(null, _Type.ModalDialog.SETTINGS);
ComponentActions.showPasteTo = ComponentActions.showModalDialog.bind(null, _Type.ModalDialog.PASTE_TO);
ComponentActions.showAddToWatch = ComponentActions.showModalDialog.bind(null, _Type.ModalDialog.ADD_TO_WATCH);

ComponentActions.showConfigChart = ComponentActions.showOptionDialog.bind(null, 'ChartConfigDialog');

exports.default = ComponentActions;
//# sourceMappingURL=ComponentActions.js.map
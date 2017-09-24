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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentActionTypes = exports.ComponentActionTypes = {
  SHOW_ABOUT: 'showAbout',

  SHOW_DIALOG: 'showDialog',
  CLOSE_DIALOG: 'closeDialog',
  SHOW_OPTION_DIALOG: 'showOptionDialog',

  CLOSE_CHART_CONTAINER: 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2: 'closeChartContainer2',
  SET_ACTIVE_CHECKBOX: 'setActiveCheckbox',

  SHOW_MODAL_DIALOG: 'showModalDialog'
};

var ComponentActions = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.SHOW_ABOUT, {}), (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.SHOW_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.CLOSE_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.SHOW_OPTION_DIALOG, {}), (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.CLOSE_CHART_CONTAINER, {}), (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.CLOSE_CHART_CONTAINER_2, {}), (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.SET_ACTIVE_CHECKBOX, {}), (0, _defineProperty3.default)(_Reflux$createActions, ComponentActionTypes.SHOW_MODAL_DIALOG, {}), _Reflux$createActions));

exports.default = ComponentActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\ComponentActions.js.map
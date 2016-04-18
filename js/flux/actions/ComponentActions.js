'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentActionTypes = undefined;

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ComponentActionTypes = exports.ComponentActionTypes = {
  SHOW_ABOUT: 'showAbout',
  SHOW_BROWSER: 'showBrowser',
  INIT_AND_SHOW_DIALOG: 'initAndShowDialog',
  SHOW_DIALOG: 'showDialog',
  CLOSE_CHART_CONTAINER: 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2: 'closeChartContainer2',
  UPDATE_BROWSER_MENU: 'updateBrowserMenu'

};

var ComponentActions = _reflux2.default.createActions((_Reflux$createActions = {}, _defineProperty(_Reflux$createActions, ComponentActionTypes.SHOW_ABOUT, {}), _defineProperty(_Reflux$createActions, ComponentActionTypes.SHOW_BROWSER, {}), _defineProperty(_Reflux$createActions, ComponentActionTypes.INIT_AND_SHOW_DIALOG, {}), _defineProperty(_Reflux$createActions, ComponentActionTypes.SHOW_DIALOG, {}), _defineProperty(_Reflux$createActions, ComponentActionTypes.CLOSE_CHART_CONTAINER, {}), _defineProperty(_Reflux$createActions, ComponentActionTypes.CLOSE_CHART_CONTAINER_2, {}), _defineProperty(_Reflux$createActions, ComponentActionTypes.UPDATE_BROWSER_MENU, {}), _Reflux$createActions));

exports.default = ComponentActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\ComponentActions.js.map
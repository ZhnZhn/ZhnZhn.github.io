'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartActionTypes = undefined;

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _LoadConfig = require('../logic/LoadConfig');

var _LoadConfig2 = _interopRequireDefault(_LoadConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChartActionTypes = exports.ChartActionTypes = {
  INIT_AND_SHOW_CHART: 'initAndShowChart',
  LOAD_STOCK: 'loadStock',
  LOAD_STOCK_COMPLETED: 'loadStockCompleted',
  LOAD_STOCK_ADDED: 'loadStockAdded',
  LOAD_STOCK_FAILED: 'loadStockFailed',
  SHOW_CHART: 'showChart',
  CLOSE_CHART: 'closeChart'
};

var _fnOnChangeStore = function _fnOnChangeStore(actionType, data) {
  if (actionType === ChartActionTypes.LOAD_STOCK_COMPLETED || actionType === ChartActionTypes.LOAD_STOCK_ADDED || actionType === ChartActionTypes.LOAD_STOCK_FAILED) {
    ChartActions[ChartActionTypes.LOAD_STOCK].isLoadInProgress = false;
  }
};

var ChartActions = _reflux2.default.createActions((_Reflux$createActions = {}, _defineProperty(_Reflux$createActions, ChartActionTypes.LOAD_STOCK, {
  children: ['completed', 'added', 'failed'],
  isLoadInProgress: false
}), _defineProperty(_Reflux$createActions, ChartActionTypes.SHOW_CHART, {}), _defineProperty(_Reflux$createActions, ChartActionTypes.CLOSE_CHART, {}), _Reflux$createActions));

ChartActions.fnOnChangeStore = _fnOnChangeStore;

ChartActions[ChartActionTypes.LOAD_STOCK].shouldEmit = function (value) {
  return !this.isLoadInProgress;
};
ChartActions[ChartActionTypes.LOAD_STOCK].listen(function (chartType, browserType, option) {
  this.isLoadInProgress = true;
  var _option$loadId = option.loadId;
  var loadId = _option$loadId === undefined ? 'Q' : _option$loadId;

  _LoadConfig2.default[loadId](chartType, browserType, option, this.completed, this.added, this.failed);
});

exports.default = ChartActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\ChartActions.js.map
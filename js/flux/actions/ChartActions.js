'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartActionTypes = undefined;

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _LoadConfig = require('../logic/LoadConfig');

var _LoadConfig2 = _interopRequireDefault(_LoadConfig);

var _LogicUtils = require('../logic/LogicUtils');

var _LogicUtils2 = _interopRequireDefault(_LogicUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var META = '_Meta';

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
    ChartActions[ChartActionTypes.LOAD_STOCK].isLoading = false;
  }
};

var _fnCancelLoad = function _fnCancelLoad(option, alertMsg, isWithFailed) {
  _Msg2.default.setAlertMsg(option, alertMsg);
  this.failed(option);
  this.isShouldEmit = false;

  if (typeof option.onCancel === 'function') {
    option.onCancel();
  } else if (isWithFailed && typeof option.onFailed === 'function') {
    option.onFailed();
  }
};

var ChartActions = _reflux2.default.createActions((_Reflux$createActions = {}, _defineProperty(_Reflux$createActions, ChartActionTypes.LOAD_STOCK, {
  children: ['completed', 'added', 'failed'],
  isLoading: false,
  idLoading: undefined,
  isShouldEmit: true,
  cancelLoad: _fnCancelLoad
}), _defineProperty(_Reflux$createActions, ChartActionTypes.SHOW_CHART, {}), _defineProperty(_Reflux$createActions, ChartActionTypes.CLOSE_CHART, {}), _Reflux$createActions));

ChartActions.fnOnChangeStore = _fnOnChangeStore;

ChartActions[ChartActionTypes.LOAD_STOCK].preEmit = function () {
  var arg = [].slice.call(arguments),
      chartType = arg[0],
      option = arg[2],
      key = _LogicUtils2.default.createKeyForConfig(option),
      isDoublingLoad = this.isLoading && key === this.idLoading,
      isDoublLoadMeta = option.isLoadMeta ? key + META === this.idLoading : false;

  option.key = key;
  this.isShouldEmit = true;

  if (isDoublingLoad) {
    this.cancelLoad(option, _Msg2.default.Alert.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta) {
    this.cancelLoad(option, _Msg2.default.Alert.DOUBLE_LOAD_META, false);
  } else if (!_ChartStore2.default.isLoadToChart()) {
    if (_ChartStore2.default.isChartExist(chartType, key)) {
      this.cancelLoad(option, _Msg2.default.Alert.ALREADY_EXIST, true);
    }
  }

  return undefined;
};

ChartActions[ChartActionTypes.LOAD_STOCK].shouldEmit = function () {
  return this.isShouldEmit;
};
ChartActions[ChartActionTypes.LOAD_STOCK].listen(function (chartType, browserType, option) {

  this.isLoading = true;
  this.idLoading = option.key;
  if (option.isLoadMeta) {
    this.idLoading = this.idLoading + META;
  }

  var _option$loadId = option.loadId;
  var loadId = _option$loadId === undefined ? 'Q' : _option$loadId;

  option.chartType = chartType;
  option.browserType = browserType;
  _LoadConfig2.default[loadId](option, this.completed, this.added, this.failed);
});

exports.default = ChartActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\ChartActions.js.map
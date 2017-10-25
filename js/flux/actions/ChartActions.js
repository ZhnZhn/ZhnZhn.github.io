'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartActionTypes = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var META = '_Meta';

var ChartActionTypes = exports.ChartActionTypes = {
  INIT_AND_SHOW_CHART: 'initAndShowChart',
  LOAD_STOCK: 'loadStock',
  LOAD_STOCK_COMPLETED: 'loadStockCompleted',
  LOAD_STOCK_ADDED: 'loadStockAdded',
  LOAD_STOCK_FAILED: 'loadStockFailed',
  SHOW_CHART: 'showChart',
  CLOSE_CHART: 'closeChart',

  COPY: 'copy'
};
var A = ChartActionTypes;
var M = _Msg2.default.Alert;

var _fnOnChangeStore = function _fnOnChangeStore(actionType, data) {
  if (actionType === A.LOAD_STOCK_COMPLETED || actionType === A.LOAD_STOCK_ADDED || actionType === A.LOAD_STOCK_FAILED) {
    ChartActions[A.LOAD_STOCK].isLoading = false;
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

var _addSettings = function _addSettings(option) {
  switch (option.loadId) {
    case 'B':
      option.apiKey = _ChartStore2.default.getBarchartKey();
      break;
    case 'AL':case 'AL_S':case 'AL_I':
      option.apiKey = _ChartStore2.default.getAlphaKey();
      break;
    case 'FS':case 'FAO':
      option.proxy = _ChartStore2.default.getProxy();
      break;
    default:
      option.apiKey = _ChartStore2.default.getQuandlKey();
  }

  option.isDrawDeltaExtrems = _ChartStore2.default.isSetting('isDrawDeltaExtrems');
  option.isNotZoomToMinMax = _ChartStore2.default.isSetting('isNotZoomToMinMax');
};

var ChartActions = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, A.LOAD_STOCK, {
  children: ['completed', 'added', 'failed'],
  isLoading: false,
  idLoading: undefined,
  isShouldEmit: true,
  cancelLoad: _fnCancelLoad
}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_CHART, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_CHART, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.COPY, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.PASTE_TO, {}), _Reflux$createActions));

ChartActions.fnOnChangeStore = _fnOnChangeStore;

ChartActions[A.LOAD_STOCK].preEmit = function () {
  var arg = [].slice.call(arguments),
      chartType = arg[0],
      option = arg[2],
      key = _LogicUtils2.default.createKeyForConfig(option),
      isDoublingLoad = this.isLoading && key === this.idLoading,
      isDoublLoadMeta = option.isLoadMeta ? key + META === this.idLoading : false;

  option.key = key;
  this.isShouldEmit = true;
  _addSettings(option);

  if (option.loadId === 'B' && !option.apiKey) {
    this.cancelLoad(option, M.withoutApiKey('Barchart Market Data'), false);
  } else if ((option.loadId === 'AL' || option.loadId === 'AL_S' || option.loadId === 'AL_I') && !option.apiKey) {
    this.cancelLoad(option, M.withoutApiKey('Alpha Vantage'), false);
  } else if (option.isKeyFeature && !option.apiKey) {
    this.cancelLoad(option, M.FEATURE_WITHOUT_KEY, false);
  } else if (option.isPremium && !option.apiKey) {
    this.cancelLoad(option, M.PREMIUM_WITHOUT_KEY, false);
  } else if (isDoublingLoad) {
    this.cancelLoad(option, M.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta) {
    this.cancelLoad(option, M.DOUBLE_LOAD_META, false);
  } else if (!_ChartStore2.default.isLoadToChart()) {
    if (_ChartStore2.default.isChartExist(chartType, key)) {
      this.cancelLoad(option, M.ALREADY_EXIST, true);
    }
  }

  return undefined;
};

ChartActions[A.LOAD_STOCK].shouldEmit = function () {
  return this.isShouldEmit;
};
ChartActions[A.LOAD_STOCK].listen(function (chartType, browserType, option) {

  this.isLoading = true;
  this.idLoading = option.key;
  if (option.isLoadMeta) {
    this.idLoading = this.idLoading + META;
  }

  var _option$loadId = option.loadId,
      loadId = _option$loadId === undefined ? 'Q' : _option$loadId;

  option.chartType = chartType;
  option.browserType = browserType;
  _LoadConfig2.default[loadId].loadItem(option, this.completed, this.added, this.failed);
});

exports.default = ChartActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\ChartActions.js.map
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

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _LoadConfig = require('../logic/LoadConfig');

var _LoadConfig2 = _interopRequireDefault(_LoadConfig);

var _LogicUtils = require('../logic/LogicUtils');

var _LogicUtils2 = _interopRequireDefault(_LogicUtils);

var _LoadingProgressActions = require('./LoadingProgressActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  DESR_LOADER: "Loader for this item hasn't found."
};

var META = '_Meta';
var _fnNoop = function _fnNoop() {};

var ChartActionTypes = exports.ChartActionTypes = {
  INIT_AND_SHOW_CHART: 'initAndShowChart',
  SHOW_CHART: 'showChart',
  CLOSE_CHART: 'closeChart',

  LOAD_STOCK: 'loadStock',
  LOAD_STOCK_COMPLETED: 'loadStockCompleted',
  LOAD_STOCK_ADDED: 'loadStockAdded',
  LOAD_STOCK_FAILED: 'loadStockFailed',

  LOAD_STOCK_BY_QUERY: 'loadStockByQuery',
  LOAD_STOCK_BY_QUERY_C: 'loadStockByQueryC',
  LOAD_STOCK_BY_QUERY_F: 'loadStockByQueryF',

  TO_TOP: 'toTop',

  COPY: 'copy',

  SORT_BY: 'sortBy'
};
var A = ChartActionTypes;
var M = _Msg2.default.Alert;

var _fnOnChangeStore = function _fnOnChangeStore(actionType, data) {
  if (actionType === _LoadingProgressActions.T.LOADING_COMPLETE || actionType === _LoadingProgressActions.T.LOADING_FAILED) {
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
  var loadId = option.loadId,
      apiKey = _ChartStore2.default.getKey(loadId),
      proxy = _ChartStore2.default.getProxy(loadId);

  Object.assign(option, {
    apiKey: apiKey, proxy: proxy,
    isDrawDeltaExtrems: _ChartStore2.default.isSetting('isDrawDeltaExtrems'),
    isNotZoomToMinMax: _ChartStore2.default.isSetting('isNotZoomToMinMax')
  });
};

var ChartActions = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, A.LOAD_STOCK, {
  children: ['completed', 'added', 'failed'],
  isLoading: false,
  idLoading: undefined,
  isShouldEmit: true,
  cancelLoad: _fnCancelLoad
}), (0, _defineProperty3.default)(_Reflux$createActions, A.LOAD_STOCK_BY_QUERY, {
  children: ['completed', 'failed']
}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_CHART, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.CLOSE_CHART, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.TO_TOP, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.COPY, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.PASTE_TO, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SORT_BY, {}), _Reflux$createActions));

ChartActions.fnOnChangeStore = _fnOnChangeStore;

var _withApiKey = ['B', 'AL', 'AL_S', 'AL_I', 'BEA', 'INTR'];
var _apiTitle = {
  B: 'Barchart Market Data',
  AL: 'Alpha Vantage',
  AL_S: 'Alpha Vantage',
  AL_I: 'Alpha Vantage',
  BEA: 'BEA',
  INTR: 'Intrinio'
};

var _checkMsgApiKey = function _checkMsgApiKey(option) {
  var apiKey = option.apiKey,
      loadId = option.loadId,
      isKeyFeature = option.isKeyFeature,
      isPremium = option.isPremium;

  if (!apiKey) {
    if (_withApiKey.indexOf(loadId) !== -1) {
      return M.withoutApiKey(_apiTitle[loadId]);
    }
    if (isKeyFeature) {
      return M.FEATURE_WITHOUT_KEY;
    }
    if (isPremium) {
      return M.PREMIUM_WITHOUT_KEY;
    }
  }
  return false;
};

ChartActions[A.LOAD_STOCK].preEmit = function () {
  var confItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var chartType = confItem.chartType,
      key = _LogicUtils2.default.createKeyForConfig(option),
      isDoublingLoad = this.isLoading && key === this.idLoading,
      isDoublLoadMeta = option.isLoadMeta ? key + META === this.idLoading : false;


  option.key = key;
  this.isShouldEmit = true;
  _addSettings(option);

  var _msgApiKey = _checkMsgApiKey(option);
  if (_msgApiKey) {
    this.cancelLoad(option, _msgApiKey, false);
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
ChartActions[A.LOAD_STOCK].listen(function (confItem, option) {
  var chartType = confItem.chartType,
      browserType = confItem.browserType,
      conf = confItem.conf;

  option.conf = conf;

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

var SUBTITLE = 'Loaded from URL Query';
var _addDialogPropsTo = function _addDialogPropsTo(option) {
  var chartType = option.chartType,
      browserType = option.browserType,
      _ref = _ChartStore2.default.getSourceConfig(browserType, chartType) || {},
      dialogProps = _ref.dialogProps;

  Object.assign(option, dialogProps, dialogProps.dfProps, {
    subtitle: SUBTITLE
  });

  var fromDate = option.fromDate,
      nInitFromDate = option.nInitFromDate;

  if (!fromDate) {
    option.fromDate = nInitFromDate ? _DateUtils2.default.getFromDate(nInitFromDate) : _DateUtils2.default.getFromDate(2);
  }
};

ChartActions[A.LOAD_STOCK_BY_QUERY].listen(function (option) {
  _addDialogPropsTo(option);
  var loadId = option.loadId;

  option.proxy = _ChartStore2.default.getProxy(loadId);

  var impl = _LoadConfig2.default[loadId];
  if (impl) {
    var addPropsTo = impl.addPropsTo;

    if (typeof addPropsTo === 'function') {
      addPropsTo(option);
    }
    impl.loadItem(option, this.completed, _fnNoop, this.failed);
  } else {
    option.alertDescr = C.DESCR_LOADER;
    this.failed(option);
  }
});

exports.default = ChartActions;
//# sourceMappingURL=ChartActions.js.map
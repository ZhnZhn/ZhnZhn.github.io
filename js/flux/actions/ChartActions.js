"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.ChartActionTypes = void 0;

var _refluxCore = _interopRequireDefault(require("reflux-core"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _Msg = _interopRequireDefault(require("../../constants/Msg"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _SettingSlice = _interopRequireDefault(require("../stores/SettingSlice"));

var _LoadConfig = _interopRequireDefault(require("../logic/LoadConfig"));

var _LogicUtils = _interopRequireDefault(require("../logic/LogicUtils"));

var _LoadingProgressActions = require("./LoadingProgressActions");

var _Reflux$createActions;

var C = {
  DESR_LOADER: "Loader for this item hasn't found."
};

var META = '_Meta',
    _fnNoop = function _fnNoop() {},
    _isFn = function _isFn(fn) {
  return typeof fn === 'function';
},
    _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};

var ChartActionTypes = {
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
  UPDATE_MOVING_VALUES: 'updateMovingValues',
  SORT_BY: 'sortBy',
  REMOVE_ALL: 'removeAll'
};
exports.ChartActionTypes = ChartActionTypes;
var A = ChartActionTypes;
var M = _Msg["default"].Alert;

var _fnOnChangeStore = function _fnOnChangeStore(actionType, data) {
  if (actionType === _LoadingProgressActions.T.LOADING_COMPLETE || actionType === _LoadingProgressActions.T.LOADING_FAILED) {
    ChartActions[A.LOAD_STOCK].isLoading = false;
  }
};

var _fnCancelLoad = function _fnCancelLoad(option, alertMsg, isWithFailed) {
  _Msg["default"].setAlertMsg(option, alertMsg);

  this.failed(option);
  this.isShouldEmit = false;

  if (_isFn(option.onCancel)) {
    option.onCancel();
  } else if (isWithFailed && _isFn(option.onFailed)) {
    option.onFailed();
  }
};

var _addBoolOptionTo = function _addBoolOptionTo(options, propName) {
  if (_isUndef(options[propName])) {
    options[propName] = _ChartStore["default"].isSetting(propName);
  }
};

var _addSettingsTo = function _addSettingsTo(options) {
  var loadId = options.loadId;

  for (var _len = arguments.length, restArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restArgs[_key - 1] = arguments[_key];
  }

  Object.assign.apply(Object, [options].concat(restArgs, [{
    apiKey: _ChartStore["default"].getKey(loadId),
    proxy: _ChartStore["default"].getProxy(loadId)
  }]));

  _addBoolOptionTo(options, 'isDrawDeltaExtrems');

  _addBoolOptionTo(options, 'isNotZoomToMinMax');
};

var ChartActions = _refluxCore["default"].createActions((_Reflux$createActions = {}, _Reflux$createActions[A.LOAD_STOCK] = {
  children: ['completed', 'added', 'failed'],
  isLoading: false,
  idLoading: undefined,
  isShouldEmit: true,
  cancelLoad: _fnCancelLoad
}, _Reflux$createActions[A.LOAD_STOCK_BY_QUERY] = {
  children: ['completed', 'failed']
}, _Reflux$createActions[A.SHOW_CHART] = {}, _Reflux$createActions[A.CLOSE_CHART] = {}, _Reflux$createActions[A.TO_TOP] = {}, _Reflux$createActions[A.COPY] = {}, _Reflux$createActions[A.UPDATE_MOVING_VALUES] = {}, _Reflux$createActions[A.SORT_BY] = {}, _Reflux$createActions[A.REMOVE_ALL] = {}, _Reflux$createActions));

ChartActions.fnOnChangeStore = _fnOnChangeStore;
var isApiKeyRequired = _SettingSlice["default"].isApiKeyRequired,
    getApiTitle = _SettingSlice["default"].getApiTitle;

var _checkMsgApiKey = function _checkMsgApiKey(_ref) {
  var apiKey = _ref.apiKey,
      loadId = _ref.loadId,
      isKeyFeature = _ref.isKeyFeature,
      isPremium = _ref.isPremium;

  if (!apiKey) {
    if (isApiKeyRequired(loadId)) {
      return M.withoutApiKey(getApiTitle(loadId));
    }

    if (isKeyFeature) {
      return M.FEATURE_WITHOUT_KEY;
    }

    if (isPremium) {
      return M.PREMIUM_WITHOUT_KEY;
    }
  }

  return '';
};

ChartActions[A.LOAD_STOCK].preEmit = function (confItem, option) {
  if (confItem === void 0) {
    confItem = {};
  }

  if (option === void 0) {
    option = {};
  }

  var key = _LogicUtils["default"].createKeyForConfig(option),
      isDoublingLoad = this.isLoading && key === this.idLoading,
      isDoublLoadMeta = option.isLoadMeta ? key + META === this.idLoading : false;

  this.isShouldEmit = true; //{ chartType, browserType, dialogConf } = confItem

  _addSettingsTo(option, confItem, {
    key: key
  });

  var _msgApiKey = _checkMsgApiKey(option);

  if (_msgApiKey) {
    this.cancelLoad(option, _msgApiKey, false);
  } else if (isDoublingLoad) {
    this.cancelLoad(option, M.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta) {
    this.cancelLoad(option, M.DOUBLE_LOAD_META, false);
  } else if (!_ChartStore["default"].isLoadToChart()) {
    if (_ChartStore["default"].isChartExist(option)) {
      this.cancelLoad(option, M.ALREADY_EXIST, true);
    }
  }

  return;
};

ChartActions[A.LOAD_STOCK].shouldEmit = function () {
  return this.isShouldEmit;
};

ChartActions[A.LOAD_STOCK].listen(function (confItem, option) {
  var key = option.key,
      isLoadMeta = option.isLoadMeta,
      _option$loadId = option.loadId,
      loadId = _option$loadId === void 0 ? 'Q' : _option$loadId;
  this.isLoading = true;
  this.idLoading = isLoadMeta ? key + META : key;

  _LoadConfig["default"][loadId].loadItem(option, this.completed, this.added, this.failed);
});
var SUBTITLE = 'Loaded from URL Query';

var _addDialogPropsTo = function _addDialogPropsTo(option) {
  var chartType = option.chartType,
      browserType = option.browserType,
      _ref2 = _ChartStore["default"].getSourceConfig(browserType, chartType) || {},
      dialogProps = _ref2.dialogProps;

  Object.assign(option, dialogProps, dialogProps.dfProps, {
    subtitle: SUBTITLE
  });
  var fromDate = option.fromDate,
      nInitFromDate = option.nInitFromDate;

  if (!fromDate) {
    option.fromDate = nInitFromDate ? _DateUtils["default"].getFromDate(nInitFromDate) : _DateUtils["default"].getFromDate(2);
  }
};

ChartActions[A.LOAD_STOCK_BY_QUERY].listen(function (option) {
  _addDialogPropsTo(option);

  var loadId = option.loadId;
  option.proxy = _ChartStore["default"].getProxy(loadId);
  var impl = _LoadConfig["default"][loadId];

  if (impl) {
    var addPropsTo = impl.addPropsTo;

    if (_isFn(addPropsTo)) {
      addPropsTo(option);
    }

    impl.loadItem(option, this.completed, _fnNoop, this.failed);
  } else {
    option.alertDescr = C.DESCR_LOADER;
    this.failed(option);
  }
});
var _default = ChartActions;
exports["default"] = _default;
//# sourceMappingURL=ChartActions.js.map
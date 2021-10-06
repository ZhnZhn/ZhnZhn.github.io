"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.ChartActionTypes = void 0;

var _refluxCore = _interopRequireDefault(require("reflux-core"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _Msg = _interopRequireDefault(require("../../constants/Msg"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _SettingSlice = _interopRequireDefault(require("../stores/SettingSlice"));

var _LoadConfig = _interopRequireDefault(require("../logic/LoadConfig"));

var _LogicUtils = _interopRequireDefault(require("../logic/LogicUtils"));

var _LoadingProgressActions = require("./LoadingProgressActions");

const C = {
  DESR_LOADER: "Loader for this item hasn't found."
};

const META = '_Meta',
      _fnNoop = () => {},
      _isFn = fn => typeof fn === 'function',
      _isUndef = v => typeof v === 'undefined';

const ChartActionTypes = {
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
const A = ChartActionTypes;
const M = _Msg.default.Alert;

const _fnOnChangeStore = function (actionType, data) {
  if (actionType === _LoadingProgressActions.LPAT_LOADING_COMPLETE || actionType === _LoadingProgressActions.LPAT_LOADING_FAILED) {
    ChartActions[A.LOAD_STOCK].isLoading = false;
  }
};

const _fnCancelLoad = function (option, alertMsg, isWithFailed) {
  _Msg.default.setAlertMsg(option, alertMsg);

  this.failed(option);
  this.isShouldEmit = false;

  if (_isFn(option.onCancel)) {
    option.onCancel();
  } else if (isWithFailed && _isFn(option.onFailed)) {
    option.onFailed();
  }
};

const _addBoolOptionTo = (options, propName) => {
  if (_isUndef(options[propName])) {
    options[propName] = _ChartStore.default.isSetting(propName);
  }
};

const _addSettingsTo = (options, ...restArgs) => {
  const {
    loadId
  } = options;
  Object.assign(options, ...restArgs, {
    apiKey: _ChartStore.default.getKey(loadId),
    proxy: _ChartStore.default.getProxy(loadId)
  });

  _addBoolOptionTo(options, 'isDrawDeltaExtrems');

  _addBoolOptionTo(options, 'isNotZoomToMinMax');
};

const ChartActions = _refluxCore.default.createActions({
  [A.LOAD_STOCK]: {
    children: ['completed', 'added', 'failed'],
    isLoading: false,
    idLoading: undefined,
    isShouldEmit: true,
    cancelLoad: _fnCancelLoad
  },
  [A.LOAD_STOCK_BY_QUERY]: {
    children: ['completed', 'failed']
  },
  [A.SHOW_CHART]: {},
  [A.CLOSE_CHART]: {},
  [A.TO_TOP]: {},
  [A.COPY]: {},
  [A.UPDATE_MOVING_VALUES]: {},
  [A.SORT_BY]: {},
  [A.REMOVE_ALL]: {}
});

ChartActions.fnOnChangeStore = _fnOnChangeStore;
const {
  isApiKeyRequired,
  isProxyRequired,
  getApiTitle
} = _SettingSlice.default;

const _checkMsgApiKey = ({
  apiKey,
  loadId,
  isKeyFeature,
  isPremium
}) => {
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

const _checkProxy = ({
  proxy,
  loadId
}) => {
  if (isProxyRequired(loadId) && !proxy) {
    return M.withoutProxy(getApiTitle(loadId));
  }

  return '';
};

ChartActions[A.LOAD_STOCK].preEmit = function (confItem = {}, option = {}) {
  const key = _LogicUtils.default.createKeyForConfig(option),
        isDoublingLoad = this.isLoading && key === this.idLoading,
        isDoublLoadMeta = option.isLoadMeta ? key + META === this.idLoading : false;

  this.isShouldEmit = true;

  const _isTs = _ChartStore.default.isLoadToChart(); //{ chartType, browserType, dialogConf } = confItem


  _addSettingsTo(option, confItem, {
    key,
    _isTs
  });

  const _msgSetting = _checkMsgApiKey(option) || _checkProxy(option);

  if (_msgSetting) {
    this.cancelLoad(option, _msgSetting, false);
  } else if (isDoublingLoad) {
    this.cancelLoad(option, M.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta) {
    this.cancelLoad(option, M.DOUBLE_LOAD_META, false);
  } else if (!_isTs) {
    if (_ChartStore.default.isChartExist(option)) {
      this.cancelLoad(option, M.ALREADY_EXIST, true);
    }
  }

  return;
};

ChartActions[A.LOAD_STOCK].shouldEmit = function () {
  return this.isShouldEmit;
};

ChartActions[A.LOAD_STOCK].listen(function (confItem, option) {
  const {
    key,
    isLoadMeta,
    loadId = 'Q'
  } = option;
  this.isLoading = true;
  this.idLoading = isLoadMeta ? key + META : key;

  _LoadConfig.default[loadId].loadItem(option, this.completed, this.added, this.failed);
});
const SUBTITLE = 'Loaded from URL Query';

const _addDialogPropsTo = option => {
  const {
    chartType,
    browserType
  } = option,
        {
    dialogProps
  } = _ChartStore.default.getSourceConfig(browserType, chartType) || {};
  Object.assign(option, dialogProps, dialogProps.dfProps, {
    subtitle: SUBTITLE
  });
  const {
    fromDate,
    nInitFromDate
  } = option;

  if (!fromDate) {
    option.fromDate = nInitFromDate ? _DateUtils.default.getFromDate(nInitFromDate) : _DateUtils.default.getFromDate(2);
  }
};

ChartActions[A.LOAD_STOCK_BY_QUERY].listen(function (option) {
  _addDialogPropsTo(option);

  const {
    loadId
  } = option;
  option.proxy = _ChartStore.default.getProxy(loadId);
  const impl = _LoadConfig.default[loadId];

  if (impl) {
    const {
      addPropsTo
    } = impl;

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
exports.default = _default;
//# sourceMappingURL=ChartActions.js.map
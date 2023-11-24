"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.setLoadingDone = exports.ChartActions = exports.CHAT_UPDATE_MOVING_VALUES = exports.CHAT_TO_TOP = exports.CHAT_SORT_BY = exports.CHAT_SHOW = exports.CHAT_REMOVE_ALL = exports.CHAT_LOAD_FAILED = exports.CHAT_LOAD_COMPLETED = exports.CHAT_LOAD_BY_QUERY = exports.CHAT_LOAD_ADDED = exports.CHAT_LOAD = exports.CHAT_INIT_AND_SHOW = exports.CHAT_COPY = exports.CHAT_CLOSE = void 0;
var _refluxCore = _interopRequireDefault(require("reflux-core"));
var _dateFn = require("../../utils/dateFn");
var _Msg = require("../../constants/Msg");
var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));
var _browserLogic = require("../stores/browserLogic");
var _chartCheckBoxLogic = require("../stores/chartCheckBoxLogic");
var _SettingSlice = _interopRequireDefault(require("../stores/SettingSlice"));
var _LoadConfig = _interopRequireDefault(require("../logic/LoadConfig"));
var _LogicFn = require("../logic/LogicFn");
const ALERT_DESCR_BY_QUERY = "Loader for this item hasn't found.",
  META_SUFFIX = '_Meta',
  _fnNoop = () => {},
  _isFn = fn => typeof fn === 'function',
  _isUndef = v => typeof v === 'undefined',
  _assign = Object.assign;
const CHAT_INIT_AND_SHOW = exports.CHAT_INIT_AND_SHOW = 'initAndShowChart';
const CHAT_SHOW = exports.CHAT_SHOW = 'showChart';
const CHAT_CLOSE = exports.CHAT_CLOSE = 'closeChart';
const CHAT_LOAD = exports.CHAT_LOAD = 'loadItem';
const CHAT_LOAD_ADDED = exports.CHAT_LOAD_ADDED = 'loadItemAdded';
const CHAT_LOAD_COMPLETED = exports.CHAT_LOAD_COMPLETED = 'loadItemCompleted';
const CHAT_LOAD_FAILED = exports.CHAT_LOAD_FAILED = 'loadItemFailed';
const CHAT_LOAD_BY_QUERY = exports.CHAT_LOAD_BY_QUERY = 'loadItemByQuery';
const CHAT_TO_TOP = exports.CHAT_TO_TOP = 'toTop';
const CHAT_COPY = exports.CHAT_COPY = 'copy';
const CHAT_UPDATE_MOVING_VALUES = exports.CHAT_UPDATE_MOVING_VALUES = 'updateMovingValues';
const CHAT_SORT_BY = exports.CHAT_SORT_BY = 'sortBy';
const CHAT_REMOVE_ALL = exports.CHAT_REMOVE_ALL = 'removeAll';
const _cancelLoad = function (option, alertMsg) {
  (0, _Msg.setAlertMsg)(option, alertMsg);
  if (alertMsg === _Msg.ERR_ALREADY_EXIST) {
    this.cancel(option);
    if (_isFn(option.onFailed)) {
      option.onFailed();
    }
    return;
  }
  this.failed(option);
  if (_isFn(option.onCancel)) {
    option.onCancel();
  }
};
const _addBoolOptionTo = (options, propName) => {
  if (_isUndef(options[propName])) {
    options[propName] = _ChartStore.default.isSetting(propName);
  }
};
const _addSettingsTo = (options, confItem, itemProps) => {
  const {
    loadId
  } = options;
  _assign(options, confItem, itemProps, {
    apiKey: _ChartStore.default.getKey(loadId),
    proxy: _ChartStore.default.getProxy(loadId)
  });
  _addBoolOptionTo(options, 'isDrawDeltaExtrems');
  _addBoolOptionTo(options, 'isNotZoomToMinMax');
};
const CHA = _refluxCore.default.createActions({
  [CHAT_LOAD]: {
    children: ['completed', 'added', 'failed', 'cancel'],
    isLoading: false,
    idLoading: void 0,
    cancelLoad: _cancelLoad
  },
  [CHAT_LOAD_BY_QUERY]: {
    children: ['completed', 'failed']
  },
  [CHAT_SHOW]: {},
  [CHAT_CLOSE]: {},
  [CHAT_TO_TOP]: {},
  [CHAT_COPY]: {},
  [CHAT_UPDATE_MOVING_VALUES]: {},
  [CHAT_SORT_BY]: {},
  [CHAT_REMOVE_ALL]: {}
});
const setLoadingDone = () => {
  CHA[CHAT_LOAD].isLoading = false;
};
exports.setLoadingDone = setLoadingDone;
const {
  isApiKeyRequired,
  isProxyRequired,
  getApiTitle
} = _SettingSlice.default;
const _checkMsgApiKey = _ref => {
  let {
    apiKey,
    loadId,
    isKeyFeature,
    isPremium
  } = _ref;
  return apiKey ? '' : isApiKeyRequired(loadId) ? (0, _Msg.withoutApiKey)(getApiTitle(loadId)) : isKeyFeature ? _Msg.ERR_FEATURE_WITHOUT_KEY : isPremium ? _Msg.ERR_PREMIUM_WITHOUT_KEY : '';
};
const _checkProxy = _ref2 => {
  let {
    proxy,
    loadId
  } = _ref2;
  return isProxyRequired(loadId) && !proxy ? (0, _Msg.withoutProxy)(getApiTitle(loadId)) : '';
};
const _crMsgSetting = option => _checkMsgApiKey(option) || _checkProxy(option);
const _crMetaDataKey = key => key + META_SUFFIX;
CHA[CHAT_LOAD].shouldEmit = function (confItem, option) {
  if (confItem === void 0) {
    confItem = {};
  }
  if (option === void 0) {
    option = {};
  }
  const _key = (0, _LogicFn.crKeyForConfig)(option),
    {
      isLoadMeta
    } = option,
    key = isLoadMeta ? _crMetaDataKey(_key) : _key,
    _isDoublingLoad = this.isLoading && key === this.idLoading,
    _isTs = (0, _chartCheckBoxLogic.isLoadToChart)();

  //{ chartType, browserType, dialogConf } = confItem
  _addSettingsTo(option, confItem, {
    key,
    _isTs
  });
  const _alertMsg = _crMsgSetting(option) || (isLoadMeta && _isDoublingLoad ? _Msg.ERR_DOUBLE_LOAD_META : _isDoublingLoad ? _Msg.ERR_LOADING_IN_PROGRESS : !_isTs && _ChartStore.default.isChartExist(option) ? _Msg.ERR_ALREADY_EXIST : '');
  return _alertMsg ? (this.cancelLoad(option, _alertMsg), false) : true;
};
CHA[CHAT_LOAD].listen(function (confItem, option) {
  const {
    key,
    loadId = 'Q'
  } = option;
  this.isLoading = true;
  this.idLoading = key;
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
    } = (0, _browserLogic.getSourceConfig)(browserType, chartType) || {},
    {
      dfProps
    } = dialogProps || {};
  _assign(option, dialogProps, dfProps, {
    subtitle: SUBTITLE
  });
  const {
    fromDate,
    nInitFromDate
  } = option;
  if (!fromDate) {
    option.fromDate = nInitFromDate ? (0, _dateFn.getFromDate)(nInitFromDate) : (0, _dateFn.getFromDate)(2);
  }
};
CHA[CHAT_LOAD_BY_QUERY].listen(function (option) {
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
    option.alertDescr = ALERT_DESCR_BY_QUERY;
    this.failed(option);
  }
});
const ChartActions = exports.ChartActions = CHA;
//# sourceMappingURL=ChartActions.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.CHAT_REMOVE_ALL = exports.CHAT_SORT_BY = exports.CHAT_UPDATE_MOVING_VALUES = exports.CHAT_COPY = exports.CHAT_TO_TOP = exports.CHAT_LOAD_BY_QUERY = exports.CHAT_LOAD_FAILED = exports.CHAT_LOAD_COMPLETED = exports.CHAT_LOAD_ADDED = exports.CHAT_LOAD = exports.CHAT_CLOSE = exports.CHAT_SHOW = exports.CHAT_INIT_AND_SHOW = void 0;

var _refluxCore = _interopRequireDefault(require("reflux-core"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _Msg = _interopRequireDefault(require("../../constants/Msg"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _SettingSlice = _interopRequireDefault(require("../stores/SettingSlice"));

var _LoadConfig = _interopRequireDefault(require("../logic/LoadConfig"));

var _LogicUtils = _interopRequireDefault(require("../logic/LogicUtils"));

var _LoadingProgressActions = require("./LoadingProgressActions");

const ALERT_DESCR_BY_QUERY = "Loader for this item hasn't found.",
      META_SUFFIX = '_Meta',
      _fnNoop = () => {},
      _isFn = fn => typeof fn === 'function',
      _isUndef = v => typeof v === 'undefined';

const CHAT_INIT_AND_SHOW = 'initAndShowChart';
exports.CHAT_INIT_AND_SHOW = CHAT_INIT_AND_SHOW;
const CHAT_SHOW = 'showChart';
exports.CHAT_SHOW = CHAT_SHOW;
const CHAT_CLOSE = 'closeChart';
exports.CHAT_CLOSE = CHAT_CLOSE;
const CHAT_LOAD = 'loadItem';
exports.CHAT_LOAD = CHAT_LOAD;
const CHAT_LOAD_ADDED = 'loadItemAdded';
exports.CHAT_LOAD_ADDED = CHAT_LOAD_ADDED;
const CHAT_LOAD_COMPLETED = 'loadItemCompleted';
exports.CHAT_LOAD_COMPLETED = CHAT_LOAD_COMPLETED;
const CHAT_LOAD_FAILED = 'loadItemFailed';
exports.CHAT_LOAD_FAILED = CHAT_LOAD_FAILED;
const CHAT_LOAD_BY_QUERY = 'loadItemByQuery';
exports.CHAT_LOAD_BY_QUERY = CHAT_LOAD_BY_QUERY;
const CHAT_TO_TOP = 'toTop';
exports.CHAT_TO_TOP = CHAT_TO_TOP;
const CHAT_COPY = 'copy';
exports.CHAT_COPY = CHAT_COPY;
const CHAT_UPDATE_MOVING_VALUES = 'updateMovingValues';
exports.CHAT_UPDATE_MOVING_VALUES = CHAT_UPDATE_MOVING_VALUES;
const CHAT_SORT_BY = 'sortBy';
exports.CHAT_SORT_BY = CHAT_SORT_BY;
const CHAT_REMOVE_ALL = 'removeAll';
exports.CHAT_REMOVE_ALL = CHAT_REMOVE_ALL;
const M = _Msg.default.Alert;
const _assign = Object.assign;

const _cancelLoad = function (option, alertMsg) {
  _Msg.default.setAlertMsg(option, alertMsg);

  this.failed(option);

  if (_isFn(option.onCancel)) {
    option.onCancel();
  } else if (alertMsg === M.ALREADY_EXIST && _isFn(option.onFailed)) {
    option.onFailed();
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

const ChartActions = _refluxCore.default.createActions({
  [CHAT_LOAD]: {
    children: ['completed', 'added', 'failed'],
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

const _isItemLoaded = actionType => actionType === _LoadingProgressActions.LPAT_LOADING_COMPLETE || actionType === _LoadingProgressActions.LPAT_LOADING_FAILED;

const _onChangeStore = actionType => {
  if (_isItemLoaded(actionType)) {
    ChartActions[CHAT_LOAD].isLoading = false;
  }
};

ChartActions.onChangeStore = _onChangeStore;
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
}) => apiKey ? '' : isApiKeyRequired(loadId) ? M.withoutApiKey(getApiTitle(loadId)) : isKeyFeature ? M.FEATURE_WITHOUT_KEY : isPremium ? M.PREMIUM_WITHOUT_KEY : '';

const _checkProxy = ({
  proxy,
  loadId
}) => {
  if (isProxyRequired(loadId) && !proxy) {
    return M.withoutProxy(getApiTitle(loadId));
  }

  return '';
};

const _crMsgSetting = option => _checkMsgApiKey(option) || _checkProxy(option);

const _crMetaDataKey = key => key + META_SUFFIX;

ChartActions[CHAT_LOAD].shouldEmit = function (confItem = {}, option = {}) {
  const _key = _LogicUtils.default.createKeyForConfig(option),
        {
    isLoadMeta
  } = option,
        key = isLoadMeta ? _crMetaDataKey(_key) : _key,
        _isDoublingLoad = this.isLoading && key === this.idLoading,
        _isTs = _ChartStore.default.isLoadToChart(); //{ chartType, browserType, dialogConf } = confItem


  _addSettingsTo(option, confItem, {
    key,
    _isTs
  });

  const _alertMsg = _crMsgSetting(option) || (isLoadMeta && _isDoublingLoad ? M.DOUBLE_LOAD_META : _isDoublingLoad ? M.LOADING_IN_PROGRES : !_isTs && _ChartStore.default.isChartExist(option) ? M.ALREADY_EXIST : '');

  return _alertMsg ? (this.cancelLoad(option, _alertMsg), false) : true;
};

ChartActions[CHAT_LOAD].listen(function (confItem, option) {
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
  } = _ChartStore.default.getSourceConfig(browserType, chartType) || {},
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
    option.fromDate = nInitFromDate ? _DateUtils.default.getFromDate(nInitFromDate) : _DateUtils.default.getFromDate(2);
  }
};

ChartActions[CHAT_LOAD_BY_QUERY].listen(function (option) {
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
var _default = ChartActions;
exports.default = _default;
//# sourceMappingURL=ChartActions.js.map
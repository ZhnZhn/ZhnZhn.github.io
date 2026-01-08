"use strict";

exports.__esModule = true;
exports.useMsItemLoaded = exports.useMsInit = exports.updateMv = exports.sortItemsBy = exports.showItemsContainer = exports.removeItemsAll = exports.moveToTop = exports.loadItemByQuery = exports.loadItem = exports.isChartExist = exports.hideItemsContainer = exports.getConfigs = exports.closeChartItem = void 0;
var _Msg = require("../../constants/Msg");
var _storeFn = require("./storeFn");
var _LogicFn = require("../logic/LogicFn");
var _LoadImpl = require("../logic/LoadImpl");
var _ChartLogic = require("./chart/ChartLogic");
var _chartCheckBoxLogic = require("./chartCheckBoxLogic");
var _dialogLogic = require("./dialogLogic");
var _browserLogic = require("./browserLogic");
var _settingStore = require("../stores/settingStore");
var _loadingStore = require("./loadingStore");
var _compStore = require("./compStore");
var _itemStoreFn = require("./itemStoreFn");
var _storeApi = require("../storeApi");
const [_crMsItemLoaded, _selectMsItemLoaded] = (0, _storeApi.fCrStoreSlice)("msItemLoaded"),
  [_crMsItemInit, _selectMsItemInit] = (0, _storeApi.fCrStoreSlice)("msItemInit"),
  _crStore = () => ({
    ..._crMsItemLoaded(),
    ..._crMsItemInit()
  }),
  _itemStore = (0, _storeApi.createStoreWithSelector)(_crStore),
  [set] = (0, _storeApi.getStoreApi)(_itemStore);
const useMsItemLoaded = exports.useMsItemLoaded = (0, _storeApi.fCrUse)(_itemStore, _selectMsItemLoaded);
const useMsInit = exports.useMsInit = (0, _storeApi.fCrUse)(_itemStore, _selectMsItemInit);
const _setMsItemLoaded = chartSlice => {
  set(_crMsItemLoaded({
    ...chartSlice
  }));
};
const _setMsItemInit = Comp => {
  set(_crMsItemInit({
    Comp
  }));
};
const CHARTS = {};
const getConfigs = chartType => CHARTS[chartType].configs;
exports.getConfigs = getConfigs;
const isChartExist = option => {
  (0, _ChartLogic.checkBrowserChartTypes)(option);
  const {
    chartType,
    key
  } = option;
  return (0, _ChartLogic.isChartExistImpl)(CHARTS, chartType, key);
};
exports.isChartExist = isChartExist;
let _isLoading = !1,
  _idLoading = void 0;
const _setLoadingDone = () => {
  _isLoading = !1;
};
const _loadItemFailed = option => {
  (0, _loadingStore.setLoadingFailed)();
  _setLoadingDone();
  (0, _ChartLogic.setAlertItemIdTo)(option);
  (0, _compStore.showAlertDialog)(option);
  (0, _storeFn.logErrorToConsole)(option);
};
const moveToTop = (chartType, id) => {
  const chartSlice = (0, _ChartLogic.toTop)(CHARTS, chartType, id);
  _setMsItemLoaded(chartSlice);
};
exports.moveToTop = moveToTop;
const _cancelLoad = (option, alertMsg) => {
  (0, _Msg.setAlertMsg)(option, alertMsg);
  if (alertMsg === _Msg.ERR_ALREADY_EXIST) {
    (0, _ChartLogic.setAlertItemIdTo)(option);
    (0, _compStore.showAlertDialog)(option);
    moveToTop(option.chartType, option.key);
    if ((0, _storeApi.isFn)(option.onFailed)) {
      option.onFailed();
    }
    return;
  }
  _loadItemFailed(option);
  if ((0, _storeApi.isFn)(option.onCancel)) {
    option.onCancel();
  }
};
const _isShouldEmit = function (confItem, option) {
  if (confItem === void 0) {
    confItem = {};
  }
  if (option === void 0) {
    option = {};
  }
  const key = (0, _LogicFn.crKeyForConfig)(option),
    _isDoublingLoad = _isLoading && key === _idLoading,
    _isTs = (0, _chartCheckBoxLogic.isLoadToChart)();

  //{ chartType, browserType, dialogConf } = confItem
  (0, _itemStoreFn.addSettingsTo)(option, confItem, {
    key,
    _isTs
  });
  const _alertMsg = (0, _itemStoreFn.crMsgSetting)(option) || (_isDoublingLoad ? _Msg.ERR_LOADING_IN_PROGRESS : !_isTs && isChartExist(option) ? _Msg.ERR_ALREADY_EXIST : '');
  return _alertMsg ? (_cancelLoad(option, _alertMsg), !1) : !0;
};
const _loadItemCompleted = (option, config) => {
  const {
    chartType,
    browserType,
    dialogConf,
    limitRemaining,
    key
  } = option;
  if (isChartExist(CHARTS, chartType, key)) {
    return;
  }
  const _dialogConf = dialogConf || (0, _dialogLogic.getDialogConf)(void 0, chartType),
    {
      chartSlice,
      Comp
    } = (0, _ChartLogic.loadConfig)(CHARTS, config, option, _dialogConf);
  (0, _browserLogic.addMenuItemCounter)(chartType, browserType);
  if (chartSlice) {
    _setMsItemLoaded(chartSlice);
  } else {
    _setMsItemInit(Comp);
    (0, _compStore.hideAbout)();
  }
  (0, _loadingStore.setLoadingComplete)(limitRemaining);
  _setLoadingDone();
};
const _loadItemAdded = function (option) {
  if (option === void 0) {
    option = {};
  }
  (0, _loadingStore.setLoadingComplete)();
  _setLoadingDone();
  (0, _ChartLogic.scanPostAdded)(option);
};
const loadItem = (confItem, option) => {
  if (_isShouldEmit(confItem, option)) {
    const {
      key,
      loadId = 'Q'
    } = option;
    _isLoading = !0;
    _idLoading = key;
    (0, _loadingStore.setLoading)();
    (0, _LoadImpl.getLoadImpl)(loadId).loadItem(option, _loadItemCompleted, _loadItemAdded, _loadItemFailed);
  }
};
exports.loadItem = loadItem;
const _FN_NOOP = () => {},
  ALERT_DESCR_BY_QUERY = "Loader for this item hasn't found.";
const loadItemByQuery = option => {
  (0, _itemStoreFn.addDialogPropsTo)(option);
  const {
    loadId
  } = option;
  option.proxy = (0, _settingStore.getProxy)(loadId);
  const impl = (0, _LoadImpl.getLoadImpl)(loadId);
  if (impl) {
    const {
      addPropsTo
    } = impl;
    if ((0, _storeApi.isFn)(addPropsTo)) {
      addPropsTo(option);
    }
    impl.loadItem(option, _loadItemCompleted, _FN_NOOP, _loadItemFailed);
  } else {
    option.alertDescr = ALERT_DESCR_BY_QUERY;
    _loadItemFailed(option);
  }
};
exports.loadItemByQuery = loadItemByQuery;
const showItemsContainer = (chartType, browserType, dialogConfOr) => {
  (0, _browserLogic.setMenuItemOpen)(chartType, browserType);
  const dialogConf = (0, _dialogLogic.getDialogConf)(dialogConfOr, chartType);
  const {
    chartSlice,
    Comp
  } = (0, _ChartLogic.showChart)(CHARTS, chartType, browserType, dialogConf);
  if (chartSlice) {
    _setMsItemLoaded(chartSlice);
  } else {
    _setMsItemInit(Comp);
    (0, _compStore.hideAbout)();
  }
};
exports.showItemsContainer = showItemsContainer;
const hideItemsContainer = chartType => {
  _setMsItemLoaded({
    chartType
  });
};
exports.hideItemsContainer = hideItemsContainer;
const closeChartItem = (chartType, browserType, chartId) => {
  const {
    chartSlice,
    isRemoved
  } = (0, _ChartLogic.removeConfig)(CHARTS, chartType, chartId);
  if (isRemoved) {
    (0, _chartCheckBoxLogic.resetActiveChart)(chartId);
    (0, _browserLogic.minusMenuItemCounter)(chartType, browserType);
    _setMsItemLoaded(chartSlice);
  }
};
exports.closeChartItem = closeChartItem;
const updateMv = (chartType, movingValues) => {
  (0, _ChartLogic.updateMovingValues)(CHARTS, chartType, movingValues);
};
exports.updateMv = updateMv;
const sortItemsBy = (chartType, by) => {
  const chartSlice = (0, _ChartLogic.sortBy)(CHARTS, chartType, by);
  _setMsItemLoaded(chartSlice);
};
exports.sortItemsBy = sortItemsBy;
const removeItemsAll = (chartType, browserType) => {
  const chartSlice = (0, _ChartLogic.removeAll)(CHARTS, chartType);
  (0, _browserLogic.resetMenuItemCounter)(chartType, browserType);
  (0, _chartCheckBoxLogic.uncheckActiveCheckbox)();
  _setMsItemLoaded(chartSlice);
};
exports.removeItemsAll = removeItemsAll;
//# sourceMappingURL=itemStore.js.map
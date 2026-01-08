import {
  setAlertMsg,
  ERR_ALREADY_EXIST,
  ERR_LOADING_IN_PROGRESS,
} from '../../constants/Msg';

import { logErrorToConsole } from './storeFn';

import { crKeyForConfig } from '../logic/LogicFn';
import { getLoadImpl } from '../logic/LoadImpl';

import {
  isChartExistImpl,
  removeConfig,
  toTop,
  removeAll,
  updateMovingValues,
  loadConfig,
  showChart,
  sortBy,
  checkBrowserChartTypes,
  scanPostAdded,
  setAlertItemIdTo
} from './chart/ChartLogic';

import { isLoadToChart } from './chartCheckBoxLogic';
import { getDialogConf } from './dialogLogic';
import {
  setMenuItemOpen,
  addMenuItemCounter,
  minusMenuItemCounter,
  resetMenuItemCounter
} from './browserLogic';

import {
  uncheckActiveCheckbox,
  resetActiveChart
} from './chartCheckBoxLogic';

import {
  getProxy
} from '../stores/settingStore';

import {
  setLoading,
  setLoadingComplete,
  setLoadingFailed
} from './loadingStore';

import {
  hideAbout,
  showAlertDialog
} from './compStore';

import {
  addSettingsTo,
  crMsgSetting,
  addDialogPropsTo
} from './itemStoreFn';

import {
  isFn,
  createStoreWithSelector,
  fCrStoreSlice,
  getStoreApi,
  fCrUse
} from '../storeApi'

const [
  _crMsItemLoaded,
  _selectMsItemLoaded
] = fCrStoreSlice("msItemLoaded")
, [
  _crMsItemInit,
  _selectMsItemInit
] = fCrStoreSlice("msItemInit")
, _crStore = () => ({
  ..._crMsItemLoaded(),
  ..._crMsItemInit()
})
, _itemStore = createStoreWithSelector(_crStore)
, [set] = getStoreApi(_itemStore)

export const useMsItemLoaded = fCrUse(_itemStore, _selectMsItemLoaded)
export const useMsInit = fCrUse(_itemStore, _selectMsItemInit)

const _setMsItemLoaded = chartSlice => {
  set(_crMsItemLoaded({...chartSlice}))
}
const _setMsItemInit = Comp => {
  set(_crMsItemInit({ Comp }))
}

const CHARTS = {};

export const getConfigs = chartType => CHARTS[chartType].configs

export const isChartExist = option => {
  checkBrowserChartTypes(option)
  const { chartType, key } = option;
  return isChartExistImpl(CHARTS, chartType, key);
}

let _isLoading = !1
, _idLoading = void 0

const _setLoadingDone = () => {
  _isLoading = !1
}

const _loadItemFailed = (option) => {
  setLoadingFailed()
  _setLoadingDone()

  setAlertItemIdTo(option)
  showAlertDialog(option)
  logErrorToConsole(option)
}

export const moveToTop = (
  chartType,
  id
) => {
  const chartSlice = toTop(
    CHARTS,
    chartType,
    id
  )
  _setMsItemLoaded(chartSlice)
}

const _cancelLoad = (
  option,
  alertMsg
) => {
  setAlertMsg(option, alertMsg);

  if (alertMsg === ERR_ALREADY_EXIST) {
    setAlertItemIdTo(option)
    showAlertDialog(option)
    moveToTop(option.chartType, option.key)

    if (isFn(option.onFailed)) {
      option.onFailed();
    }
    return;
  }

  _loadItemFailed(option);

  if (isFn(option.onCancel)) {
    option.onCancel();
  }
}

const _isShouldEmit = (
  confItem={},
  option={}
) => {
  const key = crKeyForConfig(option)
  , _isDoublingLoad = _isLoading
      && key === _idLoading
  , _isTs = isLoadToChart();

  //{ chartType, browserType, dialogConf } = confItem
  addSettingsTo(option, confItem, { key, _isTs })

  const _alertMsg = crMsgSetting(option)
   || ( _isDoublingLoad
           ? ERR_LOADING_IN_PROGRESS
           : !_isTs && isChartExist(option)
               ? ERR_ALREADY_EXIST
               : '');

  return _alertMsg
    ? (_cancelLoad(option, _alertMsg), !1)
    : !0;
}

const _loadItemCompleted = (
  option,
  config
) => {
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

  const _dialogConf = dialogConf || getDialogConf(void 0, chartType)
  , {
    chartSlice,
    Comp
  } = loadConfig(
    CHARTS,
    config,
    option,
    _dialogConf
  );

  addMenuItemCounter(chartType, browserType);
  if (chartSlice){
    _setMsItemLoaded(chartSlice)
  } else {
    _setMsItemInit(Comp)
    hideAbout()
  }
  setLoadingComplete(limitRemaining)
  _setLoadingDone()
}

const _loadItemAdded = (option={}) => {
   setLoadingComplete()
   _setLoadingDone()

   scanPostAdded(option)
}

export const loadItem = (confItem, option) => {
  if (_isShouldEmit(confItem, option)) {
    const { key, loadId='Q' } = option;
    _isLoading = !0;
    _idLoading = key
    setLoading()
    getLoadImpl(loadId).loadItem(
      option,
      _loadItemCompleted,
      _loadItemAdded,
      _loadItemFailed
    )
  }
}

const _FN_NOOP = () => {}
, ALERT_DESCR_BY_QUERY = "Loader for this item hasn't found."

export const loadItemByQuery = (option) => {
  addDialogPropsTo(option)
  const { loadId } = option;
  option.proxy = getProxy(loadId)

  const impl = getLoadImpl(loadId);
  if (impl) {
    const { addPropsTo } = impl;
    if (isFn(addPropsTo)){
      addPropsTo(option)
    }
    impl.loadItem(
      option,
      _loadItemCompleted,
      _FN_NOOP,
      _loadItemFailed
    )
  } else {
    option.alertDescr = ALERT_DESCR_BY_QUERY
    _loadItemFailed(option)
  }
}

export const showItemsContainer = (
  chartType,
  browserType,
  dialogConfOr
) => {
  setMenuItemOpen(chartType, browserType)
  const dialogConf = getDialogConf(
    dialogConfOr,
    chartType
  );
  const {
    chartSlice,
    Comp
  } = showChart(
    CHARTS,
    chartType,
    browserType,
    dialogConf
  );
  if (chartSlice){
    _setMsItemLoaded(chartSlice)
  } else {
    _setMsItemInit(Comp)
    hideAbout()
  }
}

export const hideItemsContainer = (chartType) => {
  _setMsItemLoaded({ chartType })
}

export const closeChartItem = (
  chartType,
  browserType,
  chartId
) => {
  const {
    chartSlice,
    isRemoved
  } = removeConfig(
    CHARTS,
    chartType,
    chartId
  );

  if (isRemoved) {
    resetActiveChart(chartId)
    minusMenuItemCounter(chartType, browserType);

    _setMsItemLoaded(chartSlice)
  }
}

export const updateMv = (
  chartType,
  movingValues
) => {
  updateMovingValues(CHARTS, chartType, movingValues)
}


export const sortItemsBy = (
  chartType,
  by
) => {
  const chartSlice = sortBy(CHARTS, chartType, by);
  _setMsItemLoaded(chartSlice)
}


export const removeItemsAll = (
  chartType,
  browserType
) => {
  const chartSlice = removeAll(CHARTS, chartType);
  resetMenuItemCounter(chartType, browserType)
  uncheckActiveCheckbox()
  _setMsItemLoaded(chartSlice)
}

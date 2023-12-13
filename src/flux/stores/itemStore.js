import { getFromDate } from '../../utils/dateFn';

import {
  setAlertMsg,
  ERR_ALREADY_EXIST,
  ERR_FEATURE_WITHOUT_KEY,
  ERR_PREMIUM_WITHOUT_KEY,
  ERR_DOUBLE_LOAD_META,
  ERR_LOADING_IN_PROGRESS,
  withoutApiKey,
  withoutProxy
} from '../../constants/Msg';

import {
  logErrorToConsole
} from './storeFn';

import { crKeyForConfig } from '../logic/LogicFn';
import LoadConfig from '../logic/LoadConfig';

import {
  isChartExist as isChartExistImpl,
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
  resetMenuItemCounter,
  getSourceConfig
} from './browserLogic';

import {
  uncheckActiveCheckbox,
  resetActiveChart
} from './chartCheckBoxLogic';

import {
  getProxy,
  getKey,
  isSetting,
  isApiKeyRequired,
  isProxyRequired,
  getApiTitle
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
  isFn,
  isUndef,
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

const _assign = Object.assign;

const CHARTS = {};

export const getConfigs = chartType => CHARTS[chartType]

export const isChartExist = option => {
  checkBrowserChartTypes(option)
  const { chartType, key } = option;
  return isChartExistImpl(CHARTS, chartType, key);
}

let _isLoading = false
, _idLoading = void 0

const _setLoadingDone = () => {
  _isLoading = false
}

const _loadItemFailed = (option) => {
  setLoadingFailed()
  _setLoadingDone()

  setAlertItemIdTo(option)
  showAlertDialog(option)
  logErrorToConsole(option)
}

/*
let _fromChart;
export const copyChart = (chart) => {
  _fromChart = chart
}
export const getCopyFromChart = () => _fromChart;
*/

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

const _cancelLoad = function(
  option,
  alertMsg
){
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

const _addBoolOptionTo = (
  options,
  propName
) => {
  if (isUndef(options[propName])) {
    options[propName] = isSetting(propName)
  }
};

const _addSettingsTo = (
  options,
  confItem,
  itemProps
) => {
  const { loadId } = options;
  _assign(options, confItem, itemProps, {
    apiKey: getKey(loadId),
    proxy: getProxy(loadId)
  })
  _addBoolOptionTo(options, 'isDrawDeltaExtrems')
  _addBoolOptionTo(options, 'isNotZoomToMinMax')
};

const _checkMsgApiKey = ({
  apiKey,
  loadId,
  isKeyFeature,
  isPremium
}) => apiKey
  ? ''
  : isApiKeyRequired(loadId)
    ? withoutApiKey(getApiTitle(loadId))
    : isKeyFeature
       ? ERR_FEATURE_WITHOUT_KEY
       : isPremium
          ? ERR_PREMIUM_WITHOUT_KEY
          : '';

const _checkProxy = ({
  proxy,
  loadId
}) => isProxyRequired(loadId) && !proxy
  ? withoutProxy(getApiTitle(loadId))
  : ''

const _crMsgSetting = option =>
  _checkMsgApiKey(option) || _checkProxy(option);

const META_SUFFIX = '_Meta'
const _crMetaDataKey = key => key + META_SUFFIX;

const _isShouldEmit = (
  confItem={},
  option={}
) => {
  const _key = crKeyForConfig(option)
  , { isLoadMeta } = option
  , key = isLoadMeta
     ? _crMetaDataKey(_key)
     : _key
  , _isDoublingLoad = _isLoading
      && key === _idLoading
  , _isTs = isLoadToChart();

  //{ chartType, browserType, dialogConf } = confItem
  _addSettingsTo(option, confItem, { key, _isTs })

  const _alertMsg = _crMsgSetting(option)
   || (isLoadMeta && _isDoublingLoad
        ? ERR_DOUBLE_LOAD_META
        : _isDoublingLoad
           ? ERR_LOADING_IN_PROGRESS
           : !_isTs && isChartExist(option)
               ? ERR_ALREADY_EXIST
               : '');

  return _alertMsg
    ? (_cancelLoad(option, _alertMsg), false)
    : true;
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
    _isLoading = true;
    _idLoading = key
    setLoading()
    LoadConfig[loadId].loadItem(
      option,
      _loadItemCompleted,
      _loadItemAdded,
      _loadItemFailed
    )
  }
}

const _FN_NOOP = () => {}
const SUBTITLE = 'Loaded from URL Query';
const ALERT_DESCR_BY_QUERY = "Loader for this item hasn't found."
const _addDialogPropsTo = option => {
  const {
    chartType,
    browserType
  } = option
  , { dialogProps } = getSourceConfig(browserType, chartType) || {}
  , { dfProps } = dialogProps || {};

  _assign(option, dialogProps, dfProps, {
      subtitle: SUBTITLE
    }
  )

  const {
    fromDate,
    nInitFromDate
  } = option;
  if (!fromDate) {
    option.fromDate = nInitFromDate
       ? getFromDate(nInitFromDate)
       : getFromDate(2)
  }
}

export const loadItemByQuery = (option) => {
  _addDialogPropsTo(option)
  const { loadId } = option;
  option.proxy = getProxy(loadId)

  const impl = LoadConfig[loadId];
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

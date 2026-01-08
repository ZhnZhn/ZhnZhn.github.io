import { MDT_COLUMN_RANGE } from '../../../constants/ModalDialogType';
import { isArr, isStr } from '../../../utils/isTypeFn';

import { crItemContainerEl } from '../../logic/fItemContainer';

import { showModalDialog } from '../compStore';
import { getActiveChart } from '../chartCheckBoxLogic';
import { getActiveContCheckBox } from '../contCheckBoxLogic';

import { getSubSliceOf } from './getSubSliceOf';
import fCompareBy from './fCompareBy';

const _isSecondDotCase = (
  series, {
  seriaType
}) => seriaType === 'DOT_SET'
  && isArr(series)
  && series[0].type === 'scatter'
  && series.length === 2;

const _initChartSlice = (
  slice,
  chartType,
  config
) => {
  if (!slice[chartType]) {
    slice[chartType] = {
      chartType,
      configs: config ? [config] : [],
      isShow: true
    }
  }
}

const _crItemContainerEl = (
  browserType,
  dialogConf
) => ({
  Comp: crItemContainerEl({ browserType, dialogConf })
});
export const loadConfig = (
  slice,
  config,
  option,
  dialogConf
) => {
    const {
      chartType,
      browserType
    } = option
    , [
      chartSlice,
      configs
    ] = getSubSliceOf(slice, chartType);
    if (chartSlice){
      configs.unshift(config);
      chartSlice.isShow = true;
      return { chartSlice };
    } else {
      _initChartSlice(slice, chartType, config)
      return _crItemContainerEl(browserType, dialogConf);
    }
}

export const showChart = (
  slice,
  chartType,
  browserType,
  dialogConf
) => {
   const chartSlice = getSubSliceOf(slice, chartType)[0];
   if (chartSlice){
     chartSlice.isShow = true;
     return { chartSlice };
   } else {
     _initChartSlice(slice, chartType)
     return _crItemContainerEl(browserType, dialogConf);
   }
}

export const sortBy = (
  slice,
  chartType,
  by
) => {
  const [
    chartSlice,
    configs
  ] = getSubSliceOf(slice, chartType);
  if (by) {
    configs.sort(fCompareBy(by))
  } else {
    configs.reverse()
  }
  return chartSlice;
}

export const checkBrowserChartTypes = (
  option
) => {
  const chb = getActiveContCheckBox();
  if (chb) {
    option.chartType = chb.chartType
    option.browserType = chb.browserType
  }
}

export const scanPostAdded = (
  option
) => {
  const chart = getActiveChart();
  if (chart && _isSecondDotCase(chart.series, option)) {
    showModalDialog(MDT_COLUMN_RANGE, { chart })
  }
}

export const setAlertItemIdTo = (
  option
) => {
  const { alertItemId, value } = option;
  option.alertItemId = isStr(alertItemId)
    ? alertItemId
    : isStr(value) ? value : void 0;
}

const _getConfigId = c => c.zhConfig.id;
const _notConfById = id => c => _getConfigId(c) !== id;
const _confById = id => c => _getConfigId(c) === id;
const _getConfigKey = c => c.zhConfig.key;

export const isChartExistImpl = (
  slice,
  chartType,
  key
) => {
  const configs = getSubSliceOf(slice, chartType)[1];
  for (let config of configs){
    if (_getConfigKey(config) === key){
      return true;
    }
  }
  return false;
}

export const removeConfig = (
  slice,
  chartType,
  id
) => {
  const [
    chartSlice,
    configs
  ] = getSubSliceOf(slice, chartType);

  chartSlice.configs = configs
     .filter(_notConfById(id))

  return {
    chartSlice,
    isRemoved: configs.length > chartSlice.configs.length
  }
}

export const toTop = (
  slice,
  chartType,
  id
) => {
  const [
    chartSlice,
    configs
  ] = getSubSliceOf(slice, chartType)
  , _conf = configs.find(_confById(id));
  if (_conf) {
    const arrWithout = configs.filter(_notConfById(id));
    chartSlice.configs = [ _conf, ...arrWithout]
  }
  return chartSlice;
}

export const removeAll = (
  slice,
  chartType
) => {
   const _slice = slice[chartType] || {}
   _slice.configs = []
   return _slice;
}

const _isRequireUpdateMovingValues = (
  configs,
  movingValues
) => configs.length === movingValues.length;
export const updateMovingValues = (
  slice,
  chartType,
  movingValues
) => {
  const configs = getSubSliceOf(slice, chartType)[1];
  if (_isRequireUpdateMovingValues(configs, movingValues)) {
    const _hmConfigs = configs.reduce((hm, config) => {
      hm[_getConfigId(config)] = config;
      return hm;
    }, Object.create(null));

    movingValues.forEach(mv => {
      const _config = _hmConfigs[mv._id];
      if (_config) {
        _config.valueMoving = mv
      }
    });
  }
}

export {
  isChartExist,
  removeConfig,
  toTop,
  removeAll,
  updateMovingValues
} from './ChartLogicFn';

import {
  MDT_COLUMN_RANGE
} from '../../../constants/ModalDialogType';
import { showModalDialog } from '../compStore';
import { getActiveChart } from '../chartCheckBoxLogic';
import { getActiveContCheckBox } from '../contCheckBoxLogic';

import { crItemContainerEl } from '../../logic/fItemContainer';

import getSlice from './getSlice';
import fCompareBy from './fCompareBy';

const _isArr = Array.isArray;
const _isStr = str => typeof str === 'string';

const _isSecondDotCase = (
  series, {
  seriaType
}) => seriaType === 'DOT_SET'
  && _isArr(series)
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

export const loadConfig = (
  slice,
  config,
  option,
  dialogConf,
  store
) => {
    const {
      chartType,
      browserType
    } = option
    , {
      chartSlice,
      configs
    } = getSlice(slice, chartType);
    if (chartSlice){
      configs.unshift(config);
      chartSlice.isShow = true;
      return { chartSlice };
    } else {
      _initChartSlice(slice, chartType, config)
      return {
        Comp: crItemContainerEl({ browserType, dialogConf, store })
      };
    }
}

export const showChart = (
  slice,
  chartType,
  browserType,
  dialogConf,
  store
) => {
   const { chartSlice } = getSlice(slice, chartType);
   if (chartSlice){
     chartSlice.isShow = true;
     return { chartSlice };
   } else {
     _initChartSlice(slice, chartType)
     return {
       Comp: crItemContainerEl({ browserType, dialogConf, store })
     };
   }
}

export const sortBy = (
  slice,
  chartType,
  by
) => {
  const {
    chartSlice,
    configs
  } = getSlice(slice, chartType);
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
  option.alertItemId = _isStr(alertItemId)
    ? alertItemId
    : _isStr(value) ? value : void 0;
}

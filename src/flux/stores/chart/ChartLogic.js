import { ModalDialog as MD } from '../../../constants/Type'

import { ComponentActionTypes as CAT } from '../../actions/ComponentActions';
import fItemContainer from '../../logic/fItemContainer'

import _getSlice from './getSlice'
import fCompareBy from './fCompareBy'
import ChartLogicFn from './ChartLogicFn'

const { crItemContainerEl } = fItemContainer;


const _isArr = Array.isArray;
const _isStr = str => typeof str === 'string';

const _isSecondDotCase = (series, { seriaType }) => seriaType === 'DOT_SET'
  && _isArr(series)
  && series[0].type === 'scatter'
  && series.length === 2;

const ChartLogic = {
  ...ChartLogicFn,

  _initChartSlice(slice, chartType, config){
    if (!slice[chartType]) {
      slice[chartType] = {
        chartType,
        configs: config ? [config] : [],
        isShow: true
      }
    }
  },


  loadConfig(slice, config, option, dialogConf, store){
    const { chartType, browserType } = option
    , { chartSlice, configs } = _getSlice(slice, chartType);
    if (chartSlice){
      configs.unshift(config);
      chartSlice.isShow = true;
      return { chartSlice };
    } else {
      ChartLogic._initChartSlice(slice, chartType, config)
      return {
        Comp: crItemContainerEl({ browserType, dialogConf, store })
      };
    }
 },
 showChart(slice, chartType, browserType, dialogConf, store){
   const { chartSlice } = _getSlice(slice, chartType);
   if (chartSlice){
     chartSlice.isShow = true;
     return { chartSlice };
   } else {
     ChartLogic._initChartSlice(slice, chartType)
     return {
       Comp: crItemContainerEl({ browserType, dialogConf, store })
     };
   }
 },

  sortBy(slice, chartType, by){
    const {
       chartSlice, configs
    } = _getSlice(slice, chartType);
    if (by) {
      configs.sort(fCompareBy(by))
    } else {
      configs.reverse()
    }
    return chartSlice;
  },

  checkBrowserChartTypes(slice, option){
    const { activeContChb:chb } = slice;
    if (chb) {
      option.chartType = chb.chartType
      option.browserType = chb.browserType
    }
  },

  scanPostAdded(store, option) {
    const chart = store.getActiveChart();
    if (chart && _isSecondDotCase(chart.series, option)) {
      store.trigger(CAT.SHOW_MODAL_DIALOG, {
        modalDialogType: MD.COLUMN_RANGE,
        chart
      });
    }
  },

  setAlertItemIdTo(option){
    const { alertItemId, value } = option;
    option.alertItemId = _isStr(alertItemId)
      ? alertItemId
      : _isStr(value) ? value : void 0;
  }
};

export default ChartLogic

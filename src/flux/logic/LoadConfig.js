
import ChartStore from '../stores/ChartStore';
import ChartType from '../../constants/ChartType';
import {QuandlYahoo, QuandlGoogle} from '../../constants/DialogType';
import Msg from '../../constants/Msg';

import QuandlApi from '../../api/QuandlApi';
import QuandlAdapter from '../../adapters/QuandlAdapter';


const _fnCatchLoadError = function(error, chartId, onFailed){
  let caption, descr;
  if (error instanceof TypeError){
    caption = Msg.Alert.NETWORK_ERROR.caption;
    descr = Msg.Alert.NETWORK_ERROR.descr;
  } else {
    caption = (error.zhCaption) ? error.zhCaption : 'Runtime Error';
    descr = error.message;
  }
  onFailed({caption, descr ,chartId});
}

const loadData = function(chartType, browserType, option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
  const {dataColumn} = option;
  if (!parentId){
    loadToChartComp(dataColumn, chartType, browserType, option, onCompleted, onFailed);
  } else {
    loadToChart(dataColumn, chartType, browserType, option, parentId, onAdded, onFailed);
  }
}

const _fnAddSeriesToChart = function(chart, series, label){
  const options = chart.options;
  //12symbols
  const seriesText = (label.length>12) ? label.substring(0,12) : label
      , seriesCount = options.zhSeries.count
      , row = Math.floor(seriesCount/3)
      , x = 110 + 100*seriesCount - row*300
      , y = 55 + 15*row;

  chart.addSeries(series, true, true);
  chart.renderer.text(seriesText, x, y)
        .css({color: options.colors[series._colorIndex]})
        .add();

   options.zhSeries.count +=1;
}

const loadToChart = function(dataColumn, chartType, browserType, option, parentId, onAdded, onFailed){
     const chartId = option.value;
     option.apiKey = ChartStore.getQuandlKey();
     fetch(QuandlApi.getRequestUrl(option))
      .then((response)=>{
        return Promise.all([Promise.resolve(response), response.json()]);
      })
      .then(([response, json])=>{
        if (QuandlApi.checkResponse(response, json)){
          const series = QuandlAdapter.toSeries(json, dataColumn, chartId, parentId)
              , chart = ChartStore.getActiveChart();
          _fnAddSeriesToChart(chart, series, chartId);

          onAdded();
        }
      })
      .catch((error) => {
        _fnCatchLoadError(error, chartId, onFailed);
      })
}

const loadToChartComp = function(dataColumn, chartType, browserType, option,
                                 onCompleted, onFailed){
  const chartId = option.value;
  if (!ChartStore.isChartExist(chartType, chartId)) {
     option.apiKey = ChartStore.getQuandlKey();
     fetch(QuandlApi.getRequestUrl(option))
      .then((response)=>{
        return Promise.all([Promise.resolve(response), response.json()]);
      })
      .then(([response, json])=>{
         if (QuandlApi.checkResponse(response, json)){
           const {config} = QuandlAdapter.toConfig(json, dataColumn, chartId);
           config.zhConfig = {
               id : chartId,
               dataColumn: dataColumn
           }
           onCompleted(chartType, browserType, config);
         }
      })
      .catch((error) => {
        _fnCatchLoadError(error, chartId, onFailed);
      })
  } else {
    const {caption, descr} = Msg.Alert.ALREADY_EXIST
    onFailed({caption, descr, chartId});
  }
}

const LoadConfig = {
  [ChartType.QUANDL_CURRENCY_HISTORY] : loadData,
  [ChartType.QUANDL_COMMODITY_PRICE] : loadData,
  [ChartType.QUANDL_WORLDBANK_PRICE] : loadData,
  [ChartType.QUANDL_WIKI_STOCK] : loadData,
  [ChartType.QUANDL_TOKIO_STOCK] : loadData,
  [ChartType.QUANDL_CHINA_DCE_FUTURE] : loadData,
  [ChartType.QUANDL_CHINA_ZCE_FUTURE] : loadData,

  [ChartType.WATCH_LIST] : loadData
}

const addConfig = function(obj, fn){
  for(var key in obj){
    LoadConfig[obj[key]] = fn;
  }
}
addConfig(QuandlGoogle, loadData);
addConfig(QuandlYahoo, loadData);


export default LoadConfig


import ChartStore from '../stores/ChartStore';
import ChartType from '../../constants/ChartType';
import {QuandlYahoo, QuandlGoogle} from '../../constants/DialogType';
import QuandlApi from '../../api/QuandlApi';
import QuandlAdapter from '../../adapters/QuandlAdapter';

const AlertMsgs = {
  ALREADY_EXIST : {
    caption : 'Check Error',
    descr: 'The chart for this code has already existed in a container. Please close it and load again.'
  },
  NETWORK_ERROR : {
    caption : 'Network Error',
    descr: 'Network error is encountered. Failed to fetch. It seems you offline or maybe a DNS lookup failure.'
  }
}

const _fnCatchLoadError = function(error, chartId, onFailed){
  let caption, descr;
  if (error instanceof TypeError){
    caption = AlertMsgs.NETWORK_ERROR.caption;
    descr = AlertMsgs.NETWORK_ERROR.descr;
  } else {
    caption = (error.zhCaption) ? error.zhCaption : 'Runtime Error';
    descr = error.message;
  }
  onFailed({caption, descr ,chartId});
}

const loadData = function(dataColumn, chartType, browserType, option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
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
    const {caption, descr} = AlertMsgs.ALREADY_EXIST
    onFailed({caption, descr, chartId});
  }
}

const fnLoad1 = loadData.bind(null, 1);
const fnLoad4 = loadData.bind(null, 4);
const fnLoadOption = function(chartType, browserType, option, fnCompleted, fnFailed){
  loadData(option.dataColumn, chartType, browserType, option, fnCompleted, fnFailed);
}

const LoadConfig = {
  [ChartType.QUANDL_CURRENCY_HISTORY] : fnLoad1,
  [ChartType.QUANDL_COMMODITY_PRICE] : fnLoad1,
  [ChartType.QUANDL_WORLDBANK_PRICE] : fnLoad1,
  [ChartType.QUANDL_WIKI_STOCK] : fnLoad4,
  [ChartType.QUANDL_TOKIO_STOCK] : fnLoad4,
  [ChartType.QUANDL_CHINA_DCE_FUTURE] : fnLoad4,

  [ChartType.WATCH_LIST] : fnLoadOption
}

const addConfig = function(obj, fn){
  for(var key in obj){
    LoadConfig[obj[key]] = fn;
  }
}
addConfig(QuandlGoogle, fnLoad4);
addConfig(QuandlYahoo, fnLoad4);


export default LoadConfig

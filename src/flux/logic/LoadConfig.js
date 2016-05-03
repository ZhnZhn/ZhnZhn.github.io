
import ChartStore from '../stores/ChartStore';
import ChartType from '../../constants/ChartType';
import {QuandlYahoo, QuandlGoogle} from '../../constants/DialogType';
import QuandlApi from '../../api/QuandlApi';
import QuandlAdapter from '../../adapters/QuandlAdapter';


const loadData = function(dataColumn, chartType, browserType, option, onCompleted){
  if (ChartStore.isLoadToChart()){
    loadToChart(dataColumn, chartType, browserType, option);
  } else {
    loadToChartComp(dataColumn, chartType, browserType, option, onCompleted);
  }
}

const loadToChart = function(dataColumn, chartType, browserType, option){
     const chartId = option.value;
     option.apiKey = ChartStore.getQuandlKey();
     fetch(QuandlApi.getRequestUrl(option))
      .then((response)=>response.json())
      .then((json)=>{
        if (!json.quandl_error){
          let series = QuandlAdapter.toSeries(json, dataColumn, chartId);

          const chart = ChartStore.getActiveChart();
          const options = chart.options;

          ChartStore.getActiveChart().addSeries(series, true, true);

          //12symbols
          const seriesText = (chartId.length>12) ? chartId.substring(0,12) : chartId
              , seriesCount = options.zhSeries.count
              , row = Math.floor(seriesCount/3)
              , x = 110 + 100*seriesCount - row*300
              , y = 55 + 15*row;

          chart.renderer.text(seriesText, x, y)
                .css({color: options.colors[series._colorIndex]})
                .add();
          options.zhSeries.count +=1;

        } else {
          console.log('%cQuandl Error Message:', 'color:red;');
          console.log('%c' + json.quandl_error.message, 'color:red;');
        }
      })
      .catch((error) => {
        console.log('%c' + error.message, 'color:red;');
      })

}

const loadToChartComp = function(dataColumn, chartType, browserType, option, onCompleted){
  const chartId = option.value;
  if (!ChartStore.isChartExist(chartType, chartId)) {
     option.apiKey = ChartStore.getQuandlKey();
     fetch(QuandlApi.getRequestUrl(option))
      .then((response)=>response.json())
      .then((json)=>{
        if (!json.quandl_error){
          //const {config, configVolume} = QuandlAdapter.toConfig(json, dataColumn);
          const {config} = QuandlAdapter.toConfig(json, dataColumn);
          
          config.stockTicket = chartId;
          config.chart.zhId = chartId;
          onCompleted(chartType, browserType, config);
        } else {
          console.log('%cQuandl Error Message:', 'color:red;');
          console.log('%c' + json.quandl_error.message, 'color:red;');
        }
      })
      .catch((error) => {
        console.log('%c' + error.message, 'color:red;');
      })
  } else {
    console.log('%cChart for this type has already existed in a container. Close it and load again.', 'color:red;');
  }
}

const fnLoad1 = loadData.bind(null, 1);
const fnLoad4 = loadData.bind(null, 4);

const LoadConfig = {
  [ChartType.QUANDL_CURRENCY_HISTORY] : fnLoad1,
  [ChartType.QUANDL_COMMODITY_PRICE] : fnLoad1,
  [ChartType.QUANDL_WORLDBANK_PRICE] : fnLoad1,
  [ChartType.QUANDL_WIKI_STOCK] : fnLoad4,
  [ChartType.QUANDL_TOKIO_STOCK] : fnLoad4,
  [ChartType.QUANDL_CHINA_DCE_FUTURE] : fnLoad4

}

const addConfig = function(obj, fn){
  for(var key in obj){
    LoadConfig[obj[key]] = fn;
  }
}
addConfig(QuandlGoogle, fnLoad4);
addConfig(QuandlYahoo, fnLoad4);


export default LoadConfig

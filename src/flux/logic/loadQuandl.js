
import {fnFetch} from '../../utils/fn';
import {fnCatch} from './fnCatch';
import ChartStore from '../stores/ChartStore';
import Msg from '../../constants/Msg';

import QuandlApi from '../../api/QuandlApi';
import QuandlAdapter from '../../adapters/QuandlAdapter';

const _loadToChartComp = function(option, onCompleted, onFailed){
  const chartId = option.value
      , {chartType} = option;
  if (!ChartStore.isChartExist(chartType, chartId)) {
    fnFetch({
      uri : QuandlApi.getRequestUrl(option),
      option : option,
      onCheckResponse : QuandlApi.checkResponse,
      onFetch : fnFetchToChartComp,
      onCompleted : onCompleted,
      onCatch : fnCatch,
      onFailed : onFailed,
    })
  } else {
    const {caption, descr} = Msg.Alert.ALREADY_EXIST
    onFailed({caption, descr, chartId});
  }
}

const fnFetchToChartComp = function({json, option, onCompleted}){
  const {config} = QuandlAdapter.toConfig(json, option)
      , {chartType, browserType} = option;
  onCompleted(chartType, browserType, config);
}

const _loadToChart = function(option, onAdded, onFailed){
  fnFetch({
    uri : QuandlApi.getRequestUrl(option),
    option : option,
    onCheckResponse : QuandlApi.checkResponse,
    onFetch : fnFetchToChart,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed,
  })
}

const fnFetchToChart = function({json, option, onCompleted}){
  const series = QuandlAdapter.toSeries(json, option)
      , chart = ChartStore.getActiveChart();
  _fnAddSeriesToChart(chart, series, option.value);

  onCompleted();
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


const loadQuandl = function(
  chartType, browserType, option, onCompleted, onAdded, onFailed
){
  const parentId = ChartStore.isLoadToChart();

  option.apiKey = ChartStore.getQuandlKey();

  if (!parentId){
    option.chartType = chartType;
    option.browserType = browserType;
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
}

export {loadQuandl, fnFetchToChartComp, fnFetchToChart}

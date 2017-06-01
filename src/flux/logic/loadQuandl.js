
import {fnFetch} from '../../utils/fn';
import {fnCatch} from './fnCatch';
import ChartStore from '../stores/ChartStore';

import ChartFn from '../../charts/ChartFn';
import QuandlApi from '../../api/QuandlApi';
import QuandlAdapter from '../../adapters/QuandlAdapter';

const _loadToChartComp = function(option, onCompleted, onFailed){
  fnFetch({
    uri : QuandlApi.getRequestUrl(option),
    option : option,
    onCheckResponse : QuandlApi.checkResponse,
    onFetch : fnFetchToChartComp,
    onCompleted : onCompleted,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChartComp = function({json, option, onCompleted}){
  const {config} = QuandlAdapter.toConfig(json, option);
  onCompleted(option, config);
}

const _loadToChart = function(option, onAdded, onFailed){
  fnFetch({
    uri : QuandlApi.getRequestUrl(option),
    option : option,
    onCheckResponse : QuandlApi.checkResponse,
    onFetch : fnFetchToChart,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChart = function({ json, option, onCompleted }){
  const series = QuandlAdapter.toSeries(json, option)
      , chart = ChartStore.getActiveChart();

  ChartFn.addSeriaWithRenderLabel({
    chart, series,
    label: option.value,
    hasSecondYAxis: option.hasSecondYAxis
  })
  onCompleted(option)
}

const loadQuandl = function(option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
  if (!parentId){
     _loadToChartComp(option, onCompleted, onFailed);
  } else {
     option.parentId = parentId;
     _loadToChart(option, onAdded, onFailed);
  }
}

export { loadQuandl, fnFetchToChartComp, fnFetchToChart }

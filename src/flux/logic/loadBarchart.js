
import {fnFetch} from '../../utils/fnJsonp';
import {fnCatch} from './fnCatch';
import ChartStore from '../stores/ChartStore';

import ChartFn from '../../charts/ChartFn';
import BarchartApi from '../../api/BarchartApi';
import BarchartAdapter from '../../adapters/barchart/BarchartAdapter';

const _loadToChartComp = function(option, onCompleted, onFailed) {
  fnFetch({
    uri : BarchartApi.getRequestUrl(option),
    option : option,
    onCheckResponse : BarchartApi.checkResponse,
    onFetch : fnFetchToChartComp,
    onCompleted : onCompleted,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChartComp = function({json, option, onCompleted}){
  const { config } = BarchartAdapter.toConfig(json, option);
  onCompleted(option, config);
}

const _loadToChart = function(option, onAdded, onFailed){
  fnFetch({
    uri : BarchartApi.getRequestUrl(option),
    option : option,
    onCheckResponse : BarchartApi.checkResponse,
    onFetch : fnFetchToChart,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChart = function({ json, option, onCompleted }){
  const series = BarchartAdapter.toSeries(json, option)
      , chart = ChartStore.getActiveChart();

  ChartFn.addSeriaWithRenderLabel({
    chart, series,
    label: option.value,
    hasSecondYAxis: option.hasSecondYAxis
  })
  onCompleted(option)
}

const loadBarchart = function(option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
  if (!parentId){
     _loadToChartComp(option, onCompleted, onFailed);
  } else {
     option.parentId = parentId;
     _loadToChart(option, onAdded, onFailed);
  }
}

export { loadBarchart, fnFetchToChartComp, fnFetchToChart }

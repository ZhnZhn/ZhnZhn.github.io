
import {fnFetch} from '../../utils/fn';
import {fnCatch} from './fnCatch';
import ChartStore from '../stores/ChartStore';

import ChartFn from '../../charts/ChartFn';
import AlphaApi from '../../api/AlphaApi';
import AlphaAdapter from '../../adapters/alpha/AlphaAdapter';

const _loadToChartComp = function(option, onCompleted, onFailed){
  fnFetch({
    uri : AlphaApi.getRequestUrl(option),
    option : option,
    onCheckResponse : AlphaApi.checkResponse,
    onFetch : fnFetchToChartComp,
    onCompleted : onCompleted,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChartComp = function({json, option, onCompleted}){
  const {config} = AlphaAdapter.toConfig(json, option);  
  onCompleted(option, config);
}

const _loadToChart = function(option, onAdded, onFailed){
  fnFetch({
    uri : AlphaApi.getRequestUrl(option),
    option : option,
    onCheckResponse : AlphaApi.checkResponse,
    onFetch : fnFetchToChart,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChart = function({ json, option, onCompleted }){
  const series = AlphaAdapter.toSeries(json, option)
      , chart = ChartStore.getActiveChart();

  ChartFn.addSeriaWithRenderLabel({
    chart, series,
    label: option.value,
    hasSecondYAxis: option.hasSecondYAxis
  })
  onCompleted(option)
}

const loadAlpha = function(option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
  if (!parentId){
     _loadToChartComp(option, onCompleted, onFailed);
  } else {
     option.parentId = parentId;
     _loadToChart(option, onAdded, onFailed);
  }
}

export { loadAlpha, fnFetchToChartComp, fnFetchToChart }

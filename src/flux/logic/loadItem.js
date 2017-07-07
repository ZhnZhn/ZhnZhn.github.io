
import { fnCatch } from './fnCatch'

import ChartStore from '../stores/ChartStore'
import ChartFn from '../../charts/ChartFn'

const _loadToChartComp = function(objImpl, option, onCompleted, onFailed){
  const { fnFetch, api } = objImpl;
  fnFetch({
    uri : api.getRequestUrl(option),
    option : option,
    onCheckResponse : api.checkResponse,
    onFetch : _fnFetchToChartComp,
    onCompleted : onCompleted,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const _fnFetchToChartComp = function({json, option, onCompleted}){
  const { adapter } = option
      , { config } = adapter.toConfig(json, option);
  onCompleted(option, config);
}

const _loadToChart = function(objImpl, option, onAdded, onFailed){
  const { fnFetch, api } = objImpl;
  fnFetch({
    uri : api.getRequestUrl(option),
    option : option,
    onCheckResponse : api.checkResponse,
    onFetch : _fnFetchToChart,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const _fnFetchToChart = function({ json, option, onCompleted }){
  const { adapter } = option
      , series = adapter.toSeries(json, option)
      , chart = ChartStore.getActiveChart();

  ChartFn.addSeriaWithRenderLabel({
    chart, series,
    label: option.value,
    hasSecondYAxis: option.hasSecondYAxis
  })
  onCompleted(option)
}

const loadItem = (objImpl) => function(option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
  option.adapter = objImpl.adapter
  if (!parentId){
     _loadToChartComp(objImpl, option, onCompleted, onFailed);
  } else {
     option.parentId = parentId;
     _loadToChart(objImpl, option, onAdded, onFailed);
  }
}

export default loadItem

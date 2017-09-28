import { fnCatch } from './fnCatch'

import ChartStore from '../stores/ChartStore'
import ChartFn from '../../charts/ChartFn'

const _loadToChartComp = function(objImpl, option, onCompleted, onFailed){
  const { fnFetch, optionFetch, api } = objImpl;
  fnFetch({
    uri : api.getRequestUrl(option),
    option : option,
    optionFetch: optionFetch,
    onCheckResponse : api.checkResponse,
    onFetch : _fnFetchToChartComp.bind(null, objImpl),
    onCompleted : onCompleted,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const _fnFetchToChartComp = function(objImpl ,{json, option, onCompleted}){
  const { adapter } = objImpl
      , { config } = adapter.toConfig(json, option);

  if (typeof config.then !== 'function'){
     onCompleted(option, config)
  } else {
    config.then((config) => {
      onCompleted(option, config)
      return undefined;
    })
  }
}

const _loadToChart = function(objImpl, option, onAdded, onFailed){
  const { fnFetch, api } = objImpl;
  fnFetch({
    uri : api.getRequestUrl(option),
    option : option,
    onCheckResponse : api.checkResponse,
    onFetch : _fnFetchToChart.bind(null, objImpl),
    //onFetch : _fnToChart,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const _fnFetchToChart = function(objImpl, { json, option, onCompleted }){
  const { adapter } = objImpl
      , { itemCaption, value, hasSecondYAxis } = option
      , series = adapter.toSeries(json, option)
      , chart = ChartStore.getActiveChart();

  ChartFn.addSeriaWithRenderLabel({
    chart, series,
    label: series.zhItemCaption || itemCaption || value,
    hasSecondYAxis: !!hasSecondYAxis
  })
  onCompleted(option)
}

const loadItem = (objImpl) => {
    return {
      loadItem(option, onCompleted, onAdded, onFailed){
        const parentId = ChartStore.isLoadToChart();
        if (!parentId) {
           _loadToChartComp(objImpl, option, onCompleted, onFailed);
        } else {
           option.parentId = parentId;
           _loadToChart(objImpl, option, onAdded, onFailed);
        }
     },
     fnFetchToChartComp: _fnFetchToChartComp.bind(null, objImpl),
     fnFetchToChart: _fnFetchToChart.bind(null, objImpl)
   }
}

export default loadItem

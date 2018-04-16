import { fetchJson } from '../../utils/fnFetch'

import ChartStore from '../stores/ChartStore'
import ChartFn from '../../charts/ChartFn'

import { fnCatch } from './fnCatch'

const _crOptionFetch = (objImpl, option) => {
  const { optionFetch } = objImpl;
  return typeof optionFetch === 'function'
    ? optionFetch(option)
    : optionFetch;
}

const _loadToChartComp = function(objImpl, option, onCompleted, onFailed){
  const { fnFetch, api } = objImpl
      , optionFetch = _crOptionFetch(objImpl, option);

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
  const { fnFetch, api } = objImpl
      , optionFetch = _crOptionFetch(objImpl, option);
  fnFetch({
    uri : api.getRequestUrl(option),
    option : option,
    optionFetch: optionFetch,
    onCheckResponse : api.checkResponse,
    onFetch : _fnFetchToChart.bind(null, objImpl),
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const _fnFetchToChart = function(objImpl, { json, option, onCompleted }){
  const { adapter } = objImpl
      , { itemCaption, value, hasSecondYAxis } = option
      , chart = ChartStore.getActiveChart()
      , series = adapter.toSeries(json, option, chart)
      , { zhItemCaption, zhColor } = series || {};

  ChartFn.addSeriaWithRenderLabel({
    chart, series,
    label: zhItemCaption || itemCaption || value,
    color: zhColor,
    hasSecondYAxis: !!hasSecondYAxis
  })
  onCompleted(option)
}

const _fnLoadItem = function(objImpl, option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
  if (!parentId) {
     _loadToChartComp(objImpl, option, onCompleted, onFailed);
  } else {
     option.parentId = parentId;
     _loadToChart(objImpl, option, onAdded, onFailed);
  }
};

const fLoadItem = (objImpl) => {
   const {
           fnFetch=fetchJson,
           api, adapter
         } = objImpl;
   objImpl.fnFetch = fnFetch
   return {
     loadItem: _fnLoadItem.bind(null, objImpl),
     fnFetchToChartComp: _fnFetchToChartComp.bind(null, objImpl),
     fnFetchToChart: _fnFetchToChart.bind(null, objImpl),
     addPropsTo: api.addPropsTo,
     crKey: adapter.crKey
   };
}

export default fLoadItem

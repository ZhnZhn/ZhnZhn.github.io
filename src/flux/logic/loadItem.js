import { fetchJson } from '../../utils/fnFetch'

import ChartStore from '../stores/ChartStore'
import ChartFn from '../../charts/ChartFn'
import ChartTypes from '../../components/dialogs/ChartTypes'

import onCatch from './onCatch'

const ALERT = {
  CATEGORY_TO_SPLINE: {
    alertCaption: 'Series Error',
    alertDescr: "Adding category seria to not category isn't allowed."
  }
};

const _isArr = Array.isArray;
const _isFn = fn => typeof fn === 'function';

const _crOptionFetch = ({ optionFetch }, option) => _isFn(optionFetch)
  ? optionFetch(option)
  : optionFetch;

const _fetchToChartComp = function(objImpl ,{json, option, onCompleted}){
  const { adapter } = objImpl
      , { config } = adapter.toConfig(json, option);

  if (!_isFn(config.then)){
     onCompleted(option, config)
  } else {
    config.then(config => {
      onCompleted(option, config)
      return;
    })
  }
};

const _crRequestUrl = (api, option, onFailed) => {
  try {
    return api.getRequestUrl(option);
  } catch (error) {
    onCatch({ error, option, onFailed })
  }
};

const _loadToChartComp = function(objImpl, option, onCompleted, onFailed){
  const { fnFetch, api } = objImpl
  , { getLimitRemaiming } = api || {}
  , optionFetch = _crOptionFetch(objImpl, option);

  fnFetch({
    uri: _crRequestUrl(api, option, onFailed),
    option, optionFetch,
    getLimitRemaiming,
    onCheckResponse : api.checkResponse,
    onFetch : _fetchToChartComp.bind(null, objImpl),
    onCompleted : onCompleted,
    onCatch, onFailed
  })
}

const _isNotAllowToAdd = ({ toSeries, isAdd }, option) => !_isFn(toSeries)
 || (_isFn(isAdd) && !isAdd(option));

const _loadToChart = function(objImpl, option, onAdded, onFailed){
  const { fnFetch, api } = objImpl
  , { getLimitRemaiming } = api || {}
  , optionFetch = _crOptionFetch(objImpl, option);
  fnFetch({
    uri: _crRequestUrl(api, option, onFailed),
    option, optionFetch,
    getLimitRemaiming,
    onCheckResponse : api.checkResponse,
    onFetch : _fetchToChart.bind(null, objImpl),
    onCompleted : onAdded,
    onCatch, onFailed
  })
};

const _fetchToChart = function(objImpl, { json, option, onCompleted }){
  const { adapter } = objImpl
      , { itemCaption:label, value, hasSecondYAxis } = option
      , chart = ChartStore.getActiveChart()
      , series = adapter.toSeries(json, option, chart)
      , { itemCaption, color, zhColor } = series || {};

  ChartFn.addSeriaWithRenderLabel({
    chart, series,
    label: itemCaption || label || value,
    color: color || zhColor,
    hasSecondYAxis: !!hasSecondYAxis
  })
  onCompleted(option)
}

const _isAddCategoryToSpline = ({ seriaType }) => {
  const chart = ChartStore.getActiveChart();
  return seriaType
    && ChartTypes.isCategory({ value: seriaType })
    && chart && _isArr(chart.xAxis)
    && !_isArr(chart.xAxis[0].categories);
};

const _runAsync = (fn, mls=500) => {
  setTimeout(fn, mls)
};

const _loadItem = function(objImpl, option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();
  if (!parentId) {
     _loadToChartComp(objImpl, option, onCompleted, onFailed);
  } else {
    if (_isNotAllowToAdd(objImpl.adapter, option)) {
      _runAsync(() => {
        onCatch({
          error: new Error("ERR_10"),
          option, onFailed
        })
      })
    } else if (_isAddCategoryToSpline(option)) {
      _runAsync(() => onFailed(ALERT.CATEGORY_TO_SPLINE))
    } else {
      option.parentId = parentId;
      _loadToChart(objImpl, option, onAdded, onFailed);
    }
  }
};

const _crLoadFns = (objImpl) => objImpl.id === 'Q'
  ? {
      fnFetchToChartComp: _fetchToChartComp.bind(null, objImpl),
      fnFetchToChart: _fetchToChart.bind(null, objImpl),
    }
  : void 0;

const fLoadItem = (objImpl) => {
   const {
     fnFetch=fetchJson,
     api, adapter
   } = objImpl
   , _loadFns = _crLoadFns(objImpl);
   objImpl.fnFetch = fnFetch
   return {
     loadItem: _loadItem.bind(null, objImpl),
     addPropsTo: api.addPropsTo,
     crKey: adapter.crKey,
     ..._loadFns
   };
}

export default fLoadItem

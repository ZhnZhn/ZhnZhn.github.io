import { LoadType as LT } from '../../constants/Type'
import { fetchJson } from '../../utils/fnFetch'
import { fnCatch } from './fnCatch';
import ChartStore from '../stores/ChartStore';

import QuandlApi from '../../adapters/QuandlApi';

import LoadImpl from './LoadImpl'

const _compareByCaption = (a, b) => {
  if (a.caption < b.caption ) return -1;
  else if (a.caption > b.caption) return 1;
  else return 0;
}

const _fnFetchToChartComp = function({ json, option, onCompleted }){
  const arr = json.dataset.column_names
      , max = arr.length;
  let optionTrades = [], i=1;
  for (; i<max; i++){
    optionTrades.push({ caption: arr[i], value: i });
  }
  optionTrades.sort(_compareByCaption);
  option.onLoad(optionTrades);
}

const _fnFailedLoadMeta = function(option, onFailed, optionFailed){
  option.onFailed();
  onFailed(optionFailed);
}

const _loadToChartComp = function(option, onCompleted, onFailed){
   const { isLoadMeta } = option
       , _onFetch = (isLoadMeta)
            ? _fnFetchToChartComp
            : LoadImpl.Quandl.fnFetchToChartComp
       , _onFailed = (isLoadMeta)
            ? _fnFailedLoadMeta.bind(null, option, onFailed)
            : onFailed;
   fetchJson({
     uri : QuandlApi.getRequestUrl(option),
     option : option,
     onCheckResponse : QuandlApi.checkResponse,
     onFetch : _onFetch,
     onCompleted : onCompleted,
     onCatch : fnCatch,
     onFailed : _onFailed
   })
}

const _loadToChart = function(option, onAdded, onFailed){
  const { isLoadMeta } = option
      , _onFetch = (isLoadMeta)
           ? _fnFetchToChartComp
           : LoadImpl.Quandl.fnFetchToChart
      , _onFailed = (isLoadMeta)
           ? _fnFailedLoadMeta.bind(null, option, onFailed)
           : onFailed;
  fetchJson({
    uri : QuandlApi.getRequestUrl(option),
    option : option,
    onCheckResponse : QuandlApi.checkResponse,
    onFetch : _onFetch,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : _onFailed
  })
}

const loadQuandlCommodityTrade = {
  loadItem(option, onCompleted, onAdded, onFailed){
    const parentId = ChartStore.isLoadToChart();
    option.apiKey = ChartStore.getKey(LT.Q)

    if (!parentId){
      _loadToChartComp(option, onCompleted, onFailed);
    } else {
      option.parentId = parentId;
      _loadToChart(option, onAdded, onFailed);
    }
  }
}

export {loadQuandlCommodityTrade}

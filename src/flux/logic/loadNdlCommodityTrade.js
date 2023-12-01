import { LT_Q } from '../../constants/LoadType';
import { fetchJson } from '../../utils/fnFetch';
import onCatch from './onCatch';
import { getKey } from '../stores/settingStore';
import { isLoadToChart } from '../stores/chartCheckBoxLogic';

import NdlApi from '../../adapters/ndl/NdlApi';

import LoadImpl from './LoadImpl';

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
        : LoadImpl.Ndl.fnFetchToChartComp
   , _onFailed = (isLoadMeta)
        ? _fnFailedLoadMeta.bind(null, option, onFailed)
        : onFailed;

   fetchJson({
     uri : NdlApi.getRequestUrl(option),
     option : option,
     onCheckResponse : NdlApi.checkResponse,
     onFetch : _onFetch,
     onCompleted : onCompleted,
     onCatch : onCatch,
     onFailed : _onFailed
   })
}

const _loadToChart = function(option, onAdded, onFailed){
  const { isLoadMeta } = option
      , _onFetch = (isLoadMeta)
           ? _fnFetchToChartComp
           : LoadImpl.Ndl.fnFetchToChart
      , _onFailed = (isLoadMeta)
           ? _fnFailedLoadMeta.bind(null, option, onFailed)
           : onFailed;
  fetchJson({
    uri : NdlApi.getRequestUrl(option),
    option : option,
    onCheckResponse : NdlApi.checkResponse,
    onFetch : _onFetch,
    onCompleted : onAdded,
    onCatch : onCatch,
    onFailed : _onFailed
  })
}

export const loadNdlCommodityTrade = {
  loadItem(option, onCompleted, onAdded, onFailed){
    const parentId = isLoadToChart();
    option.apiKey = getKey(LT_Q)

    if (!parentId){
      _loadToChartComp(option, onCompleted, onFailed);
    } else {
      option.parentId = parentId;
      _loadToChart(option, onAdded, onFailed);
    }
  }
}

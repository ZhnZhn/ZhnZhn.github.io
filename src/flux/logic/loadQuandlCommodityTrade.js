
import sortBy from 'lodash/sortBy';

import { fnFetch } from '../../utils/fn';
import { fnCatch } from './fnCatch';
import ChartStore from '../stores/ChartStore';

import QuandlApi from '../../api/QuandlApi';

import { fnFetchToChartComp, fnFetchToChart } from './loadQuandl';


const _fnFetchToChartComp = function({ json, option, onCompleted }){
  const arr = json.dataset.column_names
      , max = arr.length;
  let optionTrades = [];
  for (let i=1; i<max; i++){
    optionTrades.push({caption: arr[i], value: i});
  }
  optionTrades = sortBy(optionTrades, 'caption');
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
            : fnFetchToChartComp
       , _onFailed = (isLoadMeta)
            ? _fnFailedLoadMeta.bind(null, option, onFailed)
            : onFailed;
   fnFetch({
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
           ? _fnFetchToChartComp : fnFetchToChart
      , _onFailed = (isLoadMeta)
           ? _fnFailedLoadMeta.bind(null, option, onFailed)
           : onFailed;
  fnFetch({
    uri : QuandlApi.getRequestUrl(option),
    option : option,
    onCheckResponse : QuandlApi.checkResponse,
    onFetch : _onFetch,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : _onFailed
  })
}


const loadQuandlCommodityTrade = function(
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

export {loadQuandlCommodityTrade}

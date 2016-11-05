
import {fnFetch} from '../../utils/fn';
import {fnCatch} from './fnCatch';
import ChartStore from '../stores/ChartStore';

import ChartFn from '../../charts/ChartFn';
import EuroStatApi from '../../api/EuroStatApi';
import EuroStatAdapter from '../../adapters/EuroStatAdapter';

const _loadToChartComp = function(option, onCompleted, onFailed){
  fnFetch({
    uri : EuroStatApi.getRequestUrl(option),
    option : option,
    onCheckResponse : EuroStatApi.checkResponse,
    onFetch : fnFetchToChartComp,
    onCompleted : onCompleted,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChartComp = function({json, option, onCompleted}){
  //console.log(json);
  const { config } = EuroStatAdapter.toConfig(json, option);
  onCompleted(option, config);
}

const _loadToChart = function(option, onAdded, onFailed){
  fnFetch({
    uri : EuroStatApi.getRequestUrl(option),
    option : option,
    onCheckResponse : EuroStatApi.checkResponse,
    onFetch : fnFetchToChart,
    onCompleted : onAdded,
    onCatch : fnCatch,
    onFailed : onFailed
  })
}

const fnFetchToChart = function({ json, option, onCompleted }){
  const series = EuroStatAdapter.toSeries(json, option)
      , chart = ChartStore.getActiveChart();

  ChartFn.addSeriaWithRenderLabel(chart, series, option.itemCaption);
  onCompleted(option);
}

const loadEuroStat = function(option, onCompleted, onAdded, onFailed){
  const parentId = ChartStore.isLoadToChart();

  if (!parentId){
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
}

export { loadEuroStat }

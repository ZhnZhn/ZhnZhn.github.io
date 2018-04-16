import Reflux from 'reflux';

import DU from '../../utils/DateUtils';
import Msg from '../../constants/Msg';
import ChartStore from '../stores/ChartStore';
import LoadConfig from '../logic/LoadConfig';
import LogicUtils from '../logic/LogicUtils';
import { T as LPA } from './LoadingProgressActions'

const C = {
  DESR_LOADER: "Loader for this item hasn't found."
};

const META = '_Meta';
const _fnNoop = () => {};

export const ChartActionTypes = {
  INIT_AND_SHOW_CHART : 'initAndShowChart',
  LOAD_STOCK : 'loadStock',
  LOAD_STOCK_COMPLETED : 'loadStockCompleted',
  LOAD_STOCK_ADDED : 'loadStockAdded',
  LOAD_STOCK_FAILED : 'loadStockFailed',

  LOAD_STOCK_BY_QUERY: 'loadStockByQuery',
  LOAD_STOCK_BY_QUERY_C: 'loadStockByQueryC',
  LOAD_STOCK_BY_QUERY_F: 'loadStockByQueryF',

  SHOW_CHART : 'showChart',
  CLOSE_CHART : 'closeChart',

  COPY: 'copy'
};
const A = ChartActionTypes;
const M = Msg.Alert;

const _fnOnChangeStore = function(actionType, data){
  if (actionType === LPA.LOADING_COMPLETE ||
      actionType === LPA.LOADING_FAILED
  ){
    ChartActions[A.LOAD_STOCK].isLoading = false;
  }
}

const _fnCancelLoad = function(option, alertMsg, isWithFailed){
  Msg.setAlertMsg(option, alertMsg);
  this.failed(option);
  this.isShouldEmit = false;

  if (typeof option.onCancel === 'function'){
    option.onCancel();
  } else if (isWithFailed && typeof option.onFailed === 'function'){
    option.onFailed();
  }
}

const _addSettings = (option) => {
  const { loadId } = option
      , apiKey = ChartStore.getKey(loadId)
      , proxy = ChartStore.getProxy(loadId);
  Object.assign(option, {
    apiKey, proxy,
    isDrawDeltaExtrems: ChartStore.isSetting('isDrawDeltaExtrems'),
    isNotZoomToMinMax: ChartStore.isSetting('isNotZoomToMinMax')
  })
}

const ChartActions =  Reflux.createActions({
      [A.LOAD_STOCK] : {
         children : ['completed', 'added', 'failed'],
         isLoading : false,
         idLoading : undefined,
         isShouldEmit : true,
         cancelLoad : _fnCancelLoad
       },
      [A.LOAD_STOCK_BY_QUERY]: {
        children: [ 'completed', 'failed']
      },
      [A.SHOW_CHART] : {},
      [A.CLOSE_CHART] : {},
      [A.COPY]: {},
      [A.PASTE_TO]: {}
});

ChartActions.fnOnChangeStore = _fnOnChangeStore

const _withApiKey = ['B', 'AL', 'AL_S', 'AL_I', 'BEA', 'INTR']
const _apiTitle = {
  B: 'Barchart Market Data',
  AL: 'Alpha Vantage',
  AL_S: 'Alpha Vantage',
  AL_I: 'Alpha Vantage',
  BEA: 'BEA',
  INTR: 'Intrinio'
};

const _checkMsgApiKey = (option) => {
  const { apiKey, loadId, isKeyFeature, isPremium } = option;
  if (!apiKey){
    if (_withApiKey.indexOf(loadId) !== -1) {
      return M.withoutApiKey(
        _apiTitle[loadId]
      );
    }
    if (isKeyFeature) {
      return M.FEATURE_WITHOUT_KEY;
    }
    if (isPremium) {
      return M.PREMIUM_WITHOUT_KEY;
    }
  }
  return false;
}

ChartActions[A.LOAD_STOCK].preEmit = function(confItem={}, option={}) {
  const { chartType } = confItem
      , key = LogicUtils.createKeyForConfig(option)
      , isDoublingLoad = this.isLoading && key === this.idLoading
      , isDoublLoadMeta = (option.isLoadMeta)
          ? (key + META === this.idLoading)
          : false;

  option.key = key;
  this.isShouldEmit = true;
  _addSettings(option)

  const _msgApiKey = _checkMsgApiKey(option);
  if (_msgApiKey) {
    this.cancelLoad(option, _msgApiKey, false);
  } else if (isDoublingLoad){
    this.cancelLoad(option, M.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta){
    this.cancelLoad(option, M.DOUBLE_LOAD_META, false);
  } else if (!ChartStore.isLoadToChart()){     
     if (ChartStore.isChartExist(chartType, key)){
       this.cancelLoad(option, M.ALREADY_EXIST, true);
     }
  }
  return undefined;
}

ChartActions[A.LOAD_STOCK].shouldEmit = function(){
  return this.isShouldEmit;
}
ChartActions[A.LOAD_STOCK].listen(function(confItem, option){
  const { chartType, browserType, conf } = confItem;
  option.conf = conf

  this.isLoading = true;
  this.idLoading = option.key;
  if (option.isLoadMeta){
    this.idLoading = this.idLoading + META;
  }

  const { loadId='Q' } = option;
  option.chartType = chartType;
  option.browserType = browserType;
  LoadConfig[loadId].loadItem(option, this.completed, this.added, this.failed);
})

const SUBTITLE = 'Loaded from URL Query';
const _addDialogPropsTo = option => {
  const { chartType, browserType } = option
      , { dialogProps } = ChartStore
            .getSourceConfig(browserType, chartType) || {};

  Object.assign(option,
    dialogProps,
    dialogProps.dfProps, {
      subtitle: SUBTITLE
    }
  )

  const { fromDate, nInitFromDate } = option;
  if (!fromDate) {
    option.fromDate = nInitFromDate
       ? DU.getFromDate(nInitFromDate)
       : DU.getFromDate(2)
  }
};

ChartActions[A.LOAD_STOCK_BY_QUERY].listen(function(option){
  _addDialogPropsTo(option)
  const { loadId } = option;
  option.proxy = ChartStore.getProxy(loadId)

  const impl = LoadConfig[loadId];
  if (impl) {
    const { addPropsTo } = impl;
    if (typeof addPropsTo === 'function'){
      addPropsTo(option)
    }
    impl.loadItem(option, this.completed, _fnNoop, this.failed)
  } else {
    option.alertDescr = C.DESCR_LOADER
    this.failed(option)
  }
})

export default ChartActions

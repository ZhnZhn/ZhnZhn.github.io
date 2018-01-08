import Reflux from 'reflux';

import DU from '../../utils/DateUtils';
import Msg from '../../constants/Msg';
import ChartStore from '../stores/ChartStore';
import LoadConfig from '../logic/LoadConfig';
import LogicUtils from '../logic/LogicUtils';

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
   if (actionType === A.LOAD_STOCK_COMPLETED ||
       actionType === A.LOAD_STOCK_ADDED ||
       actionType === A.LOAD_STOCK_FAILED )
   {
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
  const { loadId } = option;
  let apiKey, proxy;
  switch(loadId){
    case 'B':
      apiKey = ChartStore.getBarchartKey()
      break;
    case 'AL': case 'AL_S': case 'AL_I':
      apiKey = ChartStore.getAlphaKey()
      break;
    case 'BEA':
      apiKey = ChartStore.getBeaKey()
      break;
    case 'FS': case 'FAO':
    case 'NST': case 'NST_2':
    case 'SWS':
      proxy = ChartStore.getProxy()
      break;
    default:
      apiKey = ChartStore.getQuandlKey()
  }

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

ChartActions[A.LOAD_STOCK].preEmit = function() {
  const arg = [].slice.call(arguments)
      , confItem = arg[0]
      , { chartType } = confItem
      , option = arg[1]
      , key = LogicUtils.createKeyForConfig(option)
      , isDoublingLoad = this.isLoading && key === this.idLoading
      , isDoublLoadMeta = (option.isLoadMeta)
          ? (key + META === this.idLoading)
          : false;

  option.key = key;
  this.isShouldEmit = true;
  _addSettings(option)

  const {
          loadId, apiKey,
          isKeyFeature, isPremium
        } = option;

  if (loadId === 'B' && !apiKey){
    this.cancelLoad(option, M.withoutApiKey('Barchart Market Data'), false);
  } else if ( (loadId === 'AL' || loadId === 'AL_S' || loadId === 'AL_I' ) && !apiKey) {
    this.cancelLoad(option, M.withoutApiKey('Alpha Vantage'), false);
  } else if ( loadId === 'BEA' && !apiKey) {
    this.cancelLoad(option, M.withoutApiKey('BEA'), false);
  } else if (isKeyFeature && !apiKey){
    this.cancelLoad(option, M.FEATURE_WITHOUT_KEY, false);
  } else if (isPremium && !apiKey){
    this.cancelLoad(option, M.PREMIUM_WITHOUT_KEY, false);
  } else if (isDoublingLoad){
    this.cancelLoad(option, M.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta){
    this.cancelLoad(option, M.DOUBLE_LOAD_META, false);
  }  else if (!ChartStore.isLoadToChart()){
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
    dialogProps, { subtitle: SUBTITLE }
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

  const impl = LoadConfig[option.loadId];
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

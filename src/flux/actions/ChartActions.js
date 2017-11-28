import Reflux from 'reflux';

import Msg from '../../constants/Msg';
import ChartStore from '../stores/ChartStore';
import LoadConfig from '../logic/LoadConfig';
import LogicUtils from '../logic/LogicUtils';

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
  switch(option.loadId){
    case 'B':
      option.apiKey = ChartStore.getBarchartKey()
      break;
    case 'AL': case 'AL_S': case 'AL_I':
      option.apiKey = ChartStore.getAlphaKey()
      break;
    case 'FS': case 'FAO': case 'NST': case 'NST_2':
      option.proxy = ChartStore.getProxy()
      break;
    default:
      option.apiKey = ChartStore.getQuandlKey()
  }

  option.isDrawDeltaExtrems = ChartStore.isSetting('isDrawDeltaExtrems')
  option.isNotZoomToMinMax = ChartStore.isSetting('isNotZoomToMinMax')
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
      , chartType = arg[0]
      , option = arg[2]
      , key = LogicUtils.createKeyForConfig(option)
      , isDoublingLoad = this.isLoading && key === this.idLoading
      , isDoublLoadMeta = (option.isLoadMeta)
          ? (key + META === this.idLoading)
          : false;

  option.key = key;
  this.isShouldEmit = true;
  _addSettings(option)

  if (option.loadId === 'B' && !option.apiKey){
    this.cancelLoad(option, M.withoutApiKey('Barchart Market Data'), false);
  } else if ( (option.loadId === 'AL' || option.loadId === 'AL_S' || option.loadId === 'AL_I' ) && !option.apiKey) {
    this.cancelLoad(option, M.withoutApiKey('Alpha Vantage'), false);
  } else if (option.isKeyFeature && !option.apiKey){
    this.cancelLoad(option, M.FEATURE_WITHOUT_KEY, false);
  } else if (option.isPremium && !option.apiKey){
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
ChartActions[A.LOAD_STOCK].listen(function(chartType, browserType, option){

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

ChartActions[A.LOAD_STOCK_BY_QUERY].listen(function(option){
  const {
          chartType, browserType,
          loadId
         } = option
      , impl = LoadConfig[loadId];
  if (impl) {
    const config = ChartStore.getSourceConfig(browserType, chartType);
    Object.assign(option, config.dialogProps )
    impl.loadItem(option, this.completed, _fnNoop, this.failed);
   } else {
     this.failed()
   }
})

export default ChartActions

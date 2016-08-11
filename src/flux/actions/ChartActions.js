import Reflux from 'reflux';

import Msg from '../../constants/Msg';
import ChartStore from '../stores/ChartStore';
import LoadConfig from '../logic/LoadConfig';
import LogicUtils from '../logic/LogicUtils';

const META = '_Meta';

export const ChartActionTypes = {
  INIT_AND_SHOW_CHART : 'initAndShowChart',
  LOAD_STOCK : 'loadStock',
  LOAD_STOCK_COMPLETED : 'loadStockCompleted',
  LOAD_STOCK_ADDED : 'loadStockAdded',
  LOAD_STOCK_FAILED : 'loadStockFailed',
  SHOW_CHART : 'showChart',
  CLOSE_CHART : 'closeChart'
}

const _fnOnChangeStore = function(actionType, data){
   if (actionType === ChartActionTypes.LOAD_STOCK_COMPLETED ||
       actionType === ChartActionTypes.LOAD_STOCK_ADDED ||
       actionType === ChartActionTypes.LOAD_STOCK_FAILED )
   {
     ChartActions[ChartActionTypes.LOAD_STOCK].isLoading = false;
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

const ChartActions =  Reflux.createActions({
      [ChartActionTypes.LOAD_STOCK] : {
         children : ['completed', 'added', 'failed'],
         isLoading : false,
         idLoading : undefined,
         isShouldEmit : true,
         cancelLoad : _fnCancelLoad
       },
      [ChartActionTypes.SHOW_CHART] : {},
      [ChartActionTypes.CLOSE_CHART] : {}
});

ChartActions.fnOnChangeStore = _fnOnChangeStore

ChartActions[ChartActionTypes.LOAD_STOCK].preEmit = function(){
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
  option.apiKey = ChartStore.getQuandlKey();

  if (option.isPremium && !option.apiKey){
    this.cancelLoad(option, Msg.Alert.PREMIUM_WITHOUT_KEY, false);
  } else if (isDoublingLoad){
    this.cancelLoad(option, Msg.Alert.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta){
    this.cancelLoad(option, Msg.Alert.DOUBLE_LOAD_META, false);
  }  else if (!ChartStore.isLoadToChart()){
     if (ChartStore.isChartExist(chartType, key)){
       this.cancelLoad(option, Msg.Alert.ALREADY_EXIST, true);
     }
  }

  return undefined;
}

ChartActions[ChartActionTypes.LOAD_STOCK].shouldEmit = function(){
  return this.isShouldEmit;
}
ChartActions[ChartActionTypes.LOAD_STOCK].listen(function(chartType, browserType, option){

  this.isLoading = true;
  this.idLoading = option.key;
  if (option.isLoadMeta){
    this.idLoading = this.idLoading + META;
  }

  const { loadId='Q' } = option;
  option.chartType = chartType;
  option.browserType = browserType;
  LoadConfig[loadId](option, this.completed, this.added, this.failed);
})

export default ChartActions

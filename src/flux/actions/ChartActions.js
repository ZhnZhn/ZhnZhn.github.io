import Reflux from 'reflux';

import LoadConfig from '../logic/LoadConfig';

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
     ChartActions[ChartActionTypes.LOAD_STOCK].isLoadInProgress = false;
   }
}

const ChartActions =  Reflux.createActions({
      [ChartActionTypes.LOAD_STOCK] : {
         children : ['completed', 'added', 'failed'],
         isLoadInProgress : false
       },
      [ChartActionTypes.SHOW_CHART] : {},
      [ChartActionTypes.CLOSE_CHART] : {}
});

ChartActions.fnOnChangeStore = _fnOnChangeStore


ChartActions[ChartActionTypes.LOAD_STOCK].shouldEmit = function(value){
  return !this.isLoadInProgress;
}
ChartActions[ChartActionTypes.LOAD_STOCK].listen(function(chartType, browserType, option){
  this.isLoadInProgress = true;
  const { loadId='Q' } = option;
  LoadConfig[loadId](chartType, browserType, option, this.completed, this.added, this.failed);
})

export default ChartActions

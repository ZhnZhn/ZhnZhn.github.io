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

const ChartActions =  Reflux.createActions({
      [ChartActionTypes.LOAD_STOCK] : {children : ['completed', 'added', 'failed']},
      [ChartActionTypes.SHOW_CHART] : {},
      [ChartActionTypes.CLOSE_CHART] : {}
});

ChartActions[ChartActionTypes.LOAD_STOCK].listen(function(chartType, browserType, option){
  LoadConfig[chartType](chartType, browserType, option, this.completed, this.added, this.failed);
})

export default ChartActions

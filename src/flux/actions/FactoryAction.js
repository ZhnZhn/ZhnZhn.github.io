
import ChartStore from '../stores/ChartStore'

import SeqActions from './SeqActions'
import BatchActions from './BatchActions'

import BrowserActions from './BrowserActions'
import ChartActions from './ChartActions'

const _crLoadQueryStatic = option => {
  const { browserType } = option;
  return new BatchActions([
      {
        action: BrowserActions.showBrowser,
        args: [ browserType ]
      },{
        action: ChartActions.loadStockByQuery,
        args: [ option ]
      }
    ]);
};

const _crLoadQueryDynamic = option => {
  const { browserType } = option;
  return new SeqActions([
    {
      action: BrowserActions.showBrowserDynamic,
      type: 'loadBrowserDynamicCompleted',
      typeFail: 'showBrowserDynamicFailed',
      args: [ browserType ]
    },{
      action: ChartActions.loadStockByQuery,
      type: 'loadStockCompleted',
      args: [ option ]
    }
  ]);
};

const FactoryAction = {
   crLoadQuery: (option) => {
     const { browserType, chartType } = option
         , { dialogProps } = ChartStore
               .getSourceConfig(browserType, chartType) || {};
     if (dialogProps) {       
       return _crLoadQueryStatic(option);
     } else {
       return _crLoadQueryDynamic(option);
     }
   }
}

export default FactoryAction

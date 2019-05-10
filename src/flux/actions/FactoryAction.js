
import SeqActions from './SeqActions'

import BrowserActions from './BrowserActions'
import ChartActions from './ChartActions'

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
     return _crLoadQueryDynamic(option);
   }
};

export default FactoryAction

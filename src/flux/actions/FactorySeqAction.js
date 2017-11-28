
import BrowserConfig from '../../constants/BrowserConfig'

import SeqActions from './SeqActions'
import BrowserActions from './BrowserActions'
import ChartActions from './ChartActions'

const FactorySeqAction = {
  crLoadQueryDynamic: (option) => {
    const { browserType } = option;
    const seq = new SeqActions([
      {
        action: BrowserActions.showBrowserDynamic,
        type: 'loadBrowserDynamicCompleted',
        args: [ BrowserConfig[browserType] ]
      },{
        action: ChartActions.loadStockByQuery,
        type: 'loadStockCompleted',
        args: [ option ]
      }
    ])
    return seq;
  }
}

export default FactorySeqAction

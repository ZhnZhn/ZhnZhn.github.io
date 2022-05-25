import SeqActions from './SeqActions';

import { BrowserActions } from './BrowserActions';
import ChartActions, {
  CHAT_LOAD_BY_QUERY,
  CHAT_LOAD_COMPLETED
} from './ChartActions';

const _crLoadQueryDynamic = option => {
  const { browserType } = option || {};
  return new SeqActions([
    {
      action: BrowserActions.showBrowserDynamic,
      type: 'loadBrowserDynamicCompleted',
      typeFail: 'showBrowserDynamicFailed',
      args: [browserType]
    },{
      action: ChartActions[CHAT_LOAD_BY_QUERY],
      type: CHAT_LOAD_COMPLETED,
      args: [option]
    }
  ]);
};

const FactoryAction = {
  crLoadQuery: _crLoadQueryDynamic
};

export default FactoryAction

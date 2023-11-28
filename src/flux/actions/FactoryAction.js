import SeqActions from './SeqActions';
import {
  showBrowser
} from '../stores/browserStore';
import {
  CHAT_LOAD_BY_QUERY,
  CHAT_LOAD_COMPLETED,
  ChartActions
} from './ChartActions';

const _crLoadQueryDynamic = option => {
  const { browserType } = option || {};
  return new SeqActions([
    {
      action: showBrowser,
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

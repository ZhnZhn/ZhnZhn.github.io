import crAdapterOHLCV  from '../crAdapterOHLCV';
import fnAdapter from './fnAdapter'

const {
  crAddConfig,
  crCaption
} = fnAdapter;

const _getData = ({ values }) => values
  .map(({ datetime, volume, low, high, close, open }) => ({
     date: datetime,
     volume: parseFloat(volume),
     low: parseFloat(low),
     high: parseFloat(high),
     open: parseFloat(open),
     close: parseFloat(close)
  }));

const TwAdapter = crAdapterOHLCV({
  crCaption,
  getArr: _getData,
  crAddConfig  
});

export default TwAdapter

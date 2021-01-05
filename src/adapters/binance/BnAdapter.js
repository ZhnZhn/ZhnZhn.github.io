import crAdapter from '../crAdapter'
import toKline from './toKline'
import toOrderBook from './toOrderBook'

const _rAdapter = {
  DF: toKline,
  OB: toOrderBook
};

const _getAdapter = option => {
  const { dfId } = option;
  return dfId && _rAdapter[dfId]
    || _rAdapter.DF;
};

const BnAdapter = crAdapter(_getAdapter);

export default BnAdapter

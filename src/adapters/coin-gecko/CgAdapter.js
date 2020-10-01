import crAdapter from '../crAdapter'

import toChart from './toChart'
import toExchangeList from './toExchangeList'
import toMarketCapList from './toMarketCapList'

const _rAdapter = {
  DF: toChart,
  EL: toExchangeList,
  MCL: toMarketCapList,
}

const _getAdapter = option => {
  const { dfSubId } = option;
  return _rAdapter[dfSubId] || _rAdapter.DF;
};

const CgAdapter = crAdapter(_getAdapter, { isKey: true })

export default CgAdapter

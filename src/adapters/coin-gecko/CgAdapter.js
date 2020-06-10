import crAdapter from '../crAdapter'

import toChart from './toChart'
import toList from './toList'

const _rAdapter = {
  DF: toChart,
  MCL: toList
}

const _getAdapter = option => {
  const { dfSubId } = option;
  return _rAdapter[dfSubId] || _rAdapter.DF;
};

const CgAdapter = crAdapter(_getAdapter, { isKey: true })

export default CgAdapter

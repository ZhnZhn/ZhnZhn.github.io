import api from './Api'
import crAdapter from '../crAdapter'

import IndicatorAdapter from './IndicatorAdapter'
import IntradayAdapter from './IntradayAdapter'
import SectorAdapter from './SectorAdapter'
import SearchAdapter from './SearchAdapter'
import FundAdapter from './FundAdapter'
import EarnAdapter from './EarnAdapter'

const _rAdapter = {
  DF: IndicatorAdapter,
  I: IntradayAdapter,
  S: SectorAdapter,
  SR: SearchAdapter,
  F: FundAdapter,
  E: EarnAdapter
}

const _isFn = fn => typeof fn === 'function';

const _getAdapter = option => {
  const { dfSubId } = option
  , _adapter = _rAdapter[dfSubId] || _rAdapter.DF;
  return _isFn(_adapter)
    ? _adapter()
    : _adapter;
};

const adapter = crAdapter(_getAdapter, { isKey: true });
const AlphaVantage = { api, adapter };

export default AlphaVantage

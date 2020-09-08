import api from './Api'
import crAdapter from '../crAdapter'

import IndicatorAdapter from './IndicatorAdapter'
import IntradayAdapter from './IntradayAdapter'
import SectorAdapter from './SectorAdapter'
import SearchAdapter from './SearchAdapter'
import FundAdapter from './FundAdapter'

const _rAdapter = {
  DF: IndicatorAdapter,
  I: IntradayAdapter,
  S: SectorAdapter,
  SR: SearchAdapter,
  F: FundAdapter
}

const _getAdapter = option => {
  const { dfSubId } = option;
  return _rAdapter[dfSubId] || _rAdapter.DF;
};

const adapter = crAdapter(_getAdapter, { isKey: true });
const AlphaVantage = { api, adapter };

export default AlphaVantage

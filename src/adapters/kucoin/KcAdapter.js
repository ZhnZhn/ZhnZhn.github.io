import crAdapterRouter from '../crAdapterRouter'
import toKline from './toKline'
import toOrderBook from './toOrderBook'

const _rAdapter = {
  DF: toKline,
  OB: toOrderBook
}
, KcAdapter = crAdapterRouter(_rAdapter);

export default KcAdapter

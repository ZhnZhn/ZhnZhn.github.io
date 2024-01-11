import crAdapterRouter from '../crAdapterRouter'
import toKline from './toKline'
import toOrderBook from './toOrderBook'

const _rAdapter = {
  DF: toKline,
  OB: toOrderBook
}
, GtAdapter = crAdapterRouter(_rAdapter);

export default GtAdapter

import crAdapterRouter from '../crAdapterRouter'
import toKline from './toKline'
import toOrderBookDf from '../toOrderBookDf'

const _rAdapter = {
  DF: toKline,
  OB: toOrderBookDf
}
, GtAdapter = crAdapterRouter(_rAdapter);

export default GtAdapter

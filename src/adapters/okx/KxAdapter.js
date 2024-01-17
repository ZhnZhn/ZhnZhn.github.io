import crAdapterRouter from '../crAdapterRouter'
import toKline from './toKline'

const _rAdapter = {
  DF: toKline
}
, KxAdapter = crAdapterRouter(_rAdapter);

export default KxAdapter

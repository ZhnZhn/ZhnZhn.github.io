import crAdapterRouter from '../crAdapterRouter'
import toKline from './toKline'

const _rAdapter = {
  DF: toKline,
}
, KcAdapter = crAdapterRouter(_rAdapter);

export default KcAdapter

import crAdapterRouter from '../crAdapterRouter';
import toKline from './toKline';
import toOrderBook from './toOrderBook';

const _rAdapter = {  
  DF: toKline,
  OB: toOrderBook
}
, BnAdapter = crAdapterRouter(_rAdapter);

export default BnAdapter

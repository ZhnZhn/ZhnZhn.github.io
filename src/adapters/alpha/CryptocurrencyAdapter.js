import crAdapterType1 from '../crAdapterType1';
import { compareByDate } from '../compareByFn';
import {
  getValue,
  ymdToUTC
} from './fnAdapter';

const _getObjectKeys = Object.keys
, _crPnClose = (
  option
) => `4a. close (${getValue(option.items[1])})`;

const crData = (
  json,
  option
) => {
  const _objData = json['Time Series (Digital Currency Daily)']
  , _pnClose = _crPnClose(option);
  return _objData ? _getObjectKeys(_objData)
     .map(k => [
        ymdToUTC(k),
        parseFloat(_objData[k][_pnClose])
     ])
     .sort(compareByDate) : [];
};

let _adapter;
const CryptocurrencyAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData }))

export default CryptocurrencyAdapter

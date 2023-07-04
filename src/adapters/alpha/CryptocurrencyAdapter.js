import crAdapterType1 from '../crAdapterType1';
import {
  getValue,
  ymdToUTC
} from './fnAdapter';

const _getObjectKeys = Object.keys
, _crPnClose = (
  option
) => `4a. close (${getValue(option.items[1])})`
, _compareByY = (a, b) => a[0] - b[0];

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
     .sort(_compareByY) : [];
};

let _adapter;
const CryptocurrencyAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData }))

export default CryptocurrencyAdapter

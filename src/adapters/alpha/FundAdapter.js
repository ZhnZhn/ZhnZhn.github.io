import crAdapterType1 from '../crAdapterType1';
import {
  ymdToUTC,
  compareByDate,
  _isNaN
} from './fnAdapter';

const crData = (
  json,
  { dfItem, dfPeriod }
) => {
  const _pnReport = dfPeriod === 'A'
    ? 'annualReports'
    : 'quarterlyReports';

  return (json[_pnReport] || [])
    .reduce((arr, item) => {
      const _y = parseInt(item[dfItem], 10);
      if (!_isNaN(_y)) {
        arr.push([ymdToUTC(item.fiscalDateEnding), _y])
      }
      return arr;
    }, [])
    .sort(compareByDate);
};

let _adapter;
const FundAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData }))

export default FundAdapter

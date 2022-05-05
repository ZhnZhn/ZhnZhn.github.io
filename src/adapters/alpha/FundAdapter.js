import crAdapterType1 from '../crAdapterType1';
import {
  ymdToUTC,
  compareByDate,
  _isNaN
} from './fnAdapter';

const crData = (json, option) => {
  const { dfItem, dfPeriod } = option
  , _pnReport = dfPeriod === 'A'
       ? 'annualReports'
       : 'quarterlyReports'
  , _reports = json[_pnReport] || []
  , _data = [];

  _reports.forEach(item => {
    const _y = parseInt(item[dfItem], 10)
    if (!_isNaN(_y)) {
      _data.push([ymdToUTC(item.fiscalDateEnding), _y])
    }
  })
  return _data.sort(compareByDate);
}

let _adapter
const FundAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData }))

export default FundAdapter

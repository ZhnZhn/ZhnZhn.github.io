import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const {
  ymdToUTC,
  compareByDate
} = fnAdapter
, _isNan = Number.isNaN || isNaN;

const _crData = (json, option) => {
  const { dfItem, dfPeriod } = option
  , _pnReport = dfPeriod === 'A'
       ? 'annualReports'
       : 'quarterlyReports'
  , _reports = json[_pnReport] || []
  , _data = [];

  _reports.forEach(item => {
    const _y = parseInt(item[dfItem], 10)
    if (!_isNan(_y)) {
      _data.push([ymdToUTC(item.fiscalDateEnding), _y])
    }
  })
  return _data.sort(compareByDate);
}

let _adapter
const FundAdapter = () => _adapter
  || (_adapter = crAdapterType1(_crData))

export default FundAdapter

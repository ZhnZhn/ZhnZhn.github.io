import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const {
  ymdToUTC,
  compareByDate,
  roundBy
} = fnAdapter
, _isNan = Number.isNaN || isNaN;

const crData = (json, option) => {
  const { dfPeriod } = option
  , _pnReport = dfPeriod === 'A'
       ? 'annualEarnings'
       : 'quarterlyEarnings'
  , _reports = json[_pnReport] || []
  , _data = [];
  _reports.forEach(({ reportedEPS, fiscalDateEnding }) => {
    const _y = roundBy(reportedEPS)
    if (!_isNan(_y)) {
      _data.push([ymdToUTC(fiscalDateEnding), _y])
    }
  })
  return _data.sort(compareByDate);
};

let _adapter;
const EarnAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData }));

export default EarnAdapter

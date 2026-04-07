import { fCrData } from '../av/AvFn';
import { crAdapterType1 } from '../crAdapterType1';

const _crData = fCrData(
  'reportedEPS',
  'fiscalDateEnding',
  'round'
);

const crData = (json, option) => {
  const { dfPeriod } = option
  , _pnReport = dfPeriod === 'A'
       ? 'annualEarnings'
       : 'quarterlyEarnings'
  return _crData(json[_pnReport]);
};

let _adapter;
const EarnAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData }));

export default EarnAdapter

import crAdapterType1 from '../crAdapterType1';
import { fCrData } from './fnAdapter';

const crData = (
  json,
  { dfItem, dfPeriod }
) => fCrData(
    dfItem,
    'fiscalDateEnding',
    '10'
  )(json[dfPeriod === 'A'
     ? 'annualReports'
     : 'quarterlyReports']
  );

let _adapter;
const FundAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData }))

export default FundAdapter

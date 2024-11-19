import {
  getObjectKeys,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import { crAdapterType1 } from '../crAdapterType1';

const crData = (
  json,
  option
) => {
  const _objData = json["Time Series (Digital Currency Daily)"];
  return getObjectKeys(_objData)
    .map(k => [
      ymdToUTC(k),
      parseFloat(_objData[k]["4. close"])
    ])
    .sort(compareByDate);
}
, AvBlockchainAdapter = crAdapterType1({ crData });

export default AvBlockchainAdapter

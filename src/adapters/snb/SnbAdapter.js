import {
  ymdToUTC,
  joinBy
} from '../AdapterFn';
import crAdapterType1 from '../crAdapterType1';
import { getTimeSeriesValues } from './fnAdapter';

const crData = (
  json,
  option
) => getTimeSeriesValues(json)
  .map(item => [ymdToUTC(item.date), item.value])
, trOption = (option) => {
    option.subtitle = joinBy(', ',
      option.subtitle,
      option.dfSubtitle
    )
};

const SnbAdapter = crAdapterType1({
  crData,
  trOption
});

export default SnbAdapter

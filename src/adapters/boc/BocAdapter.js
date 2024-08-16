import { ymdToUTC } from '../AdapterFn';
import {
  fCrDataType1,
  crAdapterType1
} from '../crAdapterType1';
import {
  getSeriesId,
  getObservationsData
} from './fnAdapter';

const _fCrItemTuple = options => {
  const seriesId = getSeriesId(options);
  return item => [
    ymdToUTC(item.d),
    parseFloat((item[seriesId] || {}).v)
  ];
}
, crData = fCrDataType1(getObservationsData, _fCrItemTuple)

const BocAdapter = crAdapterType1({
  crData
})

export default BocAdapter

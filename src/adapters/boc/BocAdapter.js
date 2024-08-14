import {
  isNumber,
  ymdToUTC
} from '../AdapterFn';
import crAdapterType1 from '../crAdapterType1';
import {
  getSeriesId,
  getObservationsData
} from './fnAdapter';

const crData = (
  json,
  options
) => {
  const seriesId = getSeriesId(options);
  return getObservationsData(json)
   .reduce((data, item) => {
     const dateMls = ymdToUTC(item.d)
     , value = parseFloat(item[seriesId].v)
     if (isNumber(dateMls) && isNumber(value)) {
       data.push([dateMls, value])
     }
     return data;
   }, []);
};

const BocAdapter = crAdapterType1({
  crData
})

export default BocAdapter

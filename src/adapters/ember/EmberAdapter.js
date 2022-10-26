import crAdapterType1 from '../crAdapterType1';

import {
  isNumber,
  ymdToUTC
} from '../AdapterFn';

const crData = (
  json,
  option
) => {
  const {
    fromYear,
    data
  } = json
  , _fromYear = parseInt(fromYear, 10);
  return isNumber(_fromYear)
    ? data.map((v, index) => [
        ymdToUTC((_fromYear + index)+''),
        v
     ])
   : [];
};

const EmberAdapter = crAdapterType1({
  crData
});

export default EmberAdapter

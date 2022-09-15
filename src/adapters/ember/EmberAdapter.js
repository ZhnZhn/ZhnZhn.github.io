import crAdapterType1 from '../crAdapterType1';

import {
  ymdToUTC
} from '../AdapterFn';

const crData = (
  json,
  option
) => json
  .data.map(([year, value]) => [
     ymdToUTC(year),
     value
  ]);

const EmberAdapter = crAdapterType1({
  crData
});

export default EmberAdapter

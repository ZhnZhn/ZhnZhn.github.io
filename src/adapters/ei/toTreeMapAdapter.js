import { isNumber } from '../AdapterFn';

import {
  crItemColor,
  fToTreeMapAdapter
} from '../fToTreeMapAdapter';

const _getDataTotalTuple = (
  json
) => json.data.reduce((tuple, item) => {
     const [
       label,
       value
     ] = item || [];
     if (isNumber(value)) {
       tuple[0].push({
         label,
         value,
         color: crItemColor(label)}
       )
       tuple[1] += value
     }
     return tuple;
  }, [[], 0]);

const toTreeMapAdapter = fToTreeMapAdapter(
  _getDataTotalTuple
);

export default toTreeMapAdapter

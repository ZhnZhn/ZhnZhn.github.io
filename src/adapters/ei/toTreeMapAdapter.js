import { isNumber } from '../AdapterFn';

import {
  crItemColor,
  fToTreeMapAdapter
} from '../fToTreeMapAdapter';

const _getDataTotalTuple = (
  json
) => ((json || {}).data || [])
  .reduce((tuple, item) => {
     const value = item.value;
     if (isNumber(value)) {
       item.color = crItemColor(item.label)
       tuple[0].push(item)
       tuple[1] += value
     }
     return tuple;
  }, [[], 0]);

const toTreeMapAdapter = fToTreeMapAdapter(
  _getDataTotalTuple
);

export default toTreeMapAdapter

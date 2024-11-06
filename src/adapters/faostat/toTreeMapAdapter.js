import { isNumber } from '../AdapterFn';
import { addPercentAndColorToData } from '../TreeMapFn';
import { fToTreeMapAdapter } from '../fToTreeMapAdapter';

import { crCategoryTitle } from './fnAdapter';

const _crTreeMapTupleDataTotal = (
  json,
  option
) => {
  let total = 0;
  const data = []
  , { time } = option;
  json.data.forEach(item => {
    const _value = parseFloat(item.Value);
    if (isNumber(_value) && _value !== 0 && item.Area) {
      total += _value
      data.push({
        value: _value,
        label: item.Area,
        title: time
      })
    }
  })
  addPercentAndColorToData(data, total)
  option.subtitle = crCategoryTitle(option.subtitle, json)
  return [data, total];
}
, _crCaption = (
  data,
  option
) => [
  option.subtitle,
  `${option.title} (${option._ps60}%, ${option._ps90}%)`    
];

const toTreeMapAdapter = fToTreeMapAdapter(
  _crTreeMapTupleDataTotal,
  _crCaption
);

export default toTreeMapAdapter

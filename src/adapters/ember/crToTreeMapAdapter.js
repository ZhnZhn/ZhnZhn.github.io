import {
  crItemColor,
  fToTreeMapAdapter
} from '../fToTreeMapAdapter';

import {
  isNumber,
  getMetricValue
} from './fnAdapter';

const ARR_VARIABLES = [
  "Coal",
  "Gas",
  "Other Fossil",
  "Nuclear",
  "Other Renewables",
  "Bioenergy",
  "Hydro",
  "Solar",
  "Wind"
]
, _isFuel = label => ARR_VARIABLES.indexOf(label) !== -1;

const crToTreeMapAdapter = (option) => {
  const metric = getMetricValue(option)
  , getItemValue = item => item[metric]
  , getItemLabel = item => item.variable
  , getDataTotalTuple = json => json
      .reduce((tuple, item) => {
         const label = getItemLabel(item)
         , value = getItemValue(item);
         if (_isFuel(label) && isNumber(value)) {
           item.label = label
           item.value = value
           item.color = crItemColor(label)
           tuple[0].push(item)
           tuple[1] += value
         }
         return tuple;
      }, [[], 0]);
  return fToTreeMapAdapter(
     getDataTotalTuple
  )
}

export default crToTreeMapAdapter

import { joinByDot } from '../../utils/arrFn';

import {
  getValue,
  getObjectKeys,
  getByPropsFrom,
  crGetRoute
} from '../AdapterFn';
import {
  isCategory
} from '../CategoryFn';

export const ECB_EUROPA_EU = "ecb.europa.eu"

export const getSeries = (
  json
) => getByPropsFrom(json, "dataSets", 0, "series")

export const getSeriesObservertions = json => {
 const _series = getSeries(json);
 return (_series[getObjectKeys(_series)[0]] || {}).observations;
}

export const getDimensions = (
  json
) => getByPropsFrom(json, "structure", "dimensions")
export const getObservationValues = (
  json
) => getByPropsFrom(getDimensions(json), "observation", 0, "values")

const _crItemDf = items => {
  const _v0 = getValue(items[0]);
  return items.length === 2
    ? `${getValue(items[1])}.${_v0}`
    : _v0;
}
, _crItem12 = (
  items,
  seriaType
) => `${isCategory(seriaType) ? "" : getValue(items[0])}.${getValue(items[1])}`
, _crItem312 = (
  items
) => joinByDot(
  getValue(items[2]),
  getValue(items[0]),
  getValue(items[1])
)
, _routersCrItem = {
  s12: _crItem12,
  s312: _crItem312
}
, _getCrItemId = crGetRoute(
  _routersCrItem,
  _crItemDf
);

export const crItemId = option => {
  const _crItemId = _getCrItemId(option.dfFnUrl);
  return joinByDot(
    option.dfPrefix,
    _crItemId(option.items, option.seriaType)
  );
}

export const findCategoryIndex = (
  option
) => crItemId(option)
  .split(".")
  .findIndex(token => token === "")

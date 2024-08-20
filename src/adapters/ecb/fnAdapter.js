import {
  getValue,
  getObjectKeys
} from '../AdapterFn';

export const ECB_EUROPA_EU = "ecb.europa.eu"

export const getSeriesObservertions = json => {
 const _series = ((((json || {}).dataSets || [])[0] || {}).series || {}) || {}
 return (_series[getObjectKeys(_series)[0]] || {}).observations;
}

export const getObservationValues = json => (((((json || {}).structure || {}).dimensions || {}).observation || [])[0] || {}).values

export const crItemId = option => {
  const { items } = option
  , _v0 = getValue(items[0]);
  return items.length === 2
    ? `${getValue(items[1])}.${_v0}`
    : _v0
}

import {
  getValue,
  getObjectKeys,
  joinBy
} from '../AdapterFn';

export const ECB_EUROPA_EU = "ecb.europa.eu"

export const getSeriesObservertions = json => {
 const _series = ((((json || {}).dataSets || [])[0] || {}).series || {}) || {}
 return (_series[getObjectKeys(_series)[0]] || {}).observations;
}

export const getObservationValues = json => (((((json || {}).structure || {}).dimensions || {}).observation || [])[0] || {}).values

const _crItemDf = items => {
  const _v0 = getValue(items[0]);
  return items.length === 2
    ? `${getValue(items[1])}.${_v0}`
    : _v0;
}
, _crItem312 = (
  items
) => joinBy(".",
  getValue(items[2]),
  getValue(items[0]),
  getValue(items[1])
)
, _hmCrItem = {
  df: _crItemDf,
  s312: _crItem312
};

export const crItemId = option => {
  const { dfFnUrl } = option
  , _crItemId = (dfFnUrl && _hmCrItem[dfFnUrl]) || _hmCrItem.df;
  return joinBy(".",
    option.dfPrefix,
    _crItemId(option.items)
  );
}

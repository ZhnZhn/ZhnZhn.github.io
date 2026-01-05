import { isInArrStr } from '../../utils/arrFn';
import { getValueAndCaption } from '../../utils/itemFn';

import {
  REQ_ERROR,
  fAvApi,
  crFunctionQuery
} from '../av/AvFn';

import {
  assign,
  crError,
  crGetRoute
} from '../AdapterFn';

const _crEconomicsQuery = (
  option
) => {
  const {
    items
  } = option
  , [
    value,
    itemCaption
  ] = getValueAndCaption(items[0]);
  assign(option, {
    itemCaption
  })
  return crFunctionQuery(value);
};

const  _isDailyInterval = isInArrStr([
  'daily',
  'weekly'
])
, _isQuarterlyInterval = isInArrStr([
  'quarterly',
  'annual'
]);

const _checkCommoditiesParams = (
  item,
  interval
) => {
  const [
    itemId,
    itemCaption
  ] = getValueAndCaption(item)
  , [
    intervalId,
    _intervalCaption
  ] = getValueAndCaption(interval);
  if ((!item.dw && _isDailyInterval(intervalId))
   || (item.dw && _isQuarterlyInterval(intervalId))
  ) {
    throw crError(REQ_ERROR, `Interval ${_intervalCaption} is absent for ${itemCaption}`);
  }
  return [
    itemId,
    itemCaption,
    intervalId
  ];
}

const _crCommoditiesQuery = (
  option
) => {
  const {
    items
  } = option
  , [
    item,
    interval
  ] = items
  , [
    itemId,
    itemCaption,
    intervalId
  ] = _checkCommoditiesParams(
    item,
    interval
  );

  assign(option, {
    itemCaption
  })
  return `${crFunctionQuery(itemId)}&interval=${intervalId}`;
}

const _getCrQuery = crGetRoute({
  EC: _crEconomicsQuery,
  CM: _crCommoditiesQuery
})

const AvEconomicsApi = fAvApi(
  option => _getCrQuery(option.dfFn)
)

export default AvEconomicsApi

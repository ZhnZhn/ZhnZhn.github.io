import { isInArrStr } from '../../utils/arrFn';
import {
  getValueAndCaption,
  getValue
} from '../../utils/itemFn';
import { crGetRoute } from '../../utils/crRouter';

import {
  REQ_ERROR,
  fAvApi,
  crFunctionQuery
} from '../av/AvFn';

import {
  assign,
  crError
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
    dataSource: item.ds,
    itemCaption
  })
  return `${crFunctionQuery(itemId)}&interval=${intervalId}`;
}

const _crPreciousMetalQuery = (option) => {
  const { items } = option
  , _symbol = getValue(items[0])
  , _interval = getValue(items[1]);
  return `${crFunctionQuery("GOLD_SILVER_HISTORY")}&symbol=${_symbol}&interval=${_interval}`
};

const _getCrQuery = crGetRoute({
  EC: _crEconomicsQuery,
  CM: _crCommoditiesQuery,
  PM: _crPreciousMetalQuery
})

const AvEconomicsApi = fAvApi(
  option => _getCrQuery(option.dfFn)
)

export default AvEconomicsApi

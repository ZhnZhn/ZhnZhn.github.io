import { isFn } from '../../utils/isTypeFn';

import {
  LT_EU_STAT,
  LT_EIA,
  LT_WL
} from '../../constants/LoadType';

import { getLoadImpl } from './LoadImpl';

const _crItemKey = (option) => {
  const {
    loadId,
    value,
    _itemKey
  } = option
  , loadConfig = getLoadImpl(loadId) || {}
  , { crKey } = loadConfig;
  return isFn(crKey)
    ? crKey(option)
    : _itemKey || value || 'key';
};

export const crKeyForConfig = (option) => {
  const { _itemKey } = option;
  switch (option.loadId) {
    case LT_EU_STAT: case LT_EIA: case LT_WL:
      return _itemKey || option.id;
    default:
      return _crItemKey(option);
  }
}

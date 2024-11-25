export {
  crRouter,
  crGetRoute
} from '../../utils/crRouter';

import { isFn } from '../../utils/isTypeFn';
import {
  LT_Q,
  LT_EU_STAT,
  LT_EIA,
  LT_WL
} from '../../constants/LoadType';

import { getLoadImpl } from './LoadImpl';


const _crNdlKey = ({
  loadId,
  isLoadMeta,
  value,
  dataColumn,
  seriaType,
  viewKey
}) => viewKey || value;

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
    case LT_Q:
      return _itemKey || _crNdlKey(option);
    case LT_EU_STAT: case LT_EIA: case LT_WL:
      return _itemKey || option.id;
    default:
      return _crItemKey(option);
  }
}
